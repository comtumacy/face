import Vue from 'vue'
// 导入路由包
import VueRouter from 'vue-router'
// 导入vuex状态管理器
import store from './src/store/store'
// 以下为导入src文件夹下的vue组件
// 登录主页
import loginIndex from './src/components/login/loginIndex'
// 注册
import register from './src/components/login/register/register'
// 学生主页
import studentIndex from './src/components/student/studentIndex'
// 拍照获取照片
import getFace from './src/components/student/getFace/getFace'
// 查看学生考勤情况
import attendanceResults from './src/components/student/attendanceResults/attendanceResults'
// 修改学生个人信息
import studentModify from './src/components/student/studentModify/studentModify'
// 教师主页
import teacherIndex from './src/components/teacher/teacherIndex'
// 创建班级
import createClass from './src/components/teacher/createClass/createClass'
// 人脸考勤
import faceDistinguish from './src/components/teacher/faceDistinguish/faceDistinguish'
// 教师查询、修改考勤信息
import attendanceResultsTeacher from './src/components/teacher/attendanceResultsTeacher/attendanceResultsTeacher'

// 挂载router在Vue上
Vue.use(VueRouter)

// 以下为路由规则
const routes = [
  // 登录
  {
    path: '/',
    // 重定向
    redirect: '/loginIndex'
  },
  // 登录
  {
    path: '/loginIndex',
    component: loginIndex
  },
  // 注册
  {
    path: '/register',
    component: register
  },
  // 学生主页
  {
    path: '/studentIndex',
    component: studentIndex,
    redirect: '/studentIndex/getFace',
    // 嵌套路由
    children: [
      {
        // 拍照获取照片
        path: 'getFace',
        component: getFace
      },
      {
        // 查看学生考勤情况
        path: 'attendanceResults',
        component: attendanceResults
      },
      {
        // 修改学生个人信息
        path: 'studentModify',
        component: studentModify
      }
    ]
  },
  // 教师主页
  {
    path: '/teacherIndex',
    component: teacherIndex,
    redirect: '/teacherIndex/faceDistinguish',
    // 嵌套路由
    children: [
      {
        // 创建班级
        path: 'createClass',
        component: createClass
      },
      {
        // 人脸考勤
        path: 'faceDistinguish',
        component: faceDistinguish
      },
      {
        // 教师查询、修改考勤信息
        path: 'attendanceResultsTeacher',
        component: attendanceResultsTeacher
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else if (to.path === '/loginIndex') {
    next()
  } else if (to.path === '/register') {
    next()
  } else {
    if (store.getters.token_getters !== '') {
      next()
    } else if (store.getters.token_getters === '') {
      next('/loginIndex')
    }
  }
})

// 导出router对象
export default router
