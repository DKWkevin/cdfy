<template>
<div>
  <query-nav :queryArray="queryArray"></query-nav>
  <query-btn :queryArray="querybtn" v-on:goToPage="query" v-on:addDoc="addDoc"></query-btn>
  <tables
    :columns="columns"
    :tableData="tableData"
  ></tables>
  <!--<Dialog ref="dialogs" :tableStatus="true" :GridColumn="columns" :gridTableData="GridColumn" :TitleName="TitleName"></Dialog>-->
  <div>
    <my-modal ref="addDoc" :FormStatus="true"
              :gridForm="addDocForm" :gridFromData="addDocData"
              :dialogTitleName="addDocTitle"></my-modal>
    <!--<my-modal ref="addDoc" :FormStatus="true"
               :gridForm="addDocForm" :gridFromData="addDocData"
               :dialogTitleName="addDocTitle" v-on:update="addUpdate"></my-modal>-->
    <!-- <my-dialog ref="dialogs" :FormStatus="true"
             :gridForm="gridForm" :gridFromData="gridData"
             :dialogTitleName="TitleName" v-on:search="hovload" v-on:update="diaglogUpdate"></my-dialog>
     <my-hov ref="hov" :HovTitleName="HovTitleName"
          :hovColumn="customidColumn" :inputTerm="customidTerm" v-on:hovDblclick="test"></my-hov>
     <my-hov ref="hovs2" :HovTitleName="HovTitleNames"
          :hovColumn="customidColumn" :inputTerm="customidTerm" v-on:hovDblclick="test2"></my-hov>-->
   </div>
</div>
</template>

<script>
import MyHov from '@/components/hov/myHov'
// import MyDialog from '@/components/dialog/myDialog'
import myModal from '@/components/dialog/myModal'
import QueryNav from '@/components/querynav/queryNav'
import QueryBtn from '@/components/buttonBox/queryBtn'
import TableColumn from '@/assets/json/Tablecolumns'
import tabledata from '@/assets/json/tabledata'
/* import gridData from '@/assets/json/gridData' */
import ecdfyTest from '@/assets/json/ecdfyTest'
import hov from '@/assets/json/hov'
import query from '@/assets/json/query'
import tables from '@/components/table/tables'
export default {
  name: 'dashboard',
  components: {tables, QueryNav, myModal, MyHov, QueryBtn},
  data () {
    return {
      // columns: this.$utils.clone(query.columns, true),
      columns: this.$utils.clone(TableColumn.data, true),
      tableData: [],
      summaries: [1, 2, 3, 4],
      buttonArray: [
        {title: '修改', index: '1', status: '1'},
        {title: '删除', index: '2', status: '1'}
      ],
      gridData: [],
      gridForm: this.$utils.clone(query.updateDoc, true),
      GridColumn: this.$utils.clone(ecdfyTest.TableColumns, true),
      fixColumn: '',
      TitleName: '修改模块',
      HovTitleName: '测试hov',
      HovTitleNames: '测试hov2',
      querystatus: false,
      fixname: '冻结',
      customidData: [],
      customidColumn: this.$utils.clone(hov.hovColumn, true),
      customidTerm: this.$utils.clone(hov.hovTerm, true),
      queryArray: this.$utils.clone(query.queryArray, true),
      querybtn: this.$utils.clone(query.querybtn, true),
      addDocForm: this.$utils.clone(query.addDoc, true),
      addDocData: this.$utils.clone(query.addData, true),
      addDocTitle: '新增模块',
      updateStatus: true,
      delStatus: true,
      modalStatus: false
    }
  },
  methods: {
    query () {
      // this.$refs.doctable.loading = true
      setTimeout(x => {
        // this.$refs.doctable.loading = false
        /* this.$axios.get('https://www.easy-mock.com/mock/5c072c2a3280fc0aefcf32b1/testProject/query').then((res) => {
          this.tableData = res.data
        }) */
        // this.tableData = this.$utils.clone(query.queryData, true)
        this.tableData = this.$utils.clone(tabledata, true)
        console.log(this.tableData)
      }, 1000)
      // this.querystatus = true
    },
    fixcol () {
      this.$refs.doctable.fixcol(this.fixColumn)
    },
    updateDialog (data) {
      this.gridData = data
      this.$refs.dialogs.dialogFormVisible = true
    },
    hovload (data) {
      if (data === 'customid') {
        this.$refs.hov.hovVisible = true
      } else {
        this.$refs.hovs2.hovVisible = true
      }
    },
    test (data) {
      this.gridData.card_customid = data.employeeid
      this.$refs.hov.hovVisible = false
    },
    test2 (data) {
      this.gridData.card_salesid = data.employeeid
      this.$refs.hovs2.hovVisible = false
    },
    diaglogUpdate (data) {
      console.log(data)
    },
    delTableDoc (data) {
      console.log(data)
    },
    gotopage (data) {
      console.log(data)
    },
    addDoc (data) {
      this.$refs.addDoc.dialogFormVisible = true
    },
    addUpdate (data) {
      console.log(data)
    }
  },
  created () {
    this.$bus.$on('fixloads', msg => {
      this.fixColumn = msg
    })
  }
}
</script>

<style>
#fixbox{
  float:left;
  width:11%;
  height:35px;
  margin-top:2px;
  margin-bottom:2px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border:1px solid #ccc;
  border-left:none;
  background: white;
}
</style>
