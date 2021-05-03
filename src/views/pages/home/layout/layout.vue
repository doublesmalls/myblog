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
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-hijiki/assets/',
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            '/live2dw/live2d-widget-model-nipsilon/assets/nipsilon.model.json',
        },
        display: { position: 'right', width: 180, height: 400 },
        mobile: { show: true },
        log: false,
      })
    }, 1000)
  },
  components: {
    Submit,
  },
}
</script>

<style lang="less" scoped>
.menu {
  width: 100%;
  position: fixed;
  top: 0;
}
</style>