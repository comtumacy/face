import Vue from 'vue'
// 导入路由包
import VueRouter from 'vue-router'
// 以下为导入src文件夹下的vue组件
import loginIndex from './src/components/login/loginIndex'
import getPhoto from './src/components/getPhoto/getPhoto'

// 挂载router在Vue上
Vue.use(VueRouter)

// 以下为路由规则
const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/loginIndex'
  },
  {
    path: '/loginIndex',
    component: loginIndex
  },
  {
    path: '/getPhoto',
    component: getPhoto
  }
]

const router = new VueRouter({
  routes
})

// 导出router对象
export default router
