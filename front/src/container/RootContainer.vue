<template xmlns:vertical-align="http://www.w3.org/1999/xhtml">
  <div class="app"  >

    <el-container  >
      <el-aside class="app-side-expanded">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               width="60"
               height="60"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="toMovieManagement">
              <i class="el-icon-camera"></i>
              <span slot="title">电影管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toVIPActivity">
              <i class="el-icon-menu"></i>
              <span slot="title">会员卡优惠</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toRefundStrategy">
              <i class="el-icon-document"></i>
              <span slot="title">退票策略</span>
            </el-menu-item>
            <el-menu-item index="4" @click="toHallManagement">
              <i class="el-icon-setting"></i>
              <span slot="title">影厅管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="logout">
              <i class="el-icon-setting"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>

        <el-main class="app-body">

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "RootContainer",
    data() {
      return {}
    },
    methods: {
      toMovieManagement(){
        this.$router.push({path: '/root/MovieManagement'});
      },
      toVIPActivity(){
        this.$router.push({path: '/root/VIPActivity'});
      },
      toRefundStrategy(){
        this.$router.push({path: '/root/RefundStrategy'});
      },
      toHallManagement(){
        this.$router.push({path: '/root/HallManagement'});
      },
      logout: function () {
        this.$confirm('确认退出?', '提示', {})
          .then(() => {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
          })
          .catch(() => { });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-carousel__item {
    width: 500px;
    display: flex;

    .carousel-image {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>

