<template>
<div>
  <div class="loginWrap">
    <div class="loginLabel">系统登录</div>
    <el-form ref="loginForm" v-loading="loading" :rules="rules" class="loginform">
      <el-form-item prop="username">
        <el-input type="text" v-model="loginFrom.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginFrom.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="codeDiv">
          <slide-verify
            :l="42"
            :r="10"
            :w="310"
            :h="155"
            :min="50"
            :max="300"
            @success="loginSuccess"
            @fail="loginFail"
            @refresh="loginRefresh"
            style="margin: 0 auto"
            ref="slideVerify"
          ></slide-verify>
          <div style="height:28px;">{{msg}}</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width:50%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
// import slideverify from '@/components/slideverfy/slideverify.vue'
import slideverify from './slideverify.vue'
export default {
  name: 'login',
  data () {
    return {
      loginFrom: {username: '', password: ''},
      status: false,
      msg: '',
      loading: false,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  components: {
    'slide-verify': slideverify
  },
  methods: {
    loginSuccess: function () {},
    login: function () {
      this.$get('http://localhost:8080/test/LoginServlet').then(res => {
        // this.$get('https://easy-mock.com/mock/5c072c2a3280fc0aefcf32b1/testProject/login').then(res => {
        console.log(res)
        this.$cookieStore.setCookie('token', 1, 0.1)
        this.$cookieStore.setCookie('username', res.data.data.name, 0.1)
        this.$cookieStore.setCookie('userid', res.data.data.id, 0.1)
        this.$cookieStore.saveObjArr('list', res.data.item)
        this.$router.push({path: '/'})
      })
    },
    loginFail: function () {
      this.msg = '请重新进行验证'
      return false
    },
    loginRefresh: function () {
      this.msg = ''
    }
  }
}
</script>

<style>
  .loginWrap{
    width: 430px;
    height: 460px;
    border: 1px solid #ccc;
    position: fixed;
    top: 25%;
    left: 35%;
    border-radius: 5px;
    box-shadow:0px 0px 20px #ccc;
  }
  .loginLabel{
    width:100%;
    font-size: 16px;
    line-height: 50px;
    text-align:center;
    font-weight: bold;
    color:#505458;
    border-bottom: 1px solid #ccc;
  }
  .loginform{
    padding: 10px 50px 15px 50px;
  }
  .loginText{
    width:100%;
    height:30px;
    border:1px solid #ccc;
    border-radius: 3px;
  }
  .loginCode{
    width:60%;
    height:30px;
    border:1px solid #ccc;
    border-radius: 3px;
    float: left;
  }
  .btn{
    width:100%;
    padding:7px 0;
    border:none;
    border-radius: 6px;
    color:white;
  }
  .blue{
    background:#409eff;
  }
  .LoginRuleText{
    font-size: 12px;
    height:16px;
    color:red;
    text-align: left;
    clear:both;
    width:100%;
    display: block;
  }
</style>
