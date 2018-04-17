import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import './lib/awesome/css/font-awesome.css'
import AppStyles from './css/app.less'
import Routes from './routes.js'
import App from './app'
import store from './store'
import './network'
import jquery from 'jquery'
// import types from './store/mutation-types'

//导入视频播放器插件
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

window.$ = jquery
window.videojs = videojs

Vue.use(Framework7Vue)
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  framework7: {
    root: '#app',
    routes: Routes,
  },
  components: {
    app: App
  }
})

store.dispatch("search_hotkey")