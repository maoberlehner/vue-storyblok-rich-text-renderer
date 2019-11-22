<template>
  <div>
    <rich-text-resolver :document="document" :markRenderers="renderMarks" />
  </div>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import { Marks } from './rich-text-types'

export default Vue.extend({
  data () {
    return {
      document: {
        content: [
          {
            type: 'heading',
            attrs: {
              level: 1
            },
            content: [
              {
                text: 'Headline 1',
                type: 'text'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                text: 'Just an ',
                type: 'text'
              },
              {
                text: 'awesome',
                type: 'text',
                marks: [
                  {
                    type: 'bold'
                  }
                ]
              },
              {
                text: ' paragraph!',
                type: 'text'
              }
            ]
          }
        ],
        type: 'doc'
      },
      renderMarks: {
        [Marks.BOLD]: (text: string, key: string, h: CreateElement) => h('custom-bold', { key }, text)
      }
    }
  }
})
</script>
