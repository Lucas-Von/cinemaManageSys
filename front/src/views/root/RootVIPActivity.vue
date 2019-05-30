<template>
  <div class="app" >
    <el-container >
      <el-aside class="app-side-expanded">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               width="60"
               height="60"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <!-- 我是样例菜单 -->

          <el-menu default-active="2"
                   class="el-menu-vertical-demo">

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
      </el-aside>
      <el-container>
        <el-main class="app-body" >
          <template>
            <div>
              <div>
                <el-row type="flex" justify="end">
                  <el-button type="primary" class="label" @click="showRechargeDialog">添加优惠</el-button>
                  <el-dialog title="添加优惠" v-model="rechargeDialog">
                    <el-form :model="rechargeForm" :rules="rechargeRules" ref="ruleForm">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="rechargeForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="描述" prop="description">
                        <el-input type="textarea" v-model="rechargeForm.description"></el-input>
                      </el-form-item>
                      <el-form-item label="目标金额" prop="targetAmount">
                        <el-input v-model="rechargeForm.targetAmount"></el-input>
                      </el-form-item>
                      <el-form-item label="额外金额" prop="plusAmount">
                        <el-input v-model="rechargeForm.plusAmount"></el-input>
                      </el-form-item>
                      <el-form-item label="选择时间" required>
                        <el-col :span="11">
                          <el-form-item prop="startTime">
                            <el-date-picker type="date" placeholder="开始时间" v-model="rechargeForm.startTime" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="11">
                          <el-form-item prop="endTime">
                            <el-date-picker placeholder="结束时间" v-model="rechargeForm.endTime" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <br>
                      <el-form-item>
                        <el-button type="primary" @click="addRecharge(rechargeForm)">保存</el-button>
                        <el-button @click="closeRechargeDislog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>

                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">充值优惠</el-col>
                </el-row>
                <el-table
                  :data="rechargeData"
                  stripe=true
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
                    prop="targetAmount"
                    label="目标金额"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="extraAmount"
                    label="额外金额"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="startDate"
                    label="开始日期"
                    width="180"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    label="结束日期"
                    width="180"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <el-button type="primary" size="small" @click="">修改优惠</el-button>
                    <el-button type="danger" size="small" @click="deleteRecharge">删除优惠</el-button>
                  </el-table-column>
                </el-table>
              </div>
              <br><br><br>
              <div>
                <el-row type="flex" justify="end">
                  <el-button type="primary" class="label" @click="showTicketDialog">添加优惠</el-button>
                  <el-dialog title="添加优惠" v-model="ticketDialog">
                    <el-form :model="ticketForm" :rules="ticketRules" ref="ruleForm">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="ticketForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="描述" prop="description">
                        <el-input type="textarea" v-model="ticketForm.description"></el-input>
                      </el-form-item>
                      <el-form-item label="目标电影票数量" prop="targetCount">
                        <el-input v-model="ticketForm.targetCount"></el-input>
                      </el-form-item>
                      <el-form-item label="折扣" prop="discount">
                        <el-input v-model="ticketForm.discount"></el-input>
                      </el-form-item>
                      <el-form-item label="选择时间" required>
                        <el-col :span="11">
                          <el-form-item prop="startTime">
                            <el-date-picker type="date" placeholder="开始时间" v-model="ticketForm.startTime" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="11">
                          <el-form-item prop="endTime">
                            <el-date-picker placeholder="结束时间" v-model="ticketForm.endTime" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <br>
                      <el-form-item>
                        <el-button type="primary" @click="addTicket(ticketForm)">保存</el-button>
                        <el-button @click="closeTicketDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">购票优惠</el-col>
                </el-row>
                <el-table
                  :data="ticketData"
                  stripe=true
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
                    prop="targetCount"
                    label="目标电影票数量"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="discount"
                    label="折扣"
                    width="100"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="startDate"
                    label="开始日期"
                    width="180"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    label="结束日期"
                    width="180"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <!--<el-col>-->
                      <!--<el-button type="danger" size="small" @click="">修改优惠</el-button>-->
                    <!--</el-col>-->
                    <!---->
                    <!--<el-col>-->
                      <!--<el-button type="danger" size="small" @click="">删除优惠</el-button>-->
                    <!--</el-col>-->
                    <el-button type="primary" size="small" @click=""><i></i>修改优惠</el-button>
                    <el-button type="danger" size="small" @click="deleteDiscount">删除优惠</el-button>
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

    export default {
      name: "RootVIPActivity",
      data(){
        return{
          rechargeData: getRechargeActivity().content,
          ticketData : getTicketActivity().content,
          rechargeDialog: false,
          ticketDialog: false,
          rechargeForm: {
            name: "",
            description: "",
            targetAmount: "",
            plusAmount: "",
            startTime: "",
            endTime: ""
          },
          rechargeRules: {
            name: {
              required: true,
              message: "请输入优惠名称",
              trigger: "blur"
            },
            description: {
              required: true,
              message: "请输入优惠描述",
              trigger: "blur"
            },
            targetAmount: {
              type: "number",
              required: true,
              message: "请输入目标金额",
              trigger: "blur"
            },
            plusAmount: {
              type: "number",
              required: true,
              message: "请输入优惠金额",
              trigger: "blur"
            },
            startTime : {
              type: "date",
              required: true,
              message: "请输入起始时间",
              trigger: "change"
            },
            endTime : {
              type: "date",
              required: true,
              message: "请输入结束时间",
              trigger: "change"
            }
          },
          ticketForm:{
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
            description: {
              required: true,
              message: "请输入优惠描述",
              trigger: "blur"
            },
            targetCount: {
              type: "number",
              required: true,
              message: "请输入目标电影票数量",
              trigger: "blur"
            },
            discount: {
              type: "number",
              required: true,
              message: "请输入折扣",
              trigger: "blur"
            },
            startTime : {
              type: "date",
              required: true,
              message: "请输入起始时间",
              trigger: "change"
            },
            endTime : {
              type: "date",
              required: true,
              message: "请输入结束时间",
              trigger: "change"
            }
          }
        }
      },
      methods:{
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

        showRechargeDialog: function () {
          this.rechargeDialog = true
        },

        closeRechargeDislog: function () {
          this.rechargeDialog = false
          this.$refs[this.rechargeForm].resetFields()
        },

        addRecharge: function (params) {
          this.closeRechargeDislog()
          let res = addRechargeActivity(params)
          if (res.success){
            alert("添加成功")
          }
          else {
            alert(res.message)
          }
        },

        deleteRecharge: function (id) {
          this.$confirm('确认删除该优惠？','提示',{})
            .then(() => {
              let res = deleteRechargeActivity(id)
              if (res.success){
                alert("删除成功")
              }
              else {
                alert(res.message)
              }
            })
            .catch(() => {})
        },

        updateRecharge: function (params) {
          let res = updateRechargeActivity(params)
          if (res.success){
            alert("更新成功")
          }
          else {
            alert(res.message)
          }
        },

        showTicketDialog: function () {
          this.ticketDialog = true;
        },

        closeTicketDialog: function () {
          this.ticketDialog = false
          this.$refs[this.ticketDialog].resetFields()
        },

        addTicket: function (params) {
          this.closeTicketDialog()
          let res = addTicketActivity(params)
          if (res.success){
            alert("添加成功")
          }
          else {
            alert(res.message)
          }
        },

        deleteDiscount: function (id) {
          this.$confirm('确认删除该优惠？','提示',{})
            .then(() => {
              let res = deleteTicketActivity(id)
              if (res.success){
                alert("删除成功")
              }
              else {
                alert(res.message)
              }
            })
            .catch(() => {})
        },

        updateTicket: function (params) {
          let res = updateTicketActivity(params)
          if (res.success){
            alert("更新成功")
          }
          else {
            alert(res.message)
          }
        }
      }
    }
</script>

<style scoped>
  .label{

  }
</style>
