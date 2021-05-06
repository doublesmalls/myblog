<template>
  <div id="app">
    <router-view></router-view>
    <!-- <live2d ref="live2d" :className="className" @live2dItemClick="live2dItemClick" @live2dItemEnter="live2dItemEnter"></live2d> -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('//at.alicdn.com/t/font_2289781_mhs9drox6oh.css');
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
