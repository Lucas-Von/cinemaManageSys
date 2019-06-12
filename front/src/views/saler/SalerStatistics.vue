<template xmlns:vertical-align="http://www.w3.org/1999/xhtml">
  <div class="app" >
    <el-container >
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               :width="isCollapse ? '60' : '60'"
               :height="isCollapse ? '60' : '60'"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <!-- 我是样例菜单 -->

          <el-menu default-active="3"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">

            <el-menu-item index="1" @click="toMovie">
              <i class="el-icon-s-grid"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toScheduleManagement">
              <i class="el-icon-s-management"></i>
              <span slot="title">排片管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toStatistics">
              <i class="el-icon-s-data" ></i>
              <span slot="title">影院统计</span>
            </el-menu-item>
            <el-menu-item index="4" @click="toActivityPublishment">
              <i class="el-icon-s-ticket" ></i>
              <span slot="title">优惠劵发布策略</span>
            </el-menu-item>
            <el-menu-item index="5" @click="logout">
              <i class="el-icon-switch-button"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main class="app-body">
          <el-row >
            <el-date-picker
              v-model="targetDate"
              type="date"
              placeholder="请选择查询日期"
            style="width: 950px">
            </el-date-picker>
            &nbsp&nbsp&nbsp&nbsp&nbsp
            <el-button type="primary" @click="check(targetDate)">查询</el-button>
          </el-row><br><br>
              <div>
                <el-col :span="12">
                  <div id='scheduleRate' :style="{width:'400px',height:'500px'}"></div>
                </el-col>
                <el-col :span="12">
                  <div id='boxOffice' :style="{width:'400px',height:'500px'}"></div>
                </el-col>
              </div>
            <br><br>

            <div>
                <el-col :span="12">
                  <div id='placingRate' :style="{width:'400px',height:'500px'}"></div>
                </el-col>
                <el-col :span="12">
                  <div id='audiencePrice' :style="{width:'400px',height:'500px'}"></div>
                </el-col>
            </div>
            <el-col :span="6">
              <br/><br/><br/>
              <el-row>
                最受欢迎电影排行榜
              </el-row>
              <el-table
                :data="popularMovieData"
                :stripe=true
                :height="600"
                style="width: 100%">
                <el-table-column
                  prop="sequence"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="电影名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="boxOffice"
                  label="票房"
                  width="100">
                </el-table-column>
              </el-table>
            </el-col>

          <!--</template>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getAudiencePrice, getScheduleRate, getPlacingRate, getTotalBoxOffice, getPopularMovies} from "../../api/salerAPI"

    export default {
        name: "SalerStatistics",
      data() {
          return{
            targetDate: new Date(),
            scheduleRateData: [],
            scheduleRate: [],
            boxOfficeData: [],
            boxOffice: [],
            placingRateData: [],
            placingRate: [],
            audiencePriceData: [],
            audiencePrice: [],
            popularMovieData: []
          }
      },
      methods: {
        toActivityPublishment: function () {
          this.$router.push({path: '/saler/ActivityPublishment'});
        },
        toMovie: function () {
          this.$router.push({path: '/saler/Movie'});
        },
        toScheduleManagement: function () {
          this.$router.push({path: '/saler/ScheduleManagement'});
        },
        toStatistics: function () {
          this.$router.push({path: '/saler/Statistics'});
        },
        logout: function () {
          this.$confirm('确认退出?', '提示', {})
            .then(() => {
              sessionStorage.removeItem('user');
              this.$router.push('/login');
            })
            .catch(() => {
            });
        },

        /*--------------------------------------------------*/

        check: function(date) {
          this.getScheduleRate(date);
          this.getPlacingRate(date);
        },

        /*--------------------------------------------------*/

        getScheduleRate: function(date) {
          this.scheduleRate = [];
          this.scheduleRateData = [];
          getScheduleRate(date.toLocaleDateString()).then(res => {
            if (res.success){
              let list = res.content;
              for (let i = 0; i < list.length; i ++){
                this.scheduleRate.push(list[i].name);
                this.scheduleRateData.push({
                  name: list[i].name,
                  value: list[i].time
                })
              }
              this.drawScheduleRate(date);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        getBoxOffice: function() {
          this.boxOffice = [];
          this.boxOfficeData = [];
          getTotalBoxOffice().then(res => {
            if (res.success){
              let list = res.content;
              for (let i = 0; i < list.length; i ++){
                this.boxOffice.push(list[i].name);
                this.boxOfficeData.push({
                  name: list[i].name,
                  value: list[i].boxOffice
                })
              }
              this.drawBoxOffice();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        getPlacingRate: function(date) {
          this.placingRate = [];
          this.placingRateData = [];
          getPlacingRate(date.toLocaleDateString()).then(res => {
            if (res.success){
              let list = res.content;
              for (let i = 0; i < list.length; i ++){
                this.placingRate.push(list[i].name);
                this.placingRateData.push({
                  name: list[i].name,
                  value: list[i].placingRate
                })
              }
              this.drawPlacingRate(date);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        getAudiencePrice: function() {
          this.audiencePrice = [];
          this.audiencePriceData = [];
          getAudiencePrice().then(res => {
            if (res.success){
              let list = res.content;
              for (let i = 0; i < list.length; i ++){
                this.audiencePrice.push(list[i].date.substring(0, 10));
                this.audiencePriceData.push(list[i].price)
              }
              console.log(this.audiencePrice);
              console.log(this.audiencePriceData);
              this.drawAudiencePrice();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        getPopularMovie: function() {
          getPopularMovies(7, 3).then(res => {
            if (res.success){
              let list = res.content;
              for (let i = 0; i < list.length; i ++){
                this.popularMovieData.push({
                  sequence: i + 1,
                  name: list[i].name,
                  boxOffice: list[i].boxOffice
                })
              }
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        /*--------------------------------------------------*/

        drawScheduleRate: function (date) {
          let scheduleRate = this.$echarts.init(document.getElementById('scheduleRate'));

          let option = {
            title: {
              text: '排片率',
              subtext: '截止至' + date.toLocaleDateString(),
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: this.scheduleRate
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: this.scheduleRateData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          scheduleRate.setOption(option);
        },

        drawBoxOffice: function () {
          let boxOffice = this.$echarts.init(document.getElementById('boxOffice'));

          let option = {
            title: {
              text: '累计票房',
              subtext: '截止至今日',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: this.boxOffice
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: this.boxOfficeData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }

          boxOffice.setOption(option);
        },

        drawPlacingRate: function (date) {
          let placingRate = this.$echarts.init(document.getElementById('placingRate'));

          let option = {
            title: {
              text: '上座率',
              subtext: '截止至' + date.toLocaleDateString(),
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: this.placingRate
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: this.placingRateData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          placingRate.setOption(option);
        },

        drawAudiencePrice: function () {
          let audiencePrice = this.$echarts.init(document.getElementById('audiencePrice'));

          let option = {
            title: {
              text: '客单价',
              subtext: '截止至今日',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: this.audiencePrice
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: this.audiencePriceData,
              type: 'line',
              smooth: true
            }]
          };
          audiencePrice.setOption(option);
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
      },
      mounted: function () {
          this.getScheduleRate(new Date());
          this.getBoxOffice(new Date());
          this.getPlacingRate(new Date());
          this.getAudiencePrice(new Date());
          this.getPopularMovie();
      }
    }
</script>

<style scoped>

</style>
