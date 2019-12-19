<template>
<div>
  <transition name="fade">
    <vxe-modal :visible.sync="dialogFormVisible"
               :width="dialogWidth"
               :height="dialogHeight"
               :title="dialogTitleName"
               :center="true"
               :modal-append-to-body="false"
               :append-to-body="false"
               :close-on-click-modal="false"
               :modal="false"
               top="10vh"
               class="dialogFrom"
      >
      <!--table表格开始
      <el-table :data="gridTableData" v-if="tableStatus">
        <el-table-column
          v-for="(col, index) in GridColumn"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
        >
        </el-table-column>
      </el-table>
      table表格结束-->
      <!--form开始-->
      <form :model="gridFromData" v-if="FormStatus" :label-width="labelWidth" size="mini" label-position="right">
        <div :label="fm.label" v-for="(fm, index) in gridForm" :key="index">
          <!--input开始-->
          <div v-if="fm.type === 0">
          <el-input
            v-model="gridFromData[fm.id]"
            :disabled="fm.disabled"
            :clearable="true"
            style="width:80%;">
          </el-input>
          </div>
          <!--input结束-->
          <!--select开始-->
          <div v-if="fm.type === 1">
          <el-select v-model="gridFromData[fm.id]"
                     :disabled="fm.disabled"
                     style="width:80%;">
            <el-option v-for="item in fm.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          </div>
          <!--select结束-->
          <!--date开始-->
          <div v-if="fm.type === 2">
          <el-date-picker
            v-model="gridFromData[fm.id]"
            :disabled="fm.disabled"
            v-if="fm.timeType == 0"
            type="datetime"
            style="width:80%;">
          </el-date-picker>
          <el-date-picker
            v-model="gridFromData[fm.id]"
            :disabled="fm.disabled"
            v-else-if="fm.timeType == 1"
            style="width:80%;">
          </el-date-picker>
          </div>
          <!--date结束-->
          <!--HOV开始-->
          <div v-if="fm.type === 3">
            <el-input
              v-model="gridFromData[fm.id]"
              :disabled="fm.disabled"
              :clearable="true"
              style="width:80%;">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="search(fm.hovname)"></el-button>
          </div>
          <!--HOV结束-->
        </div>
      </form>
      <!--form结束-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="updateAll">确 定</el-button>
      </div>
    </vxe-modal>
  </transition>
</div>
</template>

<script>
export default {
  name: 'myDialog',
  props: {
    dialogTitleName: {
      type: String
    },
    tableStatus: {
      type: Boolean,
      default: false
    },
    FormStatus: {
      type: Boolean,
      default: false
    },
    GridColumn: {
      type: Array,
      default: null
    },
    gridTableData: {
      type: Array,
      default: null
    },
    dialogWidth: {
      type: String,
      default: '700px'
    },
    dialogHeight: {
      type: String,
      default: '500px'
    },
    gridForm: {
      type: Array,
      default: null
    },
    gridFromData: {
      type: Object,
      default: null
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    closeDialog () {
      this.dialogFormVisible = false
    },
    updateAll () {
      if (this.tableStatus === true) {
        this.$emit('update', this.gridTableData)
      } else if (this.FormStatus === true) {
        this.$emit('update', this.gridFromData)
      }
      this.dialogFormVisible = false
    },
    search (id) {
      this.$emit('search', id)
    }
  }
}
</script>

<style scoped>
.el-dialog__wrapper{
  overflow: hidden;
}
.dialogFrom {
  position: absolute !important;
  height: calc(100% - 30px);
  top: 30px !important;
}
</style>
