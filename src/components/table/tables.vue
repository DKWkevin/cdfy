<template>
  <div>
    <vxe-table
      border
      resizable
      highlight-hover-row
      stripe
      max-height="400px"
      :data="tableData"
      size="mini">
      <vxe-table-column
        v-for="(col, index) in columns"
        :key="index"
        :field="col.prop"
        :title="col.label"
        :sortable="col.sortable"
        :fixed="col.fixed"
      ></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'tables',
  props: {
    columns: {
      type: Array
    },
    tableData: {
      type: Array
    }
  }
}
</script>
