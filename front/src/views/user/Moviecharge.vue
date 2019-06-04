<template xmlns:vertical-align="http://www.w3.org/1999/xhtml">
  <div class="app"  >

    <el-container  >
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               :width="isCollapse ? '60' : '60'"
               :height="isCollapse ? '60' : '60'"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <!-- 我是样例菜单 -->


          <el-menu default-active="1-5-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">

            <el-menu-item index="1" @click="getMovie">
              <i class="el-icon-camera"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getmymovie">
              <i class="el-icon-menu"></i>
              <span slot="title">我的电影票</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getmycard">
              <i class="el-icon-document"></i>
              <span slot="title">我的会员卡</span>
            </el-menu-item>
            <el-menu-item index="4" @click="getinfo">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting" @click="logout"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div style="width: 60px; cursor: pointer;"
             @click.prevent="toggleSideBar">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>

        </div>
        <!-- 我是样例菜单 -->
        <el-menu default-active="1"
                 class="el-menu-demo tab-page"
                 mode="horizontal"
                 @select="handleSelect"
                 active-text-color="#409EFF">

        </el-menu>
      </el-aside>



      <el-container>

        <el-main class="app-body">
          <el-steps :active="3" finish-status="success" simple>
            <el-step title="电影详情" ></el-step>
            <el-step title="选座" ></el-step>
            <el-step title="支付" ></el-step>
          </el-steps>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat
  }from "../../api/userAPI"
    export default {
        name: "Moviecharge",
      data(){
        return{
          isCollapse:false,
          ids:[],
        }
      },
      methods: {


        movieSh() {
          for (let k in this.ids){
            getMovieSchedule(this.ids[k].scheduleId).then((res) => {

              console.log(res.data.content)

            }, (error) => console.log('promise catch err'));
          }

        },

        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },
        logout: function () {
          this.$confirm('确认退出?', '提示', {})
            .then(() => {
              sessionStorage.removeItem('user');
              this.$router.push('/login');
            })
            .catch(() => { });
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        getMovie(event){
          this.$router.push({path: '/user/MovieList'});
        },
        getmymovie(event){
          this.$router.push({path: '/user/MyMovie'});
        },
        getmycard(event){
          this.$router.push({path: '/user/MyCard'});
        },
        getinfo(event){
          this.$router.push({path: '/user/Info'});
        },
        coming(event){
          this.$router.push({path: '/user/Coming'});
        },
        intheather(event){
          this.$router.push({path: '/user/MovieList'});
        },

      },
      create(){

      },
      mounted() {
        let ids=this.$route.query.id;
        this.ids=ids
        console.log(ids)
        this.movieSh()
      }
    }

</script>

<style scoped>


</style>

