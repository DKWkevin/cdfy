<template>
<div>
  <transition name="fade">
    <el-dialog :visible.sync="hovVisible"
               :width="hovWidth"
               :height="hovHeight"
               :title="HovTitleName"
               :center="true"
               :modal-append-to-body="false"
               :append-to-body="false"
               :close-on-click-modal="false"
               :modal="false"
               top="10vh"
               class="hov"
    >
      <div class="termDiv">
        <div v-for="(col, index) in inputTerm" :key="index">
        <span class="termSpan">{{col.label}}</span>
        <el-input  :id="col.id" class="termInput"></el-input>
        </div>
      </div>
      <div class="btnDiv">
        <el-button class="hovQueryBtn" type="primary" round @click="hovClick">查询</el-button>
      </div>
      <!--table表格开始-->
      <el-table :data="hovData" @row-dblclick="rowDblclick">
        <el-table-column
          v-for="(col, index) in hovColumn"
          :key="index"
          :prop="col.prop"
          :label="col.label"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </transition>
</div>
</template>

<script>
export default {
  name: 'myHov',
  props: {
    hovColumn: {
      type: Array
    },
    hovWidth: {
      type: String,
      default: '700px'
    },
    hovHeight: {
      type: String,
      default: '500px'
    },
    HovTitleName: {
      type: String
    },
    inputTerm: {
      type: Array
    }
  },
  data () {
    return {
      hovVisible: false,
      hovData: null
    }
  },
  methods: {
    hovClick () {
      this.hovData = [
        {
          'employeeid': '25',
          'employeename': '2561739',
          'employeeopcode': '0'
        }
      ]
    },
    rowDblclick (row, column, event) {
      this.$emit('hovDblclick', row)
    }
  }
}
</script>

<style scoped>
.hov{
    position: absolute !important;
    height: calc(100% - 30px);
    top: 30px !important;
}
.hov .el-dialog{
  width:700px;
}
.termDiv {width:100%;height:30px;}
.termSpan {float: left;font-size:13px;line-height:30px;}
.termInput {width:120px;float:left;margin:0 10px;}
.btnDiv {width:100%; height:30px;}
.hovQueryBtn {margin-left:40%;font-size: 14px;}
.hov .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 10px 10px 30px;

}
</style>
