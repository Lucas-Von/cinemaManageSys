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
              <i class="el-icon-setting"></i>
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

          <!--<template>-->
            <!--<el-table-->
              <!--:data="tableData"-->
              <!--style="width: 100%"-->
              <!--stripe>-->
              <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="日期"-->
                <!--width="180"-->
                <!--sortable>-->
                <!--<template slot-scope="scope">-->
                  <!--<i class="el-icon-time"></i>-->
                  <!--<span style="margin-left: 10px">{{ scope.row.date }}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="海报"-->
                <!--width="180">-->
                <!--<template slot-scope="scope">-->
                  <!--<img :src=scope.row.picture class="image" height="200px">-->
                <!--</template>-->
              <!--</el-table-column>-->

              <!--<el-table-column-->
                <!--label="具体详情"-->
                <!--width="250">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">电影名称：{{scope.row.film }}<br></span>-->
                  <!--<span style="margin-left: 10px">开始时间：{{scope.row.open}}<br></span>-->
                  <!--<span style="margin-left: 10px">结束时间：{{scope.row.finish}}<br></span>-->
                  <!--<span style="margin-left: 10px">影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{scope.row.room }}<br></span>-->
                  <!--<span style="margin-left: 10px">数&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp量：{{scope.row.num }}<br></span>-->
                  <!--<span style="margin-left: 10px">座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{scope.row.seat }}<br></span>-->
                  <!--<span style="margin-left: 10px">总&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{scope.row.money }}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="支付状态"-->
                <!--width="180">-->
                <!--<template slot-scope="scope">-->
                  <!--<span style="margin-left: 10px">{{scope.row.state}}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="操作">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button size="mini"  @click="open" id="new_yan" :disabled="scope.row.state=='未完成'">-->
                  <!--<span v-show="show">出票</span>-->
                  <!--<span v-show="!show" disabled=false>出票成功</span>-->
                  <!--</el-button>-->
                  <!--<br>-->
                  <!--<br>-->
                  <!--<br>-->
                  <!--<el-button-->
                    <!--size="mini"-->
                    <!--type="danger"-->
                    <!--@click="handleDelete(scope.$index, scope.row)"-->
                    <!--:disabled="scope.row.state=='未完成'">退票</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</template>-->
          <el-form :model="inServForm"  ref="inServForm" size="small">
            <el-form-item label="待使用">
              <template>
                <el-table border :data="infiledList" style="width: 100%" >
                  <el-table-column prop="fildna" label="日期" style="width:6vw;" sortable>
                    <template scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fildna" label="海报" style="width:6vw;" >
                    <template scope="scope">
                      <!--<el-input size="mini" v-model="scope.row.fildna" ></el-input>-->
                      <img :src=scope.row.picture class="image" height="200px">
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="具体详情">
                    <template scope="scope">
                      <span style="margin-left: 10px">电影名称：{{scope.row.film }}<br></span>
                      <span style="margin-left: 10px">开始时间：{{scope.row.open}}<br></span>
                      <span style="margin-left: 10px">结束时间：{{scope.row.finish}}<br></span>
                      <span style="margin-left: 10px">影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{scope.row.room }}<br></span>
                      <span style="margin-left: 10px">数&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp量：{{scope.row.num }}<br></span>
                      <span style="margin-left: 10px">座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{scope.row.seat }}<br></span>
                      <span style="margin-left: 10px">总&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{scope.row.money }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="deleteRow(scope.$index, infiledList,outfiledList)" size="small"> 出票 </el-button>
                      <el-button @click.native.prevent="deleteRow(scope.$index, infiledList)" size="small"> 退票 </el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </template>
            </el-form-item>
          </el-form>

          <el-form :model="inServForm"  ref="inServForm" size="small">
            <el-form-item label="已使用">
              <template>
                <el-table border :data="outfiledList" style="width: 100%" >
                  <el-table-column prop="fildna" label="日期" style="width:6vw;" sortable>
                    <template scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fildna" label="海报" style="width:6vw;" >
                    <template scope="scope">
                      <!--<el-input size="mini" v-model="scope.row.fildna" ></el-input>-->
                      <img :src=scope.row.picture class="image" height="200px">
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="具体详情">
                    <template scope="scope">
                      <span style="margin-left: 10px">电影名称：{{scope.row.film }}<br></span>
                      <span style="margin-left: 10px">开始时间：{{scope.row.open}}<br></span>
                      <span style="margin-left: 10px">结束时间：{{scope.row.finish}}<br></span>
                      <span style="margin-left: 10px">影&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp厅：{{scope.row.room }}<br></span>
                      <span style="margin-left: 10px">数&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp量：{{scope.row.num }}<br></span>
                      <span style="margin-left: 10px">座&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp位：{{scope.row.seat }}<br></span>
                      <span style="margin-left: 10px">总&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价：{{scope.row.money }}</span>
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
  export default {
    name: 'Container',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        show:true,
        isDisabled:false,
        username: '',
        isCollapse: false,
        infiledList:[
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-02',
            name: '王小虎',
            state:'未完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            finish:'2019-8-10 14:14',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          },
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-10',
            name: '王小虎',
            state:'已完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          },
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-02',
            name: '王小虎',
            state:'未完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            finish:'2019-8-10 14:14',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          }

        ],
        outfiledList:[
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-02',
            name: '王小虎',
            state:'未完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            finish:'2019-8-10 14:14',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          }

        ],
        imagesbox:[
          {id:0,idView:require("@/assets/test1.jpg")},
          {id:1,idView:require("@/assets/test2.jpg")},
          {id:2,idView:require("@/assets/test3.jpg")},
          {id:3,idView:require("@/assets/test4.jpg")},
          {id:4,idView:require("@/assets/test5.jpg")},
          {id:5,idView:require("@/assets/test6.jpg")}
        ],
        tableData: [{
          picture:require("@/assets/test1.jpg"),
          date: '2016-05-02',
          name: '王小虎',
          state:'未完成',
          film: '建国大业',
          room:'一号厅',
          open:'2019-8-10 12:12',
          finish:'2019-8-10 14:14',
          seat:'三排5座 三排4座',
          money:'66',
          num:2,
        },
          {
            picture:require("@/assets/test1.jpg"),
            date: '2016-05-10',
            name: '王小虎',
            state:'已完成',
            film: '建国大业',
            room:'一号厅',
            open:'2019-8-10 12:12',
            seat:'三排5座 三排4座',
            money:'66',
            num:2,
          }]
      }
    },
    methods: {
      deleteRow(index, rows,outfiledList) {
        this.$confirm('此操作将在影厅出票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '出票成功!',

          },
          rows.splice(index, 1),
            outfiledList.push( {
              picture:require("@/assets/test1.jpg"),
              date: '2016-05-10',
              name: '王小虎',
              state:'已完成',
              film: '建国大业',
              room:'一号厅',
              open:'2019-8-10 12:12',
              seat:'三排5座 三排4座',
              money:'66',
              num:2,
            })
          );
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
      open() {

        this.$confirm('此操作将在影厅出票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '出票成功!',

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消出票'
          });
        });
        this.show = false;
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
    },
    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }
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


