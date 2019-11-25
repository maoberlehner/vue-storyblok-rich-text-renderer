<template>
  <div>
    <h3>Test: Value passed: {{ test }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    test: {
      type: String
    }
  }
})
</script>
