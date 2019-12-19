<template>
<div id="btnbox">
  <div v-for="(item, index) in queryArray" :index="index" :key="index">
    <vxe-button :id="item.id" v-if="item.type === 1" @click="goToPage(item.id)" type="primary" class="elbtn" round size="small">{{item.label}}</vxe-button>
    <vxe-button :id="item.id" v-if="item.type === 2" @click="addDoc(item.id)"  type="primary" class="elbtn" round size="small">{{item.label}}</vxe-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'queryBtn',
  props: {
    queryArray: {
      type: Array
    }
  },
  methods: {
    goToPage (id) {
      this.$emit('goToPage', id)
    },
    addDoc (id) {
      this.$emit('addDoc', id)
    }
  }
}
</script>

<style>
  #btnbox{
    width:100%;
    height:35px;
    background: white;
    margin-top:2px;
    margin-bottom:2px ;
    margin-left:2px;
    border-radius: 6px;
    border:1px solid #ccc;
  }
  .elbtn{float:left;margin:3px 0 0 2px}
</style>
