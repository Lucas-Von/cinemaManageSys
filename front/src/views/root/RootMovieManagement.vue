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

          <el-menu default-active="1"
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
            <el-row class="add-schedule" type="flex" justify="end">
              <el-col :span="6">
                <div>
                  <el-button type="primary" @click="addSchedule">添加排片</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col :span="2"></el-col>
              <el-col :span="8" class="hall-select">
                请选择影厅：
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--<div>-->
    <!--<el-dialog title="新增排片" :visible.sync="dialogFormVisible">-->
      <!--<div>ABC</div>-->
    <!--</el-dialog>-->

  <!--</div>-->
</template>



<script>
    export default {
      name: "RootMovieManagement",
      data() {
        return{
          // dialogFormVisible : false,
          options: [{
            value: '0',
            label: '影厅A'
          }, {
            value: '1',
            label: '影厅B'
          }, {
            value: '2',
            label: '影厅C'
          }, {
            value: '3',
            label: '影厅D'
          }, {
            value: '4',
            label: '影厅E'
          }],
          value: ''
        }
      },
      methods: {
        addSchedule : function(){
          this.dialogFormVisible =true
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
        }
      }
    }
</script>

<style scoped>
</style>
