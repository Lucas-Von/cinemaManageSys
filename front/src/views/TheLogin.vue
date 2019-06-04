<template >
  <div class="login-container" :style ="note">

    <el-form :model="loginForm" :rules="loginRules"
             status-icon
             ref="loginForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">

      <h2 class="title">登录</h2>
      <br>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px" ><i class="el-icon-user-solid"></i></span></template>
        </el-input>
      </el-form-item>
      <br>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="密码" show-password>
          <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"><i class="el-icon-key"></i></span></template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked">
        记住密码
      </el-checkbox>
      <br><br>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submit(loginForm)" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>


<script>
  import {login} from "../api/loginAPI"
  export default {
    data(){
      return {
        note: {
          backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
        logining: false,
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'},
          password: {
            required: true,
            message: '请输入密码',
            trigger: 'blur'}
        },
        checked: false
      }
    },
    methods: {
      submit(params){
        this.$refs.loginForm.validate((valid) => {
          if(valid){
            this.logining = true;
            login(params).then(res => {
              console.log(res);
              this.logining = false;
              if (res.success){
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                });

                if(this.rememberme){
                  this.setCookie(this.loginForm.username, this.loginForm.password, 7)
                }else{
                  this.deleteCookie()
                }

                let user = res.content;
                sessionStorage.setItem('userId', user.id);

                switch (user.category) {
                  case 0:
                    this.$router.push({path: '/user'});
                    break;
                  case 1:
                    this.$router.push({path: '/root'});
                    break;
                  case 2:
                    this.$router.push({path: '/saler'});
                    break;
                  case 3:
                    this.$router.push({path: '/admin'});
                    break;
                  default:
                    this.$message({
                      type: 'error',
                      message: '数据异常'
                    });
                }
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
      setCookie(name, pass, days){
        let expire = new Date();
        expire.setDate(expire.getDate() + days);
        document.cookie = `C-username=${name};expires=${expire}`;
        document.cookie = `C-password=${pass};expires=${expire}`;
      },

      getCookie(){
        if(document.cookie.length){
          let arr = document.cookie.split('; ');
          for(let i=0; i<arr.length; i++){
            let arr2 = arr[i].split('=');
            if(arr2[0] === 'C-username'){
              this.loginForm.username = arr2[1];
            }else if(arr2[0] === 'C-password'){
              this.loginForm.password = arr2[1];
              this.rememberme = true;
            }
          }
        }
      },

      deleteCookie(){
        this.setCookie('', '', -1);
      },
  },
    mounted(){
      this.getCookie();
    }
  }
</script>

<style scoped >

  .login-container {
    width: 100%;
    height: 100%;
    position:absolute;
  }
  .login-page {
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
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }


</style>
