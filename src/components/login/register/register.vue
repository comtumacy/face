<template>
    <div class="register">
      <img :src="logoPhoto()" alt="" v-bind:style="{'top': (height * 0.032) + 'px', 'left': (width * 0.131) + 'px'}">
      <i v-bind:style="{'top': (0.025 * height) + 'px', 'left': (0.131 * width + 60) + 'px', 'font-size': (0.044 * height) + 'px'}">学生课堂考勤管理系统</i>
      <div class="divider" v-bind:style="{'left': (width * 0.131) + 'px', 'width': (0.736 * width) + 'px', 'top': (0.025 * height + 60) + 'px'}">
        <el-divider></el-divider>
      </div>
      <el-container v-bind:style="{'top': (0.025 * height + 80) + 'px', 'left': (width * 0.131) + 'px', 'width': (0.736 * width) + 'px'}">
        <el-aside width="65%" v-bind:style="{'height': (0.693 * height) + 'px'}">
          <registerLeft
          class="registerLeft"
          v-bind:width="width"
          v-bind:height="height" v-bind:style="{'height': (0.693 * height) + 'px'}"></registerLeft>
        </el-aside>
        <el-main>
          <registerRight
          class="registerRight"
          v-bind:width="width"
          v-bind:height="height"></registerRight>
        </el-main>
      </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
import registerLeft from './registerLeft'
import registerRight from './registerRight'
export default {
  components: {
    registerLeft,
    registerRight
  },
  props: [],
  created () {
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
    // 定位并返回LOGO图片
    logoPhoto () {
      return require('./logo.png')
    },
    // 获取浏览器长宽
    getLength () {
      let height = document.documentElement.clientHeight
      let width = document.documentElement.clientWidth
      if (height > 800) {
        this.height = height
      } else {
        this.height = 800
      }
      if (width > 1300) {
        this.width = width
      } else {
        this.width = 1300
      }
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
  .el-container
    position fixed
    .registerLeft
      position relative
    .registerRight
      position relative
</style>
