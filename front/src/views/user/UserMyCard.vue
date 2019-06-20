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
              <i class="el-icon-s-grid"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getmymovie">
              <i class="el-icon-s-ticket"></i>
              <span slot="title">我的电影票</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getmycard">
              <i class="el-icon-postcard"></i>
              <span slot="title">我的会员卡</span>
            </el-menu-item>
            <!--<el-menu-item index="4" @click="getinfo">-->
              <!--<i class="el-icon-setting"></i>-->
              <!--<span slot="title">个人信息</span>-->
            <!--</el-menu-item>-->
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

          <el-col :span="12">
          <el-card class="box-card" >
            <img  height="320px" width="cover" src="@/assets/VIP.jpg">

          </el-card>
          </el-col>
          <el-col :span="12">
          <el-card class="box-card" >

            <div v-if="vip">
              <div slot="header" class="clearfix">
                <span style="margin: 150px">恭喜！你已是会员！<br></span>
                <el-divider></el-divider>
              </div>
              <span style="margin: 80px;margin-top: 20px">会员卡号:{{vipme.id}}</span><br><br><br><br>

              <span style="margin: 80px">余&nbsp&nbsp&nbsp&nbsp&nbsp额：{{vipme.balance}}</span><br><br>

              <!--<span style="margin: 80px">会&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp员:&nbsp&nbsp&nbsp小&nbsp&nbsp&nbsp印</span><br><br><br><br>-->
              <!--<span style="margin: 80px">余&nbsp&nbsp&nbsp&nbsp&nbsp额：1000000000000</span><br><br>-->
              <span style="margin: 80px">

              <el-button type="primary" class="label" @click="chargecard" style="margin-top: 50px">充值会员卡</el-button>
                  <el-dialog title="充值会员卡" :visible.sync="chargevipDialogVisiable" :before-close="closeRechargeDialog">
                      <el-form :model="chargevip" :rules="rule">
                        <el-form-item label="会员卡号" prop="vipId" >
                          <el-input v-model="chargevip.vipId"></el-input>
                      </el-form-item>

                        <el-form-item label="充值金额" prop="amount">
                        <el-input v-model="chargevip.amount"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitcard">充值</el-button>
                        <el-button @click="closeRechargeDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>



              </span>


            </div>
            <div v-if="!vip">
              <div slot="header" class="clearfix">
                <span style="margin: 150px">抱歉！你还不是会员！<br></span>
                <el-divider></el-divider>
              </div>
              <span style="margin: 80px">
                <el-button type="primary" class="label" @click="getVip">购买会员卡</el-button>
                  <el-dialog title="购买会员卡" :visible.sync="buyvipDialogVisiable" :before-close="closeRechargeDialog">
                      <el-form>

                      <el-form-item>
                        <el-button type="primary" @click="submitRecharge">购买</el-button>
                        <el-button @click="closeRechargeDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
              </span>



            </div>
          </el-card>
          </el-col>

          <div>
            <h2>充值记录</h2>
            <div v-if="vip">
            <template>
              <el-table
                :data="tableData2"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="充值时间"
                  width="360"
                  sortable>
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time.substring(0,10)}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ scope.row.time.substring(11,19)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cate"
                  label="充值金额"
                  width="250">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.amount}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="givmoney"
                  label="赠送金额">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.plusAmount}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="balance"
                  label="余额">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.balance}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat,getTicketByUserId,getConsumptionRecord,getVIP,getRechargeRecord,addVIP,chargeVIP,getcardActicity
  }from "../../api/userAPI"
  import {isInteger, isDecimalLessThanOne} from "../../api/util"
  export default {

    name: 'Container',
    data() {
      return {
        activity:[],
        username: '',
        isCollapse: false,
        vip:'',
        vipid:'',
        vipme:'',
        mon:200,
        buyvipDialogVisiable:false,
        chargevipDialogVisiable:false,
        chargevip:{
          vipId:'',
          amount:'',
        },
        rule:{
        vipId:{
          require:true,
          message: "请输入会员卡号",
          trigger: "blur"
        },
      amount:[{
        require: true,
        message: "请输入充值金额",
        trigger: "blur"
      },{

          validator: isInteger,
          trigger: "blur"
      }
        ]
      },

        tableData2: []
      }
    }
    ,


    methods: {
      getVip(){
      this.buyvipDialogVisiable=true
      },
      closeRechargeDialog: function () {
        this.buyvipDialogVisiable = false;
        this.chargevipDialogVisiable = false;
        this.resetTicketDialog()
      },
      resetTicketDialog: function() {
        this.chargevip.vipId = '';
        this.chargevip.amount = '';
      },
      submitRecharge() {

          this.submitvip(sessionStorage.getItem('userId'));
      },
      chargecard(){
        this.chargevipDialogVisiable=true
      },
      submitcard(){
        this.rechaegecard(this.chargevip);
      },
      rechaegecard(m){

        chargeVIP(m).then(res => {
          if (res.data.success){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.closeRechargeDialog();

            this.sds()
          }
          else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      },
      submitvip(k) {
        addVIP(k).then(res => {
          if (res.data.success){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.closeRechargeDialog();
            this.sds()
          }
          else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      },

      // CardAc(){
      //   console.log("gdsf")
      //   getcardActicity.then((res)=>{
      //
      //     console.log(res)
      //   },(error) => console.log('promise catch err'));
      // },
      sds(){
        getVIP(sessionStorage.getItem('userId')).then((res)=>{
          if(res.data.content==null){
            this.vip=false
          }else{
            this.vip=true
            this.vipid=res.data.content.id
            this.vipme=res.data.content
            console.log(this.vipid)
            this.getload()
          }
          console.log(res)

        },(error) => console.log('promise catch err'));
      },
      getload(){
        getRechargeRecord(this.vipid).then((res)=>{
          console.log(res.data.content)
          this.tableData2=res.data.content
        },(error) => console.log('promise catch err'));
      },
      deleteRow(vip) {
        this.$confirm('此操作将在影厅出票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
              type: 'success',
              message: '出票成功!',

            },
            vip=true
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消出票'
          });
        });
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
    },
    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }

      this.sds()
      // this.CardAc()
    },
  }

</script>

<style>
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      margin-left: 30px;
      width: 470px;
      height: 360px;
    }

</style>


