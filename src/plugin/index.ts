import { PluginObject } from 'vue'
import { NodeResolvers, ComponentResolvers, MarkResolvers, buildRenderer, renderNodeList, NodeRenderers, MarkRenderers } from './renderer'
import { RichTextDocument } from '../rich-text-types'

export interface Options {
  nodeResolvers?: NodeResolvers
  componentResolvers?: ComponentResolvers
  markResolvers?: MarkResolvers
}

const RichTextVueRenderer: PluginObject<Options> = {
  install (Vue, options: Options = {}) {
    const RichTextRenderer = Vue.extend({
      functional: true,
      props: {
        document: {
          type: Object as () => RichTextDocument,
          required: true
        },
        nodeRenderers: {
          type: Object as () => NodeRenderers
        },
        markRenderers: {
          type: Object as () => MarkRenderers
        }
      },
      render (h, ctx) {
        const renderer = buildRenderer(h, { ...options.componentResolvers }, { ...options.nodeResolvers }, { ...options.markResolvers })
        return renderNodeList(ctx.props.document.content, 'RichText', renderer)
      }
    })

    Vue.component('rich-text-renderer', RichTextRenderer)
  }
}

export default RichTextVueRenderer
