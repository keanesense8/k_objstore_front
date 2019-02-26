import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/vue-resource'

require('vue2-animate/dist/vue2-animate.min.css')


Vue.config.productionTip = false

// Vue.use(Tween , '$tween')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
