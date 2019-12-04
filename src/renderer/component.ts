import { CreateElement, VNodeData, VNodeChildren } from 'vue'
import { RichTextNode } from '../rich-text-types'

interface ComponentResolver {
  component: string
  children?: (node: RichTextNode, key: string, h: CreateElement) => VNodeChildren
  data?: (node: RichTextNode) => VNodeData
}

type ComponentResolvers = {
  [key: string]: ComponentResolver
}

type ComponentRenderers = {
  [key: string]: Function
}

const defaultComponentResolver = (node: RichTextNode, key: string, h: CreateElement) => {
  const style = {
    color: 'red',
    border: '1px dashed red',
    padding: '10px',
    marginBottom: '10px'
  }

  return h('div', { key, style }, `No resolver for component "${node.component}" found!`)
}

const buildComponentRenderers = (componentResolvers: ComponentResolvers) => {
  const componentRenderers: ComponentRenderers = {}

  for (const key in componentResolvers) {
    if (componentResolvers.hasOwnProperty(key)) {
      const resolver = componentResolvers[key]
      componentRenderers[key] = (node: RichTextNode, key: string, h: CreateElement) => {
        const data = resolver.data ? { key, ...resolver.data(node) } : { key }
        return h(resolver.component, data, resolver.children ? resolver.children(node, key, h) : null)
      }
    }
  }

  return componentRenderers
}

export {
  ComponentResolver,
  ComponentResolvers,
  ComponentRenderers,
  defaultComponentResolver,
  buildComponentRenderers
}
