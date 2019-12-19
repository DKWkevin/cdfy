<template>
<div id="queryNav">
  <popover :popoverStatus="postatus" :queryArray="queryArray" :placement="popPlacement" @popoverUpdate="btnclick" class="checkQueryBtn">
    <vxe-button size="small" style="float:left;">条件选择</vxe-button>
  </popover>
  <div ref="querySearch" class="querySearch">
  <form style="clear: both;float: left;">
      <div v-for="(item, index) in items" :key="index" class="formGroup">
        <div v-if="item.type === 0">
        <label class="labelTitle">{{item.label}}</label>
        <div class="inputPercent">
        <vxe-input  v-model="Formdata[item.id]" size="mini"></vxe-input>
        </div>
        </div>
       <!-- <div v-if="item.type === 1">
        <label class="labelTitle">{{item.label}}</label>
        <div class="inputPercent">
        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="Formdata[item.id]"></el-date-picker>
        </div>
        </div>-->
      </div>
  </form>
  </div>
</div>
</template>

<script>
import '@/assets/css/queryNav.css'
import popover from '@/components/popover/popover'
export default {
  name: 'queryNav',
  props: {
    queryArray: {
      type: Array
    }
  },
  data () {
    return {
      items: [],
      Formdata: {},
      subs: {},
      searchStatus: false,
      postatus: 0,
      popPlacement: 'right'
    }
  },
  components: {popover},
  methods: {
    btnclick (data) {
      if (data.active === true) {
        const arr = JSON.parse(`{"label": "` + data.label + `", "id": "` + data.id + `", "type": ` + data.type + `}`)
        this.items.push(arr)
        this.$set(this.Formdata, data.id, '')
      } else if (data.active === false) {
        this.items.map((e, index) => {
          if (e.id === data.id) {
            this.items.splice(index, 1)
          }
        })
        this.$delete(this.Formdata, data.id)
      }
    },
    querySearch () {
      if (this.searchStatus === true) {
        this.$refs.querySearch.setAttribute('class', 'querySearchActive')
        this.searchStatus = true
      } else {
        this.$refs.querySearch.setAttribute('class', 'querySearch')
        this.searchStatus = false
      }
    }
  }
}
</script>
