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

          <div v-for="(item,index) in ids">
            <el-col :span="6">
          <el-card  style="width: 210px;height: 350px;margin-top: 10px" >
            <span><h1>{{scheduleItem.movieName}}</h1></span>
            <span><img :src="img" width="100px" height="120px"></span><br>
            <span>影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{scheduleItem.hallName}}</span><br>
            <span>日&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp期：{{scheduleItem.startTime.substring(0,10)}}</span><br>
            <span>开始时间：{{scheduleItem.startTime.substring(11,19)}}</span><br>
            <span>结束时间：{{scheduleItem.endTime.substring(11,19)}}</span><br>
            <span>座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{item.rowIndex}}排{{item.columnIndex}}座</span>
          </el-card>
            </el-col>
          </div>
          <el-col :span="6" style="margin-left: 40px">
            <span><h1>原&nbsp&nbsp&nbsp&nbsp价：{{scheduleItem.fare*ids.length}}</h1></span><br>
            <span><h1>优惠政策：{{coupon}}</h1></span><br>
            <span><el-col :span="12" ><el-button style="width: 200px;margin-left: 40px;margin-top: 10px" @click="ComonBuy">普通支付</el-button></el-col>

            </span><br><br><br><br><br><br><br><br>
            <span >
              <div v-if="vip">
               <el-col :span="12" ><el-button style="width: 200px;margin-left: 40px;margin-top: 10px" @click="VipBuy">会员支付</el-button></el-col>

          </div>
            </span><br><br><br><br><br>

          </el-col>
          <el-form v-show="false" :model="seat">
            <el-form-item label="会员卡号" prop="scheduleId" >
              <span v-text="seat.scheduleId">{{seat.scheduleId}}"</span>
            </el-form-item>

            <el-form-item label="充值金额" prop="userId">
              <span v-text="seat.userId">{{seat.userId}}"</span>
            </el-form-item>
            <el-form-item label="充值金额" prop="sit">
              <span v-text="seat.sit">{{seat.sit}}"</span>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  import {
    getMovie,getVIP,getOccupiedSeat,lockSeats,getCoupon,getCommonBuy,getTicketByUserId,getVipBuy
  }from "../../api/userAPI"
    export default {
        name: "Moviecharge",
      data(){
        return{
          scheduleItem:[],
          isCollapse:false,
          ids:[],
          total:'',
          vip:'',
          vipid:'',
          ticketid:[],
          img:'',
          detail:[],
          movieid:'',
          coupon:[],
          lock:[],
          sit:{
            columnIndex:'',
            rowIndex:'',
          },
          seat:{
            scheduleId:'',
            userId:'',
            seats:''
          },
        }
      },
      methods: {
        VipBuy(){
          this.$confirm('确认购买?', '提示', {})
            .then(() => {
              getTicketByUserId(sessionStorage.getItem('userId')).then((res)=>{
                for(let k in res.data.content){
                  if(k>=res.data.content.length-this.ids.length){

                    console.log(res.data.content[k])
                    this.ticketid=this.ticketid.concat(Number(res.data.content[k].id))
                  }
                }
                console.log(this.ticketid)
                this.VipBuy2()

              },(error) => console.log('promise catch err'));
            })
            .catch(() => { });

        },

        VipBuy2(){
          getVipBuy(this.ticketid,0).then((res)=>{
            console.log("fsadds")
            console.log(res)
            this.total=res.data.content.total
            alert("购票成功")
            this.$router.push({path: '/user/MyMovie'});

          },(error) => console.log('promise catch err'));
        },
          ComonBuy(){
            this.$confirm('确认购买?', '提示', {}).then(() => {
                getTicketByUserId(sessionStorage.getItem('userId')).then((res)=>{
                  for(let k in res.data.content){
                    if(k>=res.data.content.length-this.ids.length){

                      console.log(res.data.content[k])
                      this.ticketid=this.ticketid.concat(Number(res.data.content[k].id))
                    }
                  }
                  console.log(this.ticketid)
                  this.ComonBuy2()

                },(error) => console.log('promise catch err'));
              }

              )
              .catch(() => { });




          },


        ComonBuy2(){
            getCommonBuy(this.ticketid,0).then((res)=>{
              console.log("fsadds")
                console.log(res)
              this.total=res.data.content.total
              alert("购票成功")
              this.$router.push({path: '/user/MyMovie'});

              },(error) => console.log('promise catch err'));
        },
          judegeVip(){
            getVIP(sessionStorage.getItem('userId')).then((res)=>{
              if(res.data.content==null){
                this.vip=false
              }else{
                this.vip=true
                this.vipid=res.data.content.id
                console.log(this.vipid)
              }
              console.log(res)

            },(error) => console.log('promise catch err'));
          },
        sds(){
          getMovie().then((res)=>{
            this.detail=res.data.content;
            console.log(this.movieid)
            for(let img in this.detail){

              if(this.detail[img].id==this.movieid){
                this.img=this.detail[img].posterUrl
              }
            }
            console.log(this.detail)
          },(error) => console.log('promise catch err'));
        },
        acti(){
          getCoupon(sessionStorage.getItem('userId')).then((res)=>{
            console.log("vfdf")
            this.coupon=res.data.content
            console.log(res)

          },(error) => console.log('promise catch err'));
        },
        movieSh() {

            getOccupiedSeat(this.ids[0].scheduleId).then((res) => {
              this.movieid = res.data.content.scheduleItem.movieId
              this.scheduleItem=res.data.content.scheduleItem
              console.log(this.scheduleItem.startTime)
              let arrayObj = [this.ids.length]
              for (let k in this.ids) {

                this.sit={
                  columnIndex:this.ids[k].columnIndex,
                    rowIndex:this.ids[k].rowIndex,
                },
                arrayObj[k]=this.sit
              }
              console.log(arrayObj)
              this.seats=arrayObj
              console.log("dsagfds")
              console.log(this.seats)
              this.locks()
              },(error) => console.log('promise catch err'));
        },
        locks(){
          this.seat.scheduleId=this.ids[0].scheduleId
          this.seat.userId=Number(sessionStorage.getItem('userId'))
          this.seat.seats=this.seats

          console.log("dsagfds")
          console.log(this.seat.seats)

          lockSeats(this.seat)(res => {
            console.log("hhhhhh")

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
        this.ids=ids
        console.log("dfsa")
        console.log(ids)
        this.movieSh()
        this.sds()
        this.acti()
        this.judegeVip()
      }
    }

</script>

<style scoped>


</style>

