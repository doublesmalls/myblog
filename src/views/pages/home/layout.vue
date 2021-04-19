<template>
  <div>
    <Menu mode="horizontal" active-name="1">
      <MenuItem to="/home" name="home">
        <Icon type="ios-paper" />内容管理
      </MenuItem>
      <MenuItem to="/article" name="article">
        <Icon type="ios-people" />用户管理
      </MenuItem>
      <MenuItem to="/comment" name="message">
        <Icon type="ios-construct" />综合设置
      </MenuItem>
      <MenuItem to="/picture" name="picture">
        <Icon type="ios-construct" />综合设置
      </MenuItem>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>