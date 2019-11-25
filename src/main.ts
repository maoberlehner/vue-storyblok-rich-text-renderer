import Vue from 'vue'
import RichTextRenderer from './plugin'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(RichTextRenderer, {
  componentResolvers: {
    'button': {
      component: 'test',
      data: (node) => {
        return {
          props: {
            test: 'Awesome prop'
          }
        }
      }
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
