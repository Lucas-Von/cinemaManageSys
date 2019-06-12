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
          <el-menu default-active="4"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse">
            <el-menu-item index="1" @click="toMovieManagement">
              <i class="el-icon-s-grid"></i>
              <span slot="title">电影管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toVIPActivity">
              <i class="el-icon-postcard"></i>
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
                 active-text-color="#409EFF">
        </el-menu>
      </el-aside>

      <el-container>
        <el-main class="app-body" >
          <template>
            <div>
              <div>
                <el-col :span="2"><h1>影厅管理</h1></el-col>
                <el-col :span="1" style="margin-top: 10px">
                  <el-row type="flex" justify="end">
                    <el-button  circle class="el-icon-circle-plus-outline" @click="addHallInfo"></el-button>
                  <el-dialog title="添加影厅" :visible.sync="hallDialogVisiable" :before-close="closeHallDialog">
                    <el-form :model="hallForm" :rules="hallRules" ref="hallForm'[">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="hallForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="容量" prop="size">
                        <el-select v-model="hallForm.size" placeholder="请选择">
                          <el-option
                            v-for="item in sizes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="行数" prop="hallRow">
                        <el-input v-model="hallForm.hallRow"></el-input>
                      </el-form-item>
                      <el-form-item label="列数" prop="hallCol">
                        <el-input v-model="hallForm.hallCol"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitHallInfo(hallForm)">保存</el-button>
                        <el-button @click="closeHallDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>


                </el-row>
                </el-col>
                    <el-table
                      :data="hallData"
                      :stripe=true
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="名称"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="size"
                        label="容量"
                        width="200"
                        :formatter="sizeFormat"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="hallRow"
                        label="行数"
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="hallCol"
                        label="列数"
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                          <el-button circle class="el-icon-edit" @click="updateHallInfo(scope.row)"></el-button>
                          <el-button circle class="el-icon-delete" @click="deleteHallInfo(scope.row.id)"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>

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
  import {isInteger} from "../../api/util"

    export default {
      name: "RootHallManagement",
      data(){
        return{
          isCollapse:false,
          hallData : [],
          hallDialogVisiable: false,
          hallForm: {
            id: "",
            name: "",
            size: "",
            hallRow: "",
            hallCol: ""
          },
          hallRules: {
            name: {
              required: true,
              message: "请输入名称",
              trigger: "blur"
            },
            size: [{
              required: true,
              message: "请输入容量",
              trigger: "blur"
            },
              {
                validator: isInteger,
                trigger: "blur"
              }],
            hallRow: [{
              required: true,
              message: "请输入行数",
              trigger: "blur"
            },
              {
                validator: isInteger,
                trigger: "blur"
              }],
            hallCol: [{
              required: true,
              message: "请输入列数",
              trigger: "blur"
            },
              {
                validator: isInteger,
                trigger: "blur"
              }]
          },
          sizes: [{
            value: 0,
            label: "大"
          }, {
            value: 1,
            label: "中"
          }, {
            value: 2,
            label: "小"
          }]
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

        /*--------------------------------------------------*/

        sizeFormat: function(row) {
          switch (row.size) {
            case 0:
              return "大";
            case 1:
              return "中";
            case 2:
              return "小"
          }
        },

        /*--------------------------------------------------*/

        closeHallDialog: function() {
          this.hallDialogVisiable = false;
          this.resetHallDialog();
        },

        resetHallDialog: function() {
          this.hallForm.name = "";
          this.hallForm.size = "";
          this.hallForm.hallRow= "";
          this.hallForm.hallCol = "";
        },

        getHallInfo: function() {
          getHall().then(res => {
            if (res.success){
              this.hallData = res.content;
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        addHallInfo: function () {
          this.hallDialogVisiable = true;
        },

        updateHallInfo: function (item) {
          this.hallDialogVisiable = true;
          this.hallForm.id = item.id;
          this.hallForm.name = item.name;
          this.hallForm.hallRow = item.hallRow;
          this.hallForm.hallCol = item.hallCol;
          this.hallForm.size = item.size;
        },

        submitHallInfo: function(params){
          if (params.name === ""){
            this.$message({
              type: 'error',
              message: '请输入名称'
            });
            return;
          }

          if (params.size === ""){
            this.$message({
              type: 'error',
              message: '请输入容量'
            });
            return;
          }
          if (params.hallRow === ""){
            this.$message({
              type: 'error',
              message: '请输入行数'
            });
            return;
          }
          if (params.hallCol === ""){
            this.$message({
              type: 'error',
              message: '请输入列数'
            });
            return;
          }
          if (params.id === ""){
            this.submitAddHallInfo(params);
          }
          else {
            this.submitUpdateHallInfo(params);
          }
        },

        submitAddHallInfo: function(params) {
          addHall(params).then(res => {
            this.getHallInfo();
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.closeHallDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        submitUpdateHallInfo: function(params) {
          updateHall(params).then(res => {
            this.getHallInfo();
            if (res.success){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.closeHallDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },
        deleteHallInfo: function (id) {
          this.$confirm('确认删除该影厅？','提示',{})
            .then(() => {
              deleteHall(id).then(res => {
                this.getHallInfo();
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
        this.getHallInfo();
      }
    }
</script>

<style scoped>

</style>
