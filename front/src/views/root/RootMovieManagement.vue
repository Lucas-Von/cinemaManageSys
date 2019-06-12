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
          <el-menu default-active="1"
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
            <el-row>
              <el-col :span="3">
                选择电影
              </el-col>
              <el-col :span="4">
                <el-select v-model="movieId" placeholder="请选择">
                  <el-option
                    v-for="item in movieList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">
                &nbsp
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
            </el-row>
            <el-row>
              <div id="chart" :style="{width:'400px',height:'500px'}">
              </div>
            </el-row>
            <div v-for="item in movieData" :key="item.name">
              <div v-show="item.status==0">
                <el-col :span="4.5" >
                  <el-card class="box-moviecard">
                    <br>
                    <div class="box-inside">
                      <router-link :to="{path:'/saler/MovieDetails/id',query:{id:item}}">
                        <img class="movie" height="320px" width="250px" :src="item.posterUrl" >
                      </router-link>
                      <div style="padding: 10px;">
                        <h3 class="text">{{item.name}}</h3>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="1.5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</el-col>
              </div>
            </div>
            <div id="charts"></div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--</div>-->
</template>



<script>
  import {getAllMovieLike} from "../../api/rootAPI"

    export default {
      name: "RootMovieManagement",
      data() {
        return{
          isCollapse:false,
          movieLikeData: []
        }
      },
      methods: {
        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },
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
            .catch(() => {});
        },

        /*--------------------------------------------------*/

        // getMovieLike: function (movieId) {
        //   getMovieLikeByDate(movieId).then(res => {
        //     if (res.success){
        //       this.movieLikeData = res.content;
        //       let chart = this.$echarts.init(document.getElementById('chart'));
        //       let xArray = [];
        //       let yArray = [];
        //       let movieName = "";
        //       console.log(this.movieId);
        //       console.log(this.movieList);
        //       for (let i = 0; i < this.movieList.length; i ++){
        //         if (this.movieList[i].value === this.movieId){
        //           movieName = this.movieList[i].label;
        //           break;
        //         }
        //       }
        //       for (let i = 0; i < this.movieLikeData.length; i ++){
        //         xArray.push(this.movieLikeData[i].likeTime);
        //         yArray.push(parseInt(this.movieLikeData[i].likeNum));
        //       }
        //       let option = {
        //         title: {
        //           text: '想看人数变化',
        //           subtext: movieName,
        //           left: 'center'
        //         },
        //         xAxis: {
        //           type: 'category',
        //           data: xArray
        //         },
        //         yAxis: {
        //           type: 'value'
        //         },
        //         series: [{
        //           data: yArray,
        //           type: 'line'
        //         }]
        //       };
        //       console.log(option);
        //       chart.setOption(option);
        //     }
        //     else {
        //       this.$message({
        //         type: 'error',
        //         message: res.message
        //       });
        //     }
        //   })
        // },

        getMovieLikeData: function() {
          getAllMovieLike().then(res => {
            if (res.success){
              this.movieLikeData = res.content;
              this.drawCharts();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        drawCharts: function() {
          for (let i = 0; i < this.movieLikeData.length; i ++){
            let movieLike = this.movieLikeData[i];
            document.getElementById("charts").innerHTML += "<el-row><el-col :span='12'><div id='" + movieLike.id +"' :style=‘{width:'400px',height:'500px'}’></div></el-col></el-row>";
            let chart = this.$echarts.init(document.getElementById(movieLike.id));
            let xArray = [];
            let yArray = [];
            for (let j = 0; j < movieLike.dateLikeVOS.length; j ++){
              xArray.push(movieLike.dateLikeVOS[j].likeTime);
              yArray.push(movieLike.dateLikeVOS[j].likeNum);
            }
            console.log(xArray);
            console.log(yArray);
            let option = {
              title: {
                text: movieLike.name,
                left: 'center'
              },
              xAxis: {
                type: 'category',
                data: xArray
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: yArray,
                type: 'line'
              }]
            };
            chart.setOption(option);
          }
        },
      },
      mounted: function () {
        this.getMovieLikeData();
      }
    }
</script>

<style scoped>
</style>
