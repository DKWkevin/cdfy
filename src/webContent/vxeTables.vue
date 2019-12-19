<template>
<div>
  <vxe-button @click="query">111</vxe-button>
  <div>
  <tables :columns="columns" :tableData="coldatas" :loading="loading"></tables>
  </div>

</div>
</template>

<script>
import table from '@/assets/json/vxeTable'
import tables from '@/components/table/tables'
export default {
  name: 'vxeTables',
  data () {
    return {
      columns: this.$utils.clone(table.columns, true),
      coldatas: [],
      loading: false
    }
  },
  components: {
    tables
  },
  methods: {
    query () {
      setTimeout(x => {
        // this.loading = true
        this.$post('http://10.0.0.36:8080/VueTest/SelectServet').then((res) => {
          this.coldatas = res.data.rows
          console.log(res.data.rows[0])
        })
        // this.loading = false
      }, 2000)
    }
  }
}
</script>
