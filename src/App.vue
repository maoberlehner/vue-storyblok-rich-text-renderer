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
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Test: () => import('./Test.vue')
  },
  data () {
    return {
      document: undefined
    }
  },
  async mounted () {
    const Storyblok = new StoryblokClient({
      accessToken: ''
    })

    const { data } = await Storyblok.get('cdn/stories/rich-text')
    console.log(data.story.content.text.content)
    this.document = data.story.content.text
  }
})
</script>
