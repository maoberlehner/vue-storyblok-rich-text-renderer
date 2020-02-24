import Blocks from './blocks';
import Marks from './marks';
import * as helpers from './helpers';
export interface RichTextDocument {
    content: RichTextNode[];
}
export interface RichTextNode {
    type: Blocks;
    [key: string]: any;
}
export interface Mark {
    type: Marks;
    [key: string]: any;
}
export { Blocks, Marks, helpers };
