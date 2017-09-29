import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// import vConsole from 'vconsole'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })
Vue.use(VueAwesomeSwiper)
import VueResource from 'vue-resource'
Vue.use(VueResource);
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
import 'common/stylus/index.styl'
import filter from './api/filters'

import store from './store'


router.beforeEach(({meta, path}, from, next) => {
  let { auth = true } = meta
  let timer;
  let startTimer = function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      auth = false;
    },600000);
  }
  document.addEventListener('touchend', startTimer, false);

  let isLogin = Boolean(store.state.user.token)
  if (auth && !isLogin && path !== '/login') {
    next({ path: '/login' })
   }
   next()
})

fastclick.attach(document.body)
/* eslint-disable no-new */
window.evBus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

