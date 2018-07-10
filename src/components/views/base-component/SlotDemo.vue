<template>
  <div class="slot-demo">
    <strong>solt测试</strong>
    <header><slot name="header"><span class="fa fa-user-o"></span>我是slot标题</slot></header>
    <main><slot><span class="fa fa-superpowers"></span>我是slot主要内容</slot></main>
    <footer><slot name="footer"><span class="fa fa-user"></span>我是slot页脚标题</slot></footer>
  </div>
</template>

<script>
export default {
  name: 'SlotDemo'
}
</script>

<style scoped>
.slot-demo{
  border: 1px #4AB7BD dashed;
  margin: 5px;
  width: 300px
}
</style>
