<template>
<div class="tags" v-if="showTabs">
  <ul>
    <li class="tags-li" v-for="(item, index) in tabsList" :class="{'actives': isActive(item.path)}" :key="index">
      <router-link :to="item.path" class="tags-li-title">
        {{item.title}}
      </router-link>
      <span class="tags-li-icon" @click="closeTab(index)">x</span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      tabsList: []
    }
  },
  methods: {
    closeTab (index) {
      const delItem = this.tabsList.splice(index, 1)[0]
      const item = this.tabsList[index] ? this.tabsList[index] : this.tabsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    setTabs (route) {
      const isExit = this.tabsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExit) {
        if (this.tabsList.length >= 8) {
          this.tabsList.shift()
        }
        if (route.fullPath !== '/') {
          this.tabsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.matched[1].name
          })
        }
      }
      this.$emit('tabs', this.tabsList)
    },
    isActive (index) {
      if (index === this.$route.fullPath) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    showTabs () {
      return this.tabsList.length > 0
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTabs(newValue)
    }
  },
  created () {
    this.setTabs(this.$route)
  }
}
</script>

<style>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
  }
  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }
  .tags .actives {
    border: 1px solid #409eff;
    background-color: #409eff;
    color: #fff;
  }
  .tags .router-link-active {
    color:#fff
  }
  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }
  .tags-li .active .tags-li-title {
    color: #fff;
  }
</style>
