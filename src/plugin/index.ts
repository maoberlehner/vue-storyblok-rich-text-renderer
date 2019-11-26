import { PluginObject } from 'vue'
import { buildRenderer, renderNodeList } from '../renderer'
import { NodeResolvers } from '../renderer/node'
import { ComponentResolvers } from '../renderer/component'
import { MarkResolvers } from '../renderer/mark'
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
