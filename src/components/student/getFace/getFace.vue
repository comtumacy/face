<template>
    <div class="getFace"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-text="服务器正在提取人脸特征并保存至数据库，请耐心等待......">
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
            :percentage="number * 10"
            status="success"></el-progress>
        </div>
        <el-button round type="primary" class="leftButton" v-on:click="enterClick()" v-bind:disabled="selectEnterClick">拍&nbsp;照</el-button>
      </div>
      <div class="middle">
        <div class="titleGetPhoto">拍&nbsp;照&nbsp;结&nbsp;果</div>
        <div class="geiPhoto"
           v-loading="loading"
           element-loading-text="照片正在上传至服务器，请等待"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <canvas id="canvas" ref="canvas" width="350" height="350"></canvas>
        </div>
        <div class="message">
          <span class="message1">已经完成</span>
          <span class="message2">{{ number }}/10</span>
        </div>
        <el-button class="middleButton1" type="success" round v-on:click="upPhoto()" v-bind:disabled="selectEnterClick">上传保存</el-button>
        <el-button class="middleButton2" type="warning" round v-bind:disabled="!selectEnterClick" v-on:click="features_train_person()" >识别模型</el-button>
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
        <div class="status">此次模型识别状态：</div>
        <span class="el-icon-check" v-show="successSign"></span>
        <span class="el-icon-close" v-show="!successSign"></span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.openMedia()
    this.get_student_info()
    this.find_features()
  },
  data () {
    return {
      video: { video: { width: 500, height: 500 } },
      videoShow_mounted: {},
      dataUrl: '',
      number: 0,
      loading: false,
      selectEnterClick: false,
      fullscreenLoading: false,
      successSign: false,
      tableData: [{
        date: '学号',
        name: ''
      }, {
        date: '姓名',
        name: ''
      }, {
        date: '性别',
        name: ''
      }, {
        date: '学院',
        name: ''
      }, {
        date: '班级',
        name: ''
      }, {
        date: '生日',
        name: ''
      }, {
        date: '是否已经录入人脸信息',
        name: ''
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
    // 访问用户媒体设备的兼容方法
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
      let DataURL = canvas.toDataURL()
      DataURL = DataURL.replace('data:image/png;base64,', '')
      this.dataUrl = DataURL
    },
    // 上传照片
    upPhoto () {
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/get_photo',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters,
          'number': this.number
        },
        data: {
          'base64': this.dataUrl
        }
      }).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.$message.success(res.data.info)
          this.number = this.number + 1
          if (this.number === 10) {
            this.selectEnterClick = true
          }
        } else {
          this.$message.error(res.data.info)
        }
      })
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
        this.tableData[0].name = res.data[0].Sno
        this.tableData[1].name = res.data[0].Sname
        this.tableData[2].name = res.data[0].Ssex
        this.tableData[3].name = res.data[0].Sdept
        this.tableData[4].name = res.data[0].Sclass + res.data[0].Sclassno + '班'
        this.tableData[5].name = res.data[0].Birth
        this.$store.dispatch('className_actions', res.data[0].Sclass)
        this.$store.dispatch('classNo_actions', res.data[0].Sclassno)
      })
    },
    // 查询是否该学生已经存在人脸特征
    find_features () {
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/find_features',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        },
        data: {
          'class': this.$store.getters.className_getters,
          'classno': this.$store.getters.classNo_getters
        }
      }).then(res => {
        this.tableData[6].name = res.data.info
      })
    },
    // 获取保存人脸特征
    features_train_person () {
      this.fullscreenLoading = true
      this.$axios({
        method: 'post',
        url: 'http://106.54.119.102/api/student/features_train_person',
        headers: {
          'Sno': this.$store.getters.no_getters,
          'token': this.$store.getters.token_getters
        },
        data: {
          'class': this.$store.getters.className_getters,
          'classno': this.$store.getters.classNo_getters
        }
      }).then(res => {
        this.fullscreenLoading = false
        if (res.status === 200) {
          this.$message.success(res.data.info)
          this.successSign = true
        } else {
          this.$message.error(res.data.info)
        }
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
      left 1520px
    .rightTable
      position: fixed
      top 200px
      left 1390px
      width 401px
    .status
      position fixed
      top 650px
      left 1420px
      font-size 40px
    .el-icon-check
      position: fixed
      top 750px
      left 1550px
      font-size 80px
      color rgb(103,194,58)
    .el-icon-close
      position: fixed
      top 750px
      left 1550px
      font-size 80px
      color rgb(245,108,108)
</style>
