<template>
  <div>
    <rich-text-renderer v-if="document" :document="document" />
  </div>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import { Marks } from './rich-text-types'
import StoryblokClient from 'storyblok-js-client'

export default Vue.extend({
  data () {
    return {
      document: undefined
    }
  },
  async mounted () {
    const Storyblok = new StoryblokClient({
      accessToken: 'bHMwF3yN4rn5WSXR06NZ1Qtt'
    })

    const { data } = await Storyblok.get('cdn/stories/rich-text')
    this.document = data.story.content.text
  }
})
</script>
