<template>
  <div>
    <Menu class="menu" mode="horizontal" active-name="1">
      <MenuItem to="/home" name="home">
        <Icon type="ios-paper" />首页
      </MenuItem>
      <MenuItem to="/article" name="article">
        <Icon type="ios-people" />文章
      </MenuItem>
      <MenuItem to="/comment" name="message">
        <Icon type="ios-construct" />留言
      </MenuItem>
      <MenuItem to="/picture" name="picture">
        <Icon type="ios-construct" />乱涂乱画
      </MenuItem>
      <Submit></Submit>
    </Menu>
    <router-view></router-view>
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
  position: relative;
}
</style>