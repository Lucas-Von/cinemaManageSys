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

          <el-col span="12">
          <el-card class="box-card" >
            <img  height="320px" width="cover" src="@/assets/VIP.jpg">

          </el-card>
          </el-col>
          <el-col span="12">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <span>{{id}}</span>
            </div>
            <div :class="vip ? 'pay' : 'repay'">
              <span>{{!vip ? '您还不是会员！' : '你已是会员！'}}<br></span>
              <span>{{profit}}<br></span>
              <span>{{!vip ? '余额：0' : '余额：'+mon}}<br></span>
              <span>{{!vip ? '您还不是会员！' : '你已是会员！'}}<br></span>
              <el-button  @click.native.prevent="deleteRow(vip)" size="small">{{!vip ? '购买会员卡 25/张' : '充值会员卡'}} </el-button>
            </div>
          </el-card>
          </el-col>

          <div>
          <h2>消费记录</h2>
          <template>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="360"
              sortable>
              </el-table-column>
              <el-table-column
                prop="cate"
                label="类型"
                width="360">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额">
              </el-table-column>
            </el-table>
          </template>
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
      return {
        username: '',
        isCollapse: false,
        id:'印仁仪',
        vip:false,
        profit:'充值优惠：满200送30',
        mon:200,
        tableData: [{
          date: '2016-05-02',
          cate:'消费',
          money:'66',
        },
          {
            date: '2016-05-02',
            cate:'充值',
            money:'100',
          }]
      }


    }
    ,


    methods: {
      deleteRow(vip) {
        this.$confirm('此操作将在影厅出票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
              type: 'success',
              message: '出票成功!',

            },
            vip=true
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消出票'
          });
        });
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
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      margin-left: 30px;
      width: 470px;
      height: 360px;
    }

</style>


