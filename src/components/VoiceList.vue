<template>
  <div>
    <group :gutter="gutter">
      <div v-on:touchstart="start" v-on:touchend="end">
        <cell title="语音(长按录音)" class="cell02-img-div">
          <img width="14" class="cell02-img" src="../assets/yuyin.png">
        </cell>
      </div>
      <div class="voice" v-for="item in voiceList">
        <voice :voiceId="item.voiceId" :time="item.time"></voice>
      </div>
    </group>
  </div>
</template>

<script>
  import Voice from './Voice.vue'
  import {
    Group,
    Cell
  } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      Voice
    },
    data () {
      return {
        gutter: 10,
        voiceList: [],
        touchstarttime: 0,
        ids: [],
        minTime: 2
      }
    },
    methods: {
      start: function (e) {
        console.log('按下')
        e.preventDefault()
        if (!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true') {
          this.$wechat.startRecord({
            success: function () {
              localStorage.rainAllowRecord = 'true'
              this.$wechat.stopRecord()
            },
            cancel: function () {
              this.showToast('用户拒绝授权录音')
            }
          })
        } else {
          this.showLoading('录音中，放开按钮停止录音')
          this.touchstarttime = new Date()
          this.$wechat.startRecord()
        }
      },
      end: function () {
        console.log('升起')
        this.closeLoading()
        this.$wechat.stopRecord({
          success: (res) => {
            let longClickTime = new Date() - this.touchstarttime
            if (longClickTime < this.minTime * 1000) {
              this.showToast('录音时间不能少于' + this.minTime + '秒')
            } else {
              var localId = res.localId
              console.log(res)
              console.log('longClickTime = ' + longClickTime)
              console.log('Math.round(longClickTime / 1000) = ' + Math.round(longClickTime / 1000))
              this.$wechat.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (res) => {
                  var serverId = res.serverId // 返回音频的服务器端ID
                  this.ids.push(serverId)
                  this.voiceList.push({
                    voiceId: localId,
                    time: Math.round(longClickTime / 1000)
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .cell02 {
    font-size: 34px;
    min-height: 88px;
  }

  .cell02-img {
    margin-right: 40.9px;
  }

  .cell02-img-div {
    font-size: 34px;
    width: 100%;
    height: 88px;
  }

  .voice {
    width: 100%;
    height: auto;
  }

  .cell02-p {
    font-size: 34px;
    color: #999999;
    float: right;
    margin-top: 38px;
    margin-right: 32px;
    height: 72px;
    border: 0;
  }
</style>
