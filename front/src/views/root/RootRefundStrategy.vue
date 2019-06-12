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
          <el-menu default-active="3"
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
        <el-menu default-active="3"
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
                <el-col :span="2"><h1>充值优惠</h1></el-col>
                <el-col :span="1" style="margin-top: 10px">
                  <el-row type="flex" justify="end">
                    <el-button  circle class="el-icon-circle-plus-outline" @click="addRefund"></el-button>
                  <el-dialog title="添加/修改 退票策略" :visible.sync="refundDialogVisiable" :before-close="closeRefundDialog">
                    <el-form :model="refundForm" :rules="refundRules" ref="ruleForm">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="refundForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="描述" prop="description">
                        <el-input v-model="refundForm.description"></el-input>
                      </el-form-item>
                      <el-form-item label="剩余时间" prop="remainingTime">
                        <el-input v-model="refundForm.remainingTime"></el-input>
                      </el-form-item>
                      <el-form-item label="退款比例" prop="percentage">
                        <el-input   v-model="refundForm.percentage"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitRefund(refundForm)">保存</el-button>
                        <el-button @click="closeRefundDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-row>
              </el-col>


                    <el-table
                      :data="refundData"
                      :stripe=true
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="名称"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述"
                        width="300">
                      </el-table-column>
                      <el-table-column
                        prop="remainingTime"
                        label="剩余时间"
                        width="200"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="percentage"
                        label="退款比例"
                        width="200"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                          <el-button circle class="el-icon-edit" @click="updateRefund(scope.row)"></el-button>
                          <el-button circle class="el-icon-delete" @click="deleteRefund(scope.row.id)"></el-button>
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
  import {getRefundStrategy, addRefundStrategy, updateRefundStrategy, deleteRefundStrategy} from "../../api/rootAPI"
  import {isDecimal, isDecimalLessThanOne} from "../../api/util"

    export default {
      name: "RootRefundStrategy",
      data(){
          return{
            isCollapse:false,
            refundData : [],
            refundDialogVisiable: false,
            refundForm: {
              id: "",
              name: "",
              description: "",
              remainingTime: "",
              percentage: ""
            },
            refundRules: {
              name: {
                required: true,
                message: "请输入策略名称",
                trigger: "blur"
              },
              remainingTime: [{
                required: true,
                message: "请输入剩余时间",
                trigger: "blur"
              },{
                validator: isDecimal,
                trigger: "blur"
              }],
              percentage: [{
                required: true,
                message: "请输入退款比例",
                trigger: "blur"
              },
                {
                  validator: isDecimalLessThanOne,
                  trigger: "blur"
                }]
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

        /*--------------------------------------------------*/
        addRefund: function() {
          this.refundDialogVisiable = true;
        },

        updateRefund: function(item) {
          this.refundDialogVisiable = true;
          this.refundForm.id = item.id;
          this.refundForm.name = item.name;
          this.refundForm.description = item.refundForm;
          this.refundForm.remainingTime = item.remainingTime;
          this.refundForm.percentage = item.percentage;
        },

        closeRefundDialog: function() {
          this.refundDialogVisiable = false;
          this.resetRefundDialog();
        },

        resetRefundDialog: function() {
          this.refundForm.name = "";
          this.refundForm.description = "";
          this.refundForm.remainingTime = "";
          this.refundForm.percentage = "";
        },

        getRefund: function() {
          getRefundStrategy().then(res => {
            this.refundData = res.content;
          })
        },

        submitRefund: function (params) {
          console.log(params);
          if (params.name === ""){
            this.$message({
              type: 'error',
              message: '请输入名称'
            });
            return;
          }
          if (params.remainingTime === ""){
            this.$message({
              type: 'error',
              message: '请输入剩余时间'
            });
            return;
          }
          if (params.percentage === ""){
            this.$message({
              type: 'error',
              message: '请输入退款比例'
            });
            return;
          }
          if (params.id === ""){
            this.submitAddRefund(params);
          }
          else {
            this.submitUpdateRefund(params);
          }
        },

        submitAddRefund: function(params) {
          addRefundStrategy(params).then(res => {
            this.getRefund();
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.closeRefundDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        submitUpdateRefund: function(params) {
          updateRefundStrategy(params).then(res => {
            this.getRefund();
            if (res.success){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.closeRefundDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        deleteRefund: function (id) {
          this.$confirm('确认删除该策略？','提示',{})
            .then(() => {
              deleteRefundStrategy(id).then(res => {
                this.getRefund();
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
        },

      },
      mounted: function () {
        this.getRefund();
      }
    }
</script>

<style scoped>

</style>
