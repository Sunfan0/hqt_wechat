<template>
  <div style="position: relative;">
    <div style="position: relative;overflow: hidden;">
      <div class="cover_bg" v-bind:style="coverStyle"></div>
      <group gutter="0">
        <cell :title="titleType" class="cell01">
          <img slot="icon" width="35" height="35" style="display:none;margin-right:15px;margin-left:5px;"
               v-bind:src="headerImg" ref="img">
          <div slot="icon" v-bind:style="headerbgStyle" style="width: 35px;height: 35px;margin-right:15px;margin-left:5px;background-position: center;
    background-size:  100% 130%;"></div>
        </cell>
      </group>
      <group gutter="10px">
        <popup-picker title="位置" class="cell02" :data="list3" :columns="4" v-model="value3" @on-hide="onHide"
                      @on-change="onChange" show-name>
        </popup-picker>
      </group>
      <voice-list v-bind:style="makeVoice" style="margin-top: -10px" ref="vl"></voice-list>
      <group gutter="1px" v-bind:style="showVoice" class="show_voice">
        <p class="detail_bar">语音描述：</p>
        <audio v-for="item in voiceList" :value="item.id" :key="item.id" v-bind:src="item.url" controls="controls">
          您的浏览器不支持 audio 标签。
        </audio>
      </group>
      <group gutter="10px">
        <x-textarea :placeholder="placetext" class="input" max="200" autosize="true" height=150
                    v-model="content" style="border-top: 0"></x-textarea>
      </group>
      <group gutter="10px" v-bind:style="choiceImgStyle">
        <div v-on:click="addImg(1)">
          <cell title="点击选择照片" class="cell01">
          </cell>
        </div>
        <div class="div-img-2">
          <div v-for=" item in getLocalImgs1" class="div-img">
            <img :src="item" class="div-img-1"/>
          </div>
        </div>
      </group>
      <group gutter="10px">
        <x-button v-bind:style="commitBtn" @click.native="submitPost" class="x-button">创建工单</x-button>
        <x-button v-bind:style="allotBtn" @click.native="orderAllot(0)" class="x-button white_Btn">
          <img src="../assets/allot.png" width="25" height="23.6"/>
          分配
        </x-button>
        <x-button v-bind:style="overBtn" @click.native="orderOver" class="x-button red_btn">
          完成
        </x-button>
        <x-button v-bind:style="evaluateBtn" @click.native="evaluate(0)" class="x-button white_Btn">
          <img src="../assets/evaluate.png" width="26" height="24"/>
          评价
        </x-button>
      </group>
    </div>
    <div class="detail_img" v-bind:style="showImgStyle1">
      <p class="detail_bar">保洁前图片：</p>
      <div class="img">
        <img v-for="item in imgList1" :value="item.id" :key="item.id" v-bind:src="item.img"
             v-on:click="imgShow(item.img)"/>
      </div>
    </div>
    <div class="detail_img" v-bind:style="showImgStyle2">
      <p class="detail_bar">保洁后图片：</p>
      <div class="img">
        <img v-for="item in imgList2" :value="item.id" :key="item.id" v-bind:src="item.img"
             v-on:click="imgShow(item.img)"/>
      </div>
    </div>
    <div class="detail_remark" v-bind:style="backcontentStyle">
      <p class="detail_bar">退回原因：</p>
      <p class="detail_bar">{{backcontent}}</p>
    </div>
    <group gutter="-3px" v-bind:style="overImgDiv">
      <div v-on:click="addImg(2)">
        <cell title="点击选择完成照片" class="cell01" style="height: 40px;margin: 0 !important;">
        </cell>
      </div>
      <div class="div-img-2">
        <div v-for=" item in getLocalImgs2" class="div-img" style="margin-right: 10px">
          <img :src="item" class="div-img-1"/>
        </div>
      </div>
    </group>
    <div style="padding-bottom: 80px"></div>
    <div class="pop_bg" v-bind:style="allotDivStyle" v-on:click="orderAllot(1)"></div>
    <div class="allot_list" v-bind:style="allotDivStyle">
      <div class="allot_span">
        <span v-for="item in allotList" :value="item.id" :key="item.id" :id="item.id" v-on:click="onItemList(item.id)">
          {{ item.name }}</span>
      </div>
      <p class="btn" v-on:click="submitAllot">确定</p>
    </div>
    <div class="pop_bg" v-bind:style="evaluateDivStyle" v-on:click="evaluate(1)"></div>
    <div class="evaluate_detail" v-bind:style="evaluateDivStyle">
      <div class="evaluate_choice">
        <input v-model="evaluateGrade" type="radio" id="grade1" name="grade" value="好评" checked/><label
        for="grade1">好评</label>
        <input v-model="evaluateGrade" type="radio" id="grade2" name="grade" value="中评"/><label for="grade2"
                                                                                                style="margin: 0 15%;">中评</label>
        <input v-model="evaluateGrade" type="radio" id="grade3" name="grade" value="差评"/><label for="grade3">差评</label>
      </div>
      <!--<textarea v-model="evaluateText" class="evaluate_textarea" placeholder="请输入文字" rows="5"
                maxlength="200"></textarea>-->
      <group gutter="10px">
        <x-textarea placeholder="请输入文字" class="evaluate_textarea" max="200" autosize="true"
                    v-model="evaluateText" style="border-top:0"></x-textarea>
      </group>
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="evaluate(1)">取消</p>
        <p class="btn yes_btn" v-on:click="submitEvaluate">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="imgDivStyle" v-on:click="imgShow(false)"></div>
    <div class="allot_list" v-bind:style="imgDivStyle" style="top:20px;background-color: transparent"
         v-on:click="imgShow(false)">
      <img v-bind:src="showImgUrl" width="100%"/>
    </div>
  </div>
</template>

<script>
  let isWkWebView = window.__wxjs_is_wkwebview
  import VoiceList from './VoiceList.vue'

  import {
    Group,
    Cell,
    XButton,
    PopupPicker,
    XTextarea
  } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      XButton,
      PopupPicker,
      XTextarea,
      VoiceList
    },
    data () {
      return {
        titleType: '个人中心',
        placetext: '请输入描述文字（对工单进行简单描述）',
        user_id: '',
        order_id: '',
        order_type: '',
        usernamemodel: '',
        list3: [],
        value3: [],
        location: '',
        urls: [],
        imgs: [],
        voiceList: [],
        imgList1: [],
        imgList2: [],
        content: '',
        wkWebViewId: [],
        getLocalImgs1: [],
        getLocalImgs2: [],
        backcontent: '',
        backcontentStyle: {
          display: 'none'
        },
        coverStyle: {
          display: 'none'
        },
        commitBtn: {
          display: 'none'
        },
        allotBtn: {
          display: 'none'
        },
        overBtn: {
          display: 'none'
        },
        evaluateBtn: {
          display: 'none'
        },
        allotDivStyle: {
          display: 'none'
        },
        evaluateDivStyle: {
          display: 'none'
        },
        overImgDiv: {
          display: 'none'
        },
        makeVoice: {
          display: 'block'
        },
        showVoice: {
          display: 'none'
        },
        choiceImgStyle: {
          display: 'none'
        },
        showImgStyle1: {
          display: 'none'
        },
        showImgStyle2: {
          display: 'none'
        },
        imgDivStyle: {
          display: 'none'
        },
        showImgUrl: '',
        headerImg: '',
        headerbgStyle: {
          backgroundImage: ''
        },
        allotList: [],
        allotId: '',
        evaluateGrade: '',
        evaluateText: ''
      }
    },
    created () {
      if (sessionStorage.getItem('locationList') == null || sessionStorage.getItem('locationList') == '') {
        this.onLoadLocation()
      } else {
        this.list3 = JSON.parse(sessionStorage.getItem('locationList'))
        this.closeLoading()
      }
      this.user_id = this.getUserInfo().id
      this.user_type = this.getUserInfo().role
      this.user_code = this.getUserInfo().code;
      // this.user_id = '04a69ca000d811e8989e00163e06e1b0'
      // this.user_type = 'ALLOT'
      // this.user_code = '10226'
      this.headerImg = 'http://zsr.radioclassical.cn/avatar/' + this.user_code + '.jpg'
      this.headerbgStyle.backgroundImage = 'url(http://zsr.radioclassical.cn/avatar/' + this.user_code + '.jpg)'
      this.order_type = this.$route.query.type
      if (this.$route.query.order_id) {
        if (this.type === 'WATER') {
          document.title = '送水单详情'
          this.choiceImgStyle.display = 'none'
        } else if (this.type === 'CLEANER') {
          document.title = '保洁单详情'
          this.choiceImgStyle.display = 'none'
        }
        this.getAllotList()
        this.order_id = this.$route.query.order_id
        this.coverStyle.display = 'block'
        this.makeVoice.display = 'none'
        this.showVoice.display = 'block'
        this.get('resources/biz/order/details', {
            id: this.order_id
          }, res => {
            this.list3 = []
            this.list3.push({value: 0, name: res.data.data.location})
            this.value3.push(0)
            this.placetext = ''
            this.content = res.data.data.content
            switch (res.data.data.state) {
              case '已创建' :
                if (this.user_type.indexOf('ALLOT') > -1) {
                  this.allotBtn.display = 'block'
                }
                break
              case '已分配' :
                if (this.user_id == res.data.data.executor) {
                  this.overBtn.display = 'block'
                  if (this.type === 'CLEANER') {
                    this.overImgDiv.display = 'block'
                  }
                }
                break
              case '待评价' :
                if (this.user_id == res.data.data.author) {
                  this.evaluateBtn.display = 'block'
                }
                break
              case '已完成' :
                break
              case '已退回' :
                this.getBackContent()
                break
            }
            if (res.data.data.voice) {
              console.log(res.data.data.voice.split(','))
              var array = res.data.data.voice.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.voiceList.push({'id': array[i], 'url': array[i]})
                }
              }
            }
            if (res.data.data.picture) {
              this.showImgStyle1.display = 'block'
              console.log(res.data.data.picture.split(','))
              var array = res.data.data.picture.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.imgList1.push({'id': i, 'img': array[i]})
                }
              }
            }
            if (res.data.data.finishPicture) {
              this.showImgStyle2.display = 'block'
              console.log(res.data.data.finishPicture.split(','))
              var array = res.data.data.finishPicture.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.imgList2.push({'id': i, 'img': array[i]})
                }
              }
            }
          },
          err => {
          })
      } else {
        this.commitBtn.display = 'block'
        if (this.type === 'WATER') {
          document.title = '创建送水单'
          this.showImgStyle1.display = 'none'
          this.showImgStyle2.display = 'none'
          this.choiceImgStyle.display = 'none'
        } else if (this.type === 'CLEANER') {
          document.title = '创建保洁单'
          this.showImgStyle1.display = 'none'
          this.showImgStyle2.display = 'none'
          this.choiceImgStyle.display = 'block'
        }
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
    },
    computed: {
      type: function () {
        return this.$route.query.type
      }
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
      onHide: function () {
      },
      onChange: function () {
        this.location = this.value3[this.value3.length - 1]
      },
      imgShow: function (state) {
        if (state) {
          this.imgDivStyle.display = 'block'
          this.showImgUrl = state
        } else {
          this.imgDivStyle.display = 'none'
        }
      },
      getBackContent: function () {
        var params = new FormData()
        params.append('id', this.order_id)
        this.post('resources/biz/refuseRecord/refuse', params, res => {
            this.backcontent = res.data.data.reason
            this.backcontentStyle.display = 'block'
          },
          err => {
          })
      },
      submitPost: function () {
        var idss = []
        this.imgs.forEach(function (element) {
          idss.push(element)
        })
        this.$refs.vl.ids.forEach(function (element) {
          idss.push(element)
        })
        var mediaIds = ''
        for (var i = 0; i < idss.length; i++) {
          mediaIds = mediaIds + idss[i] + ','
        }
        if (this.location == '') {
          this.showToast('请选择位置', 2)
          return
        }
        var params = new FormData()
        params.append('author', this.user_id)
        params.append('location', this.location)
        params.append('content', this.content)
        params.append('mediaId', mediaIds)
        params.append('type', this.type)
        params.append('wx', sessionStorage.getItem('wx'))
        this.post('/resources/biz/order/add_repair_order', params, res => {
            if (res.data.code === 0) {
              this.showToast('创建工单成功', 2)
              this.$router.replace({name: 'task'})
            }
          },
          err => {
          })
      },
      getAllotList: function () {
        this.get('resources/biz/worker/get_by_role', {
            role: this.order_type
          }, res => {
            this.allotList = res.data.data
          },
          err => {
          })
      },
      onItemList: function (e) {
        this.allotId = e
        var str_list = document.getElementById(e).parentNode.children
        for (var i = 0; i < str_list.length; i++) {
          str_list[i].setAttribute('class', '')
        }
        document.getElementById(e).setAttribute('class', 'on')
      },
      orderAllot: function (state) {
        if (state == 1) {
          this.allotDivStyle.display = 'none'
        } else {
          this.allotDivStyle.display = ''
        }
      },
      submitAllot: function () {
        //分配人员
        if (this.allotId == '') {
          this.showToast('请选择分配人', 2)
          return
        }
        var params = new FormData()
        params.append('id', this.order_id)
        params.append('assigner', this.user_id)
        params.append('executor', this.allotId)
        this.post('resources/biz/order/assign_order', params, res => {
            if (res.data.code === 0) {
              this.showToast('分配人员成功', 2)
              this.$router.replace({
                name: 'task'
              })
            }
          },
          err => {
          })
      },
      addImg: function (imgId) {
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
                    if (imgId == 1) {
                      this.getLocalImgs1.push(res.localData) // localData是图片的base64数据，可以用img标签显示
                    } else {
                      this.getLocalImgs2.push(res.localData) // localData是图片的base64数据，可以用img标签显示
                    }
                  },
                  fail: (err) => {
                  }
                })
              } else {
                if (imgId == 1) {
                  this.getLocalImgs1.push(localIds[i])
                } else {
                  this.getLocalImgs2.push(localIds[i])
                }
              }
            }
          }
        })
      },
      orderOver: function () {
        //完成
        var imgsData = ''
        if (this.type === 'CLEANER') {
          if (this.imgs.length < 1) {
            this.showToast('请上传照片', 2)
            return
          } else {
            for (var i = 0; i < this.imgs.length; i++) {
              imgsData = imgsData + this.imgs[i] + ','
            }
          }
        }
        var params = new FormData()
        params.append('id', this.order_id)
        params.append('mediaId', imgsData)
        this.post('resources/biz/order/order_finished ', params, res => {
            if (res.data.code === 0) {
              this.showToast('已完成工单', 2)
              this.$router.replace({
                name: 'task'
              })
            }
          },
          err => {
          })
      },
      evaluate: function (state) {
        if (state == 1) {
          this.evaluateDivStyle.display = 'none'
        } else {
          this.evaluateDivStyle.display = ''
        }
      },
      submitEvaluate: function () {
        //评价
        var params = new FormData()
        params.append('id', this.order_id)
        params.append('rank', this.evaluateGrade)
        params.append('appraise', this.evaluateText)
        this.post('resources/biz/order/order_appraise', params, res => {
            if (res.data.code === 0) {
              this.showToast('评论成功', 2)
              this.$router.replace({
                name: 'task'
              })
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
    padding: 0 20px;
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

  .weui-textarea {
    font-size: 32px !important;
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
    background-color: #009edd;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0px;
  }

  .x-button img {
    vertical-align: middle;
    margin-right: 30px;
  }

  .cover_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
  }

  .show_voice {
    position: relative;
    z-index: 600;
  }

  .white_Btn {
    background-color: white;
    color: #666;
  }

  .red_btn {
    background-color: #FC7171;
    color: white;
  }

  .pop_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 600;
  }

  .allot_list {
    position: fixed;
    top: 200px;
    left: 7%;
    width: 80%;
    background-color: white;
    border-radius: 10px;
    z-index: 900;
    padding: 30px 20px 10px;
  }

  .allot_list .allot_span {
    margin: 10px;
    height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  .allot_list .allot_span span {
    margin: 10px;
    padding: 3px 5px;
    white-space: nowrap;
    font-size: 30px;
    border-radius: 5px;
    color: #353535;
    display: inline-block;
    width: 100px;
    text-align: center;
    border: 1px solid transparent;
  }

  .allot_list .allot_span .on {
    border: 1px solid #00AAEE !important;
    box-shadow: 0 4px 2px rgba(0, 170, 238, 0.1);
  }

  .allot_list .btn {
    margin: 50px 10px 0;
    padding: 20px 0;
    border-top: 1px solid #ececec;
    color: #00AAEE;
    font-weight: 600;
    text-align: center;
  }

  .evaluate_detail {
    position: absolute;
    top: 200px;
    left: 10%;
    width: 70%;
    background-color: white;
    border-radius: 10px;
    z-index: 900;
    padding: 30px 30px 0;
  }

  .evaluate_detail .evaluate_choice input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #FFA135;
    text-indent: .15em;
    line-height: 1;
  }

  .evaluate_detail .evaluate_choice input[type="radio"]:checked + label::before {
    background-color: #FFA135;
    background-clip: content-box;
  }

  .evaluate_detail .evaluate_choice input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .evaluate_detail .evaluate_textarea {
    margin: 35px 0;
    border-radius: 10px;
    outline: none;
    border: 1px solid #ececec !important;
  }

  .evaluate_detail .evaluate_btn {
    padding: 10px 0;
    border-top: 1px solid #ececec;
  }

  .evaluate_detail .evaluate_btn .btn {
    color: #00AAEE;
    text-align: center;
    width: 48%;
    padding: 15px 0;
    display: inline-block;
  }

  .evaluate_detail .evaluate_btn .no_btn {
    border-right: 1px solid #ececec;
  }

  .evaluate_detail .evaluate_btn .yes_btn {
    font-weight: 600;
  }

  .detail_bar {
    margin-left: 15px;
    font-size: 35px;
    height: 80px;
    line-height: 80px;
  }

  .detail_img {
    margin-top: 10px;
    padding-bottom: 10px;
    background-color: white;
  }

  .detail_img img {
    width: 150px;
    height: 150px;
    margin-left: 15px;
  }

  .detail_remark {
    margin-top: 20px;
    padding: 0 3px;
    background-color: white;
  }

  .detail_remark p:first-child {
    color: red;
    font-weight: 600;
  }

</style>
