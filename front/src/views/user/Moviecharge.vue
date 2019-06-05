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
          <!-- 我是样例菜单 -->


          <el-menu default-active="1-5-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">

            <el-menu-item index="1" @click="getMovie">
              <i class="el-icon-camera"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getmymovie">
              <i class="el-icon-menu"></i>
              <span slot="title">我的电影票</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getmycard">
              <i class="el-icon-document"></i>
              <span slot="title">我的会员卡</span>
            </el-menu-item>
            <el-menu-item index="4" @click="getinfo">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting" @click="logout"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div style="width: 60px; cursor: pointer;"
             @click.prevent="toggleSideBar">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>

        </div>
        <!-- 我是样例菜单 -->
        <el-menu default-active="1"
                 class="el-menu-demo tab-page"
                 mode="horizontal"
                 @select="handleSelect"
                 active-text-color="#409EFF">

        </el-menu>
      </el-aside>



      <el-container>

        <el-main class="app-body">
          <el-steps :active="3" finish-status="success" simple>
            <el-step title="电影详情" ></el-step>
            <el-step title="选座" ></el-step>
            <el-step title="支付" ></el-step>
          </el-steps>
          <!--<template>-->
            <!--<el-table-->
              <!--:data="scheduleItem"-->
              <!--style="width: 100%">-->
              <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="海报"-->
                <!--width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px"><img :src="img"></span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="日期"-->
                <!--width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{ scope.row.startTime.substring(0,10)}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="startTime"-->
                <!--label="放映开始时间"-->
                <!--width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{ scope.row.startTime.substring(11,19)}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="endTime"-->
                <!--label="放映结束时间"-->
                <!--width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{ scope.row.endTime.substring(11,19)}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="province"-->
                <!--label="放映厅"-->
                <!--width="200">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{ scope.row.hallName}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="city"-->
                <!--label="票价"-->
                <!--width="200">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{ scope.row.fare}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->

            <!--</el-table>-->
          <!--</template>-->
          <div v-for="(item,index) in scheduleItem">
            <el-col :span="6">
          <el-card  style="width: 210px;height: 350px;margin-top: 10px" >
            <span><h1>{{item.movieName}}</h1></span>
            <span><img :src="img" width="100px" height="120px"></span><br>
            <span>影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{item.hallName}}</span><br>
            <span>日&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp期：{{item.startTime.substring(0,10)}}</span><br>
            <span>开始时间：{{item.startTime.substring(11,19)}}</span><br>
            <span>结束时间：{{item.endTime.substring(11,19)}}</span><br>
            <span>座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{ids[index].rowIndex}}排{{ids[index].columnIndex}}座</span>
          </el-card>
            </el-col>
          </div>
          <el-col :span="6">
            <span><h1>原&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{scheduleItem.length*scheduleItem[0].fare}}</h1></span>
            <span><h1>优惠政策：{{scheduleItem.length*scheduleItem[0].fare}}</h1></span>

          </el-col>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat,getActicity
  }from "../../api/userAPI"
    export default {
        name: "Moviecharge",
      data(){
        return{
          scheduleItem:[],
          isCollapse:false,
          ids:[],
          img:'',
          detail:[],
          movieid:'',
          activity:[]
        }
      },
      methods: {
        sds(){
          getMovie().then((res)=>{
            this.detail=res.data.content;
            console.log(this.movieid)
            for(let img in this.detail){

              if(this.detail[img].id==this.movieid){
                this.img=this.detail[img].posterUrl
                console.log("dfsds")
              }
            }
            console.log(this.detail)
          },(error) => console.log('promise catch err'));
        },
        acti(){
          getActicity().then((res)=>{
            this.activity=res.data.content;
            console.log(this.activity)

          },(error) => console.log('promise catch err'));
        },
        movieSh() {
          for (let k in this.ids){
            getOccupiedSeat(this.ids[k].scheduleId).then((res) => {
              this.scheduleItem=this.scheduleItem.concat(res.data.content.scheduleItem)

              console.log(this.scheduleItem)
              this.movieid=this.scheduleItem[0].movieId

            }, (error) => console.log('promise catch err'));
          }

        },

        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },
        logout: function () {
          this.$confirm('确认退出?', '提示', {})
            .then(() => {
              sessionStorage.removeItem('user');
              this.$router.push('/login');
            })
            .catch(() => { });
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
        getMovie(event){
          this.$router.push({path: '/user/MovieList'});
        },
        getmymovie(event){
          this.$router.push({path: '/user/MyMovie'});
        },
        getmycard(event){
          this.$router.push({path: '/user/MyCard'});
        },
        getinfo(event){
          this.$router.push({path: '/user/Info'});
        },
        coming(event){
          this.$router.push({path: '/user/Coming'});
        },
        intheather(event){
          this.$router.push({path: '/user/MovieList'});
        },

      },
      create(){

      },
      mounted() {
        let ids=this.$route.query.id;
        this.ids=ids
        console.log(ids[0])
        this.movieSh()
        this.sds()
        this.acti()
      }
    }

</script>

<style scoped>


</style>

