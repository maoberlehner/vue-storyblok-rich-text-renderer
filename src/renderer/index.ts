import { CreateElement } from 'vue'
import { NodeRenderers, NodeResolvers, buildNodeRenderers } from '@/renderer/node'
import { MarkRenderers, MarkResolvers, buildMarkRenderers, textRenderer } from '@/renderer/mark'
import { ComponentRenderers, ComponentResolvers, buildComponentRenderers } from '@/renderer/component'
import { RichTextNode, helpers } from '@/rich-text-types'

export interface RichTextRenderer {
  node: NodeRenderers,
  mark: MarkRenderers,
  component: ComponentRenderers,
  createElement: CreateElement
}

const buildRenderer = (
  h: CreateElement,
  componentResolvers: ComponentResolvers | {},
  nodeResolvers: NodeResolvers,
  markResolvers: MarkResolvers
): RichTextRenderer => {
  const componentRenderers = buildComponentRenderers(componentResolvers)
  const nodeRenderers = buildNodeRenderers(nodeResolvers, componentRenderers)
  const markRenderers = buildMarkRenderers(markResolvers)

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

export { buildRenderer, renderNodeList }
