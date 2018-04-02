<style scoped>
  body {
    background-color: #f3f3f3;
  }

  .wxPage_d .header_logo .header_text, img {
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
  }

  .wxPage_d .header_logo .header_text {
    color: #eef0f5;
    width: 200px;
  }

  .wxPage_d .header_logo .header_text .text_top {
    letter-spacing: 8px;
    font-size: 12px;
    transform: scale(0.7);
  }

  .wxPage_d .header_logo .header_text .text_center {
    letter-spacing: 7px;
    font-size: 40px;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
  }

  .wxPage_d .header_logo .header_text .text_bottom {
    font-size: 12px;
    width: 300px;
    margin-left: -48px;
    transform: scale(0.6);
  }

  .wxPage_d .header {
    width: 100%;
    height: 300px;
    padding-top: 60px;
    text-align: center;
    background-color: #276bc2;
  }

  .wxPage_d .header .title {
    text-align: center;
    letter-spacing: 8px;
    color: white;
  }

  .wxPage_d .content {
    background-color: white;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }

  .wxPage_d .content .row {
    padding: 50px;
    display: flex;
    -webkit-display: flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }

  .wxPage_d .content .item {
    text-align: center;
    display: inline-block;
    width: 30%;
  }

  .wxPage_d .content .item p {
    margin-top: 15px;
  }

  .wxPage_f .logo {
    display: block;
    margin: 0 auto;
    width: 160px;
    height: 160px;
  }

  .wxPage_f .index-group {
    overflow: hidden;
    background-color: white;
    border-bottom: 1px solid #ececec;
  }

  .wxPage_f .index-group:last-child {
    border-bottom: 0;
  }

  .wxPage_f .index-group .index-item {
    width: 49%;
    float: left;
  }

  .wxPage_f .index-group .index-item:first-child {
    border-right: 1px solid #ececec;
  }

  .wxPage_f .index-group .index-item .img {
    height: 100px;
  }

  .wxPage_f .index-group .index-item img {
    display: block;
    margin: 35px auto 40px;
  }

  .wxPage_f .index-group .index-item .title {
    font-size: 34px;
    line-height: 34px;
    margin: 20px 0;
    color: black;
    text-align: center;
  }

  .wxPage_f .index-group .index-item .sub-title {
    font-size: 26px;
    line-height: 26px;
    margin: 20px 0 30px;
    color: transparent;
    text-align: center;
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

  .evaluate_detail {
    position: fixed;
    top: 400px;
    left: 10%;
    width: 70%;
    background-color: white;
    border-radius: 10px;
    z-index: 900;
    padding: 30px 30px 0;
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

  .evaluate_detail .evaluate_textarea {
    font-size: 34px;
    min-height: 300px;
    margin: 30px 0;
    border-radius: 10px;
    outline: none;
    border: 1px solid #ececec !important;
  }
</style>
<style>
  .mint-indicator-wrapper {
    z-index: 9000 !important;
  }

  .mint-indicator-mask {
    z-index: 8000 !important;
  }
</style>
<template>
  <div class="body">
    <div class="wxPage_f" v-bind:style="wx_f_show">
      <div style="width:100%;background-color: #fbf9fe;padding-top: 50px;padding-bottom: 60px;">
        <img class="logo" src="../assets/logo02.png">
      </div>
      <div class="index-group">
        <div class="index-item" v-on:click="onItemTask('REPAIR')">
          <div class="img">
            <img src="../assets/item01.png" width="40" height="39"/>
          </div>
          <p class="title">报修任务</p>
          <p class="sub-title">东西坏了？点我</p>
        </div>
        <div class="index-item" v-on:click="onItemTask('WATER')">
          <div class="img">
            <img src="../assets/item02.png" width="33" height="37"/>
          </div>
          <p class="title">送水任务</p>
          <p class="sub-title">渴了点一点~</p>
        </div>
      </div>
      <div class="index-group">
        <div class="index-item" v-on:click="onItemTask('DELIVER')">
          <div class="img">
            <img src="../assets/item03.png" width="45" height="32" style="padding-top: 15px;"/>
          </div>
          <p class="title">运送任务</p>
          <p class="sub-title">快如闪电，点我</p>
        </div>
        <div class="index-item" v-on:click="onItemTask('CLEANER')">
          <div class="img">
            <img src="../assets/item04.png" width="45" height="45"/>
          </div>
          <p class="title">紧急保洁</p>
          <p class="sub-title">干净，叫我就对了</p>
        </div>
      </div>
      <div class="index-group">
        <div class="index-item" v-on:click="onItemClick('scan')">
          <div class="img">
            <img src="../assets/item05.png" width="43" height="43"/>
          </div>
          <p class="title">巡检任务</p>
          <p class="sub-title">好的生活习惯</p>
        </div>
        <div class="index-item" v-on:click="onItemClick('mine')">
          <div class="img">
            <img src="../assets/item_my-1.png" width="40" height="40"/>
          </div>
          <p class="title">个人信息</p>
          <p class="sub-title">每天都有任务</p>
        </div>
      </div>
      <!--<div class="index-group">
        <div class="index-item" v-on:click="onItemClick('Restaurant')">
          <div class="img">
            <img src="../assets/item07.png" width="44" height="35"/>
          </div>
          <p class="title">预约点餐</p>
          <p class="sub-title">预约点餐</p>
        </div>
        <div class="index-item">
          <p class="title"></p>
        </div>
      </div>-->
    </div>
    <div class="wxPage_d" v-bind:style="wx_d_show">
      <div class="header">
        <div class="header_logo">
          <img src="../assets/logo.png" width="40" height="40"/>
          <div class="header_text" style="width: 75px">
            <p class="text_center" style="width: 75px"></p>
            <p class="text_center" style="width: 75px">慧勤台</p>
            <p class="text_bottom" style="width: 75px;margin-left: 0">HUI QIN TAI</p>
          </div>
          <img src="../assets/zsh_logo.png" width="50" height="55"/>
          <div class="header_text">
            <p class="text_top">复旦大学附属</p>
            <p class="text_center">中山医院</p>
            <p class="text_bottom">ZHONGSHAN HOSPITAL</p>
          </div>
        </div>
        <p class="title" style="margin-top: 20px">复旦大学附属中山医院</p>
        <p class="title" style="margin-top: 5px">后勤慧勤台</p>
      </div>
      <div class="content">
        <div class="row">
          <div class="item" v-on:click="onItemClick('commit')">
            <img src="../assets/item01-1.png" width="33" height="33"/>
            <p>报修</p>
          </div>
          <div class="item" v-on:click="onItemClick('waterordercommit','WATER')">
            <img src="../assets/item02-1.png" width="33" height="33"/>
            <p>饮用水</p>
          </div>
          <div class="item" v-on:click="deliverShow(0)">
            <img src="../assets/item03-1.png" width="42" height="33"/>
            <p>运送</p>
          </div>
        </div>
        <div class="row">
          <div class="item" v-on:click="messageShow(0)">
            <img src="../assets/item04-1.png" width="33" height="33"/>
            <p>紧急保洁</p>
          </div>
          <div class="item" v-on:click="remarkShow(0)">
            <img src="../assets/item_eat.png" width="43" height="33"/>
            <p>预约点餐</p>
          </div>
          <div class="item" v-on:click="onItemClick('task')">
            <img src="../assets/item_self.png" width="33" height="33"/>
            <p>服务查询</p>
          </div>
        </div>
      </div>
      <div class="content">
        <p style="color: #dd504e;padding:15px 8px;font-weight: 600">个人中心</p>
        <div class="item" style="padding-left: 20px;" v-on:click="feedBackShow(0)">
          <img src="../assets/item_feedback.png" width="41" height="41"/>
          <p>意见反馈</p>
        </div>
        <div class="item" v-on:click="onItemClick('mine')">
          <img src="../assets/item_my.png" width="41" height="41"/>
          <p>个人信息</p>
        </div>
        <div class="item" v-on:click="onItemClick('wholelist')" v-bind:style="wholelistShow">
          <img src="../assets/item_data.png" width="41" height="38"/>
          <p>实时数据</p>
        </div>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="messageStyle" v-on:click="messageShow(1)"></div>
    <div class="evaluate_detail" v-bind:style="messageStyle">
      <p style="margin-bottom: 10px">该保洁服务仅在紧急状态下提供，如公共区域的呕吐、标本血液的破损打翻等事件！</p>
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="messageShow(1)">取消</p>
        <p class="btn yes_btn" v-on:click="onItemClick('waterordercommit','CLEANER')">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="remarkStyle" v-on:click="remarkShow(1)"></div>
    <div class="evaluate_detail" v-bind:style="remarkStyle">
      <p style="margin-bottom: 10px">请在备注区备注您的工号，若收到短信通知后可在此进行预约点餐！</p>
      <!--<p style="margin-bottom: 10px">杜鹃苑2月12日更新菜单，敬请期待!</p>-->
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="remarkShow(1)">取消</p>
        <p class="btn yes_btn" v-on:click="onItemClick('Restaurant')">确定</p>
        <!--<p class="btn yes_btn" v-on:click="remarkShow(1)">确定</p>-->
      </div>
    </div>
    <div class="pop_bg" v-bind:style="deliverStyle" v-on:click="deliverShow(1)"></div>
    <div class="evaluate_detail" v-bind:style="deliverStyle">
      <!--<p style="margin-bottom: 10px">该运送服务仅对护士提供，确认创建运送单请点击继续！</p>-->
      <p style="margin-bottom: 10px">该功能正在调整中，尚未开通！</p>
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="deliverShow(1)">取消</p>
        <!--<p class="btn yes_btn" v-on:click="onItemClick('deliver')">继续</p>-->
        <p class="btn yes_btn" v-on:click="deliverShow(1)">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="feedBackStyle" v-on:click="feedBackShow(1)"></div>
    <div class="evaluate_detail" v-bind:style="feedBackStyle" style="top: 140px;">
      <p>意见反馈</p>
      <p>
        <group gutter="10px">
          <x-textarea placeholder="请输入您的意见" class="evaluate_textarea" rows="10" max="400" autosize="true"
                      v-model="feedBackText" style="border-top:0"></x-textarea>
        </group>
      </p>
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="feedBackShow(1)">取消</p>
        <p class="btn yes_btn" v-on:click="feedbackSubmit">确定</p>
      </div>
    </div>
  </div>
</template>
<script>
  document.title = '复旦大学附属中山医院'
  import {
    Group,
    XTextarea,
    cookie
  } from 'vux'

  export default {
    components: {
      Group,
      XTextarea
    },
    methods: {
      onItemClick: function (path, type) {
        if (path == 'scan') {
          this.user_type = this.getUserInfo().role
          if (this.user_type.indexOf('PATROL') > -1) {
            this.$router.push({path: path, query: {'type': type}})
          } else {
            this.showToast('只有巡检员才能进入！', 2)
          }
        }
        /* else if (path == 'deliver') {
           this.user_type = this.getUserInfo().role
           if (this.user_type.indexOf('NURSE') > -1) {
             this.$router.push({path: path, query: {'type': type}})
           } else {
             this.showToast('只有护士才能创建运送单！', 2)
           }
         } */
        else if (path == 'Restaurant') {
          // window.location.href = "https://2df.me/PFBdJ-MvZM4G"
          // window.location.href = "https://weixin.keruyun.com/booking/book?shopId=810109897"
          window.location.href = 'https://weixin.keruyun.com/shop/detail?shopId=810109897'
        } else if (path == 'commit' || path == 'waterordercommit' || path == 'deliver') {
          this.$router.push({path: path, query: {'type': type}})
          this.showLoading('数据请求中')
        } else {
          this.$router.push({path: path, query: {'type': type}})
        }
      },
      onItemTask: function (task_id) {
        this.$router.push({path: 'task', query: {'task_id': task_id}})
      },
      messageShow: function (state) {
        if (state == 0) {
          this.messageStyle.display = 'block'
        } else {
          this.messageStyle.display = 'none'
        }
      },
      deliverShow: function (state) {
        if (state == 0) {
          this.deliverStyle.display = 'block'
        } else {
          this.deliverStyle.display = 'none'
        }
      },
      remarkShow: function (state) {
        if (state == 0) {
          this.remarkStyle.display = 'block'
        } else {
          this.remarkStyle.display = 'none'
        }
      },
      feedBackShow: function (state) {
        this.feedBackText = ''
        if (state == 0) {
          this.feedBackStyle.display = 'block'
        } else {
          this.feedBackStyle.display = 'none'
        }
      },
      feedbackSubmit: function () {
        if (this.feedBackText == '') {
          this.showToast('请输入您的意见', 2)
          return
        }
        var params = new FormData()
        params.append('userId', this.user_id)
        params.append('content', this.feedBackText)
        this.post('resources/biz/feedBack/save_feedBack', params, res => {
            if (res.data.code === 0) {
              this.feedBackText = ''
              this.showToast('反馈成功', 2)
              this.feedBackStyle.display = 'none'
            }
          },
          err => {
          })
      }
    },
    created () {
      let user = JSON.parse(localStorage.getItem('hqt_worker_info') || '{}')
      this.user_id = user.id
      // this.user_id = "b24cd20ee85311e7921f00163e06e1b0"
      if (sessionStorage.getItem('wx') == 'f') {
        this.wx_f_show.display = 'block'
        this.wx_d_show.display = 'none'
      } else {
        this.wx_f_show.display = 'none'
        this.wx_d_show.display = 'block'
      }
      if (this.user_id == 'f30a3751b92c11e7af8ab888e3382388' || this.user_id == '4842dcced35311e7b66200163e06e1b0' || this.user_id == 'ef56e2d8e6f611e7b66200163e06e1b0') {
        this.wholelistShow.display = 'inline-block'
      }
    },
    data () {
      return {
        user_id: '',
        feedBackText: '',
        messageStyle: {
          display: 'none'
        },
        remarkStyle: {
          display: 'none'
        },
        deliverStyle: {
          display: 'none'
        },
        feedBackStyle: {
          display: 'none'
        },
        wholelistShow: {
          display: 'none'
        },
        wx_f_show: {
          display: 'none'
        },
        wx_d_show: {
          display: ''
        }
      }
    }

  }
</script>
