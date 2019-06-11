import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import AdminContainer from '@/container/AdminContainer'
import AdminEmployeeManagement from '@/views/admin/AdminEmployeeManagement'
import AdminUserManagement from '@/views/admin/AdminUserManagement'
import AdminCinemaInfoManagement from '@/views/admin/AdminCinemaInfoManagement'
import RootContainer from '@/container/RootContainer'
import RootMovieManagement from '@/views/root/RootMovieManagement'
import RootVIPActivity from '@/views/root/RootVIPActivity'
import RootTicketActivity from '@/views/root/RootTicketActivity'
import RootRefundStrategy from '@/views/root/RootRefundStrategy'
import RootHallManagement from '@/views/root/RootHallManagement'
import SalerContainer from '@/container/SalerContainer'
import SalerActivityPulishment from '@/views/saler/SalerActivityPublishment'
import SalerMovie from '@/views/saler/SalerMovie'
import SalerMovieDetails from '@/views/saler/SalerMovieDetails'
import SalerStatistics from '@/views/saler/SalerStatistics'
import SalerScheduleManagement from '@/views/saler/SalerScheduleManagement'
import UserContainer from '@/container/UserContainer'
import UserInfo from '@/views/user/UserInfo'
import UserMovieList from '@/views/user/UserMovieList'
import UserMyCard from '@/views/user/UserMyCard'
import UserMyMovie from '@/views/user/UserMyMovie'
import UserMyMovieBuy from '@/views/user/UserMyMovieBuy'
import UserMyMovieOff from '@/views/user/UserMyMovieOff'
import UserComing from '@/views/user/UserMovieListCominng'
import MovieDetails from '@/views/user/MovieDetails'
import MovieOffDetails from '@/views/user/MovieDetailOff'
import SelectSeats from '@/views/user/SelectSeats'
import Moviecharge from '@/views/user/Moviecharge'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/admin', name: 'AdminContainer', component: AdminContainer},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: Register},
    {path: '/root', name: 'RootContainer', component: RootContainer},
    {path: '/user', name: 'UserContainer', component: UserContainer,},
    {path: '/', name: 'Login', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {path: '/admin', name: 'AdminContainer', component: AdminContainer},
    {path: '/admin/EmployeeManagement', name: 'AdminEmployeeManagement', component: AdminEmployeeManagement},
    {path: '/admin/UserManagement', name: 'AdminUserManagement', component: AdminUserManagement},
    {path: '/admin/CinemaInfoManagement', name: 'AdminCinemaInfoManagement', component: AdminCinemaInfoManagement},
    {path: '/root', name: 'RootContainer', component: RootContainer},
    {path: '/root/MovieManagement', name: 'RootMovieManagement', component: RootMovieManagement},
    {path: '/root/VIPActivity', name: 'RootVIPActivity', component: RootVIPActivity},
    {path: '/root/TicketActivity', name: 'RootTicketActivity', component: RootTicketActivity},
    {path: '/root/RefundStrategy', name: 'RootRefundStrategy', component: RootRefundStrategy},
    {path: '/root/HallManagement', name: 'RootHallManagement', component: RootHallManagement},
    {path: '/user',  name: 'UserContainer',  component: UserContainer,},
    {path: '/user/MovieList', name: '全部电影', component: UserMovieList, },
    {path: '/user/MyMovie', name: '我的电影票', component: UserMyMovie, },
    {path: '/user/MyMovieBuy', name: '我的锁座电影票', component: UserMyMovieBuy, },
    {path: '/user/MyMovieOff', name: '我的已退票电影票', component: UserMyMovieOff, },
    {path: '/user/MyCard', name: '我的会员卡', component: UserMyCard, },
    {path: '/user/Info', name: '我的信息', component: UserInfo, },
    {path: '/user/Coming', name: '即将上映', component: UserComing, },
    {path: '/saler', name: 'SalerContainer', component: SalerContainer},
    {path: '/saler/ActivityPublishment', name: 'SalerActivityPublishment', component: SalerActivityPulishment},
    {path: '/saler/Movie', name: 'SalerMovie', component: SalerMovie},
    {path: '/saler/MovieDetails/:id', name: 'SalerMovieDetails', component: SalerMovieDetails},
    {path: '/saler/Statistics', name: 'SalerStatistics', component: SalerStatistics},
    {path: '/saler/ScheduleManagement', name: 'SalerScheduleManagement', component: SalerScheduleManagement},
    {path: '/user/MovieDetails/:id', name: 'MovieDetails', component: MovieDetails,},
    {path: '/user/MovieDetailOff/:id', name: 'MovieOffDetails', component: MovieOffDetails,},
    {path: '/user/SelectSeats/:id', name: 'SelectSeats', component: SelectSeats,},
    {path: '/user/Moviecharge/:id', name: 'Moviecharge', component: Moviecharge,},
  ]
})
