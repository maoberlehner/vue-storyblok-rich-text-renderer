import * as helpers from './helpers'

export interface RichTextDocument {
  content: Node[]
}

export interface Node {
  [key: string]: any
}

export interface Mark {
  [key: string]: any
}

export { default as Blocks } from './blocks'
export { default as Inlines } from './inlines'
export { default as Marks } from './marks'
export { helpers }
