import { PluginObject } from 'vue'
import { buildRenderer, renderNodeList, NodeRenderers, MarkRenderers } from './renderers'
import { RichTextDocument } from '../rich-text-types'

export interface Options {
  [key: string]: any
}

const RichTextVueRenderer: PluginObject<Options> = {
  install (Vue, options?: Options) {
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
        const renderer = buildRenderer(ctx.props.nodeRenderers, ctx.props.markRenderers, h)

        return renderNodeList(ctx.props.document.content, 'RichText', renderer)
      }
    })

    Vue.component('rich-text-resolver', RichTextRenderer)
  }
}

export default RichTextVueRenderer
