import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import Container from '@/container/Container'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
