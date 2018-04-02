<template>
  <div class="content">
    <p class="menu_item" v-on:click="onItemClick('1')">
      <img src="../assets/item01-1.png" width="18" height="18"/>报修工单列表</p>
    <p class="menu_item" v-on:click="onItemClick('2')">
      <img src="../assets/item02-1.png" width="18" height="18"/>送水工单列表</p>
    <p class="menu_item" v-on:click="onItemClick('3')">
      <img src="../assets/item04-1.png" width="19" height="19"/>保洁工单列表</p>
    <p class="menu_item" v-on:click="onItemClick('4')">
      <img src="../assets/item03-1.png" width="19" height="15"/>运送工单列表</p>
    <p class="menu_item" v-on:click="onItemClick('5')">
      <img src="../assets/item05-1.png" width="18" height="18"/>巡检记录</p>
    <p class="menu_item" v-on:click="onItemClick('6')">
      <img src="../assets/item_my.png" width="18" height="18"/>报修工单统计</p>
    <p class="menu_item" v-on:click="onItemClick('7')">
      <img src="../assets/item_feedback.png" width="18" height="18"/>意见反馈列表</p>
  </div>
</template>

<script>
  document.title = '实时数据'

  export default {
    data () {
      return {
        titleType: '实时数据'
      }
    },
    created () {
      document.body.style.backgroundColor = 'white'
    },
    methods: {
      onItemClick: function (showId) {
        this.$router.push({path: 'datalist', query: {'showId': showId}})
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: white !important;
  }

  .content {
    padding: 0 30px;
    /*margin-top: 50px;*/
  }

  .menu_item {
    border-bottom: 1px solid rgba(236, 236, 236, 0.7);
    height: 100px;
    line-height: 100px;
    /*text-align: center;*/
    font-size: 1em;
  }
  .menu_item img{
    margin-right: 20px;
  }
</style>
