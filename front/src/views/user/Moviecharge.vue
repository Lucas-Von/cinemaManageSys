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
            <span>座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{item.rowIndex}}排{{item.columnIndex-1}}座</span>
          </el-card>
            </el-col>
          </div>
          <el-col :span="6" style="margin-left: 40px">
            <span><h1>原&nbsp&nbsp&nbsp&nbsp价：{{scheduleItem.fare*ids.length}}</h1></span><br>
            <span>
              <el-col :span="8">
              <h1>优惠券：</h1></el-col>
              <el-col :span="16">
              <template>
                  <el-select  placeholder="请选择" style="margin-top: 10px"   @change="chickvalue" v-model="searchValue">
                    <el-option
                      v-for="item in coupon"
                      :key="item.id"
                      :label="item.description"
                      :value="item.description"
                      v-model="item.id">
                    </el-option>
                  </el-select>
                </template></el-col></span>
            <br><br><br><br>
            <span><h1>现&nbsp&nbsp&nbsp&nbsp价：{{scheduleItem.fare*ids.length-Number(discountA)}}</h1></span><br>
            <span v-if="vip">
              <h1>会&nbsp&nbsp员&nbsp&nbsp价：{{VipAmount.mount}}</h1>

            </span><br><br>
            <span>

              <el-col :span="12" ><el-button style="width: 200px;margin-left: 0px;margin-top: 5px" @click="ComonBuy">普通支付</el-button></el-col>

            </span><br><br><br><br>
            <span >
              <div v-if="vip">
               <el-col :span="12" ><el-button style="width: 200px;margin-left: 0px;margin-top: 5px" @click="VipBuy">会员支付</el-button></el-col>

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
    getMovie,getVIP,getOccupiedSeat,lockSeats,getCoupon,getCommonBuy,getTicketByUserId,getVipBuy,getCouponById,getVip
  }from "../../api/userAPI"
    export default {
        name: "Moviecharge",
      data(){
        return{
          VipAmount:'',
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
          discountA:'',
          discountId:0,
          lock:[],
          name:'',
          searchValue:'',
          sit:{
            columnIndex:'',
            rowIndex:'',
          },
          seat:{
            scheduleId:'',
            userId:'',
            seats:''
          },
          tick:'',
          battle:true,
        }
      },
      methods: {
          AllTic(){
            getTicketByUserId(sessionStorage.getItem('userId')).then((res)=>{
             this.tick=res.data.content
              console.log(this.tick)
              this.movieSh()
            },(error) => console.log('promise catch err'));
          },
        chickvalue () {
          getCouponById(this.searchValue).then((res) => {
            this.discountA=res.data.content.discountAmount
            this.discountId=res.data.content.id
            console.log(res)
            this.Vipmoney()

          }, (error) => console.log('promise catch err'));
        },

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
                  console.log(res)
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
            getCommonBuy(this.ticketid,this.discountId).then((res)=>{
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
              if(this.vip){
                this.Vipmoney()
              }

            },(error) => console.log('promise catch err'));
          },

        sds(){
          getMovie().then((res)=>{
            this.detail=res.data.content;
            console.log("!!!!!!!!!!!11")
            console.log(this.movieid)
            for(let img in this.detail){
              console.log(this.detail[img])
              if(this.detail[img].id==this.movieid){
                this.img=this.detail[img].posterUrl
                console.log(this.img)
              }
            }
          },(error) => console.log('promise catch err'));
        },

        movieSh() {

            getOccupiedSeat(this.ids[0].scheduleId).then((res) => {
              console.log(res)
              console.log(this.ids[0].scheduleId)
              this.movieid = res.data.content.scheduleItem.movieId
              this.scheduleItem=res.data.content.scheduleItem
              this.sds()
              console.log(this.scheduleItem)
              let arrayObj = [this.ids.length]
              for (let k in this.ids) {
                this.sit={
                  columnIndex:this.ids[k].columnIndex-2,
                    rowIndex:this.ids[k].rowIndex-1,
                },
                arrayObj[k]=this.sit
              }
              console.log(arrayObj)
              this.seats=arrayObj
              console.log("dsagfds")
              console.log(this.seats)
              this. acti()
              this.judegeVip()
              for(let y in this.tick){
                for(let x in this.seats){
                  if(this.tick[y].rowIndex==this.seats[x].rowIndex&&this.tick[y].columnIndex==this.seats[x].columnIndex&&this.tick[y].scheduleId==this.ids[0].scheduleId){
                    this.battle=false
                  }
                }
              }
              if(this.battle==true){

                this.locks()
              }


              },(error) => console.log('promise catch err'));
        },
        Vipmoney(){
          console.log(this.scheduleItem)
          getVip(this.scheduleItem.fare*this.ids.length-Number(this.discountA),this.ids.length).then((res)=>{
            this.VipAmount=res.data.content
          },(error) => console.log('promise catch err'));
        },
        acti(){
          getCoupon(sessionStorage.getItem('userId'),this.scheduleItem.fare*this.ids.length).then((res)=>{
            console.log(this.scheduleItem.fare*this.ids.length)
            this.coupon=res.data.content
            console.log(res)
            this.judegeVip()


          },(error) => console.log('promise catch err'));
        },
        locks(){
          this.seat.scheduleId=this.ids[0].scheduleId
          this.seat.userId=Number(sessionStorage.getItem('userId'))
          this.seat.seats=this.seats

          console.log(this.seat.seats)

          lockSeats(this.seat)(res => {

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
        this.AllTic()
        this.sds()
      }
    }

</script>

<style scoped>


</style>

