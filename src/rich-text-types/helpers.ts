import { RichTextNode, Blocks } from '@/rich-text-types'

export function isText (node: RichTextNode) {
  return node.type === 'text'
}

export function isVoidElement (node: RichTextNode) {
  const voidElements: Blocks[] = [Blocks.HR, Blocks.BR, Blocks.IMAGE]
  return voidElements.includes(node.type)
}

export function isComponent (node: RichTextNode) {
  return node.type === Blocks.COMPONENT
}
