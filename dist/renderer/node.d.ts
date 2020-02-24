import { CreateElement, VNode } from 'vue';
import { RichTextNode } from '../rich-text-types';
import { ComponentRenderers } from './component';
declare type NodeRenderers = {
    [key: string]: NodeRenderer;
};
declare type NodeResolver = string;
declare type NodeResolverFunction = (node: RichTextNode, key: string, h: CreateElement, next: Function, componentRenderers: ComponentRenderers) => VNode | VNode[];
interface NodeResolvers {
    [key: string]: NodeResolver | NodeResolverFunction;
}
interface NodeRenderer {
    (node: RichTextNode, key: string, h: CreateElement, next: Function): VNode | VNode[];
}
declare const defaultNodeResolvers: NodeResolvers;
declare const buildNodeRenderers: (nodeResolvers: NodeResolvers, componentRenderers: ComponentRenderers) => NodeRenderers;
export { NodeRenderers, NodeResolver, NodeResolverFunction, NodeResolvers, NodeRenderer, defaultNodeResolvers, buildNodeRenderers };
