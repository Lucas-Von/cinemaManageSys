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

            <el-menu-item index="1" @click="toMovie">
              <i class="el-icon-camera"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toScheduleManagement">
              <i class="el-icon-menu"></i>
              <span slot="title">排片管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toStatistics">
              <i class="el-icon-document" ></i>
              <span slot="title">影院统计</span>
            </el-menu-item>
            <el-menu-item index="4" @click="toActivityPublishment">
              <i class="el-icon-setting" ></i>
              <span slot="title">优惠劵发布策略</span>
            </el-menu-item>
            <el-menu-item index="5" @click="logout">
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
          <el-row type="flex" justify="end">
            <el-col :span="3">
              <el-button type="primary" style="width:80%;" @click="addSchedule">添加排片</el-button>
              <el-dialog title="添加/修改排片" :visible.sync="scheduleDialogVisiable" :before-close="closeScheduleDialog">
                <el-form :model="scheduleForm" :rules="scheduleRules" ref="scheduleForm">
                  <el-form-item label="影片" prop="movieId">
                    <el-select v-model="scheduleForm.movieId" placeholder="请选择">
                      <el-option
                        v-for="item in movie"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="影厅" prop="hallId">
                    <el-select v-model="scheduleForm.hallId" placeholder="请选择">
                      <el-option
                        v-for="item in hall"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <el-date-picker
                      v-model="scheduleForm.startTime"
                      type="datetime"
                      placeholder="请选择时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <el-date-picker
                      v-model="scheduleForm.endTime"
                      type="datetime"
                      placeholder="请选择时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="票价">
                    <el-col :span="8">
                      <el-input v-model="scheduleForm.fare"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitSchedule(scheduleForm)">保存</el-button>
                    <el-button @click="closeScheduleDialog">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="showViewTime">修改排片可见时间</el-button>
              <el-dialog title="修改排片可见时间" :visible.sync="viewTimeVisiable" :before-close="closeViewTime">
                <el-form :model="viewTimeForm" :rules="viewTimeRules" ref="viewTimeForm">
                  <el-form-item label="可见时间" prop="day">
                    <el-input v-model="viewTimeForm.day"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitViewTime(viewTimeForm.day)">保存</el-button>
                    <el-button @click="closeViewTime">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="3">
              <el-select v-model="term" placeholder="请选择查询方式">
                <el-option
                  v-for="item in termOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            &nbsp&nbsp&nbsp
            <el-col :span="3" v-if="term !== ''">
              <el-select v-model="hallId" placeholder="请选择" v-if="term === 'hall'">
                <el-option
                  v-for="item in hall"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="movieId" placeholder="请选择" v-if="term === 'movie'">
                <el-option
                  v-for="item in movie"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            &nbsp&nbsp&nbsp
            <el-col :span="2">
              <el-button type="primary" style="width:80%;" @click="searchSchedule">查询</el-button>
            </el-col>
          </el-row>
          <div v-if="term === 'hall'">
            <div id="schedule-date-container">
              <div class="schedule-date"></div>
            </div>
            <div id="schedule-container" >
              <ul class="schedule-time-line">
                <li class="schedule-time-item">00:00</li>
                <li class="schedule-time-item">06:00</li>
                <li class="schedule-time-item">12:00</li>
                <li class="schedule-time-item">18:00</li>
                <li class="schedule-time-item">24:00</li>
              </ul>
              <ul class="schedule-item-line">
              </ul>
            </div>
          </div>
          <div v-if="term === 'movie'">
            <el-table
              :data="schedule"
              :stripe=true
              style="width: 100%">
              <el-table-column
                prop="hallName"
                label="影厅"
                width="180">
              </el-table-column>
              <el-table-column
                label="日期"
                :formatter="getDate"
                width="180">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                :formatter = "startTimeFormat"
                width="180">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="结束时间"
                :formatter = "endTimeFormat"
                width="180">
              </el-table-column>
              <el-table-column
                prop="fare"
                label="票价"
                width="100">
              </el-table-column>
                <el-table-column
                  label="操作"
                  width="240">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updateSchedule(scope.row)">修改排片</el-button>
                    <el-button type="danger" size="small" @click="deleteSchedule(scope.row.id)">删除排片</el-button>
                  </template>
                  </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getMovie, getHall, getScheduleByMovieId, getScheduleByHallId, addSchedule, updateSchedule, deleteSchedule, getScheduleView, setScheduleView} from "../../api/salerAPI"
  import {isDecimal, isInteger} from "../../api/util"

    export default {
        name: "SalerScheduleManagement",
      data() {
        return{
          term: "",
          termOptions: [
            {
            value: "hall",
            label: "影厅"
          }, {
            value: "movie",
            label: "影片"
          }],
          hallId: "",
          movieId: "",
          isCollapse:false,
          hall: [],
          movie: [],
          schedule: [],
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
            hallId:{
              required: true,
              message: "请选择影厅",
              trigger: "blur"
            },
            movieId:{
              required: true,
              message: "请选择影片",
              trigger: "blur"
            },
            startTime:{
              required: true,
              message: "请选择开始时间",
              trigger: "blur"
            },
            endTime:{
              required: true,
              message: "请选择结束时间",
              trigger: "blur"
            },
            fare:[{
              required: true,
              message: "请填写票价",
              trigger: "blur"
            },{
              validator: isDecimal,
              trigger: "blur"
            }],
          },
          colors: [
            '#FF6666',
            '#3399FF',
            '#FF9933',
            '#66CCCC',
            '#FFCCCC',
            '#9966FF',
            'steelblue'
          ],
          viewTimeVisiable: false,
          day: "",
          viewTimeForm: {
            day: ""
          },
          viewTimeRules: {
            day: [{
              required: true,
              message: "请输入排片可见时间",
              trigger: "blur"
            },{
              validator: isInteger,
              trigger: "blur"
            }]
          }
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

        /*--------------------------------------------------*/

        getViewTime: function() {
          getScheduleView().then(res => {
            if (res.success){
              this.viewTimeForm.day = res.content;
              this.day = res.content;
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        showViewTime: function () {
          this.viewTimeVisiable = true;
        },

        closeViewTime: function () {
          this.viewTimeVisiable = false;
          this.viewTimeForm.day = this.day;
        },

        submitViewTime: function (days) {
          let params = {
            day: days
          };
          setScheduleView(params).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.getViewTime();
              this.closeViewTime();
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

        startTimeFormat: function(row) {
          return row.startTime.substring(11, 16);
        },

        endTimeFormat: function(row) {
          if (row.startTime.substring(0, 10) === row.endTime.substring(0, 10)){
            return row.endTime.substring(11, 16);
          }
          else {
            return row.endTime.substring(11, 16) + " (+1)";
          }
        },

        getDate: function(row) {
          return row.startTime.substring(0, 10);
        },

        /*--------------------------------------------------*/

        getAllHall: function () {
          getHall().then(res => {
            if (res.success){
              let list = res.content;
              this.hall = [];
              for (let i = 0; i < list.length; i ++){
                this.hall.push({
                  value: list[i].id,
                  label: list[i].name
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

        getAllMovie: function () {
          getMovie().then(res => {
            if (res.success){
              let list = res.content;
              this.movie = [];
              for (let i = 0; i < list.length; i ++){
                this.movie.push({
                  value: list[i].id,
                  label: list[i].name
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

        searchSchedule: function () {
          if (this.term === "hall"){
            getScheduleByHallId(this.hallId, new Date().toLocaleDateString()).then(res => {
              if (res.success) {
                this.setSchedule(res.content);
                this.$message({
                  type: 'success',
                  message: '查询成功!'
                });
                this.showSchedule();
              }
              else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            })
          }
          else if (this.term === "movie") {
            getScheduleByMovieId(this.movieId).then(res => {
              if (res.success) {
                this.setSchedule(res.content);
                this.$message({
                  type: 'success',
                  message: '查询成功!'
                });
              }
              else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            })
          }
          else {

          }
        },

        setSchedule: function (scheduleList) {
          console.log(scheduleList);
          this.schedule = [];
          for (let i = 0; i < scheduleList.length; i ++){
            let list = scheduleList[i].scheduleItemList;
              for (let j = 0; j < list.length; j ++){
                this.schedule.push({
                  id: list[j].id,
                  hallName: list[j].hallName,
                  hallId : list[j].hallId,
                  movieName: list[j].movieName,
                  movieId : list[j].movieId,
                  startTime: list[j].startTime,
                  endTime: list[j].endTime,
                  fare: list[j].fare
                })
              }
          }

        },

        showSchedule: function() {
          getScheduleByHallId(this.hallId, new Date().toLocaleDateString()).then(res => {
            let schedules = res.content;
            console.log("----------------------");
            document.getElementById("schedule-date-container").innerHTML = "";
            for (let i = 0; i < schedules.length; i ++){
              let schedule = schedules[i];
              document.getElementById("schedule-date-container").innerHTML += "<div class='schedule-date'>" + schedule.date.substring(0, 10) + "</div>";
              document.getElementById("schedule-container").innerHTML += "<ul class='schedule-item-line' id='" + schedule.date + "'></ul>";
              for (let j = 0; j < schedule.scheduleItemList.length; j ++){
                let scheduleItem = schedule.scheduleItemList[j];
                let scheduleItemStyle = this.mapStyle(scheduleItem);
                console.log(scheduleItemStyle.top);
                let scheduleItemDom =
                  "<li class='schedule-item' data-schedule='"+JSON.stringify(scheduleItem)+
                  "' style='background:"+scheduleItemStyle.color+ ";top:"+scheduleItemStyle.top+";height:"+scheduleItemStyle.height+"'>"+
                  "<span>"+scheduleItem.movieName+"</span>"+"<br>"+
                  "<span class='error-text'>¥"+scheduleItem.fare+"</span>"+"<br>"+
                  "<span>"+scheduleItem.startTime.substring(11,16)+"-"+scheduleItem.endTime.substring(11,16)+"</span>"+
                  "</li>";
                document.getElementById(schedule.date).innerHTML += scheduleItemDom;
              }
            }
          })
        },

        formatTime: function(date) {
          let year = date.getFullYear();
          let month = date.getMonth()+1+'';
          let day = date.getDate()+'';
          month.length===1 && (month = '0'+month);
          day.length===1 && (day = '0'+day);
          return year+'-'+month+'-'+day;
        },

        mapStyle: function(schedule) {
          let start = new Date(schedule.startTime).getHours()+new Date(schedule.startTime).getMinutes()/60;
          let end = new Date(schedule.endTime).getHours()+new Date(schedule.endTime).getMinutes()/60 ;
          return {
            color: this.colors[schedule.movieId%this.colors.length],
            top: 40*start+'px',
            height: 40*(end-start)+'px'
          }
        },

        /*--------------------------------------------------*/

        addSchedule: function () {
          this.scheduleDialogVisiable = true;
        },

        updateSchedule: function(schedule) {

          this.scheduleDialogVisiable = true;
          this.scheduleForm.id = schedule.id;
          this.scheduleForm.hallId = schedule.hallId;
          this.scheduleForm.hallName = schedule.hallName;
          this.scheduleForm.movieId = schedule.movieId;
          this.scheduleForm.movieName = schedule.movieName;
          this.scheduleForm.startTime = schedule.startTime;
          this.scheduleForm.endTime = schedule.endTime;
          this.scheduleForm.fare = schedule.fare;
          console.log(this.scheduleForm);
        },

        closeScheduleDialog: function () {
          this.scheduleDialogVisiable = false;
          this.resetScheduleDialog();
        },

        resetScheduleDialog: function () {
          this.scheduleForm.id = "";
          this.scheduleForm.hallId = "";
          this.scheduleForm.movieId = "";
          this.scheduleForm.date = "";
          this.scheduleForm.startTime = "";
          this.scheduleForm.endTime = "";
          this.scheduleForm.fare = "";
        },

        submitSchedule: function (params) {
          this.$refs.scheduleForm.validate((valid) => {
            if (valid){
              if (params.id === ""){
                this.submitAddSchedule(params);
              }
              else {
                this.submitUpdateSchedule(params);
              }
            }
          })
        },

        submitAddSchedule: function (params) {
          addSchedule(params).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.closeScheduleDialog();
              this.searchSchedule();
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
                message: '修改成功!'
              });
              this.closeScheduleDialog();
              this.searchSchedule();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        deleteSchedule: function (id) {
          let params = {scheduleIdList: [parseInt(id)]};
          deleteSchedule(params).then(res => {
            if (res.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.searchSchedule();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
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
        this.getAllMovie();
        this.getAllHall();
        this.getViewTime();
      }
    }
</script>

<style scoped>
  #schedule-container {
    display: flex;
    padding: 0 20px;
  }

  .schedule-time-line {
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .schedule-item-line {
    height: 960px;
    width: 80px;
    border-left: 1px solid #ccc;
    position: relative;
  }

  .schedule-item {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    position: absolute;
    overflow-y: scroll;
  }

  #schedule-date-container {
    padding-left: 100px;
    height: 40px;
    line-height: 30px;
    display: flex;
  }

  .schedule-date {
    width: 250px;
    text-align: center;
  }
</style>
