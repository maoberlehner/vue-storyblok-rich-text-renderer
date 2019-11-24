import Blocks from './blocks'
import Inlines from './inlines'
import Marks from './marks'
import * as helpers from './helpers'

export interface RichTextDocument {
  content: Node[]
}

export interface Node {
  type: Blocks,
  [key: string]: any
}

export interface Mark {
  type: Marks,
  [key: string]: any
}

export { Blocks, Inlines, Marks, helpers }
