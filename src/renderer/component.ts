import { CreateElement, VNodeData } from 'vue'
import { RichTextNode } from '@/rich-text-types'

interface ComponentResolver {
  component: string
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
    padding: '10px'
  }

  return h('div', { key, style }, `No resolver for component "${node.component}" found!`)
}

const buildComponentRenderers = (componentResolvers: ComponentResolvers) => {
  const componentRenderers: ComponentRenderers = {}
  const mergedResolvers: ComponentResolvers = { ...defaultComponentResolver, ...componentResolvers }

  for (const key in mergedResolvers) {
    if (mergedResolvers.hasOwnProperty(key)) {
      const resolver = mergedResolvers[key]
      componentRenderers[key] = (node: RichTextNode, key: string, h: CreateElement) => {
        const data = resolver.data ? { key, ...resolver.data(node) } : { key }
        return h(resolver.component, data)
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
