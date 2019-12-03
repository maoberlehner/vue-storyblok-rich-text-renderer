import { CreateElement, VNode } from 'vue'
import { RichTextNode, Blocks, helpers } from '../rich-text-types'
import { ComponentRenderers, defaultComponentResolver } from './component'

type NodeRenderers = {
  [key: string]: NodeRenderer
}

type NodeResolver = string
type NodeResolverFunction = (node: RichTextNode, key: string, h: CreateElement, next: Function, componentRenderers: ComponentRenderers) => VNode | VNode[]

interface NodeResolvers {
  [key: string]: NodeResolver | NodeResolverFunction
}

interface NodeRenderer {
  (node: RichTextNode, key: string, h: CreateElement, next: Function): VNode | VNode[]
}

const defaultNodeResolvers: NodeResolvers = {
  [Blocks.HEADING]: (node, key, h, next) => {
    const tag = node.attrs.level ? `h${node.attrs.level}` : 'h2'
    return h(tag, { key }, next(node.content, key, h, next))
  },
  [Blocks.PARAGRAPH]: 'p',
  [Blocks.QUOTE]: 'blockquote',
  [Blocks.OL_LIST]: 'ol',
  [Blocks.UL_LIST]: 'ul',
  [Blocks.LIST_ITEM]: 'li',
  [Blocks.CODE_BLOCK]: (node, key, h, next) => {
    return h('code', { key, attrs: node.attrs }, next(node.content, key, h, next))
  },
  [Blocks.HR]: 'hr',
  [Blocks.BR]: 'br',
  [Blocks.IMAGE]: (node, key, h) => {
    return h('img', { key, attrs: node.attrs })
  },
  [Blocks.COMPONENT]: (node, key, h, next, componentRenderers) => {
    const resolvers: VNode[] = []

    node.attrs.body.forEach((item: RichTextNode, i: number) => {
      const scopedKey = `${key}-${i}`
      const resolvedComponent = componentRenderers[item.component]
      resolvers.push(
        resolvedComponent
          ? resolvedComponent(item, scopedKey, h)
          : defaultComponentResolver(item, scopedKey, h)
      )
    })

    return resolvers
  }
}

const buildNodeRenderers = (nodeResolvers: NodeResolvers, componentRenderers: ComponentRenderers) => {
  const nodeRenderers: NodeRenderers = {}
  const mergedResolvers: NodeResolvers = { ...defaultNodeResolvers, ...nodeResolvers }

  for (const key in mergedResolvers) {
    if (mergedResolvers.hasOwnProperty(key)) {
      const resolver = mergedResolvers[key]
      nodeRenderers[key] = (node, key, h, next) => {
        if (typeof resolver === 'function') {
          return resolver(node, key, h, next, componentRenderers)
        }

        return h(resolver, { key }, !helpers.isVoidElement(node) ? next(node.content, key, h, next) : null)
      }
    }
  }

  return nodeRenderers
}

export {
  NodeRenderers,
  NodeResolver,
  NodeResolverFunction,
  NodeResolvers,
  NodeRenderer,
  defaultNodeResolvers,
  buildNodeRenderers
}
