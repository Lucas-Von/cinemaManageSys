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
                <el-button type="primary" size="small" class="label" @click="showEmployeeDialog">添加售票员</el-button>
              </el-row>
              <el-col :span="12">
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">售票员</el-col>
                </el-row>
                <el-table
                  :data="salerData"
                  :stripe=true
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
                    <el-button type="danger" size="mini" @click="deleteEmployee(scope.row.id)">删除员工</el-button>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-dialog title="添加员工" :visible.sync="employeeDialogVisiable">
                    <el-form :model="employeeForm" :rules="employeeRules" ref="ruleForm">
                      <el-form-item label="用户名" prop="username">
                        <el-input v-model="employeeForm.username"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="keyword">
                        <el-input v-model="employeeForm.keyword"></el-input>
                      </el-form-item>
                      <el-form-item label="身份">
                        <el-select v-model="employeeForm.category" placeholder="请选择身份">
                          <el-option label="经理" value=1></el-option>
                          <el-option label="售票员" value=2></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addEmployee(employeeForm)">保存</el-button>
                        <el-button @click="closeEmployeeDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">经理</el-col>
                </el-row>
                <el-table
                  :data="rootData"
                  :stripe=true
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
                    <el-button type="danger" size="mini" @click="deleteEmployee(scope.row.id)">删除员工</el-button>
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
  import {getRoles, addRole, updateRole, deleteRole} from "../../api/adminAPI"
    export default {
      name: "AdminEmployeeManagement",
      data(){
          return{
            rootData : [],
            salerData : [],
            employeeDialogVisiable : false,
            employeeForm: {
              username: "",
              keyword: "",
              category: ""
            },
            employeeRules: {

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

        /*--------------------------------------------------*/

        closeEmployeeDialog: function() {
          this.employeeDialogVisiable = false;
          this.resetEmployeeDialog();
        },

        resetEmployeeDialog: function() {
          this.employeeForm.username = "";
          this.employeeForm.keyword = "";
          this.employeeForm.category = "";
        },

        getEmployee: function() {
          this.rootData = [];
          this.salerData = [];
          getRoles().then(res => {
            for (let employee in res.content){
              if (employee.category === 1){
                this.rootData.push(employee);
              }
              else {
                this.salerData.push(employee);
              }
            }
          })
        },

        addEmployee: function(params) {
          addRole(params.username, params.keyword, params.category).then(res => {
            this.getEmployee();
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.closeEmployeeDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })

        },

        updateEmployee: function(params) {
          updateRole(params.id, params.category).then(res => {
            this.getEmployee();
            if (res.success){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.closeEmployeeDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        deleteEmployee: function (id) {
          this.$confirm('确认删除该员工？','提示',{})
            .then(() => {
              alert(id);
              // let res = deleteRole(id);
              // if (res.success){
              //   alert("删除成功");
              //   this.getEmployee();
              // }
              // else {
              //   alert(res.message);
              // }
            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
