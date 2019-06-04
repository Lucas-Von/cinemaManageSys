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
              <el-row type="flex">
                <el-col :span="6"></el-col>
                <el-col>
                  影院信息
                </el-col>
              </el-row>
              <br><br><br><br>
              <el-row type="flex">
                <el-col :span="4"></el-col>
                <el-col :span="12">
                  <div>
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-form-item label="影院名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <br>
                      <el-form-item label="影院地址">
                        <el-input v-model="form.address"></el-input>
                      </el-form-item>
                      <br>
                      <el-form-item label="影院电话">
                        <el-input v-model="form.phone"></el-input>
                      </el-form-item>
                      <br>
                      <el-form-item label="营业时间">
                        <el-col :span="11">
                          <el-time-picker placeholder="请选择时间" v-model="form.startTime" style="width: 100%;"></el-time-picker>
                        </el-col>
                        <el-col class="line" :span="2">&nbsp&nbsp&nbsp&nbsp&nbsp~</el-col>
                        <el-col :span="11">
                          <el-time-picker placeholder="请选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
                        </el-col>
                      </el-form-item>
                      <br>
                      <el-form-item label="影院简介">
                        <el-input type="textarea" v-model="form.description"></el-input>
                      </el-form-item>
                      <br>
                      <el-form-item>
                        <el-button type="primary" @click="submit">确定</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
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
        name: "AdminCinemaInfoManagement",
      data() {
        return{
          isCollapse: false,
          form : {
            name : "",
            address : "",
            phone : "",
            startTime : "",
            endTime : "",
            description : ""
          }
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
          this.$confirm('请务必确认本界面信息已提交保存。', '提示', {})
            .then(() => {
              this.$router.push({path: '/admin/EmployeeManagement'});
            })
            .catch(() => {});
        },
        toUserManagement(){
          this.$confirm('请务必确认本界面信息已提交保存。', '提示', {})
            .then(() => {
              this.$router.push({path: '/admin/UserManagement'});
            })
            .catch(() => {});
        },
        toCinemaInfoManagement(){
          this.$confirm('请务必确认本界面信息已提交保存。', '提示', {})
            .then(() => {
              this.$router.push({path: '/admin/CinemaInfoManagement'});
            })
            .catch(() => {});
        },
        logout: function () {
          this.$confirm('请务必确认本界面信息已提交保存。', '提示', {})
            .then(() => {
              this.$confirm('确认退出?', '提示', {})
                .then(() => {
                  sessionStorage.removeItem('user');
                  this.$router.push('/login');
                })
                .catch(() => {});
            })
            .catch(() => {});
        },
        submit: function () {
          this.$confirm("确认提交保存？", "提示", {})
            .then(() => {
              /*
             TODO
             push form
              */
            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
