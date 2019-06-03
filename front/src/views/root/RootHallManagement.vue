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
        <el-main class="app-body" >
          <template>
            <div>
              <div>
                <el-row type="flex" justify="end">
                  <el-button type="primary" class="label" @click="showHallDialog">添加影厅</el-button>
                  <el-dialog title="添加影厅" v-model="hallDialogVisiable">
                    <el-form :model="hallForm" :rules="hallRules" ref="ruleForm">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="hallForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="容量" prop="capacity">
                        <el-input v-model="hallForm.capacity"></el-input>
                      </el-form-item>
                      <el-form-item label="行数" prop="row">
                        <el-input v-model="hallForm.row"></el-input>
                      </el-form-item>
                      <el-form-item label="列数" prop="column">
                        <el-input v-model="hallForm.column"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-dialog>

                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">影厅信息</el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="4"></el-col>
                  <el-col>
                    <el-table
                      :data="hallData"
                      :stripe=true
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="名称"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="capicity"
                        label="容量"
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="row"
                        label="行数"
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="column"
                        label="列数"
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200">
                        <el-button type="primary" size="small">修改影厅</el-button>
                        <el-button type="danger" size="small" @click="deleteHallInfo(scope.row.id)">删除影厅</el-button>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getHall, addHall, updateHall, deleteHall} from "../../api/rootAPI"

    export default {
      name: "RootHallManagement",
      data(){
        return{
          isCollapse:false,
          hallData : getHall().content,
          hallDialogVisiable: false,
          hallForm: {
            name: "",
            capacity: "",
            row: "",
            column: ""
          },
          hallRules: {
            name: {
              required: true,
              message: "",
              trigger: "blur"
            },
            capacity: {
              type: "number",
              required: true,
              message: "",
              trigger: "blur"
            },
            row: {
              type: "number",
              required: true,
              message: "",
              trigger: "blur"
            },
            column: {
              type: "number",
              required: true,
              message: "",
              trigger: "blur"
            }
          }
        }
      },
      methods:{
        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },
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
        },

        showHallDialog: function() {
          this.hallDialogVisiable = true;
        },

        closeHallDialog: function() {
          this.hallDialogVisiable = false;
          this.resetHallDialog();
        },

        resetHallDialog: function() {
          this.hallForm.name = "";
          this.hallForm.capacity = "";
          this.hallForm.row= "";
          this.hallForm.column = "";
        },

        addHallInfo: function (params) {
          let res = addHall(params);
          if (res.success){
            alert("添加成功");
            this.closeHallDialog();
            this.hallData = getHall();
          }
          else {
            alert(res.message);
          }
        },

        updateHallInfo: function () {

        },

        deleteHallInfo: function (id) {
          this.$confirm('确认删除该影厅？','提示',{})
            .then(() => {
              let res = deleteHall(id);
              if (res.success){
                alert("删除成功");
                this.hallData = getHall();
              }
              else {
                alert(res.message);
              }
            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
