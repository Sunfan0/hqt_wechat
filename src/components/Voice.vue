<template>
  <div class="voice" v-on:click="play">
    <img width="14" class="cell02-img-01" src="../assets/voice.png">
    <div class="cell02-img-02" :style="'width:' + time*10 + 'px;' "></div>
    <p class="cell02-p">{{ time + '"'}}</p>
  </div>
</template>

<script>
  export default {
    props: ['voiceId', 'time'],
    methods: {
      play: function() {
        console.log('播放语音 this.voiceId = ' + this.voiceId)
        this.$wechat.playVoice({
          localId: this.voiceId // 需要播放的音频的本地ID，由stopRecord接口获得
        })
        this.$wechat.onVoicePlayEnd({
          success: function(res) {
            var localId = res.localId; // 返回音频的本地ID
            console.log('播放完毕，localId = ' + localId)
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
    margin-right: 25.9px;
  }
  .cell02-img-div {
    width: 100%;
    height: auto;
  }
  .cell02-img-01 {
    float: right;
    width: 89px;
    margin-top: 10px;
    margin-right: 35px;
    height: 72px;
    margin-bottom: 40px;
  }
  .voice {
    float: right;
    width: 100%;
    height: 120px;
  }
  .cell02-img-02 {
    float: right;
    border-radius: 5px;
    max-width: 400px;
    margin-top: 10px;
    margin-right: -30px;
    height: 72px;
    margin-bottom: 40px;
    border: 0;
    background-color: #6de248;
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
