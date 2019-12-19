<template>
<div>
  <vxe-modal v-model="modalStatus">
    <from>
    </from>
  </vxe-modal>
</div>
</template>

<script>
export default {
  name: 'myModal',
  props: {
    FormStatus: {
      type: Boolean
    },
    gridForm: {
      type: Array
    },
    gridFromData: {
      type: Array
    },
    modalStatus: {
      type: Boolean
    }
  }
}
</script>
