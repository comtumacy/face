<template>
    <div class="attendanceResultsTeacher">
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
          <el-form-item label="考勤班级" prop="class">
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
      </el-form>
      <span class="select1">当前选择学院：{{ ruleForm.Sdept }}学院</span>
      <span class="select2">当前选择班级：{{ ruleForm.Sclass }}{{ ruleForm.Sclassno }}班</span>
      <span class="titleDate">请选择需要查看的考勤日期：</span>
      <el-select class="selectDate" v-model="selectDate" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span class="selectedDateTitle">已选择：{{ selectDate }}</span>
      <img class="photo" :src="backPhoto()" alt="">
      <span class="title1">人脸识别，智慧考勤</span>
      <span class="title2">{{ name }}考勤情况</span>
      <el-table
        class="rightTable"
        v-bind:data="tableData"
        border
        :fit="false">
        <el-table-column
          prop="no"
          label="学号"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          prop="attendance"
          label="是否考勤"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <attendanceResultsTeacherAlert
        v-show="openSign"
        @sentEdit="closeAndEdit">
      </attendanceResultsTeacherAlert>
    </div>
</template>

<script type="text/ecmascript-6">
import attendanceResultsTeacherAlert from './attendanceResultsTeacherAlert'
export default {
  components: {
    attendanceResultsTeacherAlert
  },
  props: [],
  created () {
    this.backPhoto()
    this.getCollege()
  },
  data () {
    return {
      options: '',
      selectDate: '',
      name: '',
      tableData: [],
      no: 0,
      openSign: false,
      college: '',
      classes: '',
      classesNo: '',
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
          { required: true, message: '请选择班号', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    // 监听对象内部属性的改变
    selectDate () {
      this.attendanceResultsTeacher()
    },
    // 深度监听对象内部属性的改变
    'ruleForm.Sdept': {
      handler () {
        this.getClass()
      },
      deep: true,
      immediate: false
    },
    'ruleForm.Sclassno': {
      handler () {
        this.getModifyDate()
      },
      deep: true,
      immediate: true
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
    },
    // 获取班级考勤日期
    getModifyDate () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/teacher/get_modify_date',
        headers: {
          'Tno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        },
        data: {
          'class': this.ruleForm.Sclass,
          'classno': this.ruleForm.Sclassno
        }
      }).then(res => {
        let list = []
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i].date)
        }
        this.options = list
      })
    },
    // 获取班级考勤详情
    attendanceResultsTeacher () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/teacher/attendance_results_teacher',
        headers: {
          'Tno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        },
        data: {
          'class': this.ruleForm.Sclass,
          'classno': this.ruleForm.Sclassno,
          'date': this.selectDate
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('查询成功')
          let list = []
          let obj = res.data[0]
          for (let key in obj) {
            list.push({ 'no': key, 'attendance': obj[key] })
          }
          list.shift()
          this.tableData = list
        } else {
          this.$message.error(res.data.info)
        }
      })
    },
    // 编辑
    handleEdit (index, row) {
      this.openSign = true
      this.no = row.no
    },
    // 按钮事件
    closeAndEdit (value) {
      this.openSign = false
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/teacher/modify_attendance',
        headers: {
          'Tno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        },
        data: {
          'class': this.ruleForm.Sclass,
          'classno': this.ruleForm.Sclassno,
          'date': this.selectDate,
          'Sno': this.no,
          'sign': value
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
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.attendanceResultsTeacher
  .demo-ruleForm
    position fixed
    top 100px
    left 100px
    width 400px
  .select1
    position fixed
    top 100px
    left 520px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .select2
    position fixed
    top 165px
    left 520px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .titleDate
    position fixed
    top 220px
    left 100px
    font-size 25px
    font-family Microsoft Yahei
  .selectDate
    position fixed
    top 220px
    left 430px
    width 200px
  .selectedDateTitle
    position fixed
    top 220px
    left 650px
    width 400px
    font-size 25px
    font-family Microsoft Yahei
  .photo
    position fixed
    top 290px
    left 100px
    width 800px
    height 500px
  .title1
    position fixed
    top 820px
    left 350px
    font-size 30px
    font-family Microsoft Yahei
  .title2
    position fixed
    top 110px
    left 1370px
    font-size 40px
    font-family Microsoft Yahei
  .rightTable
    position fixed
    top 180px
    left 1100px
    width 721px
    height 600px
    overflow auto
</style>
