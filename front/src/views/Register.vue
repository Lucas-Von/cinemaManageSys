<template >
  <div class="register-container" :style ="note">

    <el-form :model="registerForm" :rules="registerRules"
             status-icon
             ref="registerForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm register-page">

      <h2 class="title">注册</h2>
      <br>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名">
          <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px" ><i class="el-icon-user-solid"></i></span></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" placeholder="密码" show-password>
          <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"><i class="el-icon-key"></i></span></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="passwordRepeat">
        <el-input v-model="registerForm.passwordRepeat" placeholder="重复密码" show-password>
          <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"><i class="el-icon-key"></i></span></template>
        </el-input>
      </el-form-item>
      <br>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:60%;" @click="submit(registerForm)" :loading="registering">注册</el-button>
        <el-button style="width:30%;" @click="toLogin">返回登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {register} from "../api/loginAPI"

  export default {
    data(){
      return {
        note: {
          backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
        registering: false,
        registerForm: {
          username: '',
          password: '',
          passwordRepeat: '',
        },
        registerRules: {
          username: {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'},
          password: {
            required: true,
            message: '请输入密码',
            trigger: 'blur'},
          passwordRepeat: {
            required: true,
            message: '请重复输入密码',
            trigger: 'blur'},
        },
      }
    },
    methods: {
      toLogin: function() {
        this.$router.push({path: '/login'});
      },

      submit(params){
        this.$refs.registerForm.validate((valid) => {
          if(valid){
            if (params.password !== params.passwordRepeat){
              this.$message({
                type: 'error',
                message: '密码不一致'
              });
              return;
            }
            this.registering = true;
            register(params).then(res => {
              this.registering = false;
              if (res.success){
                this.$message({
                  type: 'success',
                  message: '注册成功!'
                });
                this.$router.push({path: '/login'});
              }
              else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            })
          }else{
            console.log('error submit!');
            return false;
          }
        })
      },
    },
  }
</script>

<style scoped>
  .register-container {
    width: 100%;
    height: 100%;
    position:absolute;
  }
  .register-page {
    height: 380px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    width: 350px;
    margin-top: 100px;
    margin-left: 400px ;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
