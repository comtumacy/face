<template>
    <div class="createClass">
      <img class="photo" :src="backPhoto()" alt="">
      <span class="title1">人脸识别，智慧考勤</span>
      <span class="title2">创建班级</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-form-item label="考勤学院" prop="Sdept">
            <el-col>
              <el-select  v-model="ruleForm.Sdept" placeholder="请选择学院" v-bind:style="{'width': '100%'}">
                <el-option :label="itemCollege" :value="itemCollege" v-for="itemCollege in college" :key="itemCollege"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择班级" prop="class">
            <el-col>
              <el-select  v-model="ruleForm.Sclass" placeholder="请选择班级" v-bind:style="{'width': '45%'}">
                <el-option :label="itemClass" :value="itemClass" v-for="itemClass in classes" :key="itemClass"></el-option>
              </el-select>
              <el-input v-model="ruleForm.Sclassno" placeholder="请输入班号" v-bind:style="{'width': '45%', 'left': '10%'}"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <span class="select1">当前选择学院：{{ ruleForm.Sdept }}学院</span>
      <span class="select2">当前选择班级：{{ ruleForm.Sclass }}{{ ruleForm.Sclassno }}班</span>
      <el-button type="success" class="createButton" v-on:click="createButton()">创 建</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.backPhoto()
    this.getCollege()
  },
  data () {
    return {
      college: '',
      classes: '',
      ruleForm: {
        Sdept: '',
        Sclass: '',
        Sclassno: ''
      },
      // 校验规则设置
      rules: {
        Sdept: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        Sclass: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        Sclassno: [
          { required: true, message: '请输入班号', trigger: 'blur' },
          { min: 3, max: 3, message: '长度为 3 个数字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
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
    // 背景图片
    backPhoto () {
      return require('../../login/back.jpg')
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
          for (let i = 0; i < res.data.length; i++) {
            listClass.push(res.data[i].Cid)
          }
          this.classes = this.unique(listClass)
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
    },
    // 创建班级
    createButton () {
      if (this.Sclassno === '') {
        this.$message.error('请输入你需要创建的班号')
      } else {
        this.$axios({
          method: 'post',
          url: 'http://106.54.119.102/api/teacher/create_class',
          headers: {
            'Tno': this.$store.getters.no_getters,
            'token': this.$store.getters.token_getters
          },
          data: {
            'class': this.ruleForm.Sclass,
            'classno': this.ruleForm.Sclassno,
            'college': this.ruleForm.Sdept
          }
        }).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.info)
            this.attendanceResultsTeacher()
          } else {
            this.$message.error(res.data.info)
          }
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
.createClass
  .photo
    position fixed
    top 190px
    left 100px
    width 800px
    height 500px
  .title1
    position fixed
    top 720px
    left 350px
    font-size 30px
    font-family Microsoft Yahei
  .title2
    position fixed
    top 110px
    left 1370px
    font-size 40px
    font-family Microsoft Yahei
  .demo-ruleForm
    position fixed
    top 250px
    left 1000px
    width 400px
  .select1
    position fixed
    top 250px
    left 1420px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .select2
    position fixed
    top 315px
    left 1420px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .createButton
    position fixed
    top 415px
    left 1100px
    width 500px
</style>
