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
                  <el-button type="primary" class="label" @click="showRefundDialog">添加退票策略</el-button>
                  <el-dialog title="添加退票策略" :visible.sync="refundDialogVisiable">
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
                        <el-button type="primary" @click="addRefund(refundForm)">保存</el-button>
                        <el-button @click="closeRefundDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">退票策略</el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="4"></el-col>
                  <el-col>
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
                        width="150"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        prop="percentage"
                        label="退款比例"
                        width="100"
                        sortable>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200">
                        <el-button type="primary" size="small" @click="">修改策略</el-button>
                        <el-button type="danger" size="small" @click="deleteRefund(scope.row.id)">删除策略</el-button>
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
  import {getRefundStrategy, addRefundStrategy, updateRefundStrategy, deleteRefundStrategy} from "../../api/rootAPI"
    export default {
      name: "RootRefundStrategy",
      data(){
          return{
              isCollapse:false,
            refundData : getRefundStrategy().content,
            refundDialogVisiable: false,
            refundForm: {
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
              description: {
                required: true,
                message: "请输入策略描述",
                trigger: "blur"
              },
              remainingTime: {
                required: true,
                message: "请输入剩余时间",
                trigger: "blur"
              },
              percentage: {
                required: true,
                message: "请输入退款比例",
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

        showRefundDialog: function() {
          console.log(this.refundData);
          this.refundDialogVisiable = true;
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

        addRefund: function (params) {
          let res = addRefundStrategy(params);
          if (res.success){
            alert("添加成功");
            this.closeRefundDialog();
            this.refundData = getRefundStrategy();
          }
          else {
            alert(res.message)
          }
        },

        deleteRefund: function (id) {
          this.$confirm('确认删除该策略？','提示',{})
            .then(() => {
              let res = deleteRefundStrategy(id);
              if (res.success){
                alert("删除成功");
                this.refundData = getRefundStrategy();
              }
              else {
                alert(res.message);
              }
            })
            .catch(() => {})
        },

        updateRefund: function (refund) {
          this.refundDialogVisiable = true;

          let res = updateRefundStrategy(params);
          if (res.success){
            alert("修改成功");
          }
          else {
            alert(res.message);
          }
        }

      }
    }
</script>

<style scoped>

</style>
