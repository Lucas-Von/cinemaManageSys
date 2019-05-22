import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import AdminContainer from '@/container/AdminContainer'
import RootContainer from '@/container/RootContainer'
import SalerContainer from '@/container/SalerContainer'
import UserContainer from '@/container/UserContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'AdminContainer',
      component: AdminContainer
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/root',
      name: 'RootContainer',
      component: RootContainer
    },
    {
      path: '/user',
      name: 'UserContainer',
      component: UserContainer
    },
    {
      path: '/Saler',
      name: 'SalerContainer',
      component: SalerContainer
    },
  ]
})
