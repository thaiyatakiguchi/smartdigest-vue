import Vue from 'vue'
import Router from 'vue-router'
import FrequencyAnalysis from '@/components/FrequencyAnalysis'
import ChartJs from '@/components/Chartjs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrequencyAnalysis',
      component: FrequencyAnalysis
    },
    {
      path: '/chart',
      name: 'ChartJs',
      component: ChartJs
    }
  ]
})
