<template>
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
        <el-menu default-active="2"
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
               active-text-color="#409EFF">
      </el-menu>
    </el-aside>
    <el-container>

      <el-main class="app-body" >
        <template>
          <nav class="navbar navbar-default">
            <div class="container-fluid" style="margin-top: -20px;margin-left: -20px;margin-right: -20px">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-col :span="12" >
                  <el-menu-item index="1" @click="Vip">充值优惠</el-menu-item>
                </el-col>
                <el-col :span="12">
                  <el-menu-item index="2" @click="Ticket">购票优惠</el-menu-item>
                </el-col>
              </el-menu>

            </div>
          </nav>
        </template>
        <template>
          <div>
            <!--<div>-->
              <!--<el-row type="flex" justify="end">-->
                <!--<el-button type="primary" class="label" @click="addRecharge">添加优惠</el-button>-->
                <!--<el-dialog title="添加充值优惠" :visible.sync="rechargeDialogVisiable" :before-close="closeRechargeDialog">-->
                  <!--<el-form :model="rechargeForm" :rules="rechargeRules" ref="ruleForm">-->
                    <!--<el-form-item label="名称" prop="name">-->
                      <!--<el-input v-model="rechargeForm.name"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="描述" prop="description">-->
                      <!--<el-input type="textarea" v-model="rechargeForm.description"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="目标金额" prop="targetAmount">-->
                      <!--<el-input v-model="rechargeForm.targetAmount"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="额外金额" prop="plusAmount">-->
                      <!--<el-input v-model="rechargeForm.plusAmount"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="选择时间" required>-->
                      <!--<el-col :span="8">-->
                        <!--<el-form-item prop="startTime">-->
                          <!--<el-date-picker type="date" placeholder="开始时间" v-model="rechargeForm.startTime" style="width: 100%"></el-date-picker>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                      <!--<el-col :span="2">&nbsp</el-col>-->
                      <!--<el-col :span="8">-->
                        <!--<el-form-item prop="endTime">-->
                          <!--<el-date-picker placeholder="结束时间" v-model="rechargeForm.endTime" style="width: 100%"></el-date-picker>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                    <!--</el-form-item>-->
                    <!--<br>-->
                    <!--<el-form-item>-->
                      <!--<el-button type="primary" @click="submitRecharge(rechargeForm)">保存</el-button>-->
                      <!--<el-button @click="closeRechargeDialog">取消</el-button>-->
                    <!--</el-form-item>-->
                  <!--</el-form>-->
                <!--</el-dialog>-->
              <!--</el-row>-->
              <!--<el-row type="flex">-->
                <!--<el-col :span="2"></el-col>-->
                <!--<el-col :span="6">充值优惠</el-col>-->
              <!--</el-row>-->
              <!--<el-table-->
                <!--:data="rechargeData"-->
                <!--:stripe=true-->
                <!--:height="250"-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="名称"-->
                  <!--width="150">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="targetAmount"-->
                  <!--label="目标金额"-->
                  <!--width="150">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="plusAmount"-->
                  <!--label="额外金额"-->
                  <!--width="150">-->
                <!--</el-table-column>-->

                <!--<el-table-column-->
                  <!--prop="startTime"-->
                  <!--label="开始日期"-->
                  <!--width="180"-->
                  <!--:formatter = "startTimeFormat"-->
                  <!--sortable>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="endTime"-->
                  <!--label="结束日期"-->
                  <!--width="180"-->
                  <!--:formatter = "endTimeFormat"-->
                  <!--sortable>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="操作">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button type="primary" size="small" @click="updateRecharge(scope.row)">修改优惠</el-button>-->
                    <!--<el-button type="danger" size="small" @click="deleteRecharge(scope.row.id)">删除优惠</el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              <!--</el-table>-->
            <!--</div>-->
            <div>
              <el-col :span="2"><h1>购票优惠</h1></el-col>
              <el-col :span="1" style="margin-top: 10px">
              <el-row type="flex" justify="end">
                <el-button  circle class="el-icon-circle-plus-outline" @click="addTicket"></el-button>
                <el-dialog title="添加购票优惠" :visible.sync="ticketDialogVisiable" :before-close="closeTicketDialog">
                  <el-form :model="ticketForm" :rules="ticketRules" ref="ticketForm">
                    <el-form-item label="名称" prop="name">
                      <el-input v-model="ticketForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="description" clearable>
                      <el-input type="textarea" v-model="ticketForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="目标电影票数量" prop="targetCount">
                      <el-input v-model="ticketForm.targetCount"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣" prop="discount">
                      <el-input v-model="ticketForm.discount"></el-input>
                    </el-form-item>
                    <el-form-item label="选择时间">
                      <el-col :span="8">
                        <el-form-item prop="startTime">
                          <el-date-picker type="date" placeholder="开始时间" v-model="ticketForm.startTime" style="width: 100%"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">&nbsp</el-col>
                      <el-col :span="8">
                        <el-form-item prop="endTime">
                          <el-date-picker placeholder="结束时间" v-model="ticketForm.endTime" style="width: 100%"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <br>
                    <el-form-item>
                      <el-button type="primary" @click="submitTicket(ticketForm)">保存</el-button>
                      <el-button @click="closeTicketDialog()">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-row>
              </el-col>
              <!--<el-row type="flex">-->
                <!--<el-col :span="2"></el-col>-->
                <!--<el-col :span="6">购票优惠</el-col>-->
              <!--</el-row>-->
              <el-table
                :data="ticketData"
                :stripe=true
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述"
                  width="250">
                </el-table-column>
                <el-table-column
                  prop="targetCount"
                  label="目标票数"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="discount"
                  label="折扣"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="startTime"
                  label="开始日期"
                  width="120"
                  :formatter = "startTimeFormat"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  label="结束日期"
                  width="120"
                  :formatter = "endTimeFormat"
                  sortable>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button circle class="el-icon-edit" @click="updateTicket(scope.row)"></el-button>
                    <el-button circle class="el-icon-delete" @click="deleteDiscount(scope.row.id)"></el-button>
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
  import {getRechargeActivity, addRechargeActivity, updateRechargeActivity, deleteRechargeActivity,
    getTicketActivity, addTicketActivity, updateTicketActivity, deleteTicketActivity} from "../../api/rootAPI"

  import {isInteger, isDecimalLessThanOne} from "../../api/util"

  export default {
    name: "RootVIPActivity",
    data(){
      return{
        isCollapse:false,
        rechargeData: [],
        ticketData : [],
        rechargeDialogVisiable: false,
        ticketDialogVisiable: false,
        rechargeForm: {
          id: "",
          name: "",
          description: "",
          targetAmount: "",
          plusAmount: "",
          startTime: "",
          endTime: ""
        },
        rechargeRules:  {
          name: {
            required: true,
            message: "请输入优惠名称",
            trigger: "blur"
          },
          targetAmount: [{
            required: true,
            message: "请输入目标金额",
            trigger: "blur"
          },
            {
              validator: isInteger,
              trigger: "blur"
            }],
          plusAmount: [{
            required: true,
            message: "请输入优惠金额",
            trigger: "blur"
          },
            {
              validator: isInteger,
              trigger: "blur"
            }],
          startTime : {
            type: "date",
            required: true,
            message: "请输入起始时间",
            trigger: "blur"
          },
          endTime : {
            type: "date",
            required: true,
            message: "请输入结束时间",
            trigger: "blur"
          }
        },
        ticketForm:{
          id: "",
          name: "",
          description: "",
          targetCount: "",
          discount: "",
          startTime: "",
          endTime: ""

        },
        ticketRules: {
          name: {
            required: true,
            message: "请输入优惠名称",
            trigger: "blur"
          },
          targetCount: [{
            required: true,
            message: "请输入目标电影票数量",
            trigger: "blur"
          },
            {
              validator: isInteger,
              trigger: "blur"
            }],
          discount: [{
            required: true,
            message: "请输入折扣",
            trigger: "blur"
          },
            {
              validator: isDecimalLessThanOne,
              trigger: "blur"
            }],
          startTime : {
            type: "date",
            required: true,
            message: "请输入起始时间",
            trigger: "blur"
          },
          endTime : {
            type: "date",
            required: true,
            message: "请输入结束时间",
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
      Vip(){
        this.$router.push({path: '/root/VIPActivity'});
      },
      Ticket(){
        this.$router.push({path: '/root/TicketActivity'});
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

      startTimeFormat: function(row) {
        return row.startTime.substring(0, 10);
      },

      endTimeFormat: function(row) {
        return row.endTime.substring(0, 10);
      },

      /*--------------------------------------------------*/


      closeRechargeDialog: function () {
        this.rechargeDialogVisiable = false;
        this.resetRechargeDialog();
      },

      resetRechargeDialog: function() {
        this.rechargeForm.name = "";
        this.rechargeForm.description = "";
        this.rechargeForm.targetAmount = "";
        this.rechargeForm.plusAmount = "";
        this.rechargeForm.startTime = "";
        this.rechargeForm.endTime = "";
      },

      getRecharge: function() {
        getRechargeActivity().then(res => {
          this.rechargeData = res.content;
        })
      },

      addRecharge: function () {
        this.rechargeDialogVisiable = true;
      },

      updateRecharge: function (item) {
        this.rechargeDialogVisiable = true;
        this.rechargeForm.id = item.id;
        this.rechargeForm.name = item.name;
        this.rechargeForm.description = item.description;
        this.rechargeForm.targetAmount = item.targetAmount;
        this.rechargeForm.plusAmount = item.plusAmount;
        this.rechargeForm.startTime = item.startTime;
        this.rechargeForm.endTime = item.endTime;
      },

      submitRecharge: function(params) {
        console.log(params);
        if (params.name === ""){
          this.$message({
            type: 'error',
            message: '请输入名称'
          });
          return;
        }
        if (params.targetAmount === ""){
          this.$message({
            type: 'error',
            message: '请输入目标金额'
          });
          return;
        }
        if (params.plusAmount === ""){
          this.$message({
            type: 'error',
            message: '请输入额外金额'
          });
          return;
        }
        if (params.startTime === "" || params.endTime === ""){
          this.$message({
            type: 'error',
            message: '请选择时间'
          });
          return;
        }
        if (parseInt(params.targetAmount) < parseInt(params.plusAmount)){
          this.$message({
            type: 'error',
            message: '请检查金额'
          });
          return;
        }
        if (params.startTime > params.endTime){
          this.$message({
            type: 'error',
            message: '请检查时间'
          });
          return;
        }
        if (params.id === ""){
          this.submitAddRecharge(params);
        }
        else {
          this.submitUpdateRecharge(params);
        }
      },

      submitAddRecharge: function(params) {
        addRechargeActivity(params).then(res => {
          this.getRecharge();
          if (res.success){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.closeRechargeDialog();
          }
          else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        });
      },

      submitUpdateRecharge: function(params) {
        updateRechargeActivity(params).then(res => {
          this.getRecharge();
          if (res.success){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.closeRechargeDialog();
          }
          else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        });
      },

      deleteRecharge: function (id) {
        this.$confirm('确认删除该优惠？','提示',{})
          .then(() => {
            deleteRechargeActivity(id).then(res => {
              if (res.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getRecharge();
              }
              else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            });
          })
          .catch(() => {})
      },

      /*--------------------------------------------------*/

      closeTicketDialog: function () {
        this.ticketDialogVisiable = false;
        this.resetTicketDialog();
      },

      resetTicketDialog: function() {
        this.ticketForm.id = "";
        this.ticketForm.name = "";
        this.ticketForm.description = "";
        this.ticketForm.targetCount = "";
        this.ticketForm.discount = "";
        this.ticketForm.startTime = "";
        this.ticketForm.endTime = "";
      },

      getTicket: function() {
        getTicketActivity().then(res => {
          this.ticketData = res.content;
        });
      },

      addTicket: function () {
        this.ticketDialogVisiable = true;
      },

      updateTicket: function (item) {
        this.ticketDialogVisiable = true;
        this.ticketForm.id = item.id;
        this.ticketForm.name = item.name;
        this.ticketForm.description = item.description;
        this.ticketForm.targetCount = item.targetCount;
        this.ticketForm.discount = item.discount;
        this.ticketForm.startTime = item.startTime;
        this.ticketForm.endTime = item.endTime;
      },

      submitTicket: function(params) {
        if (params.name === ""){
          this.$message({
            type: 'error',
            message: '请输入名称'
          });
          return;
        }
        if (params.targetCount === ""){
          this.$message({
            type: 'error',
            message: '请输入目标电影票数量'
          });
          return;
        }
        if (params.discount === ""){
          this.$message({
            type: 'error',
            message: '请输入折扣'
          });
          return;
        }
        if (params.startTime === "" || params.endTime === ""){
          this.$message({
            type: 'error',
            message: '请选择时间'
          });
          return;
        }
        if (params.targetCount <= 0){
          this.$message({
            type: 'error',
            message: '请检查目标电影票数量'
          });
          return;
        }
        console.log(params.discount);
        if (params.discount> 1 || params.discount < 0){
          this.$message({
            type: 'error',
            message: '请检查折扣'
          });
          return;
        }
        if (params.startTime > params.endTime){
          this.$message({
            type: 'error',
            message: '请检查时间'
          });
          return;
        }
        if (params.id === ""){
          this.submitAddTicket(params);
        }
        else {
          this.submitUpdateTicket(params);
        }
      },

      submitAddTicket: function(params) {
        addTicketActivity(params).then(res => {
          this.getTicket();
          if (res.success) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.closeTicketDialog();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      submitUpdateTicket: function(params) {
        updateTicketActivity(params).then(res => {
          this.getTicket();
          if (res.success) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.closeTicketDialog();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        })
      },

      deleteDiscount: function (id) {
        console.log(id);
        this.$confirm('确认删除该优惠？','提示',{})
          .then(() => {
            deleteTicketActivity(id).then(res => {
              console.log(res);
              if (res.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getTicket();
              }
              else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            });
          })
          .catch(() => {})
      }
    },
    mounted: function () {
      this.getRecharge();
      this.getTicket();
    }

  }
</script>



<style scoped>
  .label{

  }

</style>
