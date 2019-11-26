import Blocks from '@/rich-text-types/blocks'
import Inlines from '@/rich-text-types/inlines'
import Marks from '@/rich-text-types/marks'
import * as helpers from '@/rich-text-types/helpers'

export interface RichTextDocument {
  content: RichTextNode[]
}

export interface RichTextNode {
  type: Blocks,
  [key: string]: any
}

export interface Mark {
  type: Marks,
  [key: string]: any
}

export { Blocks, Inlines, Marks, helpers }
