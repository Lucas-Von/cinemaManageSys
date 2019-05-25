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
          <el-menu default-active="3"
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
                  <el-button type="primary" class="label">添加退票策略</el-button>
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
                        <el-button type="danger" size="small" @click="deleteStrategy">删除策略</el-button>
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
    export default {
      name: "RootRefundStrategy",
      data(){
          return{
            refundData : [
              {
                id : "1",
                name : "策略1",
                description : "描述1",
                remainingTime : 90,
                percentage : 0.8
              },
              {
                id : "2",
                name : "策略2",
                description : "描述2",
                remainingTime : 60,
                percentage : 0.6
              },
              {
                id : "3",
                name : "策略3",
                description : "描述3",
                remainingTime : 30,
                percentage : 0.5
              },
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
        deleteStrategy: function () {
          this.$confirm('确认删除该策略？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
