import { Blocks, Marks, helpers, Node, Mark } from '../rich-text-types'
import { CreateElement, VNode } from 'vue'

export interface NodeRendererFunction {
  (node: Node, key: string, h: CreateElement, next: Function): VNode
}

export interface MarkRendererFunction {
  (text: string, key: string, h: CreateElement): VNode
}

export interface NodeRenderers {
  [key: string]: NodeRendererFunction
}

export interface MarkRenderers {
  [key: string]: MarkRendererFunction
}

export interface RenderNodeParams {
  node: any
}

export interface RichTextRenderer {
  node: NodeRenderers,
  mark: MarkRenderers,
  createElement: CreateElement
}

const defaultMarkRenderers: MarkRenderers = {
  [Marks.BOLD]: (text, key, h) => h('strong', { key }, text),
  [Marks.STRONG]: (text, key, h) => h('strong', { key }, text),
  [Marks.ITALIC]: (text, key, h) => h('i', { key }, text),
  [Marks.UNDERLINE]: (text, key, h) => h('u', { key }, text)
}

const defaultNodeRenderers: NodeRenderers = {
  [Blocks.HEADING]: (node, key, h, next) => {
    const tag = node.attrs.level ? `h${node.attrs.level}` : 'h2'
    return h(tag, { key }, next(node.content, key, h, next))
  },
  [Blocks.PARAGRAPH]: (node, key, h, next) => {
    return h('p', { key }, next(node.content, key, h, next))
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
    return nodeRenderer[node.type](node, key, createElement, nextNode)
  }
}

const buildRenderer = (nodeRenderers: NodeRenderers, markRenderers: MarkRenderers, h: CreateElement): RichTextRenderer => {
  return {
    node: {
      ...defaultNodeRenderers,
      ...nodeRenderers
    },
    mark: {
      ...defaultMarkRenderers,
      ...markRenderers
    },
    createElement: h
  }
}

export { buildRenderer, renderNodeList }
