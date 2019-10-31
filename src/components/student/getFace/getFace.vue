<template>
    <div class="getFace">
      <div class="left">
        <div>
          <span class="titleTakePhoto">人&nbsp;脸&nbsp;录&nbsp;入</span>
        </div>
        <div class="takePhoto">
          <video id="video" ref="videoShow" v-bind:style="{'width': '100%', 'height': '100%', 'object-fit': 'fill'}" controls></video>
        </div>
        <div>
          <el-progress
            class="progress"
            :text-inside="true"
            :stroke-width="24"
            :percentage="100"
            status="success"></el-progress>
        </div>
        <el-button round type="primary" class="leftButton" v-on:click="enterClick()">拍&nbsp;照</el-button>
      </div>
      <div class="middle">
        <div class="titleGetPhoto">拍&nbsp;照&nbsp;结&nbsp;果</div>
        <div class="geiPhoto">
          <canvas id="canvas" ref="canvas" width="350" height="350"></canvas>
        </div>
        <div class="message">
          <span class="message1">已经完成</span>
          <span class="message2">1/10</span>
        </div>
        <el-button class="middleButton1" type="success" round>上传保存</el-button>
        <el-button class="middleButton2" type="warning" round>识别模型</el-button>
      </div>
      <div class="right">
        <div class="rightTitle">学生信息</div>
        <el-table
          class="rightTable"
          v-bind:data="tableData"
          border
          :fit="false">
          <el-table-column
            prop="date"
            label="字 段"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="信 息"
            width="299"
            align="center">
          </el-table-column>
        </el-table>
        <div class="status">此次录入状态：</div>
        <span class="el-icon-check"></span>
        <span class="el-icon-close"></span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.openMedia()
  },
  data () {
    return {
      video: { video: { width: 500, height: 500 } },
      videoShow_mounted: {},
      tableData: [{
        date: '学号',
        name: '201606401201'
      }, {
        date: '姓名',
        name: '王小虎'
      }, {
        date: '性别',
        name: '男'
      }, {
        date: '学院',
        name: '计算机科学与技术学院'
      }, {
        date: '班级',
        name: '计算机科学与技术162班'
      }, {
        date: '生日',
        name: '2016-01-01'
      }, {
        date: '是否已经录入人脸信息',
        name: '是'
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 打开媒体流
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
    // 按下拍照事件
    enterClick () {
      let canvas = this.$refs.canvas
      let canvasGetContent = canvas.getContext('2d')
      canvasGetContent.drawImage(this.videoShow_mounted, 0, 0, 350, 350)
      console.log(canvas.toDataURL())
    },
    upPhoto () {
      this.$axios({
        method: 'post',
        url: ''
      })
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
.getFace
  .left
    .titleTakePhoto
      position: fixed
      top 110px
      left 350px
      font-size 40px
      font-family Microsoft Yahei
    .takePhoto
      position fixed
      top 200px
      left 200px
      width 500px
      height 500px
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    .progress
      position fixed
      top 740px
      left 215px
      width 460px
    .leftButton
      position fixed
      top 820px
      left 200px
      width 500px
      font-size 20px
  .middle
    .titleGetPhoto
      position: fixed
      top 110px
      left 927px
      font-size 40px
      font-family Microsoft Yahei
    .geiPhoto
      position: fixed
      top 200px
      left 850px
      width 350px
      height 350px
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    .message
      position fixed
      top 580px
      left 890px
      font-family Microsoft Yahei
      .message1
        font-size 24px
      .message2
        margin-left 60px
        font-size 40px
    .middleButton1
      position fixed
      top 680px
      left 850px
      width 350px
      font-size 20px
    .middleButton2
      margin 0
      position fixed
      top 780px
      left 850px
      width 350px
      font-size 20px
  .right
    .rightTitle
      position fixed
      font-size 40px
      top 110px
      right 250px
    .rightTable
      position: fixed
      top 200px
      right 130px
      width 401px
    .status
      position fixed
      top 650px
      right 170px
      font-size 40px
    .el-icon-check
      position: fixed
      top 750px
      right 300px
      font-size 80px
      color rgb(103,194,58)
    .el-icon-close
      position: fixed
      top 750px
      right 300px
      font-size 80px
      color rgb(245,108,108)
</style>
