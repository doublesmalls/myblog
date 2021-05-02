<template>
  <div>
    <Menu class="menu" mode="horizontal" active-name="1">
      <MenuItem to="/home" name="home">
        <i class="iconfont icon-shouye"></i>
        首页
      </MenuItem>
      <MenuItem to="/article" name="article">
        <i class="iconfont icon-navicon-wzgl"></i>文章
      </MenuItem>
      <MenuItem to="/comment" name="message">
        <i class="iconfont icon-liuyan"></i>留言
      </MenuItem>
      <MenuItem to="/picture" name="picture">
        <i class="iconfont icon-sheji_huatu"></i>乱涂乱画
      </MenuItem>
      <Submit></Submit>
    </Menu>
    <router-view style="margin-top:60px;"></router-view>
  </div>
</template>

<script>
import Submit from '@/views/pages/home/layout/submit.vue'
export default {
  components: {
    Submit,
  },
}
</script>

<style lang="less" scoped>
.menu {
  width:100%;
  position: fixed;
  top: 0;
}
</style>