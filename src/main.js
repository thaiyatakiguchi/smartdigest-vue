import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import VueChartjs from 'vue-chartjs'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueChartjs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
