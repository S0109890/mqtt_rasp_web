import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import mq from './mqtt_s/mq_s'

// bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // mq,
  render: h => h(App)
}).$mount('#app')
