// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/styles/index.scss' // global css
import SvgIcon from '@/components/modules/SvgIcon'// svg组件
// register globally
Vue.component('svg-icon', SvgIcon)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
