<template>
<div class="sidebar">
  <ul class="sidebar-menu">
    <li v-for="(item ,index) in items" :key="index" class="sidebar-menu-li" @click="openRoutes(index)">
      <div class="sidebar-menu-li-title">
      <span>{{item.title}}</span>
        <i class="vxe-icon--arrow-bottom sider-icon"></i>
      </div>
        <ul class="siderbarch-menu" v-show="n == index">
          <li v-for="subItem in item.subs" :key="subItem.index" class="sidebarch-menu-li" @click="onRoutes(subItem.index)">
            <router-link :to="subItem.index" replace>
              {{subItem.title}}
            </router-link>
          </li>
        </ul>
    </li>
  </ul>
</div>
      <!--<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#6FB2EA"
               text-color="#fff"
               active-text-color="#ffd04b" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i></i><span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                  {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
          </template>
      </el-menu>-->
   <!-- </div>-->
</template>

<script>
import bus from '@/assets/store/bus'
export default {
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {
      collapse: false,
      n: null
    }
  },
  methods: {
    onRoutes (index) {
      console.log(index)
      // return this.$route.path.replace('/', '')
      return this.$route.path.replace('/' + index)
    },
    openRoutes (index) {
      console.log(index)
      this.n = index
    }
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style>
.sidebar{
  width:220px;
  height:100%;
}
.sidebar-menu{
  border: 1px solid #e6e6e6;
  position:relative;
  margim:0;
  padding:0;
  background:#fff;
  width:100%;
  height:100%;
  display: inline-block;
  text-align:center;
}
.sidebar-menu-li{
  lisr-style:none;
  margin:0;
  padding: 0;
}
.sidebar-menu-li-title{
  height:56px;
  line-height: 56px;
  font-size:14px;
  color:#303133;
  padding:0;
  list-style: none;
  cursor:pointer;
  position: relative;
  transition: border-color .3s,background-color .3s,color .3s;
  box-size:border-box;
  white-space: normal;
  border-bottom:1px solid #ccc;
}
.sider-icon{
  font-size: 12px;
  position: absolute;
  top:50%;
  right:20px;
  margin-top:-7px;
  transition: transfrom .3s;
  font-style: normal;
  font-weight:400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
}
.siderbarch-menu{
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
  border:none;
}
.sidebarch-menu-li{
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color .3s,background-color .3s,color .3s;
  box-sizing: border-box;
  white-space: nowrap;
  min-width: 200px;
  height:50px;
  line-height: 50px;
  padding: 0 45px 0 40px;
}
</style>
