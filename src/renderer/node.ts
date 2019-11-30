import { CreateElement, VNode } from 'vue'
import { RichTextNode, Blocks, helpers } from '@/rich-text-types'
import { ComponentRenderers, defaultComponentResolver } from '@/renderer/component'

interface NodeResolver {
  tag?: string
}

type NodeResolverFunction = (node: RichTextNode, key: string, h: CreateElement, next: Function, componentRenderers: ComponentRenderers) => VNode | VNode[]

interface NodeResolvers {
  [key: string]: NodeResolver | NodeResolverFunction
}

type NodeRenderers = {
  [key: string]: NodeRenderer
}

interface NodeRenderer {
  (node: RichTextNode, key: string, h: CreateElement, next: Function): VNode | VNode[]
}

const defaultNodeResolvers: NodeResolvers = {
  [Blocks.HEADING]: (node, key, h, next) => {
    const tag = node.attrs.level ? `h${node.attrs.level}` : 'h2'
    return h(tag, { key }, next(node.content, key, h, next))
  },
  [Blocks.PARAGRAPH]: {
    tag: 'p'
  },
  [Blocks.QUOTE]: {
    tag: 'blockquote'
  },
  [Blocks.OL_LIST]: {
    tag: 'ol'
  },
  [Blocks.UL_LIST]: {
    tag: 'ul'
  },
  [Blocks.LIST_ITEM]: {
    tag: 'li'
  },
  [Blocks.CODE_BLOCK]: {
    tag: 'code'
  },
  [Blocks.HR]: {
    tag: 'hr'
  },
  [Blocks.BR]: {
    tag: 'br'
  },
  [Blocks.IMAGE]: (node, key, h) => {
    return h('img', { key, attrs: node.attrs })
  },
  [Blocks.COMPONENT]: (node, key, h, next, componentRenderers) => {
    const resolvers: any[] = []

    node.attrs.body.forEach((item: RichTextNode, i: number) => {
      const scopedKey = `${key}-${i}`
      const resolvedComponent = componentRenderers[item.component]
      resolvers.push(resolvedComponent ? resolvedComponent(item, scopedKey, h) : defaultComponentResolver(item, scopedKey, h))
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

        return h(resolver.tag, { key }, !helpers.isVoidElement(node) ? next(node.content, key, h, next) : null)
      }
    }
  }

  return nodeRenderers
}

export {
  NodeResolver,
  NodeResolvers,
  NodeRenderers,
  NodeRenderer,
  defaultNodeResolvers,
  buildNodeRenderers
}
