import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import AdminContainer from '@/container/AdminContainer'
import RootContainer from '@/container/RootContainer'
import SalerContainer from '@/container/SalerContainer'
import UserContainer from '@/container/UserContainer'
import UserIno from '@/views/user/UserInfo'
import UserMovieList from '@/views/user/UserMovieList'
import UserMyCard from '@/views/user/UserMyCard'
import UserMyMovie from '@/views/user/UserMyMovie'

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
      component: UserContainer,
    },
    {path: '/user/MovieList', name: '全部电影', component: UserMovieList, },
    {path: '/user/MyMovie', name: '我的电影票', component: UserMyMovie, },
    {path: '/user/MyCard', name: '我的会员卡', component: UserMyCard, },
    {path: '/user/Ino', name: '我的信息', component: UserIno, },

    {
      path: '/Saler',
      name: 'SalerContainer',
      component: SalerContainer
    },

  ]
})
