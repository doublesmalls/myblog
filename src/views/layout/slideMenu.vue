<template>
  <div style="height:100%">
    <Layout>
      <Sider breakpoint="md" collapsible :collapsed-width="78">
        <Menu theme="dark" active-name="user">
          <MenuItem to="/admin/user" name="user">
            <i class="iconfont icon-yonghu"></i>用户管理
          </MenuItem>
          <MenuItem to="/admin/article" name="article">
            <i class="iconfont icon-navicon-wzgl"></i>文章管理
          </MenuItem>
          <MenuItem to="/admin/message" name="message">
            <i class="iconfont icon-iconfontpinglun"></i>评论管理
          </MenuItem>
          <MenuItem to="/admin/comment" name="comment">
            <i class="iconfont icon-icon-test"></i>留言管理
          </MenuItem>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Content class="content" :style="{margin: '20px 20px 20px 80px', background: '#fff', minHeight: '220px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {}
</script>

<style>
.ivu-layout {
  height: 100%;
}
.ivu-menu {
  height: 100%;
}
.content{
  box-sizing: border-box;
  padding: 10px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>