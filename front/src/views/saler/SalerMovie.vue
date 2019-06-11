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
          <div class="container">
            <div>
              <br><br><br><br>
              <el-row type="flex" justify="end">
                <el-col :span="4">
                  <el-button type="primary" @click="addMovie">上架电影</el-button>
                  <el-dialog title="上架电影" :visible.sync="movieDialogVisiable" :before-close="closeMovieDialog">
                    <el-form :model="movieForm" :rules="movieRules" ref="movieForm">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="movieForm.name" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="海报" prop="posterUrl">
                        <el-input v-model="movieForm.posterUrl" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="导演" prop="director">
                        <el-input v-model="movieForm.director" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="编剧" prop="screenWriter">
                        <el-input v-model="movieForm.screenWriter" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="主演" prop="starring">
                        <el-input v-model="movieForm.starring" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="电影类型" prop="type">
                        <el-input v-model="movieForm.type" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="制片国家" prop="country">
                        <el-input v-model="movieForm.country" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="语言" prop="language">
                        <el-input v-model="movieForm.language" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="片长" prop="length">
                        <el-input v-model="movieForm.length" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item label="上映日期" prop="startDate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="movieForm.startDate" style="width: 70%"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="描述" prop="description">
                        <el-input v-model="movieForm.description" type="textarea" style="width: 70%"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submit(movieForm)">确定</el-button>
                        <el-button @click="closeMovieDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-col>
              </el-row>
              <br><br><br>
              <div v-for="item in movieData" :key="item.name">
                <div v-show="item.status==0">
                  <el-col :span="4.5" >
                    <el-card class="box-moviecard">
                      <br>
                      <div class="box-inside">
                        <router-link :to="{path:'/saler/MovieDetails/id',query:{id:item}}">
                          <img class="movie" height="320px" width="250px" :src="item.posterUrl" >
                        </router-link>
                        <div style="padding: 10px;">
                            <h3 class="text">{{item.name}}</h3>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="1.5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</el-col>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getMovie, addMovie} from "../../api/salerAPI"
  import {isInteger} from "../../api/util"

    export default {
        name: "SalerMovie",
      data() {
        return{
          movieData: [],
          movieDialogVisiable: false,
          movieForm: {
            name: "",
            posterUrl: "",
            director: "",
            screenWriter: "",
            starring: "",
            type: "",
            country: "",
            language: "",
            startDate: "",
            length: "",
            description: ""
          },
          movieRules: {
            name: {
              required: true,
              message: "请输入名称",
              trigger: "blur"
            },
            posterUrl: {
              required: true,
              message: "请输入海报",
              trigger: "blur"
            },
            director: {
              required: true,
              message: "请输入主演",
              trigger: "blur"
            },
            screenWriter: {
              required: true,
              message: "请输入编剧",
              trigger: "blur"
            },
            starring: {
              required: true,
              message: "请输入主演",
              trigger: "blur"
            },
            type: {
              required: true,
              message: "请输入电影类型",
              trigger: "blur"
            },
            country: {
              required: true,
              message: "请输入制片国家",
              trigger: "blur"
            },
            language: {
              required: true,
              message: "请输入语言",
              trigger: "blur"
            },
            startDate: {
              required: true,
              message: "请输入上映日期",
              trigger: "blur"
            },
            length: [{
              required: true,
              message: "请输入片场",
              trigger: "blur"
            },{
              validator: isInteger,
              trigger: "blur"
            }],
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

        addMovie: function() {
          this.movieDialogVisiable = true;
        },

        closeMovieDialog: function() {
          this.movieDialogVisiable = false;
          this.resetMovieDialog();
        },

        resetMovieDialog: function() {
          this.movieForm = {};
        },

        submit: function(params) {
          this.$refs.movieForm.validate((valid) => {
            if (valid){
              addMovie(params).then(res => {
                if (res.success){
                  this.$message({
                    type: 'success',
                    message: '上架成功!'
                  });
                  this.closeMovieDialog();
                  this.getMovie();
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
              return false;
            }
          })
        },

        /*--------------------------------------------------*/

        getMovie: function () {
          getMovie().then(res => {
            this.movieData = res.content;
          })
        },

      },
      mounted: function () {
        this.getMovie();
      }
    }
</script>

<style scoped>

  .box-moviecard {
    margin-left: 30px;
    width: 325px;
    height: 450px;
  }

  .box-inside {
    width: 250px;
    margin-left: auto;
    margin-right: auto;
  }

  .text{
    text-align: center;
    font-weight: bold;
    font-size: 150%;
  }
</style>
