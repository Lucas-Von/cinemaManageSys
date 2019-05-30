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
            <el-menu-item index="5" @click="logout">
              <i class="el-icon-setting" ></i>
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

          <template>
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                >
                  <el-col :span="11" >
                    <el-menu-item index="1" @click="intheather">正在上映</el-menu-item>
                  </el-col>
                  <el-col :span="11">
                    <el-menu-item index="2" @click="coming">即将上映</el-menu-item>
                  </el-col>
                </el-menu>

              </div>
            </nav>
          </template>

          <div class="container">
            <div class="canvas" v-show="loading">
              <div class="spinner"></div>
            </div>
            <div class="row">

              <div class="col-md-2 text-center" v-for="item in list" :key="item.id">

                <router-link :to="{path:'/detail/'+item.id}">
                  <el-col :span="8" >

                    <el-card class="box-moviecard">
                      <br>
                      <img  class="movie" height="320px" width="250px" :src="item.images">
                      <br>

                      <div style="padding: 14px;">
                        <div class="bottom clearfix">
                          <h3 class="text">{{item.id}}</h3>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </router-link>

              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Container',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        loading: true,
        title: '',
        list: [
          {id:'皮卡丘',title:'fds',images:require("@/assets/test1.jpg")},
          {id:'皮卡丘',title:'fds',images:require("@/assets/test2.jpg")},
          {id:'皮卡丘',title:'fds',images:require("@/assets/test3.jpg")},


        ],
        username: '',
        isCollapse: false,
        imagesbox:[
          {id:0,idView:require("@/assets/test1.jpg")},
          {id:1,idView:require("@/assets/test2.jpg")},
          {id:2,idView:require("@/assets/test3.jpg")},
          {id:3,idView:require("@/assets/test4.jpg")},
          {id:4,idView:require("@/assets/test5.jpg")},
          {id:5,idView:require("@/assets/test6.jpg")},
        ],
        tableData: [{
          picture:require("@/assets/test1.jpg"),
          date: '2016-05-02',
          name: '王小虎',
          state:'已完成',
          film: '建国大业',
          room:'一号厅',
          open:'2019-8-10 12:12',
          seat:'三排5座 三排4座',
          money:'66',
          num:2,
        },
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-02',
            name: '王小虎',
            state:'已完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          }]
      }
    }
    ,

    methods: {
      submit(){
        if (!this.searchKey) {
          alert('请输入搜索内容');
          return;
        }
        // 搜索页面跳转
        this.$router.push({
          path: '/search/' + this.searchKey,
        })
        this.searchKey = "";
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
      intheather(event){
        this.$router.push({path: '/user/MovieList'});
      },
      coming(event){
        this.$router.push({path: '/user/Coming'});
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

    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }
    },
  }

</script>

<style>


  .row > div {
    margin-bottom: 20px;
  }


  .box-moviecard {
    margin-left: 30px;
    width: 325px;
    height: 450px;
  }
  .movie{
    margin-left: 20px;
  }
  .text{
    margin-left: 75px;
  }
</style>
