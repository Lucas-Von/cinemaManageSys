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
                  <el-button type="primary" class="label">添加影厅</el-button>
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
                      stripe=true
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
                        <el-button type="primary" size="small" @click="">修改影厅</el-button>
                        <el-button type="danger" size="small" @click="deleteHall">删除影厅</el-button>
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
      name: "RootHallManagement",
      data(){
        return{
          isCollapse:false,
          hallData : [
            {
              id : "1",
              name : "影厅A",
              capicity : 0,
              row : 10,
              column : 15
            },
            {
              id : "2",
              name : "影厅B",
              capicity : 0,
              row : 6,
              column : 9
            },
            {
              id : "3",
              name : "影厅C",
              capicity : 0,
              row : 8,
              column : 12
            }
          ]
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
        deleteHall: function () {
          this.$confirm('确认删除该影厅？','提示',{})
            .then(() => {

            })
            .catch(() => {})
        }
      }
    }
</script>

<style scoped>

</style>
