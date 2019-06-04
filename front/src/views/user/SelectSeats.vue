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
          <el-steps :active="2" finish-status="success" simple>
            <el-step title="电影详情" ></el-step>
            <el-step title="选座" ></el-step>
            <el-step title="支付" ></el-step>
          </el-steps>

          <el-col :span="18">
          <div>
            <h2 style="margin-left: 250px">荧&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp幕</h2>
          </div>
          <div v-for="(item,index1) in seats">

            <el-row style="margin: 10px" >
              <div v-for="(item2,index2) in item" >
                <el-col :span="1.8">
                  <el-button style="width: 70px;height: 50px"  v-show="txt[Number(index1*10)+Number(index2)]==0||1" @click="changeState(Number(index1*10)+Number(index2))"><img :src="!isInArray(init,txt[Number(index1*10)+Number(index2)].id+1)? imgUrl : imgUr2"></el-button>
                </el-col>
              </div>
            </el-row>
          </div>
            <div v-for="se in init">
              <span style="margin: 250px">已选座位：{{((se-se%seats[0].length)/(seats[0].length))+1}}排{{se%seats[0].length+1}}座</span>
            </div>
          </el-col>

          <el-col :span="6">
          <el-card class="box-card" style="width: 250px;height: 450px;margin-top: 10px" >
            <span><h1>{{ids.movieName}}</h1></span>
            <span><img :src="img" width="100px" height="120px"></span><br>
            <span>影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{ids.hallName}}</span><br>
            <span>日&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp期：{{ids.startTime.substring(0,10)}}</span><br>
            <span>开始时间：{{ids.startTime.substring(11,19)}}</span><br>
            <span>结束时间：{{ids.endTime.substring(11,19)}}</span><br>

            <div v-for="se in init">
              <span>已选座位：{{((se-se%seats[0].length)/(seats[0].length))+1}}排{{se%seats[0].length+1}}座</span>
            </div>
            <span>票&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{ids.fare*init.length}}</span><br>
            <router-link :to="{path:'/user/Moviecharge/id',query:{id:ticketALL}}">

              <el-button  size="small" style="margin-top: 40px"> 支付</el-button>
            </router-link>
          </el-card>
        </el-col>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat
  }from "../../api/userAPI"
  export default {
    name: "SelectSeats",
    data(){
      return{
        movieid:'',
        click: 'a',
        init:[],
        isCollapse:false,
        result:[],
        detail:[],
        ids:[],
        seats:[],
        sh:[],
        name:'',
        txt:[[]],
        index1:'',
        index2:'',
        imgUrl:require("@/assets/seatChoose.png"),
        imgUr2:require("@/assets/seatLock.png"),
        img:'',
        ticket:'',
        ticketALL:[]
      }
      },
    methods: {

      comp(){
        for(let se in init){
          let k=init[se]
          this.ticket={rowIndex:((k-k%this.seats[0].length)/(this.seats[0].length))+1,columnIndex:k%this.seats[0].length+1,scheduleId:this.sh.id}
          this.ticketALL=this.ticketALL.concat(this.ticket)
        }
      },

      changeState(k){

        var index = this.init.indexOf(k);

        if (index > -1) {
          this.init.splice(index, 1);
        }else{
          this.ticket={rowIndex:((k-k%this.seats[0].length)/(this.seats[0].length))+1,columnIndex:k%this.seats[0].length+1,scheduleId:this.sh.id}
          this.init=this.init.concat(k)
          this.ticketALL=this.ticketALL.concat(this.ticket)

          console.log(this.ticketALL)
          console.log(this.init)
        }

      },
      isInArray(arr,value){
           for(var i = 0; i < arr.length; i++){
                  if(value === arr[i]){
                       return true;
                        }
                }
                return false;
              },
      movieSh(){
        getOccupiedSeat(this.ids.id).then((res)=>{
          var n=0
          this.result=res.data.content;
          this.seats=this.result.seats
          this.sh=this.result.scheduleItem
          console.log(this.result.scheduleItem)
          console.log(this.result.seats)
          for(let index in this.result.seats) {
            for(let index2 in this.result.seats[index]) {
              this.txt=this.txt.concat({id:Number(index*10)+Number(index2),value:this.result.seats[index][index2]})
            };
          };
          console.log(this.txt)
          console.log(this.result.seats.length)
        },(error) => console.log('promise catch err'));
      },
      sds(){
        getMovie().then((res)=>{
          this.detail=res.data.content;
          for(let img in this.detail){
            if(this.detail[img].id==this.movieid){
              this.img=this.detail[img].posterUrl
            }
          }
          console.log(this.detail)
        },(error) => console.log('promise catch err'));
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
      let movieid=this.$route.query.id.movieId
      this.ids=ids
      this.movieid=movieid
      this.movieSh(this.ids)
      this.sds();
    }
  }

</script>

<style scoped>


</style>
