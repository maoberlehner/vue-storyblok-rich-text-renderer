import { PluginObject } from 'vue'
import { buildRenderer, renderNodeList, NodeRenderers, MarkRenderers, ComponentResolvers } from './renderer'
import { RichTextDocument } from '../rich-text-types'

export interface Options {
  resolveComponents?: ComponentResolvers
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
        const renderer = buildRenderer({ ...options.resolveComponents }, h)
        return renderNodeList(ctx.props.document.content, 'RichText', renderer)
      }
    })

    Vue.component('rich-text-renderer', RichTextRenderer)
  }
}

export default RichTextVueRenderer
