import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '../src/utils/request'// 引入自己封装过后的axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'; // 粒子背景
Vue.use(VueParticles)

// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: 'en-US',    // 语言标识
//   // this.$i18n.locale // 通过切换locale的值来实现语言切换
//   messages: {
//     'zh-CN': require('../public/language/chinese'),    // 中文语言包
//     'en-US': require('../public/language/english'),    // 英文语言包
//   }
// })
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
