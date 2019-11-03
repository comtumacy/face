<template>
    <div class="studentModify">
      <span class="title">修改个人信息</span>
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
        <el-form-item label="生日" prop="Birth">
          <el-input v-model="ruleForm.Birth"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="Saddress">
          <el-input v-model="ruleForm.Saddress"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="Stime">
          <el-input v-model="ruleForm.Stime"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="button" type="success" v-on:click="submitForm()">修 改</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.get_student_info()
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
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        Sname: '',
        Ssex: '',
        Birth: '',
        Saddress: '',
        Stime: ''
      },
      // 校验规则设置
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
        Sname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        Ssex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        Birth: [
          { required: true, message: '请输入生日', trigger: 'blur' },
          { max: 12, message: '生日应为小于 12 个字符', trigger: 'blur' }
        ],
        Saddress: [
          { required: true, message: '请输入家庭地址', trigger: 'blur' },
          { max: 30, message: '家庭地址应小于 30 个字符', trigger: 'blur' }
        ],
        Stime: [
          { required: true, message: '请输入入学时间', trigger: 'blur' },
          { max: 12, message: '入学时间应为小于 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 点击修改按钮事件
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://106.54.119.102:80/api/user/modify',
            data: this.ruleForm,
            headers: {
              'Sno': this.$store.getters.no_getters,
              'token': this.$store.getters.token_getters
            }
          })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$nextTick(() => {
                  this.$message.success(res.data.info)
                })
              } else if (res.status === 401) {
                this.$message.error(res.data.info)
              }
            })
        } else {
          this.$message.error('输入错误，请再次检查您输入的内容')
        }
      })
    },
    // 获取学生个人信息
    get_student_info () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/get_student_info',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        }
      }).then(res => {
        this.ruleForm.username = res.data[0].username
        this.ruleForm.password = res.data[0].password
        this.ruleForm.Sname = res.data[0].Sname
        this.ruleForm.Ssex = res.data[0].Ssex
        this.ruleForm.Birth = res.data[0].Birth
        this.ruleForm.Saddress = res.data[0].Saddress
        this.ruleForm.Stime = res.data[0].Stime
      })
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.studentModify
  .title
    position fixed
    top 100px
    left 43%
    font-size 40px
    font-family Microsoft Yahei
  .demo-ruleForm
    position fixed
    top 200px
    left 32%
    width 601px
  .button
    position fixed
    top 710px
    left 37%
    width 501px
</style>
