<template>
    <div class="registerRight">
      <el-row class="registerRightRow1" type="flex" justify="space-between">
        <el-col class="registerRightTitle" :span="12">注册新用户</el-col>
        <el-col class="registerRightTitle2" :span="12">
          我已经注册，现在就
          <el-button class="registerRightButton" type="text" v-on:click="toLogin()">登录</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学号" prop="Sno">
          <el-input v-model="ruleForm.Sno"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password>></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="Sname">
          <el-input v-model="ruleForm.Sname"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="性别" prop="Ssex">
            <el-col>
              <el-select v-model="ruleForm.Ssex" placeholder="请选择性别" v-bind:style="{'width': '100%'}">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="所属学院" prop="Sdept">
            <el-col>
              <el-select  v-model="ruleForm.Sdept" placeholder="请选择学院" v-bind:style="{'width': '100%'}">
                <el-option :label="itemCollege" :value="itemCollege" v-for="itemCollege in college" :key="itemCollege"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="所属班级" prop="class">
            <el-col>
              <el-select  v-model="ruleForm.Sclass" placeholder="请选择班级" v-bind:style="{'width': '45%'}">
                <el-option :label="itemClass" :value="itemClass" v-for="itemClass in classes" :key="itemClass"></el-option>
              </el-select>
              <el-select  v-model="ruleForm.Sclassno" placeholder="请选择班号" v-bind:style="{'width': '45%', 'left': '10%'}">
                <el-option :label="itemClass" :value="itemClass" v-for="itemClass in classesNo" :key="itemClass"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="12">
              <el-input v-model="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="12">
              <img id="verificationCodeImg" v-bind:src="'data:image/png;base64,' + captchaImg" v-on:click="refreshCaptchaImg()">
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row>
        <el-checkbox class="selectBox" v-model="checked">
          请阅读
          <el-button type="text">《服务条款》</el-button>
        </el-checkbox>
      </el-row>
      <el-row>
        <el-button class="button" type="success" v-on:click="submitForm()">注 册</el-button>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: ['width', 'height'],
  created () {
    this.getCollege()
    this.getCaptchaImg()
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
      college: '',
      classes: '',
      classesNo: '',
      checked: false,
      captchaImg: '',
      ctoken: '',
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        Sname: '',
        Ssex: '',
        Sdept: '',
        Sclass: '',
        Sclassno: '',
        captcha: ''
      },
      // 校验规则设置
      rules: {
        Sno: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 12, max: 12, message: '长度为 12 个数字', trigger: 'blur' }
        ],
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
        Sname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        Sdept: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        Sclass: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        Sclassno: [
          { required: true, message: '请选择班号', trigger: 'change' }
        ],
        Ssex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码应为 4 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    // 深度监听对象内部属性的改变
    'ruleForm.Sdept': {
      handler () {
        this.getClass()
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    // 去登录页面
    toLogin () {
      this.$router.push('/')
    },
    // 点击注册按钮事件
    submitForm () {
      if (this.checked === true) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'http://106.54.119.102:80/api/user/register',
              data: this.ruleForm,
              headers: {
                ctoken: this.ctoken,
                code: this.ruleForm.captcha
              }
            })
              .then(res => {
                console.log(res)
                if (res.status === 200) {
                  this.$nextTick(() => {
                    this.$message.success('注册成功')
                  })
                } else if (res.status === 401) {
                  this.$message.error(res.data.info)
                }
              })
              .catch(err => {
                console.log(err)
                console.log(0)
                this.$message.error(err.data.info)
              })
          } else {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }
        })
      } else {
        this.$message.error('请阅读《服务条款》')
      }
    },
    // 刷新验证码图片
    refreshCaptchaImg () {
      this.$message.success('刷新验证码成功')
      this.getCaptchaImg()
    },
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
    // 获取学院数据
    getCollege () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102:80/api/public/get_college'
      }).then(res => {
        if (res.status === 200) {
          let list = []
          for (let i = 0; i < res.data.length; i++) {
            list.push(res.data[i].Cname)
          }
          this.college = list
        } else {
          this.$message.error('获取学院数据失败，请检查你的网络连接')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取班级数据
    getClass () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102:80/api/public/get_class',
        data: { 'college': this.ruleForm.Sdept }
      }).then(res => {
        if (res.status === 200) {
          let listClass = []
          let listClassNo = []
          for (let i = 0; i < res.data.length; i++) {
            listClass.push(res.data[i].Cid)
            listClassNo.push(res.data[i].Cname)
          }
          this.classes = this.unique(listClass)
          this.classesNo = this.unique(listClassNo)
        } else {
          this.$message.error('获取班级数据失败，请检查你的网络连接')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 去除重复值
    unique (arr) {
      let hash = []
      for (let i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) === -1) {
          hash.push(arr[i])
        }
      }
      return hash
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.registerRight
  .registerRightRow1
    height 26px
    > img
      margin 5px
    .registerRightTitle
      margin-left 20px
      font-size 22px
      color rgb(154,154,154)
    .registerRightTitle2
      width auto
      font-size 15px
      color rgb(154,154,154)
      .registerRightButton
        border 0
        padding 5px
        font-size 15px
  .el-divider
    margin 6px 0 12px 0
  .selectBox
    margin-left 100px
  #verificationCodeImg
    cursor pointer
  .button
    margin-left 100px
    width 78%
</style>
