<template>
  <div>
    <group gutter="0">
      <cell :title="titleType" class="cell01">
        <img slot="icon" width="35" height="35" style="display:none;margin-right:15px;margin-left:5px;"
             v-bind:src="headerImg" ref="img">
        <div slot="icon" v-bind:style="headerbgStyle" style="width: 35px;height: 35px;margin-right:15px;margin-left:5px;background-position: center;
    background-size:  100% 130%;"></div>
      </cell>
    </group>
    <group gutter="10px">
      <popup-picker v-bind:style="noLocation" title="位置" class="cell02" :data="list3" :columns="4" v-model="value3"
                    @on-hide="onHide"
                    @on-change="onChange" show-name>
      </popup-picker>
    </group>
    <div class="addstyle" style="margin-top:-0.1px" v-bind:style="haveLocation">
      <span class="middle" style="width: 15%;text-align:left;">位置</span>
      <span class="middle" style="color: #999;width: 85%;text-align:right;">{{valuelocation}}</span>
    </div>
    <!-- <group gutter="-1px">
       <popup-picker title="类型" class="cell02" :data="listType" :columns="4" v-model="valueType" @on-hide="onHide"
                     @on-change="onChange" show-name>
       </popup-picker>
     </group>-->
    <voice-list style="margin-top: -10px" ref="vl"></voice-list>
    <group gutter="10px">
      <x-textarea placeholder="请输入描述文字" class="input" max="200" autosize="true" height=150
                  v-model="content"></x-textarea>
    </group>
    <group gutter="10px">
      <div v-on:click="addImg(1)">
        <cell title="点击选择照片" class="cell01">
        </cell>
      </div>
      <div class="div-img-2">
        <div v-for=" item in getLocalImgs" class="div-img">
          <img :src="item" class="div-img-1"/>
        </div>
      </div>
    </group>
    <p style="margin:20px 10px;color: #f43530">
      <img src="../assets/hint_info.png" width="20" height="20" style="vertical-align: sub">
      您若有意见或建议请及时进行评价，一周后将默认好评。
    </p>
    <group gutter="60px" v-bind:style="createBtnStyle">
      <x-button @click.native="cimmit(0)" class="x-button blue_block">创建工单</x-button>
    </group>
    <div class="btn_group" v-bind:style="overBtnStyle">
      <x-button @click.native="cimmit(0)" class="x-button blue_btn">
        创建工单
      </x-button>
      <x-button @click.native="cimmit(1)" class="x-button red_btn">
        修复完成
      </x-button>
    </div>
  </div>
</template>

<script>
  let isWkWebView = window.__wxjs_is_wkwebview
  //  let userinfo = JSON.parse(cookie.get("userinfo"));
  import data01 from './data01.json'
  import VoiceList from './VoiceList.vue'
  import {
    Group,
    Cell,
    PopupPicker,
    XTextarea,
    XButton,
    cookie
  } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      VoiceList,
      PopupPicker,
      XTextarea,
      XButton
    },
    data () {
      return {
        titleType: '个人中心',
        user_id: '',
        user_code: '',
        polling_id: '',
        usernamemodel: '',
        list3: [],
        // listType: [],
        // valueType: [],
        value3: [],
        valuelocation: '',
        location: '',
        urls: [],
        imgs: [],
        content: '',
        wkWebViewId: [],
        getLocalImgs: [],
        headerImg: '',
        headerbgStyle: {
          backgroundImage: ''
        },
        noLocation: {
          display: 'none'
        },
        haveLocation: {
          display: 'none'
        },
        createBtnStyle: {
          display: 'none'
        },
        overBtnStyle: {
          display: 'none'
        },
        overCheck: ''
      }
    },
    created () {
      if (sessionStorage.getItem('locationList') == null || sessionStorage.getItem('locationList') == '') {
        this.onLoadLocation()
      } else {
        this.list3 = JSON.parse(sessionStorage.getItem('locationList'))
        this.closeLoading()
      }
      this.user_id = this.getUserInfo().id;
      this.user_code = this.getUserInfo().code;
      // this.user_id = 'f30a3751b92c11e7af8ab888e3382388'
      // this.user_code = '102'
      this.headerImg = 'http://zsr.radioclassical.cn/avatar/' + this.user_code + '.jpg'
      this.headerbgStyle.backgroundImage = 'url(http://zsr.radioclassical.cn/avatar/' + this.user_code + '.jpg)'

      if (this.$route.query.polling_id) {
        this.overBtnStyle.display = 'block'
        document.title = '填写报修单'
        this.polling_id = this.$route.query.polling_id
        if (this.$route.query.building_Id) {
          this.haveLocation.display = 'table'
          var polling_location = this.$route.query.building_Id
          this.valuelocation = ''
          var isHavelocation = false
          var location_data = []
          location_data[4] = polling_location

          for (var i = 4; i > 0; i--) {
            for (var j = 0; j < data01.data.length; j++) {
              if (data01.data[j].id == location_data[i] && data01.data[j].name != '') {
                isHavelocation = true
                location_data[i - 1] = data01.data[j].parentId
                this.valuelocation = data01.data[j].name + this.valuelocation
              }
              if (j == (data01.data.length - 1) && !isHavelocation) {
                this.noLocation.display = 'block'
                this.haveLocation.display = 'none'
                break
              }
            }
          }
        }
      } else {
        this.createBtnStyle.display = 'block'
        document.title = '创建报修单'
        this.noLocation.display = 'block'
      }
      let url = location.href.split('#')[0]
      this.get(
        'resources/biz/wx/jssdk', {
          url: url,
          wx: sessionStorage.getItem('wx')
        },
        res => {
          this.init(res, () => {
          }, err => {
            this.showToast(JSON.stringify(err))
          })
        },
        err => {
        }
      )

      //类型选择
      /* var type = []
       type.push('水')
       type.push('电')
       type.push('木')
       type.push('空')
       type.push('杂')
       type.push('弱')
       for (var t = 0; t < type.length; t++) {
         this.listType.push({value: type[t], name: type[t]})
       }*/
    },
    mounted () {
      this.$refs.img.onerror = () => {
        this.headerImg = 'http://zsr.radioclassical.cn/avatar/' + this.user_code + '.JPG'
        this.headerbgStyle.backgroundImage = 'url(http://zsr.radioclassical.cn/avatar/' + this.user_code + '.JPG)'
        this.$refs.img.onerror = () => {
          this.headerImg = this.getUserInfo().head
          this.headerbgStyle.backgroundImage = 'url(' + this.getUserInfo().head + ')'
        }
      }
    },
    methods: {
      onLoadLocation: function () {
        var params = new FormData()
        this.post('resources/biz/building/location', params, res => {
            var list = []
            for (var i = 0; i < res.data.data.length; i++) {
              let data = res.data.data[i]
              let value = {
                name: data.name,
                value: data.id,
                parent: data.name === '东院' || data.name === '西院' ? 0 : data.parentId
              }
              list.push(value)
              if (res.data.data.length - 1 == i) {
                this.list3 = list
                sessionStorage.setItem('locationList', JSON.stringify(list))
                this.closeLoading()
              }
            }
          },
          err => {
          })
      },
      imgError: function () {
        alert('img no')
      },
      onHide: function () {
      },
      onChange: function () {
        console.log(this.value3)
        console.log(this.value3[this.value3.length - 1])
        this.location = this.value3[this.value3.length - 1]
      },
      addImg: function (type) {
        if (this.urls.length >= 8) {
          this.showToast('最多只能选择8张', 2)
          return
        }
        this.$wechat.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(res)
            for (var i = 0; i < localIds.length; i++) {
              this.urls.push(localIds[i])
              this.$wechat.uploadImage({
                localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                  var serverId = res.serverId // 返回图片的服务器端ID
                  this.imgs.push(serverId)
                },
                fail: err => {
                  this.showToast(JSON.stringify(err))
                }
              })
              if (isWkWebView) {
                this.$wechat.getLocalImgData({
                  localId: localIds[i], // 图片的localID
                  success: (res) => {
                    this.getLocalImgs.push(res.localData) // localData是图片的base64数据，可以用img标签显示
                  },
                  fail: (err) => {
                  }
                })
              } else {
                this.getLocalImgs.push(localIds[i])
              }
            }
          }
        })
      },
      cimmit: function (finish) {
        var idss = []
        this.imgs.forEach(function (element) {
          idss.push(element)
        })
        this.$refs.vl.ids.forEach(function (element) {
          idss.push(element)
        })
        var params = new FormData()
        var mediaIds = ''
        for (var i = 0; i < idss.length; i++) {
          mediaIds = mediaIds + idss[i] + ','
        }

        var commitLocation = ''
        if (this.noLocation.display == '' || this.noLocation.display == 'block') {
          commitLocation = this.location
          if (this.location == '' || this.location == undefined) {
            this.showToast('请选择位置', 2)
            return
          }
        } else {
          commitLocation = this.$route.query.building_Id
        }

        /*  if (this.valueType == '') {
            this.showToast('请选择类型', 2)
            return
          }*/

        params.append('author', this.user_id)
        params.append('location', commitLocation)
        // params.append("classify", this.valueType[0]);
        params.append('content', this.content)
        params.append('mediaId', mediaIds)
        params.append('inspectionId', this.polling_id)
        params.append('wx', sessionStorage.getItem('wx'))
        if (finish == 1) {
          if (this.urls.length < 2) {
            this.showToast('请选择至少两张照片，进行维修前后的对比！', 2)
            return
          }
          params.append('finish', 'FINISH')
        }
        this.post('/resources/biz/repairOrder/add_repair_order', params, res => {
            if (res.data.code === 0) {
              this.showToast('创建工单成功', 2)
              if (this.$route.query.polling_id) {
                this.$router.go(-1)
              } else {
                this.$router.replace({name: 'task'})
              }
            }
          },
          err => {
          })
      }
    }
  }
</script>
<style>
  .weui-cell {
    margin: 10px 0 0 !important;
    padding: 0 20px !important;
  }

  .weui-cells:before {
    border-top: 1px solid #ececec !important;
  }

  .weui-cells:after {
    border-bottom: 0 !important;
  }

  .vux-cell-box:before {
    border-top: 0 !important;
  }

  .weui-cell_access .weui-cell__ft:after {
    width: 15px;
    height: 15px;
    margin-right: 15px;
    font-weight: 600;
  }

  .vux-popup-picker-select {
    width: 95% !important;
  }

  .weui-textarea-counter {
    margin-top: 10% !important;
  }

  .vux-popup-header {
    height: 100px !important;
    line-height: 100px !important;
    font-size: 34px !important;
  }

  .vux-popup-header-left {
    margin-left: 30px !important;
    background-color: #cccccc !important;
    border-radius: 4px !important;
    color: white !important;
    display: inline-block !important;
    width: 130px;
    height: 70px;
    line-height: 70px;
    margin-top: 12px;
    text-align: center;
    padding: 0 !important;
  }

  .vux-popup-header-right {
    margin-right: 30px !important;
    background-color: #009EDD !important;
    border-radius: 4px !important;
    color: white !important;
    display: inline-block !important;
    width: 130px;
    height: 70px;
    line-height: 70px;
    margin-top: 12px;
    text-align: center;
    padding: 0 !important;
  }
</style>
<style scoped>
  .cell01 {
    font-size: 34px;
    height: 112px;
  }

  .cell02 {
    padding-top: 20px;
    font-size: 34px;
    min-height: 88px;
  }

  .input {
    font-size: 34px;
    min-height: 256px;
  }

  .div-img {
    margin-left: 22px;
    margin-top: 22px;
    padding-bottom: 20px;
    float: left;
    height: 153px;
    width: 153px;
  }

  .div-img-1 {
    height: 100%;
    width: 100%;
    padding-bottom: 10px;
  }

  .div-img-2 {
    width: 100%;
    padding-left: 19px;
    padding-right: 30px;
  }

  .x-button {
    color: #ffffff;
    font-size: 36px;
    height: 100px;
    text-align: center;
  }

  .blue_block {
    background-color: #009edd;
    width: 100%;
    position: fixed;
    bottom: 0px;
  }

  .btn_group {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

  .blue_btn {
    display: inline-block;
    background-color: #009edd;
    width: 49.33% !important;
  }

  .red_btn {
    display: inline-block;
    background-color: #FC7171;
    width: 49.33% !important;
  }

  .addstyle {
    background: white;
    width: 95%;
    min-height: 110px;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 35px;
    border-top: 1px solid #ececec !important;
    overflow: hidden;
  }

  .middle {
    display: table-cell;
    vertical-align: middle;
  }
</style>
