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
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse">
            <el-menu-item index="1" @click="toEmployeeManagement">
            <i class="el-icon-s-custom"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>

            <el-menu-item index="3" @click="toCinemaInfoManagement">
              <i class="el-icon-setting"></i>
              <span slot="title">影院信息管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="logout">
              <i class="el-icon-switch-button"></i>
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

              <el-col :span="12">
                <el-row type="flex">

                  <el-col :span="3"><h1>售票员</h1></el-col>
                  <el-col :span="2">
                    <el-row type="flex" justify="end">
                      <el-button  circle class="el-icon-circle-plus-outline" @click="addEmployee(2)" style="margin-top: 12px"></el-button>
                      <el-dialog title="添加员工" :visible.sync="addEmployeeDialogVisiable">
                        <el-form :model="addEmployeeForm" :rules="addEmployeeRules" ref="ruleForm">
                          <el-form-item label="用户名" prop="username">
                            <el-input v-model="addEmployeeForm.username"></el-input>
                          </el-form-item>
                          <el-form-item label="密码" prop="password">
                            <el-input v-model="addEmployeeForm.password" show-password></el-input>
                          </el-form-item>
                          <el-form-item label="重复密码" prop="passwordRepeat">
                            <el-input v-model="addEmployeeForm.passwordRepeat" show-password></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="submitAddEmployee(addEmployeeForm)">保存</el-button>
                            <el-button @click="closeAddEmployeeDialog">取消</el-button>
                          </el-form-item>
                        </el-form>
                      </el-dialog>
                    </el-row>
                  </el-col>
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
                    prop="password"
                    label="密码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button circle class="el-icon-edit" @click="updateEmployee(scope.row)"></el-button>
                      <el-dialog title="修改员工信息" :visible.sync="updateEmployeeDialogVisiable">
                        <el-form :model="updateEmployeeForm">
                          <el-form-item label="用户名" prop="username">
                            <el-input v-model="updateEmployeeForm.username" :disabled="true"></el-input>
                          </el-form-item>
                          <el-form-item label="身份">
                            <el-select v-model="updateEmployeeForm.category" placeholder="请选择身份">
                              <el-option label="经理" value=1></el-option>
                              <el-option label="售票员" value=2></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="submitUpdateEmployee(updateEmployeeForm)">保存</el-button>
                            <el-button @click="closeUpdateEmployeeDialog">取消</el-button>
                          </el-form-item>
                        </el-form>
                      </el-dialog>
                      <el-button circle class="el-icon-delete" @click="deleteEmployee(scope.row.id)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <el-row type="flex">
                  <el-col :span="3"><h1>经理</h1></el-col>
                  <el-col :span="2">
                    <el-row type="flex" justify="end">
                      <el-button  circle class="el-icon-circle-plus-outline" @click="addEmployee(1)" style="margin-top: 12px"></el-button>
                    </el-row>
                  </el-col>
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
                    prop="password"
                    label="密码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button circle class="el-icon-edit" @click="updateEmployee(scope.row)"></el-button>
                      <el-button circle class="el-icon-delete" @click="deleteEmployee(scope.row.id)"></el-button>
                    </template>
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
            isCollapse: false,
            rootData : [],
            salerData : [],
            addEmployeeDialogVisiable : false,
            updateEmployeeDialogVisiable : false,
            addEmployeeForm: {
              id: "",
              username: "",
              password: "",
              passwordRepeat: "",
              category: ""
            },
            updateEmployeeForm:{
              id: "",
              username: "",
              category: ""
            },
            addEmployeeRules: {

            },
            category: ""
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

        closeAddEmployeeDialog: function() {
          this.addEmployeeDialogVisiable = false;
          this.resetAddEmployeeDialog();
        },

        closeUpdateEmployeeDialog: function() {
          this.updateEmployeeDialogVisiable = false;
          this.resetUpdateEmployeeDialog();
        },

        resetAddEmployeeDialog: function() {
          this.addEmployeeForm.id = "";
          this.addEmployeeForm.username = "";
          this.addEmployeeForm.password = "";
          this.addEmployeeForm.passwordRepeat = "";
          this.addEmployeeForm.category = "";
        },

        resetUpdateEmployeeDialog: function() {
          this.updateEmployeeForm.id = "";
          this.updateEmployeeForm.username = "";
          this.updateEmployeeForm.category = "";
        },

        getEmployee: function() {
          this.rootData = [];
          this.salerData = [];
          getRoles().then(res => {
            for (let i = 0; i < res.content.length; i ++){
              let employee = res.content[i];
                if (employee.category === 1){
                  this.rootData.push(employee);
                }
                else if (employee.category === 2) {
                  this.salerData.push(employee);
                }
            }
          })
        },

        addEmployee: function(category) {
          this.addEmployeeDialogVisiable = true;
          this.addEmployeeForm.category = category;
        },

        updateEmployee: function(params) {
          this.updateEmployeeDialogVisiable = true;
          this.updateEmployeeForm.id = params.id;
          this.updateEmployeeForm.username = params.username;
          if (params.category === 1){
            this.updateEmployeeForm.category = "经理";
          }
          else {
            this.updateEmployeeForm.category = "售票员";
          }
        },

        submitAddEmployee: function(params) {
          if (params.password !== params.passwordRepeat) {
            this.$message({
              type: 'error',
              message: '密码不一致'
            });
            return;
          }
          addRole(params).then(res => {
            this.getEmployee();
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.closeAddEmployeeDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        submitUpdateEmployee: function(params) {
          console.log(params);
          let sign;
          if (params.category === "经理"){
            sign = 1;
          }
          else {
            sign = 2;
          }
          updateRole(params.id, sign).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.closeUpdateEmployeeDialog();
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
              deleteRole(id).then(res => {
                this.getEmployee();
                if (res.success){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
                else {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                }
              })
            })
            .catch(() => {})
        }
      },
      mounted: function () {
        this.getEmployee();
      }
    }
</script>

<style scoped>

</style>
