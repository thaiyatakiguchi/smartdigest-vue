import Vue from 'vue'
import Router from 'vue-router'
import FrequencyAnalysis from '@/components/FrequencyAnalysis'
import IndexConfig from '@/components/configuration/IndexConfig'
import CreateConfig from '@/components/configuration/CreateConfig'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrequencyAnalysis',
      component: FrequencyAnalysis
    },
    {
      path: '/config',
      name: 'IndexConfig',
      component: IndexConfig
    },
    {
      path: '/createconfig',
      name: 'CreateConfig',
      component: CreateConfig
    }
  ]
})
