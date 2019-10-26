<template>
    <div class="loginIndex">
      <div class="header" v-bind:style="{'top': '0px', 'width': width + 'px', 'height': (0.08 * height) + 'px'}">
        <img class="logo" :src="logoPhoto()" v-bind:style="{'width': (0.06 * height) + 'px', 'top': (0.01 * height) + 'px', 'left': (0.02 * height) + 'px'}">
        <i  v-bind:style="{'top': (0.01 * height) + 'px', 'left': (0.1 * height) + 'px', 'font-size': (0.04 * height) + 'px'}">学生课堂考勤管理系统</i>
        <div class="rightTop" v-bind:style="{'right': (height*0.03) + 'px', 'top': (height*0.02) + 'px','height': (height*0.02) + 'px'}">
          <i class="el-icon-user"></i>
          <el-button type="text" v-on:click="goToRegister()" v-bind:style="{'font-size': (height*0.018) + 'px'}">立即注册</el-button>
          <el-divider direction="vertical"></el-divider>
          <i class="icon-loop2"></i>
          <el-button type="text" v-on:click="notice()" v-bind:style="{'font-size': (height*0.018) + 'px'}">修改密码</el-button>
        </div>
      </div>
      <div class="content" v-bind:style="{'top': (0.08 * height) + 'px'}">
        <img class="back" :src="backPhoto()" v-bind:style="{'width': width + 'px', 'height': (0.85 * height) + 'px'}">
        <loginForm class="loginForm" v-bind:style="{'top': (0.20 * height) + 'px', 'right': (0.3 * height) + 'px'}"></loginForm>
      </div>
      <div class="bottom" v-bind:style="{'top': (0.93 * height) + 'px', 'width': width + 'px', 'height': (0.07 * height) + 'px'}">
        <i class="headLine" v-bind:style="{'top': (height*0.92) + 'px', 'left': ((width-350)/2) + 'px'}">© 2019-2019 学生课堂考勤管理系统 罗鸿胜</i>
        <br>
        <i class="englishTitle" v-bind:style="{'top': (height*0.945) + 'px', 'left': ((width-586)/2) + 'px'}">© 2019-2019 Student class attendance management system --- Luo Hongsheng</i>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import loginForm from './loginForm'
export default {
  components: {
    loginForm
  },
  props: [],
  created () {
    // 打开页面前先运行函数getLength
    this.getLength()
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 定位并返回背景图片
    backPhoto () {
      return require('./back.jpg')
    },
    // 定位并返回LOGO图片
    logoPhoto () {
      return require('./logo.png')
    },
    // 获取浏览器长宽
    getLength () {
      this.height = document.documentElement.clientHeight
      this.width = document.documentElement.clientWidth
    },
    // 路由控制进入注册界面
    goToRegister () {
      this.$router.push('/register')
    },
    // 未开发提示
    notice () {
      this.$message('尚未完善，敬请期待')
    }
  },
  mounted () {
    // 实时获取、更改浏览器长宽
    window.onresize = () => {
      this.getLength()
    }
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginIndex
  .header
    position fixed
    .logo
      position fixed
    > i
      position fixed
      font-style normal
    .rightTop
      position fixed
  .content
    position fixed
  .loginForm
    position fixed
    width 360px
    height 445px
    background-color white
  .bottom
    margin-top 10px
    position fixed
    text-align center
    .headLine
      font-style normal
    .englishTitle
      font-style normal
</style>
