<style>
  .weui-cell {
    margin: 10px 0 50px !important;
    padding: 0 !important;
  }

  .weui-cells:before {
    border-top: 0 !important;
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

  .repairs_box .weui-cell {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
<style scoped>
  .content {
    padding-bottom: 60px;
  }

  .repairs_box {
    background-color: white;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    text-align: left;
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 170px;
  }

  .repairs_box .left {
    width: 40%;
  }

  .repairs_box .right {
    float: right;
    width: 57%;
    text-align: right;
  }

  .repairs_box .line_left {
    white-space: nowrap;
    margin-right: 20px;
  }

  .repairs_box .line_right {
    white-space: nowrap;
  }

  .repairs_box span {
    white-space: nowrap;
    /*overflow: hidden;*/
    display: inline-block;
    text-overflow: ellipsis;
  }

  .repairs_box .title {
    height: 90px;
    line-height: 90px;
    margin: 0 30px;
    border-bottom: 1px solid #E5E5E5;
    font-size: 34px;
  }

  .repairs_box .detail {
    margin: 0 30px;
    padding-top: 15px;
    padding-bottom: 20px;
  }

  .repairs_box .detail_bar {
    line-height: 65px;
    font-size: 30px;
    color: #333;
  }

  .repairs_box .detail_ques, .detail_img, .detail_remark {
    margin-top: 20px;
  }

  .repairs_box .detail_remark {
    border: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .repairs_box .detail_remark p:first-child {
    color: red;
    font-weight: 600;
  }

  .repairs_box .detail_img {
    margin-top: 15px;
  }

  .repairs_box .detail_img img {
    width: 150px;
    height: 150px;
    margin-right: 15px;
  }

  .repairs_bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

  .repairs_bottom .x-button {
    font-size: 36px;
    width: 100%;
    height: 100px;
  }

  .repairs_bottom .x-button img {
    vertical-align: middle;
    margin-right: 30px;
  }

  .white_Btn {
    background-color: white;
    color: #666;
  }

  .red_btn {
    background-color: #FC7171;
    color: white;
  }

  .yellow_btn {
    background-color: #FFA135;
    color: white;
  }

  .blue_btn {
    background-color: #2db7f5;
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

  .allot_list .allot_span, .allot_depart {
    margin: 10px;
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  .allot_list .allot_depart p {
    height: 70px;
    line-height: 70px;
  }

  .allot_list .allot_depart .img {
    float: right;
    margin-top: 2%;
    margin-right: 30px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
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

  .evaluate_detail .evaluate_choice .label {
    margin-right: 30px;
  }

  .evaluate_detail .evaluate_choice .star {
    width: 38px;
    height: 38px;
    vertical-align: sub;
    margin-right: 10px;
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

  .allot_btn {
    margin-top: 30px;
    padding: 10px 0;
    border-top: 1px solid #ececec;
  }

  .allot_btn .btn {
    color: #00AAEE;
    text-align: center;
    width: 48%;
    padding: 15px 0;
    display: inline-block;
  }

  .allot_btn .no_btn {
    border-right: 1px solid #ececec;
  }

  .allot_btn .yes_btn {
    font-weight: 600;
    background-color: white;
  }

  .btn_group {
    background-color: #fbf9fe;
  }

  .btn_group .x-button {
    display: inline-block;
    width: 49.33% !important;
    border-radius: 0;
  }

  .btn_group .x-button .white_Btn {
    border: 0 !important;
  }

  .btn_group .weui-btn:after {
    border: 0 !important;
  }

  .cell01 {
    font-size: 34px;
    height: 60px;
    margin: 0 !important;
  }

  .cell02 {
    padding-top: 20px;
    font-size: 34px;
    height: 88px;
  }

  .input {
    font-size: 34px;
    min-height: 256px;
  }

  .div-img {
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
    padding-right: 30px;
  }

  .add_backBtn {
    display: inline-block;
    border-radius: 0;
    font-size: 36px;
    height: 100px;
    background-color: #FFA135;
    color: white;
    width: 25% !important;
  }

  .add_waitBtn {
    display: inline-block;
    border-radius: 0;
    font-size: 36px;
    height: 100px;
    background-color: #2db7f5;
    color: white;
    width: 25% !important;
  }

  .add_overBtn {
    display: inline-block;
    border-radius: 0;
    font-size: 36px;
    height: 100px;
    background-color: #FC7171;
    color: white;
    width: 45% !important;
  }

  /*.voice {
    float: left !important;
    height: 90px;
  }

  .cell02-img-01 {
    margin-right: 0 !important;
    margin-left: -10px !important;
  }

  .cell02-img-02 {
    float: left !important;
  }

  .cell02-p {
    display: none !important;
  }*/
</style>
<template>
  <div class="content" style="position: relative;">
    <div class="repairs_box">
      <div class="title">
        <span class="left">报修单</span>
        <span class="right" v-bind:style="stateColor">{{state}}</span>
      </div>
      <div class="detail">
        <div class="detail_bar">
          <span class="line_left" style="margin-right: 10px">类型：{{classify}}</span>
        </div>
        <div class="detail_bar">
          <span class="line_left" style="margin-right: 10px">报修人：{{authorName}}{{authorCode}}</span>
          <span v-bind:style="isLeaderEmShow" style="float: right;">是否领导：
            <span v-bind:style="isLeaderColor">{{isLeader}}</span></span>
        </div>
        <div class="detail_bar">
          区域：{{location}}
        </div>
        <div class="detail_bar">
          <span class="line_left">部门：{{department}}</span>
          <span class="line_right">部门派单员：{{responsibleName}}</span>
        </div>
        <div class="detail_bar">
          维修员：{{executorName}}{{executorCode}}
        </div>
        <div class="detail_bar">创建时间：{{createdDate}}</div>
        <div class="detail_bar">指派时间：{{assignTime}}</div>
        <div class="detail_ques">
          <p class="detail_bar">问题描述：</p>
          <p class="detail_bar">{{content}}</p>
        </div>
        <group :gutter="gutter" v-bind:style="voiceEmShow1">
          <p class="detail_bar">维修前语音：</p>
          <audio v-for="item in voiceList1" :value="item.id" :key="item.id" v-bind:src="item.url" controls="controls">
            您的浏览器不支持 audio 标签。
          </audio>
        </group>
        <div class="detail_img" v-bind:style="imgEmShow1">
          <p class="detail_bar">维修前图片：</p>
          <div class="img">
            <img v-for="item in imgList1" :value="item.id" :key="item.id" v-bind:src="item.img"
                 v-on:click="imgShow(item.img)"/>
          </div>
        </div>
        <group :gutter="gutter" v-bind:style="voiceEmShow2">
          <p class="detail_bar">维修后语音：</p>
          <audio v-for="item in voiceList2" :value="item.id" :key="item.id" v-bind:src="item.url" controls="controls">
            您的浏览器不支持 audio 标签。
          </audio>
        </group>
        <div class="detail_img" v-bind:style="imgEmShow2">
          <p class="detail_bar">维修后图片：</p>
          <div class="img">
            <img v-for="item in imgList2" :value="item.id" :key="item.id" v-bind:src="item.img"
                 v-on:click="imgShow(item.img)"/>
          </div>
        </div>
        <div class="detail_remark" v-bind:style="waitEmShow">
          <p class="detail_bar">等待原因：</p>
          <p class="detail_bar">{{waitParts}}</p>
        </div>
        <div class="detail_remark" v-bind:style="backcontentStyle">
          <p class="detail_bar">退回原因：</p>
          <p class="detail_bar">{{backcontent}}</p>
        </div>
        <hr v-bind:style="choiceBtn"
            style="margin-top:25px;margin-left: -50px;width: 500px;height: 14px;background-color: #fbf9fe;border:0;">
        <voice-list v-bind:style="choiceBtn" style="margin-top: -10px" ref="vl"></voice-list>
        <group gutter="10px" v-bind:style="choiceBtn">
          <div v-on:click="addImg">
            <cell title="点击选择照片" class="cell01">
            </cell>
          </div>
          <div class="div-img-2">
            <div v-for=" item in getLocalImgs" class="div-img" style="margin-right: 10px">
              <img :src="item" class="div-img-1"/>
            </div>
          </div>
        </group>
      </div>
    </div>
    <div class="repairs_bottom">
      <div class="btn_group" v-bind:style="allot_backBtn">
        <x-button @click.native="sendback(0)" class="x-button yellow_btn">
          退回
        </x-button>
        <x-button @click.native="orderAllot(0)" class="x-button white_Btn">
          <img src="../assets/allot.png" width="25" height="23.6"/>
          分配
        </x-button>
      </div>
      <x-button v-bind:style="allotBtn" @click.native="orderAllot(0)" class="x-button white_Btn">
        <img src="../assets/allot.png" width="25" height="23.6"/>
        分配
      </x-button>
      <x-button v-bind:style="evaluateBtn" @click.native="evaluate(0)" class="x-button white_Btn">
        <img src="../assets/evaluate.png" width="26" height="24"/>
        评价
      </x-button>
      <div class="btn_group" v-bind:style="wait_backBtn" style="text-align: center;">
        <x-button @click.native="sendback(0)" class="add_backBtn">
          退回
        </x-button>
        <x-button @click.native="waiting(0)" class="add_waitBtn">
          待采购
        </x-button>
        <x-button @click.native="orderOver" class="add_overBtn">
          完成
        </x-button>
      </div>
      <div class="btn_group" v-bind:style="backBtn">
        <x-button @click.native="sendback(0)" class="x-button yellow_btn">
          退回
        </x-button>
        <x-button @click.native="orderOver" class="x-button red_btn">
          完成
        </x-button>
      </div>
      <div class="btn_group" v-bind:style="confirmBtn">
        <x-button @click.native="sendback(0)" class="x-button yellow_btn">
          确认退回
        </x-button>
        <x-button @click.native="orderAllot(0)" class="x-button white_Btn">
          <img src="../assets/allot.png" width="25" height="23.6"/>
          分配
        </x-button>
      </div>
      <div class="btn_group" v-bind:style="auditBtn">
        <x-button @click.native="auditResule('不合格')" class="x-button yellow_btn">
          不合格
        </x-button>
        <x-button @click.native="auditResule('合格')" class="x-button red_btn">
          合格
        </x-button>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="allotDivStyle" v-on:click="orderAllot(1)"></div>
    <div class="allot_list" v-bind:style="allotDivStyle">
      <div class="allot_depart" v-bind:style="allotDepartStyle">
        <p v-for="item in allotDepart" :value="item.id" :key="item.id" :id="item.code"
           v-on:click="onDepartList(item.code)">{{item.name}}
          <span class="img">
            <a v-bind:id="item.model"></a>
            <img src="../assets/arraws_right.png" width="8" height="12.5"/>
          </span>
        </p>
      </div>
      <div class="allot_span" v-bind:style="allotSpanStyle">
        <span v-for="item in allotList" :value="item.id" :key="item.id" :id="item.id"
              v-on:click="onItemList(item.id,item.name)">
          {{ item.name }}</span>
      </div>
      <div class="allot_btn">
        <p class="btn no_btn" v-on:click="cancleAllot">取消</p>
        <p class="btn yes_btn" v-on:click="submitAllot">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="evaluateDivStyle" v-on:click="evaluate(1)"></div>
    <div class="evaluate_detail" v-bind:style="evaluateDivStyle">
      <div class="evaluate_choice" style="margin-bottom: 15px">
        <input v-model="evaluateGrade" type="radio" id="grade1" name="grade" value="好评" checked/><label
        for="grade1">好评</label>
        <input v-model="evaluateGrade" type="radio" id="grade2" name="grade" value="中评"/><label for="grade2"
                                                                                                style="margin: 0 15%;">中评</label>
        <input v-model="evaluateGrade" type="radio" id="grade3" name="grade" value="差评"/><label for="grade3">差评</label>
      </div>
      <div class="evaluate_choice" style="padding:5px 0">
        <span class="label">速度</span>
        <img class="star staritem1" src="../../static/star0.png" v-on:click="starClick('staritem1',1)">
        <img class="star staritem1" src="../../static/star0.png" v-on:click="starClick('staritem1',2)">
        <img class="star staritem1" src="../../static/star0.png" v-on:click="starClick('staritem1',3)">
        <img class="star staritem1" src="../../static/star0.png" v-on:click="starClick('staritem1',4)">
        <img class="star staritem1" src="../../static/star0.png" v-on:click="starClick('staritem1',5)">
      </div>
      <div class="evaluate_choice" style="padding:5px 0">
        <span class="label">态度</span>
        <img class="star staritem2" src="../../static/star0.png" v-on:click="starClick('staritem2',1)">
        <img class="star staritem2" src="../../static/star0.png" v-on:click="starClick('staritem2',2)">
        <img class="star staritem2" src="../../static/star0.png" v-on:click="starClick('staritem2',3)">
        <img class="star staritem2" src="../../static/star0.png" v-on:click="starClick('staritem2',4)">
        <img class="star staritem2" src="../../static/star0.png" v-on:click="starClick('staritem2',5)">
      </div>
      <div class="evaluate_choice" style="padding:5px 0">
        <span class="label">质量</span>
        <img class="star staritem3" src="../../static/star0.png" v-on:click="starClick('staritem3',1)">
        <img class="star staritem3" src="../../static/star0.png" v-on:click="starClick('staritem3',2)">
        <img class="star staritem3" src="../../static/star0.png" v-on:click="starClick('staritem3',3)">
        <img class="star staritem3" src="../../static/star0.png" v-on:click="starClick('staritem3',4)">
        <img class="star staritem3" src="../../static/star0.png" v-on:click="starClick('staritem3',5)">
      </div>
      <group gutter="15px">
        <x-textarea placeholder="请输入文字" class="evaluate_textarea" max="200" autosize="true"
                    v-model="evaluateText" style="border-top:0"></x-textarea>
      </group>
      <div class="allot_btn">
        <p class="btn no_btn" v-on:click="evaluate(1)">取消</p>
        <p class="btn yes_btn" v-on:click="submitEvaluate">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="backDivStyle" v-on:click="sendback(1)"></div>
    <div class="evaluate_detail" v-bind:style="backDivStyle">
      <p style="font-size: 17px;">退回原因</p>
      <group>
        <x-textarea placeholder="请输入文字" class="evaluate_textarea" max="200" autosize="true"
                    v-model="backText" style="border-top:0"></x-textarea>
      </group>
      <div class="allot_btn">
        <p class="btn no_btn" v-on:click="sendback(1)">取消</p>
        <p class="btn yes_btn" v-on:click="submitBack">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="waitDivStyle" v-on:click="waiting(1)"></div>
    <div class="evaluate_detail" v-bind:style="waitDivStyle">
      <p style="font-size: 17px;">等待原因</p>
      <group>
        <x-textarea placeholder="请输入文字" class="evaluate_textarea" max="200" autosize="true"
                    v-model="waitText" style="border-top:0"></x-textarea>
      </group>
      <div class="allot_btn">
        <p class="btn no_btn" v-on:click="waiting(1)">取消</p>
        <p class="btn yes_btn" v-on:click="submitWait">确定</p>
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
  document.title = '报修单详情'

  import Voice from './Voice.vue'
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
      Voice,
      VoiceList
    },
    data () {
      return {
        user_id: '',
        order_id: '',
        user_type: '',
        state: '',
        authorName: '',
        authorCode: '',
        isLeader: '',
        classify: '',
        voiceList1: [],
        voiceList2: [],
        location: '',
        department: '',
        responsibleName: '',
        executorName: '',
        executorCode: '',
        createdDate: '',
        assignTime: '',
        content: '',
        waitParts: '',
        backcontent: '',
        imgList1: [],
        imgList2: [],
        imgEmShow1: {
          display: 'none'
        },
        imgEmShow2: {
          display: 'none'
        },
        waitEmShow: {
          display: 'none'
        },
        voiceEmShow1: {
          display: 'none'
        },
        voiceEmShow2: {
          display: 'none'
        },
        stateColor: {
          color: '#5a5a5a'
        },
        isLeaderEmShow: {
          display: 'none'
        },
        isLeaderColor: {
          color: '#111'
        },
        allotBtn: {
          display: 'none'
        },
        allot_backBtn: {
          display: 'none'
        },
        overBtn: {
          display: 'none'
        },
        evaluateBtn: {
          display: 'none'
        },
        choiceBtn: {
          display: 'none'
        },
        wait_backBtn: {
          display: 'none'
        },
        backBtn: {
          display: 'none'
        },
        confirmBtn: {
          display: 'none'
        },
        auditBtn: {
          display: 'none'
        },
        allotDivStyle: {
          display: 'none'
        },
        evaluateDivStyle: {
          display: 'none'
        },
        backDivStyle: {
          display: 'none'
        },
        waitDivStyle: {
          display: 'none'
        },
        allotDepartStyle: {
          display: 'none'
        },
        allotSpanStyle: {
          display: 'none'
        },
        backcontentStyle: {
          display: 'none'
        },
        allotDepart: [],
        allotList: [],
        allotId: '',
        evaluateGrade: '好评',
        evaluateText: '',
        backText: '',
        waitText: '',
        userChoice: '',
        usernameChoice: '',
        typeChoice: '',
        showImgUrl: '',
        imgDivStyle: {
          display: 'none'
        },
        urls: [],
        imgs: [],
        wkWebViewId: [],
        getLocalImgs: [],
        starvalue1: '速度,0',
        starvalue2: '态度,0',
        starvalue3: '质量,0'
      }
    },
    created () {
      this.user_id = this.getUserInfo().id
      this.user_type = this.getUserInfo().role
      // this.user_id = 'f3189c3eb92c11e7af8ab888e3382386'
      // this.user_type = 'ALLOT'
      if (this.$route.query.order_id) {
        this.order_id = this.$route.query.order_id
        this.get('resources/biz/order/details', {
            id: this.order_id
          }, res => {
            this.state = res.data.data.state
            this.authorName = res.data.data.authorName
            this.authorCode = '(' + res.data.data.authorCode + ')'
            if (res.data.data.isLeader) {
              this.isLeader = '是'
              this.isLeaderColor = '#e64340'
            } else {
              this.isLeader = '否'
            }
            if (sessionStorage.getItem('wx') == 'd') {
              this.isLeaderEmShow.display = 'none'
            } else {
              if (this.user_id != res.data.data.author) {
                this.isLeaderEmShow.display = 'block'
              }
            }
            this.classify = res.data.data.classify
            this.location = res.data.data.location
            this.department = res.data.data.department
            this.responsibleName = res.data.data.responsibleName
            this.executorName = res.data.data.executorName
            this.executorCode = ''
            if (res.data.data.executorCode) {
              this.executorCode = '(' + res.data.data.executorCode + ')'
            }
            this.createdDate = res.data.data.createdDate
            this.assignTime = res.data.data.assignTime
            this.content = res.data.data.content
            if (res.data.data.waitParts) {
              this.waitParts = res.data.data.waitParts
              this.waitEmShow.display = 'block'
            }
            switch (this.state) {
              case '已创建' :
                this.stateColor.color = '#F5A623'
                if (this.user_type.indexOf('ALLOT') > -1) {
                  this.allotBtn.display = 'block'
                }
                break
              case '维修员退回' :
                this.getBackContent()
                this.stateColor.color = '#F5A623'
                if (this.user_id == res.data.data.responsible) {
                  this.confirmBtn.display = 'block'
                }
                break
              case '已退回' :
                this.getBackContent()
                break
              case '维修小组长退回' :
                this.getBackContent()
                this.stateColor.color = '#F5A623'
                if (this.user_type.indexOf('ALLOT') > -1) {
                  this.allotBtn.display = 'block'
                }
                break
              case '已分配给维修小组长' :
                this.stateColor.color = '#009EDD'
                if (this.user_id == res.data.data.responsible) {
                  this.allot_backBtn.display = 'block'
                }
                break
              case '已分配给维修员' :
                this.stateColor.color = '#009EDD'
                if (this.user_id == res.data.data.executor) {
                  if (res.data.data.waitParts) {
                    this.backBtn.display = 'block'
                    this.choiceBtn.display = 'block'
                  } else {
                    this.wait_backBtn.display = 'block'
                    this.choiceBtn.display = 'block'
                  }
                }
                break
              case '已完成' :
                this.stateColor.color = '#09BB07'
                if ((res.data.data.examiner == '' || res.data.data.examiner == undefined) && this.user_type.indexOf('EXAMINER') > -1) {
                  this.auditBtn.display = 'block'
                }
                break
              case '待评价' :
                this.stateColor.color = '#FF8225'
                if ((res.data.data.examiner == '' || res.data.data.examiner == undefined) && this.user_type.indexOf('EXAMINER') > -1) {
                  this.auditBtn.display = 'block'
                } else if (this.user_id == res.data.data.author) {
                  this.evaluateBtn.display = 'block'
                }
                break
            }
            if (res.data.data.picture) {
              this.imgEmShow1.display = 'block'
              console.log(res.data.data.picture.split(','))
              var array = res.data.data.picture.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.imgList1.push({'id': i, 'img': array[i]})
                }
              }
            }
            if (res.data.data.finishPicture) {
              this.imgEmShow2.display = 'block'
              console.log(res.data.data.finishPicture.split(','))
              var array = res.data.data.finishPicture.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.imgList2.push({'id': i, 'img': array[i]})
                }
              }
            }
            if (res.data.data.voice) {
              this.voiceEmShow1.display = 'block'
              console.log(res.data.data.voice.split(','))
              var array = res.data.data.voice.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.voiceList1.push({'id': array[i], 'url': array[i]})
                }
              }
            }
            if (res.data.data.finishVoice) {
              this.voiceEmShow2.display = 'block'
              console.log(res.data.data.finishVoice.split(','))
              var array = res.data.data.finishVoice.split(',')
              for (var i = 0; i < array.length; i++) {
                if (array[i] != '') {
                  this.voiceList2.push({'id': array[i], 'url': array[i]})
                }
              }
            }
          },
          err => {
          })
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
    methods: {
      starClick: function (name, index) {
        for (var i = 0; i < 5; i++) {
          if (i < index) {
            document.getElementsByClassName(name)[i].src = '../../static/star1.png'
          } else {
            document.getElementsByClassName(name)[i].src = '../../static/star0.png'
          }
        }
        switch (name) {
          case 'staritem1':
            this.starvalue1 = '速度,' + index
            break
          case 'staritem2':
            this.starvalue2 = '态度,' + index
            break
          case 'staritem3':
            this.starvalue3 = '质量,' + index
            break
        }
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
      showSpanDiv: function () {
        this.allotDepartStyle.display = 'none'
        this.allotSpanStyle.display = 'block'
      },
      getDepartList: function () {
        this.get('resources/biz/department/department_list', {}, res => {
            this.allotDepart = res.data.data
            this.allotDepartStyle.display = 'block'
            this.allotSpanStyle.display = 'none'
            this.allotId = ''
          },
          err => {
          })
      },
      getAllotList: function () {
        if (this.state == '已创建') {
          this.get('resources/biz/worker/get_by_role', {
              role: 'RESPONSIBLE'
            }, res => {
              this.allotList = res.data.data
              this.showSpanDiv()
            },
            err => {
            })
        } else {
          this.get('resources/biz/worker/get_repair', {
              id: this.user_id
            }, res => {
              this.allotList = res.data.data
              this.showSpanDiv()
            },
            err => {
            })
        }
      },
      onDepartList: function (code) {
        this.get('resources/biz/worker/get_department', {
            depart: code
          }, res => {
            if (res.data.data.length == 0) {
              this.showToast('该部门下无负责人，无法进行指派', 2)
            } else {
              this.allotList = res.data.data
              this.showSpanDiv()
            }
          },
          err => {
          })
      },
      onItemList: function (e, name) {
        this.allotId = e
        var str_list = document.getElementById(e).parentNode.children
        for (var i = 0; i < str_list.length; i++) {
          str_list[i].setAttribute('class', '')
        }
        document.getElementById(e).setAttribute('class', 'on')

        this.userChoice = e
      },
      orderAllot: function (state) {
        if (state == 1) {
          this.allotDivStyle.display = 'none'
        } else {
          this.allotDivStyle.display = ''
          if (this.state == '已创建') {
            this.getAllotList()
          } else if (this.state == '维修员退回') {
            this.getAllotList()
          } else if (this.state == '维修小组长退回') {
            this.getDepartList()
          } else if (this.state == '已分配给维修小组长') {
            this.getAllotList()
          }
        }
      },
      cancleAllot: function () {
        if (this.state == '维修小组长退回') {
          if (this.allotSpanStyle.display == 'block') {
            this.allotDepartStyle.display = 'block'
            this.allotSpanStyle.display = 'none'
          } else {
            this.allotDivStyle.display = 'none'
          }
        } else {
          this.allotDivStyle.display = 'none'
        }
      },
      submitAllot: function () {
        if (this.state == '维修小组长退回') {
          if (this.allotId == '' || this.allotDepartStyle.display == 'block') {
            this.showToast('请选择负责人', 2)
            return
          }
          var params = new FormData()
          params.append('id', this.order_id)
          params.append('assigner', this.user_id)
          params.append('responsible', this.allotId)
          this.post('resources/biz/repairOrder/assign_repair_orderRespon', params, res => {
              if (res.data.code === 0) {
                this.showToast('分配人员成功', 2)
                this.$router.replace({
                  name: 'task'
                })
              }
            },
            err => {
            })
        } else if (this.state == '已创建') {
          if (this.allotSpanStyle.display == 'block') {
            if (this.allotId == '') {
              this.showToast('请选择维修小组长', 2)
              return
            }
            var params = new FormData()
            params.append('id', this.order_id)
            params.append('assigner', this.user_id)
            params.append('responsible', this.allotId)
            this.post('resources/biz/repairOrder/assign_repair_order', params, res => {
                if (res.data.code === 0) {
                  this.showToast('分配人员成功', 2)
                  this.$router.replace({
                    name: 'task'
                  })
                }
              },
              err => {
              })
          } else {
            this.showToast('请选择负责人', 2)
          }
        } else if (this.state == '已分配给维修小组长' || this.state == '维修员退回') {
          if (this.userChoice == '') {
            this.showToast('请选择维修员', 2)
            return
          }
          var params = new FormData()
          params.append('id', this.order_id)
          // params.append('type', this.typeChoice)
          params.append('repairer', this.userChoice)
          this.post('resources/biz/repairOrder/assign_repair_order_for_fix', params, res => {
              if (res.data.code === 0) {
                this.showToast('分配人员成功', 2)
                this.$router.replace({
                  name: 'task'
                })
              }
            },
            err => {
            })
        }
      },
      addImg: function () {
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
      orderOver: function () {
        //完成
        var idss = []
        if (this.imgs.length < 1) {
          this.showToast('请上传照片', 2)
          return
        } else {
          this.imgs.forEach(function (element) {
            idss.push(element)
          })
        }
        this.$refs.vl.ids.forEach(function (element) {
          idss.push(element)
        })
        var mediaIds = ''
        for (var i = 0; i < idss.length; i++) {
          mediaIds = mediaIds + idss[i] + ','
        }

        this.get('resources/biz/repairOrder/order_finished', {
            id: this.order_id,
            mediaId: mediaIds
          }, res => {
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
        if (this.starvalue1 == '速度,0' || this.starvalue2 == '态度,0' || this.starvalue3 == '质量,0') {
          this.showToast('请对该工单进行评价！', 2)
          return
        }
        var params = new FormData()
        params.append('id', this.order_id)
        params.append('rank', this.evaluateGrade)
        params.append('appraise', this.evaluateText)
        params.append('star_level', this.starvalue1 + ';' + this.starvalue2 + ';' + this.starvalue3)
        this.post('resources/biz/repairOrder/order_appraise', params, res => {
            if (res.data.code === 0) {
              this.showToast('评论成功', 2)
              this.$router.replace({
                name: 'task'
              })
            }
          },
          err => {
          })
      },
      sendback: function (state) {
        if (this.state == '维修员退回') {
          var params = new FormData()
          params.append('id', this.order_id)
          this.post('resources/biz/repairOrder/leader_refuse', params, res => {
              if (res.data.code === 0) {
                this.showToast('确认退回成功', 2)
                this.$router.replace({
                  name: 'task'
                })
              }
            },
            err => {
            })
        } else {
          if (state == 1) {
            this.backText = ''
            this.backDivStyle.display = 'none'
          } else {
            this.backDivStyle.display = ''
          }
        }
      },
      submitBack: function () {
        //退回
        if (this.backText == '') {
          this.showToast('请输入退回原因！', 2)
          return
        }
        var params = new FormData()
        if (this.state == '已分配给维修小组长') {
          params.append('type', 'RESPONSIBLE')
        } else {
          params.append('type', 'FIX')
        }
        params.append('id', this.order_id)
        params.append('workerId', this.user_id)
        params.append('reason', this.backText)
        this.post('resources/biz/repairOrder/refuse', params, res => {
            if (res.data.code === 0) {
              this.showToast('退回成功', 2)
              this.$router.replace({
                name: 'task'
              })
            }
          },
          err => {
          })
      },
      auditResule: function (examiner) {
        //审核结果
        var params = new FormData()
        params.append('id', this.order_id)
        params.append('examiner', examiner)
        this.post('resources/biz/repairOrder/order_examiner', params, res => {
            if (res.data.code === 0) {
              this.showToast('审核成功', 2)
              this.$router.replace({
                name: 'task'
              })
            }
          },
          err => {
          })
      },
      waiting: function (state) {
        if (state == 1) {
          this.waitText = ''
          this.waitDivStyle.display = 'none'
        } else {
          this.waitDivStyle.display = ''
        }
      },
      submitWait: function () {
        if (this.waitText == '') {
          this.showToast('请输入等待原因！', 2)
          return
        }
        var params = new FormData()
        params.append('orderId', this.order_id)
        params.append('waitParts', this.waitText)
        this.post('resources/biz/repairOrder/wait_ports', params, res => {
            if (res.data.code === 0) {
              this.showToast('提交成功', 2)
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
