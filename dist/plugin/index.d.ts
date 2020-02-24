import { PluginObject } from 'vue';
import { NodeResolvers } from '../renderer/node';
import { ComponentResolvers } from '../renderer/component';
import { MarkResolvers } from '../renderer/mark';
export interface Options {
    nodeResolvers?: NodeResolvers;
    componentResolvers?: ComponentResolvers;
    markResolvers?: MarkResolvers;
}
declare const RichTextVueRenderer: PluginObject<Options>;
export * from '../rich-text-types';
export default RichTextVueRenderer;
