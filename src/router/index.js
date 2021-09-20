import Vue from 'vue'
import VueRouter from 'vue-router'
import Currency from '@components/Currency.vue'
import Converter from '@components/Converter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Currency',
    component: Currency
  },
  {
    path: '/converter',
    name: 'Converter',
    component: Converter
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
