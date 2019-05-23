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

            <el-menu-item index="1">
              <i class="el-icon-camera"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">我的电影票</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">我的会员卡</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
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
        <!--<el-header class="app-header">-->
          <!--<div style="width: 60px; cursor: pointer;"-->
               <!--@click.prevent="toggleSideBar">-->
            <!--<i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>-->
            <!--<i v-show="isCollapse" class="el-icon-d-arrow-right"></i>-->

          <!--</div>-->
          <!--&lt;!&ndash; 我是样例菜单 &ndash;&gt;-->
          <!--<el-menu default-active="1"-->
                   <!--class="el-menu-demo tab-page"-->
                   <!--mode="horizontal"-->
                   <!--@select="handleSelect"-->
                   <!--active-text-color="#409EFF">-->

          <!--</el-menu>-->

          <!--<div class="app-header-userinfo">-->
            <!--<el-dropdown trigger="hover"-->
                         <!--:hide-on-click="false">-->
              <!--<span class="el-dropdown-link">-->
                <!--{{ username }}-->
                <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>我的消息</el-dropdown-item>-->
                <!--<el-dropdown-item>设置</el-dropdown-item>-->
                <!--<el-dropdown-item divided-->
                                  <!--@click.native="logout">退出登录</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->

            <!--</el-dropdown>-->
          <!--</div>-->
          <!--<div>-->

          <!--</div>-->
        <!--</el-header>-->

        <el-main class="app-body">

          <template>
              <el-carousel :interval="4000" type="card" height="200px">
                          <el-carousel-item v-for="item in imagesbox" :key="item.id">
                             <img :src="item.idView" class="image">
                          </el-carousel-item>
             </el-carousel>
          </template>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Container',
    data() {
      return {
        username: '',
        isCollapse: false,
        imagesbox:[
          {id:0,idView:require("@/assets/test1.jpg")},     
          {id:1,idView:require("@/assets/test2.jpg")},
          {id:2,idView:require("@/assets/test3.jpg")}
          ]
      }


      }
    ,
    methods: {
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
    },
    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-carousel__item {
    width: 100%;
    display: flex;

    .carousel-image {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>

