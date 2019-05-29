<template>
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
          <el-menu default-active="1" class="el-menu-vertical-demo">

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
            <div>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button type="primary" size="small" class="label">添加售票员</el-button>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">售票员</el-col>
                </el-row>
                <el-table
                  :data="salerData"
                  stripe=true
                  height="600"
                  style="width: 90%">
                  <el-table-column
                    prop="username"
                    label="用户名"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="keyword"
                    label="密码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <el-button type="primary" size="mini" @click="">修改信息</el-button>
                    <el-button type="danger" size="mini" @click="deleteEmployee">删除员工</el-button>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button type="primary" size="small" class="label">添加经理</el-button>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">经理</el-col>
                </el-row>
                <el-table
                  :data="rootData"
                  stripe=true
                  height="600"
                  style="width: 90%">
                  <el-table-column
                    prop="username"
                    label="用户名"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="keyword"
                    label="密码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <el-button type="primary" size="mini" @click="">修改信息</el-button>
                    <el-button type="danger" size="mini" @click="deleteEmployee">删除员工</el-button>
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: "AdminEmployeeManagement",
      data(){
          return{
            salerData : [
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              },
              {
                username : "售票员1",
                keyword : "密码1"
              },
              {
                username : "售票员2",
                keyword : "密码2"
              },
              {
                username : "售票员3",
                keyword : "密码3"
              }
            ],
            rootData : [
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              },
              {
                username : "经理1",
                keyword : "密码1"
              },
              {
                username : "经理2",
                keyword : "密码2"
              },
              {
                username : "经理3",
                keyword : "密码3"
              }
            ],
          }
      },
      methods : {
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
        deleteEmployee: function () {
          this.$confirm('确认删除该员工？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
