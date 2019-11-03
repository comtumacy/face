<template>
    <div class="faceDistinguish"
         v-loading.fullscreen.lock="fullscreenLoading"
         element-loading-text="服务器正在识别人脸特征并考勤，请耐心等待......">
      <span class="dateNow">当前时间:{{ year }}年{{ month }}月{{ day }}日</span>
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
      <img class="photo" :src="backPhoto()" alt="">
      <span class="title1">人脸识别，智慧考勤</span>
      <span class="title2">考勤窗口</span>
      <div class="takePhoto">
        <video id="video" ref="videoShow" v-bind:style="{'width': '100%', 'height': '100%', 'object-fit': 'fill'}" controls></video>
      </div>
      <canvas id="canvas" ref="canvas" width="350" height="350" v-show="false"></canvas>
      <el-button round type="primary" class="leftButton" v-on:click="enterClick()">拍&nbsp;照</el-button>
      <span class="result">人脸考勤识别结果：{{ result }}</span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  created () {
    this.getCollege()
    this.getDate()
    this.openMedia()
  },
  data () {
    return {
      college: '',
      classes: '',
      classesNo: '',
      year: 2000,
      month: 1,
      day: 1,
      dataUrl: '',
      result: '',
      fullscreenLoading: false,
      video: { video: { width: 500, height: 500 } },
      videoShow_mounted: {},
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
    // 深度监听对象内部属性的改变
    'ruleForm.Sdept': {
      handler () {
        this.getClass()
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
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
    // 背景图片
    backPhoto () {
      return require('../../login/back.jpg')
    },
    // 获取时间
    getDate () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.day = date.getDate()
    },
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
      if (this.ruleForm.Sclassno === '') {
        this.$message.error('请选择班级')
      } else {
        this.fullscreenLoading = true
        let canvas = this.$refs.canvas
        let canvasGetContent = canvas.getContext('2d')
        canvasGetContent.drawImage(this.videoShow_mounted, 0, 0, 350, 350)
        let DataURL = canvas.toDataURL()
        DataURL = DataURL.replace('data:image/png;base64,', '')
        this.dataUrl = DataURL
        this.$axios({
          method: 'post',
          url: 'http://106.54.119.102/api/teacher/face_distinguish',
          headers: {
            'Tno': this.$store.getters.no_getters,
            'token': this.$store.getters.token_getters
          },
          data: {
            'class': this.ruleForm.Sclass,
            'classno': this.ruleForm.Sclassno,
            'base64': this.dataUrl
          }
        }).then(res => {
          this.fullscreenLoading = false
          if (res.status === 200) {
            this.result = res.data.info
            this.$message.success(res.data.info)
          } else {
            this.$message.error(res.data.info)
            this.result = res.data.info
          }
        })
      }
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
.faceDistinguish
  .dateNow
    position fixed
    top 110px
    left 320px
    font-size 30px
    font-family Microsoft Yahei
  .demo-ruleForm
    position fixed
    top 180px
    left 100px
    width 400px
  .select1
    position fixed
    top 180px
    left 520px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .select2
    position fixed
    top 245px
    left 520px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
  .photo
    position fixed
    top 300px
    left 100px
    width 800px
    height 500px
  .title1
    position fixed
    top 830px
    left 350px
    font-size 30px
    font-family Microsoft Yahei
  .title2
    position fixed
    top 100px
    left 1330px
    font-size 35px
    font-family Microsoft Yahei
  .takePhoto
    position fixed
    top 200px
    left 1150px
    width 500px
    height 500px
    box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  .leftButton
     position fixed
     top 740px
     left 1150px
     width 500px
     font-size 20px
  .result
    position fixed
    top 820px
    left 1150px
    width 500px
    font-size 25px
    font-family Microsoft Yahei
</style>
