<template>
<div>
  <el-table
    id="tableH"
    v-loading="loading"
    :data="tableData"
    :border="true"
    :stripe="true"
    :show-summary="summary"
    :max-height="tableHeight"
    :summary-method="getSummaries"
    style="width:100%"
  >
    <el-table-column type="selection" width="60" :fixed="leftfix" v-if="checkColumn"></el-table-column>
    <el-table-column
      v-for="(col, index) in columns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :fixed="col.fix"
      sortable
    >
      <!--  :filters="col.filters"
     :filter-method="filterHandler" -->
    </el-table-column>
    <el-table-column :fixed="rightfix" label="操作" width="150">
      <template slot-scope="scope">
       <el-button  size='mini' v-if="updateStatus" @click.native="updateTableDoc(scope.row)">修改</el-button>
        <el-button  size='mini' v-if="delStatus" @click.native="delTableDoc(scope.row, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="paginationbox">
  <el-pagination
    background
    layout="total, prev, pager, next, jumper"
    :total="this.tableData.length"
    small
    :page-size="pagesize"
  ></el-pagination>
  </div>
</div>
</template>

<script>
import '@/assets/css/table.css'
import bus from '@/assets/store/bus'
export default {
  name: 'myTable',
  props: {
    columns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    summary: {
      type: Boolean,
      default: false
    },
    summaries: {
      type: Array
    },
    checkColumn: {
      type: Boolean,
      default: false
    },
    leftfix: {
      type: String,
      default: 'left'
    },
    rightfix: {
      type: String,
      default: 'right'
    },
    buttonArray: {
      type: Array
    },
    pagesize: {
      type: Number,
      default: 10
    },
    updateStatus: {
      type: Boolean
    },
    delStatus: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      statusOption: [{label: '', value: ''}],
      visibile: false,
      fix: false,
      fixColumn: '',
      ss: '',
      tableHeight: window.innerHeight - 270
    }
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getSummaries (param) {
      const summaries = this.summaries
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        for (let i = 0; i <= summaries.length; i++) {
          if (index === summaries[i]) {
            sums[index] = ''
            return
          }
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = ''
          sums[index] += values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += '元'
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    fixLoad: function () {
      setTimeout(function () {
        var tableH = document.querySelector('#tableH')
        var tr = tableH.getElementsByTagName('tr')
        var th = tr[0].getElementsByTagName('th')
        for (let i = 0; i < th.length; i++) {
          th[i].onclick = function () {
            bus.$emit('fixloads', i)
            for (let l = 1; l < th.length; l++) {
              th[l].style.background = '#fff'
            }
            this.style.background = '#eee'
            for (let j = 1; j < tr.length; j++) {
              var td = tr[j].getElementsByTagName('td')
              for (let k = 0; k < td.length; k++) {
                td[k].style.background = '#fff'
                td[i].style.background = '#eee'
              }
            }
          }
        }
      }, 200)
    },
    fixcol (fixColumn) {
      if (this.visibile === true) {
        for (let i = 0; i < this.columns.length; i++) {
          this.columns[i].fix = false
          this.$parent.fixname = '冻结'
        }
        this.fixcolor(0, '')
        this.visibile = false
      } else {
        for (let j = 0; j < fixColumn; j++) {
          this.columns[j].fix = 'left'
          this.$parent.fixname = '解冻'
        }
        this.fixcolor(1, fixColumn)
        this.visibile = true
      }
    },
    fixcolor (status, column) {
      var div = document.querySelector('.el-table__fixed')
      var tr = div.getElementsByTagName('tr')
      var ths = tr[0].getElementsByTagName('th')
      if (status === 0) {
        ths[0].style.background = '#fff'
      } else {
        for (let i = 0; i < column + 1; i++) {
          ths[i].style.background = '#eee'
        }
      }
      for (let j = 1; j < tr.length; j++) {
        var tds = tr[j].getElementsByTagName('td')
        if (status === 0) {
          tds[0].style.background = '#fff'
        } else {
          for (let l = 0; l < column + 1; l++) {
            tds[l].style.background = '#eee'
          }
        }
      }
    },
    updateTableDoc (row) {
      this.$emit('updateTable', row)
    },
    delTableDoc (row, index) {
      const data = {'row': row, 'index': index}
      this.$emit('delTable', data)
    }
  },
  created () {
    this.fixLoad()
  }
}
</script>
