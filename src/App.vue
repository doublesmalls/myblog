<template>
  <div id="app">
    <router-view></router-view>
    <!-- <live2d ref="live2d" :className="className" @live2dItemClick="live2dItemClick" @live2dItemEnter="live2dItemEnter"></live2d> -->
  </div>
</template>

<script>
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
            '/live2dw/live2d-widget-model-hibiki/assets/hibiki.model.json',
        },
        display: { position: 'right', width: 180, height: 400 },
        mobile: { show: true },
        log: false,
      })
    }, 1000)
  },
  name: 'App',
}
</script>

<style>
@import url('//at.alicdn.com/t/font_2289781_0t0zh082k9d.css');
html,
body {
  height: 100%;
}
#app {
  min-width: 1280px;
  min-height: 720px;
  height: 100%;
}
</style>
