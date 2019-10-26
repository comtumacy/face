<template>
    <div class="registerLeft">
      <el-row>
        <img :src="backPhoto()" alt="">
      </el-row>
      <el-row>
        <i>人脸识别，智慧考勤</i>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
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

</style>
