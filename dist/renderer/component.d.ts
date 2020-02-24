import { CreateElement, VNodeData, VNodeChildren } from 'vue';
import { RichTextNode } from '../rich-text-types';
interface ComponentResolver {
    component: string;
    children?: (node: RichTextNode, key: string, h: CreateElement) => VNodeChildren;
    data?: (node: RichTextNode) => VNodeData;
}
declare type ComponentResolvers = {
    [key: string]: ComponentResolver;
};
declare type ComponentRenderers = {
    [key: string]: Function;
};
declare const defaultComponentResolver: (node: RichTextNode, key: string, h: CreateElement) => import("vue").VNode;
declare const buildComponentRenderers: (componentResolvers: ComponentResolvers) => ComponentRenderers;
export { ComponentResolver, ComponentResolvers, ComponentRenderers, defaultComponentResolver, buildComponentRenderers };
