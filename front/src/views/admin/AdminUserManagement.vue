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
          <el-menu default-active="1-5-1"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse">

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
        <div style="width: 60px; cursor: pointer;"
             @click.prevent="toggleSideBar">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
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
            <div>
              <el-row type="flex" justify="end">
                <el-button type="primary" class="label">添加用户</el-button>
              </el-row>
              <el-row type="flex">
                <el-col :span="2"></el-col>
                <el-col :span="6">用户</el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="2"></el-col>
                <el-col>
                  <el-table
                    :data="userData"
                    :stripe=true
                    height="600"
                    style="width: 80%">
                    <el-table-column
                      prop="username"
                      label="用户名"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="password"
                      label="密码"
                      width="300">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="200">
                      <el-button type="primary" size="small" @click="">修改信息</el-button>
                      <el-button type="danger" size="small" @click="deleteUser">删除用户</el-button>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>

            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: "AdminUserManagement",
      data() {
        return{
          isCollapse: false,
          userData : []
        }
      },
      methods : {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },
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
        },
        deleteUser: function () {
          this.$confirm('确认删除该用户？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
