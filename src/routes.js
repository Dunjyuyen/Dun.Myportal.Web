import login from '@/view/login'
import hello from '@/view/hello'
import list from '@/view/list'
import exam_single from '@/view/exam_single'
import exam_mult from '@/view/exam_mult'
import exam_judge from '@/view/exam_judge'
import exam_result from '@/view/exam_result'
let routes = [{
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
    name: '单选题',
    component: exam_single,
  },{
    path: '/exam_mult',
    name: '多选题',
    component: exam_mult,
  },{
    path: '/exam_judge',
    name: '判断题',
    component: exam_judge,
  },{
    path: '/exam_result',
    name: '考试结果',
    component: exam_result,
  }]

  export default routes;