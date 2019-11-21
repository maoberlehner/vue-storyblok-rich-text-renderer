import { PluginObject } from 'vue'

export interface Options {
  [key: string]: any
}

interface Jo {
  lorem: string
}

const RichTextVueRenderer: PluginObject<Options> = {
  install (Vue, options?: Options) {
    const RichTextRenderer = Vue.extend({
      functional: true,
      props: {
        document: {
          type: Object as () => Jo
        }
      },
      render (h, ctx) {
        return h('h1', ctx.props.document.lorem)
      }
    })

    Vue.component('rich-text-resolver', RichTextRenderer)
  }
}

export default RichTextVueRenderer
