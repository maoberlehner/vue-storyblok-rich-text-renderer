import Vue from 'vue'
import RichTextRenderer from './plugin'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(RichTextRenderer)

new Vue({
  render: h => h(App)
}).$mount('#app')
