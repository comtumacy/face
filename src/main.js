import Vue from 'vue'
import App from './App.vue'
// 导入路由封装文件
import router from '../route'
// 导入axios包
import axios from 'axios'
// 导入MD5加密包
import md5 from 'js-md5'
// 导入字体库文件
import './assets/style.css'
// 导入CSS动画库文件
import './assets/animate/animate.css'
// 导入VUEX封装文件
import store from './store/store'
// 导入HTTP拦截器
import './http/http'
// 按需导入Element UI组件库包
import { Icon, Button, ButtonGroup, Divider, Row, Col, Input, Checkbox, CheckboxButton, CheckboxGroup, Message, MessageBox, Container, Aside, Main, Form, FormItem, Select, Option, OptionGroup, DropdownMenu, Menu, Submenu, MenuItem, MenuItemGroup, Tooltip, Progress, Table, TableColumn } from 'element-ui'

// 关闭生产模式
Vue.config.productionTip = false
// 定义全局变量axios
Vue.prototype.$axios = axios
// 定义全局变量md5
Vue.prototype.$md5 = md5
// 定义全局Element UI组件的变量
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.use(Icon)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DropdownMenu)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tooltip)
Vue.use(Progress)
Vue.use(Table)
Vue.use(TableColumn)

// 挂载
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
