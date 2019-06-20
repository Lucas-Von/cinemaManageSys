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
              <span slot="title">电影喜爱统计</span>
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
              <el-col :span="4" style="margin-top: -15px">
                <h3>选 &nbsp择 &nbsp电 &nbsp影:</h3>
              </el-col>
              <el-col :span="10">
                <el-select v-model="movieId" placeholder="请选择" style="width: 400px">
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
              <el-col :span="6">
                <el-button type="primary" @click="search">查询</el-button>
              </el-col>
              <br><br><br><br>
            </el-row>

            <el-row v-if="show">
              <div id="chart" :style="{width:'400px',height:'500px'}">
              </div>
            </el-row>
            <el-row v-if="!show">

              <div  v-for="item in movieList"  :key="item.value" >
                <el-col :span="12" >
                <div :src="search2(item)" :id="item.value"  :style="{width:'400px',height:'500px'}">
                </div>
                </el-col>
              </div>

            </el-row>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--</div>-->
</template>



<script>
  import {getAllMovieLike, getMovieLikeByDate, getMovie} from "../../api/rootAPI"

    export default {
      name: "RootMovieManagement",
      data() {
        return{
          isCollapse:false,
          movieList: [],
          movieId: "",
          movieLikeData: [],
          show:false
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

        getAllMovie: function(){
          getMovie().then(res => {
            if (res.success){
              let list = res.content;
              this.movieList = [];
              for (let i = 0; i < list.length; i ++){
                this.movieList.push({
                  value: list[i].id,
                  label: list[i].name
                })
              }
            }
            console.log(this.movieList);
          })
        },

        /*--------------------------------------------------*/

        search:function(){

          if (this.movieId === ""){
            this.$message({
              type: 'error',
              message: '请选择电影'
            });
          }
          else {
            this.show=true
            this.getMovieLike(this.movieId);
          }
        },
        search2:function(k){
          console.log(k.value)
          if (k.value === ""){
            this.$message({
              type: 'error',
              message: '请选择电影'
            });
          }
          else {
            this.getMovieLike2(k);
          }
        },

        getMovieLike: function (movieId) {

          getMovieLikeByDate(movieId).then(res => {
            if (res.success){
              this.movieLikeData = res.content;
              let chart = this.$echarts.init(document.getElementById('chart'));
              let xArray = [];
              let yArray = [];
              let movieName = "";
              console.log(this.movieId);
              console.log(this.movieList);
              for (let i = 0; i < this.movieList.length; i ++){
                if (this.movieList[i].value === this.movieId){
                  movieName = this.movieList[i].label;
                  break;
                }
              }
              for (let i = 0; i < this.movieLikeData.length; i ++){
                xArray.push(this.movieLikeData[i].likeTime);
                yArray.push(parseInt(this.movieLikeData[i].likeNum));
              }
              let option = {
                title: {
                  text: '想看人数变化',
                  subtext: movieName,
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
              console.log(option);
              chart.setOption(option);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },
        getMovieLike2: function (t) {
          var movieId=t.value
          getMovieLikeByDate(movieId).then(res => {
            if (res.success){
              this.movieLikeData = res.content;
              let chart = this.$echarts.init(document.getElementById(t.value));
              let xArray = [];
              let yArray = [];
              let movieName = "";

              for (let i = 0; i < this.movieList.length; i ++){
                if (this.movieList[i].value === movieId){
                  movieName = this.movieList[i].label;
                  break;
                }
              }
              for (let i = 0; i < this.movieLikeData.length; i ++){
                xArray.push(this.movieLikeData[i].likeTime);
                yArray.push(parseInt(this.movieLikeData[i].likeNum));
              }
              let option = {
                title: {
                  text: '想看人数变化',
                  subtext: movieName,
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
              console.log(option);
              chart.setOption(option);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },


      },
      mounted: function () {
        this.getAllMovie();
      }
    }
</script>

<style scoped>
</style>
