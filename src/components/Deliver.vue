<template>
  <div style="position: relative;">
    <div style="position: relative;">
      <div class="cover_bg" v-bind:style="coverStyle"></div>
      <group gutter="0">
        <cell :title="titleType" class="cell01">
          <img slot="icon" width="35" height="35" style="display:none;margin-right:15px;margin-left:5px;"
               v-bind:src="headerImg" ref="img">
          <div slot="icon" v-bind:style="headerbgStyle" style="width: 35px;height: 35px;margin-right:15px;margin-left:5px;background-position: center;
    background-size: 100% 130%;"></div>
        </cell>
      </group>
      <group gutter="10px">
        <popup-picker title="初始位置" class="cell02" :data="list3" :columns="4" v-model="valueGet" @on-hide="onHide"
                      @on-change="onChange" show-name>
        </popup-picker>
      </group>
      <group gutter="-1px">
        <popup-picker title="送达位置" class="cell02" :data="list3" :columns="4" v-model="valueSend" @on-hide="onHide"
                      @on-change="onChange" show-name>
        </popup-picker>
      </group>
      <group gutter="10px">
        <popup-picker title="运送类型" class="cell02" :data="listType" :columns="4" v-model="valueType" @on-hide="onHide"
                      @on-change="onChange" show-name>
        </popup-picker>
      </group>
      <group gutter="-1px">
        <popup-picker title="执行时间段" class="cell02" :data="listTime" :columns="4" v-model="valueTime" @on-hide="onHide"
                      @on-change="onChange" show-name>
        </popup-picker>
      </group>
      <div class="addstyle" style="margin-top:-0.1px">
        <span>携带工具</span>
        <span v-bind:style="toolStyle0" style="float: right;color: #999;">{{toolText}}</span>
        <div v-bind:style="toolStyle1">
          <input v-model="valueTool" type="checkbox" name="toolinput" value="床">床
          <input v-model="valueTool" type="checkbox" name="toolinput" value="推车">推车
          <input v-model="valueTool" type="checkbox" name="toolinput" value="标本箱">标本箱
        </div>
      </div>
      <group gutter="10px">
        <x-textarea :placeholder="placetext" class="input" max="200" autosize="true" height=150
                    v-model="content"></x-textarea>
      </group>
      <div class="addstyle">
        <span>是否加急</span>
        <input v-model="isUrgent" id="isUrgent1" name="isUrgent" type="radio" value="true"/><label for="isUrgent1"
                                                                                                   style="margin-right: 10px">是</label>
        <input v-model="isUrgent" id="isUrgent0" name="isUrgent" type="radio" value="false" checked/><label
        for="isUrgent0">否</label>
      </div>
      <div class="detail_remark" v-bind:style="backcontentStyle">
        <p class="detail_bar">退回原因：</p>
        <p class="detail_bar">{{backcontent}}</p>
      </div>
      <group gutter="60px">
        <x-button v-bind:style="commitBtn" @click.native="commit" class="x-button">创建工单</x-button>
        <x-button v-bind:style="allotBtn" @click.native="orderAllot(0)" class="x-button white_Btn">
          <img src="../assets/allot.png" width="25" height="23.6"/>
          分配
        </x-button>
        <x-button v-bind:style="overBtn" @click.native="orderOver" class="x-button red_btn">
          完成
        </x-button>
      </group>
    </div>
    <div class="pop_bg" v-bind:style="allotDivStyle" v-on:click="orderAllot(1)"></div>
    <div class="allot_list" v-bind:style="allotDivStyle">
      <div class="allot_span">
        <span v-for="item in allotList" :value="item.id" :key="item.id" :id="item.id" v-on:click="onItemList(item.id)">
          {{ item.name }}</span>
      </div>
      <p class="btn" v-on:click="submitAllot">确定</p>
    </div>
  </div>
</template>

<script>
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
      XTextarea
    },
    data() {
      return {
        titleType: '个人中心',
        placetext: '请输入描述文字（对工单进行简单描述）',
        user_id: '',
        usernamemodel: '',
        list3: [],
        listType: [],
        listTime: [],
        valueGet: [],
        valueSend: [],
        valueType: [],
        valueTime: [],
        locationGet: '',
        locationSend: '',
        urls: [],
        imgs: [],
        content: '',
        wkWebViewId: [],
        getLocalImgs: [],
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
        toolStyle1: {
          display: 'inline-block'
        },
        toolStyle0: {
          display: 'none'
        },
        allotDivStyle: {
          display: 'none'
        },
        urgentDivStyle: {
          display: 'none'
        },
        backcontent: '',
        backcontentStyle: {
          display: 'none'
        },
        headerImg: '../../static/geren.png',
        headerbgStyle: {
          backgroundImage: ""
        },
        allotList: [],
        allotId: '',
        isUrgent: '',
        listTool: [],
        valueTool: [],
        toolText: ''
      }
    },
    created() {
      if (sessionStorage.getItem('locationList') == null || sessionStorage.getItem('locationList') == '') {
        this.onLoadLocation()
      } else {
        this.list3 = JSON.parse(sessionStorage.getItem('locationList'))
        this.closeLoading()
      }
      this.user_id = this.getUserInfo().id;
      this.user_type = this.getUserInfo().role;
      this.user_code = this.getUserInfo().code;
      // this.user_id = 'e1e82533c51f11e7af8ab888e3382386'
      // this.user_type = 'ALLOT'
      // this.user_code = '10226'
      this.headerImg = "http://zsr.radioclassical.cn/avatar/" + this.user_code + ".jpg";
      this.headerbgStyle.backgroundImage = "url(http://zsr.radioclassical.cn/avatar/" + this.user_code + ".jpg)"
      if (this.$route.query.order_id) {
        document.title = '运送单详情'
        this.getAllotList()
        this.order_id = this.$route.query.order_id
        this.coverStyle.display = 'block'
        this.toolStyle0.display = 'inline-block'
        this.toolStyle1.display = 'none'
        this.get('resources/biz/order/details', {
            id: this.order_id
          }, res => {
            this.list3 = []
            this.list3.push({value: 0, name: res.data.data.takeGoods})
            this.list3.push({value: 1, name: res.data.data.giveGoods})
            this.valueGet.push(0)
            this.valueSend.push(1)
            this.listType = []
            this.listType.push({value: 0, name: res.data.data.type})
            this.listTime = []
            this.listTime.push({value: 0, name: res.data.data.executeTime})
            this.valueType.push(0)
            this.valueTime.push(0)
            this.placetext = ""
            this.content = res.data.data.content
            this.toolText = res.data.data.carryTools
            this.isUrgent = res.data.data.isUrgent
            switch (res.data.data.state) {
              case '已创建' :
                if (this.user_type.indexOf('ALLOT') > -1) {
                  this.allotBtn.display = 'block'
                }
                break
              case '已分配' :
                if (this.user_id == res.data.data.executor) {
                  this.overBtn.display = 'block'
                }
                break
              case '已完成' :
                break
              case '已退回' :
                this.getBackContent()
                break
            }
          },
          err => {
          })
      } else {
        this.commitBtn.display = 'block'
        this.toolStyle0.display = 'none'
        this.toolStyle1.display = 'inline-block'
        document.title = '创建运送单'
        this.isUrgent = false
        //运送类型列表
        this.get('resources/biz/distributionType/get_type', {}, res => {
          this.listType = []
          for (var i = 0; i < res.data.data.length; i++) {
            var d = {}
            d.value = res.data.data[i].id
            d.name = res.data.data[i].typeName
            this.listType.push(d)
          }
        }, err => {
        })
        //携带工具列表
        var tool = []
        tool.push('床')
        tool.push('推车')
        tool.push('标本箱')
        for (var l = 0; l < tool.length; l++) {
          this.listTool.push({value: tool[l], name: tool[l]})
        }
        //时间段选择
        var time = []
        time.push('00:00 ~ 01:00')
        time.push('01:00 ~ 02:00')
        time.push('02:00 ~ 03:00')
        time.push('03:00 ~ 04:00')
        time.push('04:00 ~ 05:00')
        time.push('05:00 ~ 06:00')
        time.push('06:00 ~ 07:00')
        time.push('07:00 ~ 08:00')
        time.push('08:00 ~ 09:00')
        time.push('09:00 ~ 10:00')
        time.push('10:00 ~ 11:00')
        time.push('11:00 ~ 12:00')
        time.push('12:00 ~ 13:00')
        time.push('13:00 ~ 14:00')
        time.push('14:00 ~ 15:00')
        time.push('15:00 ~ 16:00')
        time.push('16:00 ~ 17:00')
        time.push('17:00 ~ 18:00')
        time.push('18:00 ~ 19:00')
        time.push('19:00 ~ 20:00')
        time.push('20:00 ~ 21:00')
        time.push('21:00 ~ 22:00')
        time.push('22:00 ~ 23:00')
        time.push('23:00 ~ 00:00')
        for (var t = 0; t < time.length; t++) {
          this.listTime.push({value: time[t], name: time[t]})
        }
      }
    },
    mounted() {
      this.$refs.img.onerror = () => {
        this.headerImg = "http://zsr.radioclassical.cn/avatar/" + this.user_code + ".JPG";
        this.headerbgStyle.backgroundImage = "url(http://zsr.radioclassical.cn/avatar/" + this.user_code + ".JPG)"
        this.$refs.img.onerror = () => {
          this.headerImg = this.getUserInfo().head;
          this.headerbgStyle.backgroundImage = "url(" + this.getUserInfo().head + ")";
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
        this.locationGet = this.valueGet[this.valueGet.length - 1]
        this.locationSend = this.valueSend[this.valueSend.length - 1]
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
      commit: function () {
        var idss = []
        this.imgs.forEach(function (element) {
          idss.push(element)
        })
        var params = new FormData()
        var mediaIds = ''
        for (var i = 0; i < idss.length; i++) {
          mediaIds = mediaIds + idss[i] + ','
        }

        if (this.locationGet == '' || this.locationGet == undefined) {
          this.showToast('请选择初始位置', 2)
          return
        }
        if (this.locationSend == '' || this.locationSend == undefined) {
          this.showToast('请选择送达位置', 2)
          return
        }
        if (this.valueType == '') {
          this.showToast('请选择运送类型', 2)
          return
        }
        if (this.valueTime == '') {
          this.showToast('请选择执行时间', 2)
          return
        }
        params.append('author', this.user_id)
        params.append('takeGoods', this.locationGet)
        params.append('giveGoods', this.locationSend)
        params.append('typeId', this.valueType)
        params.append('executeTime', this.valueTime)
        params.append('content', this.content)
        params.append('isUrgent', this.isUrgent)
        params.append('carryTools', this.valueTool)
        this.post('resources/biz/distributionOrder/add_distribution_order', params, res => {
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
            role: "DELIVER"
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
        this.post('resources/biz/distributionOrder/assign_order', params, res => {
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
      orderOver: function () {
        //完成
        var params = new FormData()
        params.append('id', this.order_id)
        this.post('resources/biz/distributionOrder/order_finished', params, res => {
            if (res.data.code === 0) {
              this.showToast('已完成工单', 2)
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

  .addstyle {
    background: white;
    height: 108px;
    line-height: 108px;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 35px;
    border-top: 1px solid #ececec !important;
  }

  .addstyle span {
    margin-right: 50px;
  }

  .addstyle input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #eaeaea;
    text-indent: .15em;
    line-height: 1;
  }

  .addstyle input[type="radio"]:checked + label::before {
    background-color: #009edd;
    background-clip: content-box;
  }

  .addstyle input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .addstyle input[type=checkbox] {
    display: inline-block;
    height: 28px;
    width: 28px;
    border: 1px solid #eaeaea;
    overflow: hidden;
    text-align: center;
    -webkit-appearance: none;
    font: normal normal normal 14px/1 FontAwesome;
    outline: 0;
    background: 0 0;
    vertical-align: inherit;
    margin-right: 10px;
    padding: 2px;
  }

  .addstyle input[type=checkbox]:checked:after {
    content: '√';
    font-size: 16px;
    font-weight: 600;
    /*content: '\f00c';*/
    text-align: center;
    line-height: 17px;
    color: #009edd;
  }

  .detail_bar {
    margin-left: 15px;
    font-size: 35px;
    height: 80px;
    line-height: 80px;
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
