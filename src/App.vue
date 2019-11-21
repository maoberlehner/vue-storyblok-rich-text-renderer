<template>
  <rich-text-resolver :document="test" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      test: {
        lorem: 'ipsum'
      }
    }
  }
})
</script>
