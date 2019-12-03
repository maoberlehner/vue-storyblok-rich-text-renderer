import { CreateElement, VNode } from 'vue'
import { Marks, Mark, RichTextNode } from '../rich-text-types'

type MarkResolver = string
type MarkResolverFunction = (node: RichTextNode, key: string, h: CreateElement, text: string) => VNode

interface MarkResolvers {
  [key: string]: MarkResolver | MarkResolverFunction
}

interface MarkRendererFunction {
  (node: RichTextNode, text: string, key: string, h: CreateElement): VNode
}

type MarkRenderers = {
  [key: string]: MarkRendererFunction
}

const defaultMarkResolvers: MarkResolvers = {
  [Marks.BOLD]: 'strong',
  [Marks.STRONG]: 'strong',
  [Marks.STRIKE]: 's',
  [Marks.UNDERLINE]: 'u',
  [Marks.ITALIC]: 'i',
  [Marks.CODE]: 'code'
}

const buildMarkRenderers = (markResolvers: MarkResolvers) => {
  const markRenderers: MarkRenderers = {}
  const mergedResolvers: MarkResolvers = { ...defaultMarkResolvers, ...markResolvers }

  for (const key in mergedResolvers) {
    if (mergedResolvers.hasOwnProperty(key)) {
      const resolver = mergedResolvers[key]
      markRenderers[key] = (node, text, key, h) => {
        if (typeof resolver === 'function') {
          return resolver(node, key, h, text)
        }

        return h(resolver, { key }, text)
      }
    }
  }

  return markRenderers
}

const textRenderer = (node: RichTextNode, key: string, h: CreateElement, markRenderer: MarkRenderers) => {
  const { text, marks } = node

  return marks && marks.length
    ? marks.reduce(
      (aggregate: string, mark: Mark, i: number) => markRenderer[mark.type](node, aggregate, `${key}-${i}`, h),
      text
    )
    : text
}

export {
  MarkResolver,
  MarkResolverFunction,
  MarkResolvers,
  MarkRendererFunction,
  MarkRenderers,
  defaultMarkResolvers,
  buildMarkRenderers,
  textRenderer
}
