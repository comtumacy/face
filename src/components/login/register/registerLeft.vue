<template>
    <div class="registerLeft">
      <el-row>
        <img :src="backPhoto()" alt="" v-bind:style="{'width': (0.862 * (0.736 * width * 0.55)) + 'px', 'height': (0.531 * (0.693 * height)) + 'px', 'top': (0.153 * (0.693 * height)) + 'px', 'left': (0.068 * (0.736 * width * 0.55)) + 'px'}">
      </el-row>
      <el-row v-bind:style="{'width': (0.498 * (0.736 * width * 0.55)) + 'px', 'top': (0.184 * (0.693 * height)) + 'px', 'left': (0.316 * (0.736 * width * 0.55)) + 'px'}">
        <i  v-bind:style="{'font-size': (0.038 * (0.736 * width * 0.55)) + 'px'}">人脸识别，智慧考勤</i>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: ['width', 'height'],
  created () {
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 定位并返回背景图片
    backPhoto () {
      return require('../back.jpg')
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.registerLeft
  .el-row
    > img
      position relative
  .el-row
    > i
      position relative
      font-style normal
</style>
