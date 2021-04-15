/*
 * @Author: your name
 * @Date: 2021-04-09 09:16:56
 * @LastEditTime: 2021-04-09 12:26:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \zizhu\vue.config.js
 */
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    hotOnly: true,
    https: false,
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: process.env.VUE_APP_API,
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    }
  }
};