import { CreateElement, VNode } from 'vue'
import { Marks, Mark, RichTextNode } from '../rich-text-types'

interface MarkResolver {
  tag: string
}

interface MarkResolvers {
  [key: string]: MarkResolver
}

interface MarkRendererFunction {
  (text: string, key: string, h: CreateElement): VNode
}

type MarkRenderers = {
  [key: string]: MarkRendererFunction
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

const buildMarkRenderers = (markResolvers: MarkResolvers) => {
  const markRenderers: MarkRenderers = {}
  const mergedResolvers: MarkResolvers = { ...defaultMarkResolvers, ...markResolvers }

  for (const key in mergedResolvers) {
    if (mergedResolvers.hasOwnProperty(key)) {
      const resolver = mergedResolvers[key]
      markRenderers[key] = (text, key, h) => {
        return h(resolver.tag, { key }, text)
      }
    }
  }

  return markRenderers
}

const textRenderer = ({ text, marks }: RichTextNode, key: string, h: CreateElement, markRenderer: MarkRenderers) => {
  return marks && marks.length
    ? marks.reduce(
      (aggregate: string, mark: Mark, i: number) => markRenderer[mark.type](aggregate, `${key}-${i}`, h),
      text
    )
    : text
}

export {
  MarkResolver,
  MarkResolvers,
  MarkRendererFunction,
  MarkRenderers,
  defaultMarkResolvers,
  buildMarkRenderers,
  textRenderer
}
