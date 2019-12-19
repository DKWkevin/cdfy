<template>
<div class="wrapper">
  <!-- header开始 -->
  <my-header></my-header>
  <!-- header结束 -->
  <!-- nav开始 -->
  <transition name="el-fade-in-linear">
      <my-sider :items="items"></my-sider>
  </transition>
  <!-- nav结束 -->
  <div class="content-box" :class="{'content-collapse':collapse}">
    <my-tag></my-tag>
    <div class="content">
      <transition>
        <keep-alive :include="tabsList">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import myHeader from './myHeader'
import mySider from './mySider'
import myTag from './myTag'
export default {
  name: 'home',
  components: {myHeader, mySider, myTag},
  data () {
    return {
      collapse: false,
      tabsList: [],
      // items: [{index: 'home', title: '首页', subs: [{index: 'dashboard', title: '首页'}]}]
      items: this.$cookieStore.getObjArr('list')
    }
  },
  created () {
    this.$bus.$on('collapse', msg => {
      this.collapse = msg
    })
    this.$bus.$on('tags', msg => {
      let arr = []
      for (let i = 0; i < msg.length; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tabsList = arr
    })
  }
}
</script>
