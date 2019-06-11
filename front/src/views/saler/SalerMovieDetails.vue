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
            <el-menu-item index="5" @click="logout">
              <i class="el-icon-setting"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main class="app-body">
          <el-row type="flex" justify="end">
            <el-col :span="2">
              <el-button @click="updateDetail">修改影片信息</el-button>
              <el-dialog title="修改影片信息" :visible.sync="detailDialogVisiable" :before-close="closeDetail">
                <el-form :model="detailForm" :rules="detailRules" ref="detailForm">
                  <el-form-item label="影片名称" prop="name">
                    <el-input v-model="detailForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="影片描述" prop="name">
                    <el-input type="text" v-model="detailForm.description"></el-input>
                  </el-form-item>
                  <el-form-item label="上映时间">
                    <el-col :span="8">
                      <el-form-item prop="startDate">
                        <el-date-picker placeholder="选择时间" v-model="detailForm.startDate" style="width: 100%"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="时长" prop="length">
                    <el-input v-model="detailForm.length"></el-input>
                  </el-form-item>
                  <el-form-item label="海报URL" prop="name">
                    <el-input v-model="detailForm.posterUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="制片国家" prop="name">
                    <el-input v-model="detailForm.country"></el-input>
                  </el-form-item>
                  <el-form-item label="类型" prop="name">
                    <el-input v-model="detailForm.type"></el-input>
                  </el-form-item>
                  <el-form-item label="语言" prop="name">
                    <el-input v-model="detailForm.language"></el-input>
                  </el-form-item>
                  <el-form-item label="导演" prop="name">
                    <el-input v-model="detailForm.director"></el-input>
                  </el-form-item>
                  <el-form-item label="主演" prop="name">
                    <el-input v-model="detailForm.starring"></el-input>
                  </el-form-item>
                  <el-form-item label="编剧" prop="name">
                    <el-input v-model="detailForm.screenWriter"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitDetail(detailForm)">保存</el-button>
                    <el-button @click="closeDetail">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-col>
            <el-col :span="1">
              &nbsp
            </el-col>
            <el-col :span="2">
              <el-button type="danger" @click="deleteMovie">下架电影</el-button>
            </el-col>
          </el-row>
          <div class="details">
            <img  height="350px" width="250px" :src="movieDetail.posterUrl" style="float:left" >
            <span><h1>{{movieDetail.name}}</h1></span><br>
            <span>简介：{{movieDetail.description}}</span><br><br>
            <span>上映：{{movieDetail.startDate.substring(0,10)}}</span><br>
            <span>时长：{{movieDetail.length}}</span><br>
            <span>地区：{{movieDetail.country}}</span><br>
            <span>类型：{{movieDetail.type}}</span><br>
            <span>语言：{{movieDetail.language}}</span><br>
            <span>导演：{{movieDetail.director}}</span><br>
            <span>主演：{{movieDetail.starring}}</span><br>
            <span>编剧：{{movieDetail.screenWriter}}</span>
          </div>

          <div>
            <el-tabs style="margin-top: 50px">
              <el-row type="flex" justify="end">
                <el-col>
                  <el-button type="primary" @click="addSchedule">添加排片</el-button>
                  <el-dialog title="添加排片" :visible.sync="scheduleDialogVisiable" :before-close="closeSchedule">
                    <el-form :model="scheduleForm" :rules="scheduleRules" ref="scheduleForm">
                      <el-form-item label="选择电影">
                        <template>
                          <el-select v-model="scheduleForm.movieId" placeholder="请选择">
                            <el-option
                              v-for="item in movieList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </template>
                      </el-form-item>
                      <el-form-item label="选择影厅">
                        <template>
                          <el-select v-model="scheduleForm.hallId" placeholder="请选择">
                            <el-option
                              v-for="item in hallList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </template>
                      </el-form-item>
                      <el-form-item label="选择时间">
                        <el-col :span="8">
                          <el-form-item prop="startTime">
                            <el-time-picker type="date" placeholder="开始时间" v-model="scheduleForm.startTime" style="width: 100%"></el-time-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp</el-col>
                        <el-col :span="8">
                          <el-form-item prop="endTime">
                            <el-time-picker placeholder="结束时间" v-model="scheduleForm.endTime" style="width: 100%"></el-time-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="票价" prop="fare">
                        <el-input v-model="scheduleForm.fare"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitSchedule(scheduleForm)">保存</el-button>
                        <el-button @click="closeSchedule">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-col>
              </el-row>
              <el-tab-pane
                v-for="item in scheduleList"
                :label="item.date.substring(0,10)"
                :key="item.date">
                <span v-if="!item.scheduleItemList.length>0">今日暂无排片</span>
                <span v-if="item.scheduleItemList.length>0">
                  <template>
                    <el-table
                      :data="item.scheduleItemList"
                      :height="250"
                      style="width: 80%">
                      <el-table-column
                        prop="movieName"
                        label="影片名称"
                        width="150">
                      </el-table-column>
                      <el-table-column
                        prop="hallName"
                        label="影厅名称"
                        width="150">
                      </el-table-column>
                      <el-table-column
                        prop="startTime"
                        label="开始时间"
                        :formatter = "startTimeFormat"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="endTime"
                        label="结束时间"
                        :formatter = "endTimeFormat"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="fare"
                        label="票价"
                        width="150">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                          <el-button type="primary" size="small" @click="updateSchedule(scope.row)">修改排片</el-button>
                          <el-button type="danger" size="small" @click="deleteSchedule(scope.row.id)">删除排片</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
              </span>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getMovieDetails, getMovie, getHall, getScheduleByMovieId, updateMovieDetail, deleteMovie, addSchedule, updateSchedule, deleteSchedule} from "../../api/salerAPI"
  import {isDecimal} from "../../api/util"

    export default {
        name: "SalerMovieDetails",
      data(){
          return{
            movieDetail: {},
            detailDialogVisiable: false,
            detailForm: {
              id: "",
              posterUrl: "",
              name: "",
              description: "",
              startDate: "",
              length: "",
              country: "",
              type: "",
              language: "",
              director: "",
              starring: "",
              screenWriter: ""
            },
            detailRules: {
              name: {
                required: true,
                message: "请输入影片名称",
                trigger: "blur"
              },
              startDate: {
                required: true,
                message: "请选择上映时间",
                trigger: "blur"
              },
              length: {
                required: true,
                message: "请输入时长",
                trigger: "blur"
              },
              country: {
                required: true,
                message: "请输入制片国家",
                trigger: "blur"
              },
              type: {
                required: true,
                message: "请输入类型",
                trigger: "blur"
              },
              language: {
                required: true,
                message: "请输入语言",
                trigger: "blur"
              },
              director: {
                required: true,
                message: "请输入导演",
                trigger: "blur"
              },
              starring: {
                required: true,
                message: "请输入主演",
                trigger: "blur"
              },
              screenWriter: {
                required: true,
                message: "请输入编剧",
                trigger: "blur"
              },
              posterUrl: {
                required: true,
                message: "请输入海报URL",
                trigger: "blur"
              },
            },
            scheduleDialogVisiable: false,
            scheduleForm: {
              id: "",
              hallId: "",
              movieId: "",
              startTime: "",
              endTime: "",
              fare: ""
            },
            scheduleRules: {
              hallId: {
                required: true,
                message: "请选择影厅",
                trigger: "blur"
              },
              movieId: {
                required: true,
                message: "请选择影片",
                trigger: "blur"
              },
              startTime: {
                required: true,
                message: "请选择时间",
                trigger: "blur"
              },
              endTime: {
                required: true,
                message: "请选择时间",
                trigger: "blur"
              },
              fare: [{
                required: true,
                message: "请填写票价",
                trigger: "blur"
              },
                {
                  validator: isDecimal,
                  trigger: "blur"
                }]
            },
            hallList: [],
            movieList: [],
            scheduleList: []
          }
      },
      methods:{
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

        /*--------------------------------------------------*/

        startTimeFormat: function(row) {
          return row.startTime.substring(11, 19);
        },

        endTimeFormat: function(row) {
          return row.endTime.substring(11, 19);
        },

        /*--------------------------------------------------*/

        getDetail: function (movieId) {
          let userId = sessionStorage.getItem("userId");
            getMovieDetails(movieId, userId).then(res => {
              if (res.success){
                this.movieDetail = res.content;
                this.detailForm = this.movieDetail;
              }
              else {
                this.$message({
                  type: 'error',
                  message: '请求数据错误'
                });
              }
            })
          },

        getSchedule: function(movieId) {
          getScheduleByMovieId(movieId).then(res => {
            let list = res.content;
            for (let i = 0; i < 7 && i < list.length; i++) {
              this.scheduleList.push(list[i]);
            }
          })
        },

        getMovieList: function(){
          this.movieList = [];
          getMovie().then(res => {
            let list = res.content;
            for (let i = 0; i < list.length; i ++){
              this.movieList.push({
                value: list[i].id,
                label: list[i].name
              })
            }
          })
        },

        getHallList: function() {
          this.hallList = [];
          getHall().then(res => {
            let list = res.content;
            for (let i = 0; i < list.length; i ++){
              this.hallList.push({
                value: list[i].id,
                label: list[i].name
              })
            }
          })
        },

        /*--------------------------------------------------*/

        updateDetail: function() {
          this.detailDialogVisiable = true;
        },

        closeDetail: function() {
          this.detailDialogVisiable = false;
        },

        submitDetail: function(params) {
          this.$refs.detailForm.validate((valid) => {
            if (valid){
              updateMovieDetail(params).then(res => {
                if (res.success){
                  this.getDetail(this.$route.query.id);
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });
                  this.closeDetail();
                }
                else {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                }
              })
            }
          })
        },

        /*--------------------------------------------------*/

        deleteMovie: function() {
          this.$confirm('确认下架?', '提示', {})
            .then(() => {
              let params = {
                movieIdList: [this.$route.query.id.id]
              };
              deleteMovie(params).then(res => {
                if (res.success){
                  this.$message({
                    type: 'success',
                    message: '下架成功'
                  });
                  this.$router.push({path: '/saler/Movie'});
                }
                else {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                }
              })
            })
            .catch(() => { });
        },

        /*--------------------------------------------------*/

        addSchedule: function () {
          this.scheduleDialogVisiable = true;
        },

        closeSchedule: function () {
          this.scheduleDialogVisiable = false;
          this.resetSchedule();
        },

        resetSchedule: function () {
          this.scheduleForm.id = "";
          this.scheduleForm.hallId = "";
          this.scheduleForm.movieId = "";
          this.scheduleForm.startTime = "";
          this.scheduleForm.endTime = "";
          this.scheduleForm.fare = "";
        },

        updateSchedule: function (params) {
          this.scheduleDialogVisiable = true;
          this.scheduleForm.id = params.id;
          this.scheduleForm.hallId = params.hallId;
          this.scheduleForm.movieId = params.movieId;
          this.scheduleForm.startTime = params.startTime;
          this.scheduleForm.endTime = params.endTime;
          this.scheduleForm.fare = params.fare;
        },

        submitSchedule: function (params) {
          this.$refs.scheduleForm.validate((valid) => {
            if (valid){
              if (params.startTime < params.endTime){
                if (params.id === ""){
                  this.submitAddSchedule(params);
                }
                else {
                  this.submitUpdateSchedule(params);
                }
              }
              else {
                this.$message({
                  type: 'error',
                  message: "请检查时间"
                });
              }
            }
          })
        },

        submitAddSchedule: function (params) {
          addSchedule(params).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.closeSchedule();
              this.getSchedule(this.$route.query.id);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        submitUpdateSchedule: function (params) {
          updateSchedule(params).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.closeSchedule();
              this.getSchedule(this.$route.query.id);
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        deleteSchedule: function (scheduleId) {
          this.$confirm('确认删除?', '提示', {})
            .then(() => {
              let params = {
                scheduleIdList: [scheduleId]
              };
              deleteSchedule(params).then(res => {
                if (res.success){
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  this.getSchedule(this.$route.query.id);
                }
                else {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                }
              })
            })
            .catch(() => { });
        }

      },
      mounted: function () {
        let movie=this.$route.query.id;
        console.log(movie.id);
        this.getDetail(movie.id);
        this.getMovieList();
        this.getHallList();
        this.getSchedule(movie.id);
      }
    }
</script>

<style scoped>

</style>
