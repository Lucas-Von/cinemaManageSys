<template >
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
          <!-- 我是样例菜单 -->

          <el-menu default-active="4"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">

            <el-menu-item index="1" @click="toMovie">
              <i class="el-icon-s-grid"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toScheduleManagement">
              <i class="el-icon-s-management"></i>
              <span slot="title">排片管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toStatistics">
              <i class="el-icon-s-data" ></i>
              <span slot="title">影院统计</span>
            </el-menu-item>
            <el-menu-item index="4" @click="toActivityPublishment">
              <i class="el-icon-s-ticket" ></i>
              <span slot="title">优惠劵发布策略</span>
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
            <div>
              <el-col :span="17" style="margin-top: -20px"><h1>已发布的优惠</h1></el-col>
                <el-col :span="3">
                  <el-button type="primary" class="label" @click="showActivityDialog">发布优惠</el-button>
                  <el-dialog title="添加优惠活动" :visible.sync="activityDialogVisiable" :before-close="closeActivityDialog">
                    <el-form :model="activityForm" :rules="activityRules" ref="activityForm" >
                      <el-form-item label="优惠名称" prop="name">
                        <el-input v-model="activityForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠描述" prop="description">
                        <el-input v-model="activityForm.description"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠时间" prop="name">
                        <el-col :span="8">
                          <el-form-item prop="startTime">
                            <el-date-picker type="date" placeholder="开始时间" v-model="activityForm.startTime" style="width: 100%"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp</el-col>
                        <el-col :span="8">
                          <el-form-item prop="endTime">
                            <el-date-picker placeholder="结束时间" v-model="activityForm.endTime" style="width: 100%"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="优惠券名称" prop="couponName">
                        <el-input v-model="activityForm.couponName"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠券描述" prop="couponDescription">
                        <el-input v-model="activityForm.couponDescription"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠券目标金额" prop="couponTargetAmount">
                        <el-input v-model="activityForm.couponTargetAmount"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠券折扣" prop="couponDiscountAmount">
                        <el-input v-model="activityForm.couponDiscountAmount"></el-input>
                      </el-form-item>
                      <el-form-item label="优惠券使用时间" required>
                        <el-col :span="8">
                          <el-form-item prop="couponStartTime">
                            <el-date-picker type="date" placeholder="开始时间" v-model="activityForm.couponStartTime" style="width: 100%"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp</el-col>
                        <el-col :span="8">
                          <el-form-item prop="couponEndTime">
                            <el-date-picker placeholder="结束时间" v-model="activityForm.couponEndTime" style="width: 100%"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="适用影片">
                        <template>
                          <el-transfer v-model="activityForm.movieList" :data="movieData" :titles="['全部影片', '适用影片']"></el-transfer>
                        </template>
                      </el-form-item>
                      <br>
                      <el-form-item>
                        <el-button type="primary" @click="submitActivity(activityForm)">保存</el-button>
                        <el-button @click="closeActivityDialog">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" class="label" @click="showDiscount">赠送优惠券</el-button>
                  <el-dialog title="赠送优惠券" :visible.sync="discountDialogVisiable" :before-close="closeDiscount">
                    <el-form :model="discountForm" :rules="discountRules" ref="discountForm">
                      <el-form-item label="优惠券" prop="couponId">
                        <el-select v-model="discountForm.couponId" placeholder="请选择优惠券">
                          <el-option
                            v-for="item in discountData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="金额" prop="amount">
                        <el-input v-model="discountForm.amount"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitDiscount(discountForm)">赠送</el-button>
                        <el-button @click="closeDiscount">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-col>

              <el-table
                :data="activityData"
                :stripe=true
                :height="600"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="优惠名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="优惠描述"
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
                  label="优惠券规格"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="showCouponDialog(scope.row)">查看优惠券</el-button>
                    <el-dialog title="查看优惠券规格" :visible.sync="couponDialogVisiable" :before-close="closeCouponDialog">
                      <el-form :model="couponForm">
                        <el-form-item label="优惠券名称" prop="name">
                          <el-input v-model="couponForm.name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="优惠券描述" prop="description">
                          <el-input v-model="couponForm.description" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="优惠券目标金额" prop="targetAmount">
                          <el-input v-model="couponForm.targetAmount" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="优惠券折扣" prop="discountAmount">
                          <el-input v-model="couponForm.discountAmount" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="优惠券折扣">
                          <el-col :span="8">
                            <el-form-item prop="startTime">
                              <el-date-picker type="date" placeholder="开始时间" v-model="couponForm.startTime" style="width: 100%" disabled></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2">&nbsp</el-col>
                          <el-col :span="8">
                            <el-form-item prop="endTime">
                              <el-date-picker type="date" placeholder="结束时间" v-model="couponForm.endTime" style="width: 100%" disabled></el-date-picker>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                        <el-form-item align="center">
                          <el-button type="primary" style="width:75%;" @click="closeCouponDialog">确认</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column
                  label="适用影片"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="showMovieDialog(scope.row)">查看适用影片</el-button>
                    <el-dialog style="width: 600px;margin-left: 300px" title="查看适用电影" :visible.sync="targetMoviesVisiable" :before-close="closeMoviedialog">
                      <h1>适用影片：</h1>
                      <el-table
                        :data="targetMovies"
                        style="width: 300px">
                        <el-table-column
                          prop="name" style="margin-left: 30px">
                        </el-table-column>
                      </el-table>
                    </el-dialog>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                  <!--label="操作"-->
                  <!--width="180">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button type="primary" size="small" @click="">修改优惠</el-button>-->
                    <!--<el-button type="danger" size="small" @click="">删除优惠</el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {addActivity, getActivity, getCoupon, getMovie, getAllCoupon, issueCoupon} from "../../api/salerAPI"
  import {isInteger} from "../../api/util"

    export default {
        name: "SalerActivityPulishment",
      data(){
          return{
            isCollapse:false,
            activityData: [],
            activityDialogVisiable: false,
            activityForm: {
              id: "",
              name: "",
              description: "",
              startTime: "",
              endTime: "",
              couponName: "",
              couponDescription: "",
              couponStartTime: "",
              couponEndTime: "",
              couponTargetAmount: "",
              couponDiscountAmount: "",
              movieList: [],
            },
            activityRules:{
              name: {
                required: true,
                message: "请输入优惠名称",
                trigger: "blur"
              },
              startTime: {
                required: true,
                message: "请选择开始时间",
                trigger: "blur"
              },
              endTime:{
                required: true,
                message: "请选择结束时间",
                trigger: "blur"
              },
              couponName: {
                required: true,
                message: "请输入优惠券名称",
                trigger: "blur"
              },
              couponTargetAmount:[{
                required: true,
                message: "请输入优惠券目标金额",
                trigger: "blur"
              },
                {
                  validator: isInteger,
                  trigger: "blur"
                }],
              couponDiscountAmount:[{
                required: true,
                message: "请输入优惠券折扣",
                trigger: "blur"
              },
                {
                  validator: isInteger,
                  trigger: "blur"
                }],
              couponStartTime: {
                required: true,
                message: "请选择开始时间",
                trigger: "blur"
              },
              couponEndTime:{
                required: true,
                message: "请选择结束时间",
                trigger: "blur"
              }
            },
            couponData: [],
            couponDialogVisiable: false,
            couponForm: {
              name: "",
              description: "",
              targetAmount: "",
              discountAmount: "",
              startTime: "",
              endTime: ""
            },
            discountDialogVisiable: false,
            discountForm: {
              couponId: "",
              amount: ""
            },
            discountRules:{
              couponId: {
                required: true,
                message: "请选择优惠券",
                trigger: "blur"
              },
              amount: [{
                required: true,
                message: "请填写金额",
                trigger: "blur"
              },{
                validator: isInteger,
                trigger: "blur"
              }]
            },
            movieData: [],
            discountData: [],
            userData: [],
            targetMoviesVisiable: false,
            targetMovies: []
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

        startTimeFormat: function(row) {
          return row.startTime.substring(0, 10);
        },

        endTimeFormat: function(row) {
          return row.endTime.substring(0, 10);
        },

        /*--------------------------------------------------*/

        showActivityDialog: function() {
          this.activityDialogVisiable = true;
          this.getMovie();
          console.log(this.movieData);
        },

        closeActivityDialog: function () {
          this.activityDialogVisiable = false;
          this.resetActivityDialog();
        },

        resetActivityDialog: function () {
          this.id = "";
          this.name = "";
          this.description = "";
          this.startTime = "";
          this.endTime = "";
          this.couponName = "";
          this.couponDescription = "";
          this.couponDescription = "";
          this.couponStartTime = "";
          this.couponEndTime = "";
          this.couponTargetAmount = "";
          this.couponDiscountAmount = "";
          this.movieList = [];

        },

        /*--------------------------------------------------*/

        showCouponDialog: function(params) {
          getCoupon(params.coupon.id).then(res => {
            if (res.success){
              this.couponDialogVisiable = true;
              this.couponForm = res.content;
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })

        },

        closeCouponDialog: function() {
          this.couponDialogVisiable = false;
          this.resetCouponDialog();
        },

        resetCouponDialog: function() {
          this.couponForm.name = "";
          this.couponForm.description = "";
          this.couponForm.targetAmount = "";
          this.couponForm.discountAmount = "";
          this.couponForm.startTime = "";
          this.couponForm.endTime = "";
        },

        /*--------------------------------------------------*/

        showMovieDialog: function(params) {
          this.targetMoviesVisiable = true;
          this.targetMovies = params.movieList;
        },

        closeMoviedialog: function() {
          this.targetMoviesVisiable = false;
          this.resetMovieDialog();
        },

        resetMovieDialog: function() {
          this.targetMovies = [];
        },

        /*--------------------------------------------------*/

        getActivity: function() {
          getActivity().then(res => {
            console.log(res.content);
            this.activityData = res.content;
          })
        },

        submitActivity: function (params) {
          this.$refs.activityForm.validate((valid) => {
            if (valid){
              if (params.startTime > params.endTime){
                this.$message({
                  type: 'error',
                  message: '请检查时间'
                });
                return;
              }
              if (parseInt(params.couponTargetAmount) < parseInt(params.couponDiscountAmount)){
                this.$message({
                  type: 'error',
                  message: '请检查优惠金额'
                });
                return;
              }
              if (params.couponStartTime > params.couponEndTime){
                this.$message({
                  type: 'error',
                  message: '请检查时间'
                });
                return;
              }

              let activity = {
                id: params.id,
                name: params.name,
                description: params.description,
                startTime: params.startTime,
                endTime: params.endTime,
                movieList: params.movieList,
                couponForm: {
                  name: params.couponName,
                  description: params.couponDescription,
                  targetAmount: params.couponTargetAmount,
                  discountAmount: params.couponDiscountAmount,
                  startTime: params.couponStartTime,
                  endTime: params.couponEndTime
                }
              };
              console.log(activity);
              if (activity.id === ""){
                this.submitAddActivity(activity);
              }
              else {
                // this.submitUpdateActivity(activity);
              }
            }
            else {
              this.$message({
                type: 'error',
                message: '数据有误'
              });
            }
          })
          },

        submitAddActivity: function (activity) {
          addActivity(activity).then(res => {
            this.getActivity();
            if (res.success){
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.closeActivityDialog();
            }
            else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        },

        submitUpdateActivity: function (activity) {

        },

        /*--------------------------------------------------*/

        showDiscount: function() {
          this.getCoupon()
          this.discountDialogVisiable = true;
        },

        closeDiscount: function() {
          this.discountDialogVisiable = false;
          this.resetDiscount();
        },

        resetDiscount: function() {
          this.discountForm.couponId = "";
          this.discountForm.amount = "";
        },

        submitDiscount: function(params){
          this.$refs.discountForm.validate((valid) => {
            if (valid){
              if (parseInt(params.amount) < 0) {
                this.$message({
                  type: 'error',
                  message: "请检查金额"
                });
                return;
              }
              issueCoupon(params.couponId, params.amount).then(res => {
                if (res.success){
                  this.$message({
                    type: 'success',
                    message: '赠送成功'
                  });
                  this.closeDiscount();
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

        getMovie: function () {
          this.movieData = [];
          getMovie().then(res => {
            let list = res.content;
            for (let i = 0; i < list.length; i ++){
              this.movieData.push({
                key: list[i].id,
                label: list[i].name
              })
            }
          })
        },

        getCoupon: function () {
          this.discountData = [];
          getAllCoupon().then(res => {
            let list = res.content;

            for (let i = 0; i < list.length; i ++){
              this.discountData.push({
                value: list[i].id,
                label: list[i].name
              })
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
        toggleSideBar() {
          this.isCollapse = !this.isCollapse
        },

      },

      mounted: function () {
          this.getActivity();
          this.getCoupon();
      }
    }
</script>

<style scoped>

</style>
