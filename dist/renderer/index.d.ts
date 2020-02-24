import { CreateElement } from 'vue';
import { NodeRenderers, NodeResolvers } from './node';
import { MarkRenderers, MarkResolvers } from './mark';
import { ComponentRenderers, ComponentResolvers } from './component';
import { RichTextNode } from '../rich-text-types';
interface RichTextRenderer {
    node: NodeRenderers;
    mark: MarkRenderers;
    component: ComponentRenderers;
    createElement: CreateElement;
}
declare const buildRenderer: (h: CreateElement, componentResolvers: {} | ComponentResolvers, nodeResolvers: NodeResolvers, markResolvers: MarkResolvers) => RichTextRenderer;
declare const renderNodeList: (nodes: RichTextNode[], key: string, renderer: RichTextRenderer) => any[];
export { RichTextRenderer, buildRenderer, renderNodeList };
