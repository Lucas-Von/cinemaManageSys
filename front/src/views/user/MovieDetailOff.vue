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

          <div class="details">
            <img  height="470px" width="300px" :src="ids.posterUrl" style="float:left;margin-top: 10px" >
            <span>
              <el-col :span="3">
              <h1>{{ids.name}}</h1>
              </el-col>

            </span><br><br><br><br>
            <span >简介：{{ids.description}}</span><br><br>
            <span>上映：{{ids.startDate.substring(0,10)}}</span><br>
            <span>地区：{{ids.country}}</span><br>
            <span>类型：{{ids.type}}</span><br>
            <span>语言：{{ids.language}}</span><br>
            <span>导演：{{ids.director}}</span><br>
            <span>主演：{{ids.starring}}</span><br>
            <span>编剧：{{ids.screenWriter}}</span><br>

          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat,LikeMovie,easeMovie
  }from "../../api/userAPI"
  export default {
    name: "MovieOffDetails",
    data(){
      return{
        isCollapse:false,
        result:[],
        ids:'',
        like:'',
        name:''
      }},
    methods: {
      likeMivie(){
        LikeMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          console.log("fdsfdv")
          console.log(res)
          this.like=res.data.content.islike


        },(error) => console.log('promise catch err'));
      },
      MarkMovie(){
        markMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          console.log("fdsfdv")
          console.log(res)
          this.like=res.data.content.islike

        },(error) => console.log('promise catch err'));
      },
      EaseMovie(){
        easeMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          console.log("fdsfdv")
          console.log(res)
          this.like=res.data.content.islike

        },(error) => console.log('promise catch err'));
      },
      movieSh(){
        getMovieSchedule(this.ids.id).then((res)=>{
          console.log(this.ids.id)
          this.result=res.data.content;

          console.log(this.result.scheduleItemList)

        },(error) => console.log('promise catch err'));
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
      loadMovieList(){
        this.loading = true;
        // 请求参数
        let params = {
            count: 18
          },
          // 请求路径
          movieUrl = '/api/movie/' + this.movieType;
        // 如果是搜索进入，新增搜索关键字参数
        if (this.movieType == 'search') {
          params['q'] = this.$route.params.searchKey;
        }
        this.$http.post(movieUrl, params).then((res) => {
          console.log(res.data)
          // 这里不做多校验，可自己加，直接上数据
          this.list = res.data.subjects;
          this.title = res.data.title;
          this.loading = false;

        })
      }
    },
    create(){

    },
    mounted() {
      let ids=this.$route.query.id;
      console.log(this.$route.query.id)
      this.ids=ids
      this.movieSh(this.ids)
      this.likeMivie()
    }
  }

</script>

<style scoped>
  img{
    margin-right: 20px
  }



</style>

