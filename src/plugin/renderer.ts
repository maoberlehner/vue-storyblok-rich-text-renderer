import { Blocks, Marks, helpers, RichTextNode, Mark } from '../rich-text-types'
import { CreateElement, VNode } from 'vue'

export interface NodeRendererFunction {
  (node: RichTextNode, key: string, h: CreateElement, next: Function): VNode | VNode[]
}

export interface MarkRendererFunction {
  (text: string, key: string, h: CreateElement): VNode
}

export type NodeRenderers = {
  [key: string]: NodeRendererFunction
}

export type MarkRenderers = {
  [key: string]: MarkRendererFunction
}

export type ComponentRenderers = {
  [key: string]: Function
}

export type TagFunction = (node: RichTextNode) => string

export interface NodeResolver {
  tag?: string | TagFunction
  render?: (node: RichTextNode, key: string, h: CreateElement, next: Function, componentRenderers: ComponentRenderers) => VNode | VNode[]
}

export interface NodeResolvers {
  [key: string]: NodeResolver
}

export interface MarkResolver {
  tag: string
}

export interface MarkResolvers {
  [key: string]: MarkResolver
}

export interface ComponentResolver {
  component: string
  passProps?: string[]
}

export type ComponentResolvers = {
  [key: string]: ComponentResolver
}

export interface RichTextRenderer {
  node: NodeRenderers,
  mark: MarkRenderers,
  component: ComponentRenderers,
  createElement: CreateElement
}

const defaultNodeResolvers: NodeResolvers = {
  [Blocks.HEADING]: {
    tag: (node) => {
      return node.attrs.level ? `h${node.attrs.level}` : 'h2'
    }
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
  [Blocks.IMAGE]: {
    tag: 'img'
  },
  [Blocks.COMPONENT]: {
    render: (node, key, h, next, componentRenderers) => {
      const resolvers: any[] = []

      node.attrs.body.forEach((item: RichTextNode, i: number) => {
        const scopedKey = `${key}-${i}`
        const resolvedComponent = componentRenderers[item.component]
        resolvers.push(resolvedComponent ? resolvedComponent(item, scopedKey, h) : defaultComponentResolver(item, scopedKey, h))
      })

      return resolvers
    }
  }
}

const defaultMarkResolvers: MarkResolvers = {
  [Marks.BOLD]: {
    tag: 'strong'
  },
  [Marks.STRONG]: {
    tag: 'strong'
  },
  [Marks.STRIKE]: {
    tag: 's'
  },
  [Marks.UNDERLINE]: {
    tag: 'u'
  },
  [Marks.ITALIC]: {
    tag: 'i'
  },
  [Marks.CODE]: {
    tag: 'code'
  }
}

const defaultComponentResolver = (node: RichTextNode, key: string, h: CreateElement) => {
  const style = {
    color: 'red',
    border: '1px dashed red',
    padding: '10px'
  }

  return h('div', { key, style }, `No resolver for component "${node.component}" found!`)
}

/* const defaultNodeRenderers: NodeRenderers = {
  [Blocks.HEADING]: (node, key, h, next) => {
    const tag = node.attrs.level ? `h${node.attrs.level}` : 'h2'
    return h(tag, { key }, next(node.content, key, h, next))
  },
  [Blocks.PARAGRAPH]: (node, key, h, next) => {
    return h('p', { key }, next(node.content, key, h, next))
  },
  [Blocks.QUOTE]: (node, key, h, next) => {
    return h('blockquote', { key }, next(node.content, key, h, next))
  },
  [Blocks.OL_LIST]: (node, key, h, next) => {
    return h('ol', { key }, next(node.content, key, h, next))
  },
  [Blocks.UL_LIST]: (node, key, h, next) => {
    return h('ul', { key }, next(node.content, key, h, next))
  },
  [Blocks.LIST_ITEM]: (node, key, h, next) => {
    return h('li', { key }, next(node.content, key, h, next))
  },
  [Blocks.CODE_BLOCK]: (node, key, h, next) => {
    const classAttr = node.attrs.class
    const attrs = { class: `${classAttr} code-block` }
    return h('code', { key, attrs }, next(node.content, key, h, next))
  },
  [Blocks.HR]: (node, key, h) => {
    return h('hr', { key })
  },
  [Blocks.BR]: (node, key, h) => {
    return h('br', { key })
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
} */

const textRenderer = ({ text, marks }: RichTextNode, key: string, h: CreateElement, markRenderer: MarkRenderers) => {
  return marks && marks.length
    ? marks.reduce(
      (aggregate: string, mark: Mark, i: number) => markRenderer[mark.type](aggregate, `${key}-${i}`, h),
      text
    )
    : text
}

const renderNodeList = (nodes: RichTextNode[], key: string, renderer: RichTextRenderer) => {
  return nodes.map((node, i) => renderNode(node, `${key}-${i}`, renderer))
}

const renderNode = (node: RichTextNode, key: string, renderer: RichTextRenderer) => {
  const nodeRenderer = renderer.node
  const createElement = renderer.createElement

  if (helpers.isText(node)) {
    const markRenderer = renderer.mark
    return textRenderer(node, key, createElement, markRenderer)
  } else {
    const nextNode = (nodes: RichTextNode[]) => renderNodeList(nodes, key, renderer)
    const blockRenderer = nodeRenderer[node.type]

    if (!blockRenderer) {
      return nodeRenderer['paragraph'](node, key, createElement, nextNode)
    }

    return blockRenderer(node, key, createElement, nextNode)
  }
}

const buildMarkRenderers = (markResolvers: MarkResolvers, h: CreateElement) => {
  const markRenderers: MarkRenderers = {}

  for (const key in markResolvers) {
    if (markResolvers.hasOwnProperty(key)) {
      const resolver = markResolvers[key]
      markRenderers[key] = (text, key, h) => {
        return h(resolver.tag, { key }, text)
      }
    }
  }

  return markRenderers
}

const buildNodeRenderers = (nodeResolvers: NodeResolvers, componentRenderers: ComponentRenderers, h: CreateElement) => {
  const nodeRenderers: NodeRenderers = {}

  for (const key in nodeResolvers) {
    if (nodeResolvers.hasOwnProperty(key)) {
      const resolver = nodeResolvers[key]
      nodeRenderers[key] = (node, key, h, next) => {
        if (resolver.render) {
          return resolver.render(node, key, h, next, componentRenderers)
        }

        const tag = typeof resolver.tag === 'function' ? resolver.tag(node) : resolver.tag
        return h(tag, { key }, !helpers.isVoidElement(node) ? next(node.content, key, h, next) : null)
      }
    }
  }

  return nodeRenderers
}

const buildComponentRenderers = (componentResolvers: ComponentResolvers, h: CreateElement) => {
  const componentRenderers: ComponentRenderers = {}

  for (const key in componentResolvers) {
    if (componentResolvers.hasOwnProperty(key)) {
      const resolver = componentResolvers[key]
      componentRenderers[key] = (node: RichTextNode, key: string, h: CreateElement) => {
        let props = {}

        if (resolver.passProps) {
          const allowedProps = resolver.passProps
          props = Object.keys(node)
            .filter(key => allowedProps.includes(key))
            .reduce((obj: any, key: any) => {
              obj[key] = node[key]
              return obj
            }, {})
        }

        return h(resolver.component, { key, props }, 'Works')
      }
    }
  }

  return componentRenderers
}

const buildRenderer = (h: CreateElement, componentResolvers: ComponentResolvers | {}, nodeResolvers: NodeResolvers, markResolvers: MarkResolvers): RichTextRenderer => {
  const componentRenderers = buildComponentRenderers(componentResolvers, h)
  const nodeRenderers = buildNodeRenderers({ ...defaultNodeResolvers, ...nodeResolvers }, componentRenderers, h)
  const markRenderers = buildMarkRenderers({ ...defaultMarkResolvers, ...markResolvers }, h)

  return {
    node: {
      ...nodeRenderers
    },
    mark: {
      ...markRenderers
    },
    component: {
      ...componentRenderers
    },
    createElement: h
  }
}

export { buildRenderer, renderNodeList }
