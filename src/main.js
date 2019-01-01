import Vue from 'vue'
import App from './App.vue'
import YmapPlugin from 'vue-yandex-maps'

Vue.use(YmapPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
