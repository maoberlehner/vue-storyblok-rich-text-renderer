import Vue from 'vue'
import RichTextRenderer from './plugin'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(RichTextRenderer, {
  componentResolvers: {
    'button': {
      component: 'test',
      children: (node, key, h) => {
        return [
          h('h1', { key: `${key}-0` }, 'children 1'),
          h('h2', { key: `${key}-1` }, 'children 2')
        ]
      },
      data: (node) => {
        return {
          props: {
            test: node.title
          }
        }
      }
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
