<style scoped>
</style>
<template>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      initWx: function (data) {
        this.$wechat.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'scanQRCode'
          ]
        })

        this.$wechat.ready(() => {
          console.log('jsSdk init success')
          this.$wechat.scanQRCode({
            needResult: 1,
            scanType: ['qrCode', 'barCode'],
            success: function (res) {
              console.error(res)
              var result = res.resultStr
              window.location.href = result
            }
          })
        })

        this.$wechat.error((res) => {
          console.error(res)
        })
      }
    },
    mounted: function () {
    },
    created() {
      this.get('resources/biz/wx/jssdk', {
        url: window.location.href.split('#')[0],
        wx: sessionStorage.getItem('wx')
      }, (res) => {
        if (res.data.code == 0) {
          this.initWx(res.data.data)
        }
      }, (err) => {

      })
    },
    components: {}
  }
</script>
