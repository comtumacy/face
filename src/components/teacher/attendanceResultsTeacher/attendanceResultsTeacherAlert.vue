<template>
    <div class="attendanceResultsTeacherAlert">
      <span class="changeAttendanceTitle">考勤更改</span>
      <el-select v-model="value" placeholder="请选择" class="selectAttendance">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button class="changeAttendanceButton" type="primary" v-on:click="enterButton()">确认修改</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
  },
  data () {
    return {
      value: '',
      options: ['是', '否']
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 按钮事件
    enterButton () {
      this.$emit('sentEdit', this.value)
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.attendanceResultsTeacherAlert
  position fixed
  top 300px
  left 800px
  width 300px
  height 200px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  .changeAttendanceTitle
    position absolute
    top 20px
    left 100px
    font-size 25px
    font-family Microsoft Yahei
  .selectAttendance
    position absolute
    top 80px
    left 30px
  .changeAttendanceButton
    position absolute
    top 140px
    left 30px
    width 229px
</style>
