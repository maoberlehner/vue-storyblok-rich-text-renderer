import { CreateElement, VNode } from 'vue';
import { RichTextNode } from '../rich-text-types';
declare type MarkResolver = string;
declare type MarkResolverFunction = (node: RichTextNode, key: string, h: CreateElement, text: string) => VNode;
interface MarkResolvers {
    [key: string]: MarkResolver | MarkResolverFunction;
}
interface MarkRendererFunction {
    (node: RichTextNode, text: string, key: string, h: CreateElement): VNode;
}
declare type MarkRenderers = {
    [key: string]: MarkRendererFunction;
};
declare const defaultMarkResolvers: MarkResolvers;
declare const buildMarkRenderers: (markResolvers: MarkResolvers) => MarkRenderers;
declare const textRenderer: (node: RichTextNode, key: string, h: CreateElement, markRenderer: MarkRenderers) => any;
export { MarkResolver, MarkResolverFunction, MarkResolvers, MarkRendererFunction, MarkRenderers, defaultMarkResolvers, buildMarkRenderers, textRenderer };
