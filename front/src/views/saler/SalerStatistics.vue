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
              <i class="el-icon-camera"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toScheduleManagement">
              <i class="el-icon-menu"></i>
              <span slot="title">排片管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document" @click="toStatistics"></i>
              <span slot="title">影院统计</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting" @click="toActivityPublishment"></i>
              <span slot="title">优惠劵发布策略</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting" @click="logout"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>

        <el-main class="app-body">
          <!--<template>-->
            <div id='myChart' :style="{width:'300px',height:'300px'}">
            </div>
          <el-button type="primary" @click="drawLine">!!</el-button>
          <!--</template>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import echarts from 'echarts'


    export default {
        name: "SalerStatistics",
      data() {
          return{
          }
      },
      methods: {
        toActivityPublishment: function() {
          this.$router.push({path: '/saler/ActivityPublishment'});
        },
        toMovie: function() {
          this.$router.push({path: '/saler/Movie'});
        },
        toScheduleManagement: function() {
          this.$router.push({path: '/saler/ScheduleManagement'});
        },
        toStatistics: function() {
          this.$router.push({path: '/saler/Statistics'});
        },
        logout: function () {
          this.$confirm('确认退出?', '提示', {})
            .then(() => {
              sessionStorage.removeItem('user');
              this.$router.push('/login');
            })
            .catch(() => { });
        },

        drawLine: function () {
          console.log("aaaa");

          let myChart = this.$echarts.init(document.getElementById('myChart'));

          // var option = {
          //   title : {
          //     text: '今日排片率',
          //     subtext: new Date().toLocaleDateString(),
          //     x:'center'
          //   },
          //   tooltip : {
          //     trigger: 'item',
          //     formatter: "{a} <br/>{b} : {c} ({d}%)"
          //   },
          //   toolbox: {
          //     show : true,
          //     feature : {
          //       mark : {show: true},
          //       dataView : {show: true, readOnly: false},
          //       magicType : {
          //         show: true,
          //         type: ['pie', 'funnel']
          //       },
          //       restore : {show: true},
          //       saveAsImage : {show: true}
          //     }
          //   },
          //   calculable : true,
          //   series : [
          //     {
          //       name:'影片',
          //       type:'pie',
          //       radius : [30, 110],
          //       // center : ['50%', '50%'],
          //       // roseType : 'area',
          //       data:[{
          //         value: 1,
          //         name: "01"
          //       },
          //         {
          //           value: 2,
          //           name: "02"
          //         }]
          //     }
          //   ]
          // };

          let option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }]
          };
          console.log(document.getElementById('myChart'))
          myChart.setOption(option);
          console.log(myChart);
        }
      },
      mounted: function () {
        // this.drawLine();
      }
    }
</script>

<style scoped>

</style>
