import { Blocks, Marks, helpers, Node, Mark } from '../rich-text-types'
import { CreateElement, VNode } from 'vue'

export interface NodeRendererFunction {
  (node: Node, key: string, h: CreateElement, next: Function, componentRenderers: ComponentRenderers): VNode | VNode[]
}

export interface MarkRendererFunction {
  (text: string, key: string, h: CreateElement): VNode
}

export interface ComponentResolver {
  component: string
  passProps?: string[]
}

export type ComponentResolvers = {
  [key: string]: ComponentResolver
}

export type NodeRenderers = {
  [key in Blocks]: NodeRendererFunction
}

export type MarkRenderers = {
  [key in Marks]: MarkRendererFunction
}

export type ComponentRenderers = {
  [key: string]: Function
}

export interface RichTextRenderer {
  node: NodeRenderers,
  mark: MarkRenderers,
  component: ComponentRenderers,
  createElement: CreateElement
}

const defaultComponentResolver = (node: Node, key: string, h: CreateElement) => h('div', { key }, `No resolver for component "${node.component}" found!`)

const defaultMarkRenderers: MarkRenderers = {
  [Marks.BOLD]: (text, key, h) => h('strong', { key }, text),
  [Marks.STRONG]: (text, key, h) => h('strong', { key }, text),
  [Marks.STRIKE]: (text, key, h) => h('s', { key }, text),
  [Marks.UNDERLINE]: (text, key, h) => h('u', { key }, text),
  [Marks.ITALIC]: (text, key, h) => h('i', { key }, text),
  [Marks.CODE]: (text, key, h) => h('code', { key }, text)
}

const defaultNodeRenderers: NodeRenderers = {
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

    node.attrs.body.forEach((item: Node, i: number) => {
      const scopedKey = `${key}-${i}`
      const resolvedComponent = componentRenderers[item.component]
      resolvers.push(resolvedComponent ? resolvedComponent(item, scopedKey, h) : defaultComponentResolver(item, scopedKey, h))
    })

    return resolvers
  }
}

const textRenderer = ({ text, marks }: Node, key: string, h: CreateElement, markRenderer: MarkRenderers) => {
  return marks && marks.length
    ? marks.reduce(
      (aggregate: string, mark: Mark, i: number) => markRenderer[mark.type](aggregate, `${key}-${i}`, h),
      text
    )
    : text
}

const renderNodeList = (nodes: Node[], key: string, renderer: RichTextRenderer) => {
  return nodes.map((node, i) => renderNode(node, `${key}-${i}`, renderer))
}

const renderNode = (node: Node, key: string, renderer: RichTextRenderer) => {
  const nodeRenderer = renderer.node
  const createElement = renderer.createElement

  if (helpers.isText(node)) {
    const markRenderer = renderer.mark
    return textRenderer(node, key, createElement, markRenderer)
  } else {
    const nextNode = (nodes: Node[]) => renderNodeList(nodes, key, renderer)
    const blockRenderer = nodeRenderer[node.type]
    const componentRenderers = renderer.component

    if (!blockRenderer) {
      return nodeRenderer['paragraph'](node, key, createElement, nextNode, componentRenderers)
    }

    return blockRenderer(node, key, createElement, nextNode, componentRenderers)
  }
}

const buildComponentRenderers = (componentResolvers: ComponentResolvers, h: CreateElement) => {
  const componentRenderers: ComponentRenderers = {}

  for (const key in componentResolvers) {
    if (componentResolvers.hasOwnProperty(key)) {
      const resolver = componentResolvers[key]
      componentRenderers[key] = (node: Node, key: string, h: CreateElement) => {
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

const buildRenderer = (componentResolvers: ComponentResolvers | {}, h: CreateElement): RichTextRenderer => {
  const componentRenderers = buildComponentRenderers(componentResolvers, h)

  return {
    node: {
      ...defaultNodeRenderers
    },
    mark: {
      ...defaultMarkRenderers
    },
    component: {
      ...componentRenderers
    },
    createElement: h
  }
}

export { buildRenderer, renderNodeList }
