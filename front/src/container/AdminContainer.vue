<template xmlns:vertical-align="http://www.w3.org/1999/xhtml">
  <div class="app" >
    <el-container >
      <el-aside class="app-side-expanded">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               :width="60"
               :height="60"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <el-menu class="el-menu-vertical-demo">

            <el-menu-item index="1" @click="toEmployeeManagement">
              <i class="el-icon-camera"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toUserManagement">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toCinemaInfoManagement">
              <i class="el-icon-document"></i>
              <span slot="title">影院信息管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="logout">
              <i class="el-icon-setting"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>

        <el-main class="app-body">
          <template>

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
        isCollapse: false
      }
    },
    methods: {
      toEmployeeManagement(){
        this.$router.push({path: '/admin/EmployeeManagement'});
      },
      toUserManagement(){
        this.$router.push({path: '/admin/UserManagement'});
      },
      toCinemaInfoManagement(){
        this.$router.push({path: '/admin/CinemaInfoManagement'});
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

<style>
</style>
