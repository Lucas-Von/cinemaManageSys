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
                   default-openeds="2"
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
          <div class="all-container-padding bg" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
                  <el-form-item label="头像" prop="avatar_url" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="//shujiaoke.oss-cn-hangzhou.aliyuncs.com" :before-upload="beforeupload" :data="uploadParm" :show-file-list="false" :on-success="handleUpSuccess">
                      <img v-if="userlist.avatar_url" :src="userlist.avatar_url" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon " style="width:80px;height:80px;"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                    <el-col :span="8"> <el-input v-model="userlist.username" disabled ></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
                    <el-col :span="8">  <el-input v-model="userlist.phone" placeholder="请输入电话"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-col :span="8">  <el-input v-model="userlist.email" placeholder="请输入邮箱"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="用户角色" prop="full_name" :label-width="formLabelWidth">
                    <el-col :span="8">
                      <el-input v-model="userlist.full_name" disabled ></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
                <div class="grid-content bg-purple">
                  <el-button type="primary" @click="EditorUserClick('userlist')" >保存</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="second">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                  <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
                    <el-col :span="8">  <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
                    <el-col :span="8"><el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
                    <el-col :span="8">  <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input></el-col>
                  </el-form-item>
                </el-form>
                <div class="grid-content bg-purple">
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Container',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.checknewpass !== "") {
            this.$refs.ruleForm.validateField("checknewpass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        uploadParm: {}, //图片的上传
        ruleForm: {},//修改密码的表单
        activeName: "first",
        loading: true,
        baseUrl: process.env.BASE_API,
        userlist: {},//用户信息表单
        formLabelWidth: "150px",
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          phone: [
            {
              required: true,
              message: "请输入电话号码"
            },
            {
              pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
              message: "手机格式不对"
            }
          ],
          email: [
            {
              required: true,
              message: "请输入电子邮箱"
            },
            {
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
              message: "请输入有效的邮箱"
            }
          ],
          pass: [
            {
              required: true,
              trigger: "blur",
              message: "请输入密码"
            }
          ],
          newpass: [
            {
              validator: validatePass,
              trigger: "blur"
            }
          ],
          checknewpass: [
            {
              validator: validatePass2,
              trigger: "blur"
            }
          ]
        },
        username: '',
        isCollapse: false,
        imagesbox:[
          {id:0,idView:require("@/assets/test1.jpg")},
          {id:1,idView:require("@/assets/test2.jpg")},
          {id:2,idView:require("@/assets/test3.jpg")},
          {id:3,idView:require("@/assets/test4.jpg")},
          {id:4,idView:require("@/assets/test5.jpg")},
          {id:5,idView:require("@/assets/test6.jpg")}
        ]
      }


    }
    ,

    created() {
      this.getUser();
      this.upload();
    },
    methods: {
      getUser() {
        postData("接口", this.username).then(response => {
          if (response.status === 200) {
            this.userlist = response.data;
            this.loading = false;
            console.log(this.userlist, 9696);
          } else {
            this.$message({
              message: "获取信息失败," + response.message,
              type: "error"
            });
          }
        });
      },
      //tab切换
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //上传参数图片初始化
      upload() {
        var currentTimeStamp = new Date().getTime() / 1000;
        if (
          this.uploadParams == null ||
          this.uploadParams.expire + 3 < currentTimeStamp
        ) {
          this.$store
            .dispatch("GetUploadParams")
            .then(req => {
              this.uploadParm = req.data;
            })
            .catch(err => {
              this.$message({message: err.message, type: "warning"});
            });
        } else {
          this.uploadParm = this.uploadParams;
        }
      },
      //上传之前
      beforeupload(file) {
        this.uploadParm.key = this.uploadParm.dir + guid();
        // console.log(this.uploadParm)
      },
      //图片上传上传成功
      handleUpSuccess(response, file, fileList) {
        var newfile = {
          name: file.name,
          type: file.raw.type,
          size: bytesToSize(file.size),
          url: this.uploadParm.key
        };
        postData("file", newfile).then(response => {
          if (response.status == 200) {
            this.$message({message: "修改成功", type: "success"});
            this.userlist.style_file_id = response.data.id;
            this.userlist.avatar_url = this.baseUrl + response.data.url;
          } else {
            this.$message({message: "修改失败", type: "error"});
          }
        });
        console.log(this.userlist);
      },
      //修改密码
      submitForm(ruleForm) {
        var obj = {
          username: this.username,
          oldpwd: this.ruleForm.pass,
          newpwd: this.ruleForm.newpass
        };
        console.log(obj);
        postData("接口", obj).then(response => {
          if (response.status == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "修改失败" + response.message,
              type: "error"
            });
          }
        });
      },
      // 编辑提交的方法
      EditorUserClick() {
        this.$refs.EditorUserForms.validate(valid => {
          if (valid) {
            console.log(this.userlist);
            putData("接口", this.userlist).then(response => {
              if (response.status == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "修改失败" + response.message,
                  type: "error"
                });
              }
            });
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      },handleCommand(val) {
        if (val === 'edit') {
          this.handleEdit();
        } else if (val === 'del') {
          this.handleDelete();
        }
      },
      selectRow(val) {
        this.formModel = Object.assign({}, val);
      },
//点击添加
      handleAdd(val) {
        this.dialogStatus = 'create';
        this.addViewVisible = true;
      },
//点击编辑按钮
      handleEdit(val) {
        this.dialogStatus = 'update'
        this.addViewVisible = true;
        this.$nextTick(function () {
          this.msgForm = this.formModel;   //表单绑定  :model="msgForm "
        })
      },
//关闭dialog清空表单
      closeDialog() {
        this.$refs['msgForm'].resetFields();
      }
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
</style>


