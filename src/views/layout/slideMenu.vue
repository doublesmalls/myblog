<template>
  <div style="height:100%">
    <Menu  theme="dark" active-name="user">
      <MenuItem to="/admin/user" name="user">
        <i class="iconfont icon-yonghu"></i>用户管理
      </MenuItem>
      <MenuItem name="article">
        <i class="iconfont icon-navicon-wzgl"></i>文章管理
      </MenuItem>
      <MenuItem name="message">
        <i class="iconfont icon-iconfontpinglun"></i>评论管理
      </MenuItem>
      <MenuItem name="comment">
        <i class="iconfont icon-icon-test"></i>留言管理
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {}
</script>

<style>
.ivu-menu{
  height:100%;
  background-color: pink;
}
</style>