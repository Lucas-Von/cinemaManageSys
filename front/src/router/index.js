import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import AdminContainer from '@/container/AdminContainer'
import AdminEmployeeManagement from '@/views/admin/AdminEmployeeManagement'
import AdminUserManagement from '@/views/admin/AdminUserManagement'
import AdminCinemaInfoManagement from '@/views/admin/AdminCinemaInfoManagement'
import RootContainer from '@/container/RootContainer'
import RootMovieManagement from '@/views/root/RootMovieManagement'
import RootVIPActivity from '@/views/root/RootVIPActivity'
import RootRefundStrategy from '@/views/root/RootRefundStrategy'
import RootHallManagement from '@/views/root/RootHallManagement'
import SalerContainer from '@/container/SalerContainer'
import UserContainer from '@/container/UserContainer'
import UserInfo from '@/views/user/UserInfo'
import UserMovieList from '@/views/user/UserMovieList'
import UserMyCard from '@/views/user/UserMyCard'
import UserMyMovie from '@/views/user/UserMyMovie'
import UserComing from '@/views/user/UserMovieListCominng'

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
    {path: '/', name: 'Login', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {path: '/admin', name: 'AdminContainer', component: AdminContainer},
    {path: '/admin/EmployeeManagement', name: 'AdminEmployeeManagement', component: AdminEmployeeManagement},
    {path: '/admin/UserManagement', name: 'AdminUserManagement', component: AdminUserManagement},
    {path: '/admin/CinemaInfoManagement', name: 'AdminCinemaInfoManagement', component: AdminCinemaInfoManagement},
    {path: '/root', name: 'RootContainer', component: RootContainer},
    {path: '/root/MovieManagement', name: 'RootMovieManagement', component: RootMovieManagement},
    {path: '/root/VIPActivity', name: 'RootVIPActivity', component: RootVIPActivity},
    {path: '/root/RefundStrategy', name: 'RootRefundStrategy', component: RootRefundStrategy},
    {path: '/root/HallManagement', name: 'RootHallManagement', component: RootHallManagement},
    {path: '/user',  name: 'UserContainer',  component: UserContainer,},
    {path: '/user/MovieList', name: '全部电影', component: UserMovieList, },
    {path: '/user/MyMovie', name: '我的电影票', component: UserMyMovie, },
    {path: '/user/MyCard', name: '我的会员卡', component: UserMyCard, },
    {path: '/user/Info', name: '我的信息', component: UserInfo, },

    {path: '/user/Coming', name: '即将上映', component: UserComing, },
    {
      path: '/Saler',
      name: 'SalerContainer',
      component: SalerContainer},
    {path: '/saler', name: 'SalerContainer', component: SalerContainer
    },

  ]
})
