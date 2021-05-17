import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { updateTheme } from './tools/setting/setting'

import '../public/theme/theme_function.less'

Vue.use(Antd);

Vue.config.productionTip = false

Vue.prototype.$ls = Vue.ls

window.onmessage = function (event) {
  console.log('event', event)
  if (event.data.data === undefined && event.data.themeName !== undefined) {
    var Token = event.data.token
    var Theme = event.data.themeName
    var themeColor = event.data.themeColor
    var fSize = event.data.fSize
    updateTheme(themeColor, fSize)
    store.commit('switchTheme', Theme)
    localStorage.setItem('ow_Token', Token)
    localStorage.setItem('ow_Theme', Theme)
    localStorage.setItem('ow_themeColor', themeColor)
    localStorage.setItem('ow_fSize', fSize)
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
