<template>
<div>
  <div class="v-popover-tag" @click.stop="pop($event)">
    <slot></slot>
  </div>
  <div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: show ? 'visible' : 'hidden'}" ref="pop">
    <div class="v-popover-box">
      <div v-if="popoverStatus === 0">
        <div v-for="(ds, index) in queryArray" :key="index" style="float:left;margin:0 2px;">
          <vxe-button size="small" :id="ds.id" @click="btnclick(ds.label, ds.type, ds.id)" :key="index">{{ds.label}}</vxe-button>
        </div>
      </div>
      <div v-else-if="popoverStatus === 1">
        <div class="v-popover-title">{{title}}</div>
        <div class="v-popover-content">{{content}}</div>
        <div :class="['v-popover-arrow', placement == 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']" :style="{left: arrowLeft + 'px'}"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'popover',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    popoverStatus: {
      type: Number
    },
    queryArray: {
      type: Array
    },
    content: {
      type: String,
      default: '内容'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      show: false,
      arrowLeft: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    pop (e) {
      if (this.show) {
        this.show = false
        return
      }
      var target = e.target
      this.arrowLeft = target.offsetWidth / 2
      if (this.placement === 'top') {
        this.x = target.offsetLeft
        this.y = target.offsetTop - this.$refs.pop.offsetHeight - 3
      } else if (this.placement === 'bottom') {
        this.x = target.offsetLeft
        this.y = target.offsetTop + target.offsetHeight + 3
      } else if (this.placement === 'right') {
        this.x = target.offsetLeft + this.$refs.pop.offsetWidth / 3
        this.y = target.offsetTop - this.$refs.pop.offsetHeight / 3
      } else if (this.placement === 'left') {
        this.x = target.offsetLeft - this.$refs.pop.offsetWidth / 3
        this.y = target.offsetTop - this.$refs.pop.offsetHeight / 3
      }
      this.show = true
    },
    btnclick (label, type, id) {
      this.queryArray.forEach((e) => {
        if (e.id === id) {
          if (e.active === true) {
            e.active = false
            document.getElementById(e.id).setAttribute('class', 'vxe-button type--button size--small')
            this.$emit('popoverUpdate', e)
          } else {
            e.active = true
            document.getElementById(e.id).setAttribute('class', 'vxe-button type--button size--small btnActives')
            this.$emit('popoverUpdate', e)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .v-popover-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    margin-left: -5px;
  }
  .v-popover-arrow:after {
    content: " ";
    margin-left: -4px;
    border: 4px solid transparent;
    position: absolute;
    width: 0;
    height: 0;
  }

  .v-popover-arrow-top {
    border-bottom-width: 0;
    border-top-color: #d9d9d9;
    bottom: -5px;
  }
  .v-popover-arrow-top:after {
    border-top-color: #fff;
    bottom: -3px;
  }
  .v-popover-wrap{
    width: 200px;
    transform-origin: center top 0px;
    position: absolute;
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-break: break-all;
  }
  .btnActives {
    background: #4a90d9;
    color:#fff;
    border: 1px solid #4a90d9;
  }
</style>
