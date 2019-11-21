<template>
  <rich-text-resolver :document="document" />
</template>

<script lang="ts">
import Vue from 'vue'

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
      }
    }
  }
})
</script>
