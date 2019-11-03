<template>
    <div class="loginForm">
      <el-row class="loginFormRow">
        <el-col class="title">账号密码登录</el-col>
        <el-col class="no">
          <el-input
            placeholder="请输入学号或者教师编号"
            v-model="no"
            clearable>
          </el-input>
        </el-col>
        <el-col class="userName">
          <el-input
            placeholder="请输入账号"
            v-model="userName"
            clearable>
          </el-input>
        </el-col>
        <el-col class="passWord">
          <el-input
            placeholder="请输入密码"
            v-model="passWord"
            show-password>
          </el-input>
        </el-col>
        <el-col class="verificationCode" :span="12">
          <el-input
            placeholder="验证码"
            v-model="verificationCode"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <img class="verificationCodeImg" v-bind:src="'data:image/png;base64,' + verificationCodeImg()" v-on:click="refreshCaptchaImg()">
        </el-col>
        <el-col class="checked">
          <el-checkbox v-model="checked">是否为教师登录</el-checkbox>
        </el-col>
        <el-col class="button">
          <el-button type="primary" v-on:click="loginEnter()">登录</el-button>
        </el-col>
        <el-col class="text">
          <el-button type="text">忘记密码？</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.getCaptchaImg()
  },
  data () {
    return {
      no: '',
      userName: '',
      passWord: '',
      verificationCode: '',
      checked: false,
      captchaImg: '',
      ctoken: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取验证码图片
    getCaptchaImg () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102:80/api/user/verification_code'
      }).then(res => {
        this.ctoken = res.headers.ctoken
        this.captchaImg = res.data.base64
      }).catch(err => {
        this.$message.error('获取验证码图片失败，请检查你的网络连接')
        console.log(err)
      })
    },
    // 刷新验证码图片
    refreshCaptchaImg () {
      this.$message.success('刷新验证码成功')
      this.getCaptchaImg()
    },
    // 返回验证码图片
    verificationCodeImg () {
      return this.captchaImg
    },
    // 登录
    loginEnter () {
      // 学生登录
      if (this.checked === false) {
        this.$axios({
          method: 'post',
          url: 'http://106.54.119.102:80/api/user/login',
          headers: { 'ctoken': this.ctoken, 'code': this.verificationCode },
          data: {
            'Sno': Number(this.no),
            'username': this.userName,
            'password': this.passWord
          }
        }).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.info)
            this.$store.dispatch('token_actions', res.headers.token)
            this.$store.dispatch('no_actions', this.no)
            this.$router.push('/studentIndex')
          } else if (res.status === 401) {
            this.$message.error(res.data.info)
          }
        }).catch(err => {
          console.log(err)
        })
      // 教师登录
      } else {
        this.$axios({
          method: 'post',
          url: 'http://106.54.119.102:80/api/user/login_teacher',
          headers: { 'ctoken': this.ctoken, 'code': this.verificationCode },
          data: {
            'Tno': Number(this.no),
            'username': this.userName,
            'password': this.passWord
          }
        }).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.info)
            this.$store.dispatch('token_actions', res.headers.token)
            this.$store.dispatch('no_actions', this.no)
            this.$router.push('/teacherIndex')
          } else if (res.status === 401) {
            this.$message.error(res.data.info)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginForm
  .loginFormRow
    width 100%
    height 100%
    .title
      margin 40px 0 40px 0
      padding-left 20px
      font-family "Microsoft Yahei"
      font-weight 600
      font-size 20px
      color rgb(63,83,110)
    .no
      margin 0
      padding-left 20px
      padding-right 20px
    .userName
      margin 10px 0 0 0
      padding-left 20px
      padding-right 20px
    .passWord
      margin 10px 0 0 0
      padding-left 20px
      padding-right 20px
    .verificationCode
      margin 10px 0 20px 0
      padding-left 20px
      padding-right 20px
    .verificationCodeImg
      margin 10px 0 20px 0
      height 40px
      width 140px
      cursor pointer
    .checked
      margin 0 0 20px 20px
      .el-checkbox
        .el-checkbox__label
          color black
    .button
      margin 0 0 0 20px
      .el-button
        width 320px
    .text
      margin 0 0 0 20px
      .el-button
        color rgb(179,179,179)
</style>
