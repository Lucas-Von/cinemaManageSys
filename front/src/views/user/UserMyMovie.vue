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
            <el-menu-item index="4" @click="getinfo">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
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
          <template>
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <el-menu
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                >
                  <el-col :span="8" >
                    <el-menu-item index="1" @click="toUsed">待使用</el-menu-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-menu-item index="1" @click="toCharge">去支付</el-menu-item>
                  </el-col>

                  <el-col :span="8">
                    <el-menu-item index="2" @click="offUsed">购买记录</el-menu-item>
                  </el-col>

                </el-menu>

              </div>
            </nav>
          </template>

          <el-form   ref="inServForm" size="small">
            <el-form-item >
              <template>
                <el-table border :data="infiledList" style="width: 100%" >
                  <el-table-column prop="fildna" label="日期" style="width:6vw;" sortable>
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{scope.row.time.substring(0,10)}}&nbsp&nbsp&nbsp{{scope.row.time.substring(11,19)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fildna" label="海报" style="width:6vw;" >
                    <template slot-scope="scope">
                      <img :src=scope.row.posterUrl class="image" height="200px">
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="具体详情">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">电影名称：{{scope.row.name }}<br></span>
                      <span style="margin-left: 10px">开始时间：{{scope.row.startTime.substring(0,10)}}&nbsp&nbsp&nbsp{{scope.row.startTime.substring(11,19)}}<br></span>
                      <span style="margin-left: 10px">结束时间：{{scope.row.endTime.substring(0,10)}}&nbsp&nbsp&nbsp{{scope.row.endTime.substring(11,19)}}<br></span>
                      <span style="margin-left: 10px">影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{scope.row.hallName }}<br></span>
                      <span style="margin-left: 10px">票&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp数：{{scope.row.count }}<br></span>
                      <span style="margin-left: 10px">座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{scope.row.seats }}<br></span>
                      <span style="margin-left: 10px">总&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{scope.row.totalPrice }}<br></span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="outRow(scope.row.id)" size="small"> 出票 </el-button>
                      <el-button @click.native.prevent="reRow(scope.row.id)" size="small"> 退票 </el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </template>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    outMovie,getConsumptionRecord,refundMovie,refund
  }from "../../api/userAPI"
  export default {

    name: 'Container',
    data() {
      return {
        show:true,
        isDisabled:false,
        username: '',
        isCollapse: false,
        infiledList:[],
        f:'',
        des:[],
      }
    },
    methods: {
      sds(){
        this.refu()
        console.log(sessionStorage.getItem('userId'))
        getConsumptionRecord(sessionStorage.getItem('userId')).then((res)=>{
          console.log(res)
          console.log(res.data.content)
          for(let y in res.data.content){
            if(res.data.content[y].state==1){
              this.infiledList=this.infiledList.concat(res.data.content[y])
            }
          }
          for(let t in this.infiledList){
            let p=this.infiledList[t].seats.split(" ")
            let re=''
            for(let i in p){
              let in1=Number(p[i].indexOf("排"))
              let m=p[i].charAt(in1-1)
              let in2=Number(p[i].indexOf("座"))
              let n=p[i].charAt(in2-1)
              let sea=String(Number(m)+1)+"排"+String(Number(n)+1)+"座"+" "
              re=re+sea
            }
            console.log(re)
            this.infiledList[t].seats=re
          }


          console.log(this.infiledList)
        },(error) => console.log('promise catch err'));
      },
      refu(){
        refund().then((res)=>{

          this.f=res.data.content
          this.des=this.des.concat("请确认您需要退票？")
          for(let r in this.f){
            this.des=this.des.concat(this.f[r].description);
          }
          console.log(this.des)
        },(error) => console.log('promise catch err'));
      },
      reRow(salesId) {
        const newDatas = []
        const h = this.$createElement
        for (let i in this.des) {
          newDatas.push(h('p', null, this.des[i]))
        }


        this.$confirm(
          '提示',
          {
            title: '提示',
            message: h('div', null, newDatas),
            showCancelButton: true,         
            confirmButtonText: '确定',         
            cancelButtonText: '取消',         
            type: 'warning'
          }).then(() => {


          this.$message({
              type: 'success',
              message: '退票成功!',

            },
            refundMovie(salesId).then((res)=>{
              console.log(res)
              console.log(res.data.content)

            })
          );this.$router.go(0)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退票'
          });
        });
      },
      out(k){
        outMovie(k).then((res)=>{
          this.$router.push({path: '/user/MyMovie'});
        })
      },
      outRow(salesId) {
        this.$confirm('此操作将在影院出票，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
              type: 'success',
              message: '出票成功!',
            },
            this.out(salesId)
          );

          this.$router.go(0)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消出票'
          });
        });
      },
      addRow(tableData,event){
        tableData.push({ fildna: '',fildtp:'',remark:''
        })
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
      handleEdit(k) {
        if(k===true){
          this.orderuse=false
        }
      },

      handleDelete(index, row) {
        console.log(index, row);
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
      toUsed(event){
        this.$router.push({path: '/user/MyMovie'});
      },
      toCharge(event){
        this.$router.push({path: '/user/MyMovieBuy'});
      },

      offUsed(event){
        this.$router.push({path: '/user/MyMovieOff'});
      },
    },
    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }
      this.sds()
    },
  }

</script>

<style lang="scss" scoped>
  .el-carousel__item {
    width: 500px;
    display: flex;

    .carousel-image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .el-header {
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>



