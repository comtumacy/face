<template>
    <div class="getPhoto">
      <video id="video" ref="videoShow" width="480" height="320" controls>
      </video>
      <div>
        <button id="capture" v-on:click="enterClick()">拍照</button>
      </div>
      <canvas id="canvas" ref="canvas" width="480" height="320"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    // this.openMedia()
  },
  data () {
    return {
      video: { video: { width: 480, height: 320 } },
      videoShow_mounted: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    openMedia () {
      if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        //  调用用户媒体设备, 访问摄像头
        this.getUserMedia()
      } else {
        alert('不支持访问用户媒体')
      }
    },
    //  访问用户媒体设备的兼容方法
    getUserMedia () {
      if (navigator.mediaDevices.getUserMedia) {
        //  最新的标准API
        navigator.mediaDevices.getUserMedia(this.video)
          .then((stream) => {
            this.$refs.videoShow.srcObject = stream
            this.$refs.videoShow.play()
          }).catch((error) => {
            console.log('访问用户媒体设备失败' + error.name + error.message)
          })
      }
    },
    enterClick () {
      let canvas = this.$refs.canvas
      let canvasGetContent = canvas.getContext('2d')
      canvasGetContent.drawImage(this.videoShow_mounted, 0, 0, 480, 320)
      let base64Code = String(canvas.toDataURL())
      console.log(typeof base64Code)
    }
  },
  mounted () {
    this.videoShow_mounted = this.$refs.videoShow
  },
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
