<template>
    <div class="studentIndex">
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">人脸录入</el-menu-item>
        <el-menu-item index="2">考勤信息</el-menu-item>
        <el-menu-item index="3">信息修改</el-menu-item>
      </el-menu>
      <div class="topRight">
        <span class="usernameTitle">{{ username }}</span>
        <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
          <el-button type="info" class="icon-switch" circle v-on:click="outLogin()"></el-button>
        </el-tooltip>
      </div>
      <router-view></router-view>
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
    return {
      username: '',
      activeIndex: '1'
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 导航栏点击事件
    handleSelect (index) {
      if (index === '1') {
        this.$router.push('/studentIndex/getFace')
      } else if (index === '2') {
        this.$router.push('/studentIndex/attendanceResults')
      } else if (index === '3') {
        this.$router.push('/studentIndex/studentModify')
      }
    },
    // 获取用户名
    get_student_info () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/get_student_info',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        }
      }).then(res => {
        this.username = '欢迎：' + res.data[0].Sname
      })
    },
    // 退出登录
    outLogin () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/user/out_login',
        data: { 'no': this.$store.getters.no_getters }
      }).then(() => {
        this.$store.dispatch('token_actions', '')
        this.$router.push('/')
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
.studentIndex
  .el-menu
    background-color rgb(241,241,241)
    > li
      font-size 18px
  .topRight
    position fixed
    top 10px
    right 10px
    .usernameTitle
      margin-right 15px
</style>
