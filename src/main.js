// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'


import MouseUI from 'muse-ui'

import {
  RadioGroup,
  Radio,
  Checkbox, 
  CheckboxGroup,
  Toast,
  Dialog,
  NoticeBar,
  Loading 
} from 'vant';
import 'vant/lib/index.css'
import 'muse-ui/dist/muse-ui.css';

import store from '@/vuex/index'

Vue.use(MouseUI);

Vue.use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup).use(Toast).use(Dialog).use(NoticeBar).use(Loading);

Vue.use(VueCookies)
Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    store.commit('clear_cookie',()=>{
      console.log('退出登录')
      next()
    })
  }else{
    store.commit('is_login',(isLogin)=>{
      if(!isLogin && to.path != '/'){
        next({ path: '/' })
      } else {
        next()
      }
    })
  }

})

// })
export default router
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
