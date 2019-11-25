import Vue from 'vue'
import RichTextRenderer from './plugin'
import App from './App.vue'
import { Blocks, Marks } from './rich-text-types'

Vue.config.productionTip = false
Vue.use(RichTextRenderer, {
  componentResolvers: {
    'button': {
      component: 'button',
      passProps: ['sub']
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
