<template>
  <div  class="header">
    <div class="collapse-btn" @click="collapseChage"><i class="el-icon-menu"></i></div>
    <div class="logo"><img src="@/assets/images/cdfyLogo.png"></div>
    <div class="header-right">
      <div class="fl loginlabels">{{username}}</div>
      <a class="fl loginOut" href="javascript:void(0)" @click="loginout">退出</a>
      <!--<vxe-toolbar class="fl" size="mini">
        <template v-slot:buttons>
          <vxe-button>
            <template>操作</template>
            <template v-slot:dropdowns>
              <vxe-button>修改密码</vxe-button>
              <vxe-button @click="loginout">退出登录</vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'dba',
      collapse: false
    }
  },
  methods: {
    loginout () {
      this.$cookieStore.delCookie('token')
      this.$cookieStore.delCookie('username')
      this.$cookieStore.delCookie('userid')
      this.$cookieStore.delObj('router')
      this.$cookieStore.delObjArr('list')
      this.$router.push('/login')
    },
    collapseChage () {
      this.collapse = !this.collapse
      this.$bus.$emit('collapse', this.collapse)
    }
  }
}
</script>

<style>
.fl{
  float:left;
}
.loginlabels{
  font-size:16px;
  line-height:16px;
  display: block;
  margin: 15px 5px;
}
.loginOut{
  font-size:16px;
  line-height:16px;
  display: block;
  margin: 15px 0 5px;
}
</style>
