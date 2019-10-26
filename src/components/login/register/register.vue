<template>
    <div class="register">
      <img :src="logoPhoto()" alt="" v-bind:style="{'top': (height * 0.032) + 'px','left': (width * 0.131) + 'px'}">
      <i v-bind:style="{'top': (0.025 * height) + 'px', 'left': (0.131 * width + 60) + 'px', 'font-size': (0.044 * height) + 'px'}">学生课堂考勤管理系统</i>
      <div class="divider" v-bind:style="{'left': (width * 0.131) + 'px', 'width': (0.736 * width) + 'px', 'top': (0.025 * height + 60) + 'px'}">
        <el-divider></el-divider>
      </div>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <img :src="backPhoto()" alt="">
          </el-row>
          <el-row>
            <i>人脸识别，智慧考勤</i>
          </el-row>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="12">注册新用户</el-col>
            <el-col :span="12">
              我已经注册，现在就
              <el-button type="text">登录</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" show-password>></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科室" prop="department">
              <el-select  v-model="ruleForm.department" placeholder="请选择科室">
                <el-option :label="itemDepartment" :value="itemDepartment" v-for="itemDepartment in department" :key="itemDepartment"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-row>
                <el-col :span="12">
                  <el-input v-model="ruleForm.captcha"></el-input>
                </el-col>
                <el-col :span="12">
                  <img :src="logoPhoto()" alt="" v-bind:style="{'width': (height * 0.032) + 'px','height': (width * 0.02) + 'px'}">
                </el-col>
              </el-row>
<!--              <img id="verificationCodeImg" v-bind:src="verificationCodeImg()" v-on:click="refreshCaptchaImg()">-->
            </el-form-item>
          </el-form>
          <el-row>
            <el-checkbox v-model="checked">
              请阅读
              <el-button type="text">《服务条款》</el-button>
            </el-checkbox>
          </el-row>
          <el-row>
            <el-button class="button" type="success">注 册</el-button>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.getLength()
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      width: 0,
      height: 0,
      department: '',
      checked: false,
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        department: '',
        gender: '',
        tel: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 10, message: '为了安全，密码长度请大于 10 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 10, message: '为了安全，密码长度请大于 10 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号应为11位数', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码应为 4 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 定位并返回LOGO图片
    logoPhoto () {
      return require('./logo.png')
    },
    // 定位并返回背景图片
    backPhoto () {
      return require('../back.jpg')
    },
    // 获取浏览器长宽
    getLength () {
      this.height = document.documentElement.clientHeight
      this.width = document.documentElement.clientWidth
      console.log(document.documentElement.clientHeight, document.documentElement.clientWidth)
    },
    // 点击注册按钮事件
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://yitongli.cn/api/user/register',
            data: this.ruleForm,
            headers: {
              ctoken: this.ctoken,
              captcha: this.ruleForm.captcha
            } })
            .then(res => {
              if (res.status === 200) {
                this.$nextTick(() => {
                  this.$message.success('注册成功')
                })
              } else if (res.status === 401) {
                this.$message.error(res.data.message)
              }
            })
            .catch(() => {
              this.$message.error('注册失败，请重新输入')
            })
        } else {
          this.$message.error('输入错误，请再次检查您输入的内容')
        }
      })
    },
    // 返回验证码图片
    verificationCodeImg () {
      return this.captchaImg
    },
    // 获取验证码图片
    getCaptchaImg () {
      this.$axios({
        method: 'post',
        url: 'http://yitongli.cn/api/captcha/getCaptcha',
        responseType: 'arraybuffer'
      }).then(res => {
        this.ctoken = res.headers.ctoken
        this.captchaImg = 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      }).catch(err => {
        console.log(err)
      })
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
.register
  > img
    position fixed
    height 45px
    width 45px
  > i
    position fixed
    font-style normal
    color rgb(106,61,42)
  .divider
    position fixed
    .el-divider
      margin-top 12px
      margin-bottom 12px
      background-color rgb(106,61,42)
</style>
