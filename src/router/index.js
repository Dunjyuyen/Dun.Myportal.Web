import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import hello from '@/view/hello'
import list from '@/view/list'
import exam_single from '@/view/exam_single'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '登录账号',
    component: login,
  },{
    path: '/hello',
    name: '首页',
    component: hello,
    children:[{
      path: '/hello',
      name: '首页',
      component: list,
    }]
  },{
    path: '/exam_single',
    name: '首页',
    component: exam_single,
  }]
})