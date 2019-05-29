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
                  <el-button type="primary" class="label">添加优惠</el-button>
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
                  <el-button type="primary" class="label">添加优惠</el-button>
                </el-row>
                <el-row type="flex">
                  <el-col :span="2"></el-col>
                  <el-col :span="6">购票优惠</el-col>
                </el-row>
                <el-table
                  :data="discountData"
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
    export default {
      name: "RootVIPActivity",
      data(){
        return{
          rechargeData: [
            {
              id : "1",
              name : "优惠A",
              description : "这是优惠A",
              targetAmount : "200.0",
              extraAmount : "30.0",
              startDate : "2019-12-01",
              endDate : "2019-06-01"
            },
            {
              id : "2",
              name : "优惠B",
              description : "这是优惠B",
              targetAmount : "200.0",
              extraAmount : "30.0",
              startDate : "2019-05-02",
              endDate : "2019-06-02"
            },
            {
              id : "3",
              name : "优惠C",
              description : "这是优惠C",
              targetAmount : "200.0",
              extraAmount : "30.0",
              startDate : "2019-05-03",
              endDate : "2019-06-03"
            }
          ],
          discountData :[
            {
              id : "1",
              name : "优惠a",
              description : "这是优惠a",
              targetCount : "5",
              discount : "0.9",
              startDate : "2019-05-01",
              endDate : "2019-06-01"
            },
            {
              id : "2",
              name : "优惠b",
              description : "这是优惠b",
              targetCount : "10",
              discount : "0.8",
              startDate : "2019-06-01",
              endDate : "2019-07-01"
            },
            {
              id : "3",
              name : "优惠c",
              description : "这是优惠c",
              targetCount : "15",
              discount : "0.75",
              startDate : "2019-07-01",
              endDate : "2019-08-01"
            }
          ]
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
        deleteRecharge: function () {
          this.$confirm('确认删除该优惠？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        },
        deleteDiscount: function () {
          this.$confirm('确认删除该优惠？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>
  .label{

  }
</style>
