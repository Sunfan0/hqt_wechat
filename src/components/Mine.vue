<template>
  <div class="content">
    <div style="display: inline-block;border: 1px solid #ccc;padding: 4px;margin-right: 15px">
      <img width="120" v-bind:src="headerImg" ref="img" style="display: none;">
      <div class="header_img" v-bind:style="headerbgStyle"></div>
    </div>
    <div style="display: inline-block;vertical-align: top;">
      <p class="item_info">姓名：{{main_name}}</p>
      <p class="item_info">工号：{{main_code}}</p>
    </div>
    <div style="width: 100%">
      <mt-button type="danger" size="normal" style="width: 80%; margin-left: 10%" v-on:click="logout()">退出登录
      </mt-button>
    </div>
  </div>
</template>

<script>
  document.title = '个人信息'

  export default {
    data () {
      return {
        titleType: '个人信息',
        main_name: '',
        main_code: '',
        headerImg: '',
        headerbgStyle: {
          backgroundImage: ''
        }
      }
    },
    created () {
      this.user_id = this.getUserInfo().id
      this.main_name = this.getUserInfo().name
      this.main_code = this.getUserInfo().code
      this.open_id = this.getUserInfo().openId
      // this.user_id = 'e1e82533c51f11e7af8ab888e3382386'
      // this.main_name = 'name'
      // this.main_code = '10226'
      this.headerImg = 'http://zsr.radioclassical.cn/avatar/' + this.main_code + '.jpg'
      this.headerbgStyle.backgroundImage = 'url(http://zsr.radioclassical.cn/avatar/' + this.main_code + '.jpg)'
    },
    mounted () {
      this.$refs.img.onerror = () => {
        this.headerImg = 'http://zsr.radioclassical.cn/avatar/' + this.user_code + '.JPG'
        this.headerbgStyle.backgroundImage = 'url(http://zsr.radioclassical.cn/avatar/' + this.main_code + '.JPG)'
        this.$refs.img.onerror = () => {
          this.headerImg = this.getUserInfo().head
          this.headerbgStyle.backgroundImage = 'url(' + this.getUserInfo().head + ')'
        }
      }
    },
    methods: {
      logout () {
        var params = new FormData()
        params.append('id', this.user_id)
        params.append('openId', this.open_id)
        this.post('/resources/biz/worker/logout', params, res => {
          if (res.data.code === 0) {
            localStorage.removeItem('hqt_worker_info')
            this.$router.push({
              name: 'login'
            })
          }
        }, err => {
          this.showToast(err.response.data.message, 2)
        })
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: #fbf9fe !important;
  }

  .content {
    margin: 50px 30px;
    font-size: 38px;
    padding: 30px;
  }

  .content .header_img {
    width: 240px;
    height: 280px;
    background-position: center;
    background-size: cover;
  }

  .content .item_info {
    margin-top: 15px;
  }
</style>
