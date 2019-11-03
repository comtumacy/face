<template>
    <div class="attendanceResults">
      <img class="photo" :src="backPhoto()" alt="">
      <span class="title1">人脸识别，智慧考勤</span>
      <span class="title2">{{ name }}考勤情况</span>
      <el-table
        class="rightTable"
        v-bind:data="tableData"
        border
        :fit="false">
        <el-table-column
          prop="date"
          label="时 间"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          :prop="this.$store.getters.no_getters"
          label="是否考勤"
          width="300"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        class="selectPage"
        background
        layout="prev, pager, next"
        :total="totalPage"
        :current-page=1
        @current-change="handlePageCurrentChange">
      </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.get_student_info()
    this.attendance_results()
  },
  data () {
    return {
      date: '',
      name: '',
      tableData: [],
      number: 1,
      totalPage: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 背景图片
    backPhoto () {
      return require('../../login/back.jpg')
    },
    // 获取当前学生的个人信息
    get_student_info () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/get_student_info',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        }
      }).then(res => {
        this.name = res.data[0].Sname
      })
    },
    // 获取学生考勤信息
    attendance_results () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/attendance_results',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters,
          'number': this.number
        },
        data: {
          'class': this.$store.getters.className_getters,
          'classno': this.$store.getters.classNo_getters
        }
      }).then(res => {
        this.tableData = res.data.data
        this.totalPage = res.data.page_number
      })
    },
    // 回调当前页
    handlePageCurrentChange (val) {
      this.number = val
      this.attendance_results()
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.attendanceResults
  .photo
    position fixed
    top 150px
    left 100px
    width 800px
    height 500px
  .title1
    position fixed
    top 680px
    left 350px
    font-size 30px
    font-family Microsoft Yahei
  .title2
    position fixed
    top 100px
    left 1300px
    font-size 40px
    font-family Microsoft Yahei
  .rightTable
    position fixed
    top 180px
    left 1150px
    width 601px
  .selectPage
    position fixed
    top 750px
    left 1250px
</style>
