<style scoped>
  body {
    background-color: #fbf9fe !important;
  }

  .item_list {
    margin-bottom: 20px;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    background-color: white;
  }

  .item_title {
    padding: 25px;
  }

  .item_list .item_header {
    padding: 25px;
    overflow: hidden;
    text-align: right;
  }

  .item_list .item_header .title {
    float: left;
    font-size: 34px;
  }

  .item_list .item_header .yes_btn {
    padding: 6px 25px;
    border: 1px solid #00AAEE;
    border-radius: 8px;
    margin-right: 10px;
    color: #00AAEE;
  }

  .item_list .item_header .no_btn {
    padding: 6px 25px;
    border: 1px solid #FFA135;
    border-radius: 8px;
    color: #FFA135;
  }

  .item_list .item_detail {
    margin: 0 30px;
    padding: 10px 0;
    border-top: 1px solid #E5E5E5;
    color: #666666;
    font-size: 30px;
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
</style>
<template>
  <div class="content">
    <p class="item_title">{{buildingName}}</p>
    <div class="item_list" v-for="item in pollingList" :value="item.id" :key="item.id">
      <div class="item_header" v-on:click="showDetail(item)">
        <span class="title">{{item.name}}</span>
        <span class="item_state" v-bind:style="item.stateStyle">{{item.currentState}}</span>
        <span class="yes_btn" v-bind:style="item.btnStyle" v-on:click="messageShow(0,item,true);">正常</span>
        <span class="no_btn" v-bind:style="item.btnStyle" v-on:click="messageShow(0,item,false);">报修</span>
      </div>
      <div class="item_detail" v-bind:style="item.openDetail">
        <div style="overflow: hidden">{{ item.content }}</div>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="messageStyle" v-on:click="messageShow(1)"></div>
    <div class="evaluate_detail" v-bind:style="messageStyle">
      <p style="margin-bottom: 10px">您的巡检结果将进行记录，确定提交？</p>
      <div class="evaluate_btn">
        <p class="btn no_btn" v-on:click="messageShow(1)">取消</p>
        <p class="btn yes_btn" v-on:click="resultSubmit">确定</p>
      </div>
    </div>
    <div class="pop_bg" v-bind:style="overStyle"></div>
    <div class="evaluate_detail" v-bind:style="overStyle">
      <p style="margin-bottom: 10px">该巡检点已全部巡检完成！</p>
      <div class="evaluate_btn" style="text-align: center">
        <p class="btn yes_btn" v-on:click="overSubmit">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
  document.title = '巡检'
  export default {
    data() {
      return {
        buildingName: '巡检地点：',
        buildingId: '',
        scanId: '',
        user_id: '',
        pollingList: [],
        messageStyle: {
          display: 'none'
        },
        overStyle: {
          display: 'none'
        },
        currentItem: {},
        currentIsNormal: '',
        pollingSum: 0
      }
    },
    created() {
      this.user_id = this.getUserInfo().id;
      this.scanId = this.$route.query.scanId
      // this.scanId = 'c92276d4fa7b11e7abb53c970e800c73'
      // this.user_id = 'f2e783a2b92c11e7af8ab888e3382386'
      this.get('resources/biz/inspection/inspection_list', {
        id: this.scanId,
        workerId: this.user_id
      }, res => {
        if (res.data.data.length < 1) {
          this.showToast('当前没有巡检任务！', 2)
          return
        }

        var pollingState = []
        this.pollingList = []
        for (var i = 0; i < res.data.data.length; i++) {
          var currentState = ''
          var btnStyle = {}
          btnStyle.display = 'inline-block'
          var stateStyle = {}
          stateStyle.display = 'none'
          stateStyle.color = 'white'
          var openDetail = {}
          openDetail.display = 'none'
          if (res.data.data[i].content != "") {
            openDetail.display = 'block'
          }

          if (sessionStorage.getItem('pollingId') != this.scanId) {
            sessionStorage.setItem('pollingId', this.scanId)
            sessionStorage.setItem('pollingState', '')
          }

          if (sessionStorage.getItem('pollingState') == null || sessionStorage.getItem('pollingState') == "") {
            pollingState.push({id: res.data.data[i].id, state: ""})
            if (i == (res.data.data.length - 1)) {
              sessionStorage.setItem('pollingState', JSON.stringify(pollingState))
            }
          } else {
            var pollingState = JSON.parse(sessionStorage.getItem('pollingState'))
            if (pollingState[i].state != "") {
              this.pollingSum++;
              btnStyle.display = 'none'
              stateStyle.display = 'inline-block'
              currentState = pollingState[i].state
              if (currentState == "正常") {
                stateStyle.color = '#4caf50'
              } else {
                stateStyle.color = '#f44336'
              }
            }
            if (i == (res.data.data.length - 1) && this.pollingSum == res.data.data.length) {
              this.overHintShow(0);
            }
          }
          var d = {}
          d.name = res.data.data[i].name
          d.content = res.data.data[i].content
          d.openDetail = openDetail
          d.btnStyle = btnStyle
          d.stateStyle = stateStyle
          d.currentState = currentState
          d.spotId = res.data.data[i].spotId
          d.inspectionId = res.data.data[i].id
          d.workerId = res.data.data[i].workerId
          this.pollingList.push(d)
          this.buildingId = res.data.data[0].buildingId
          if (res.data.data[0].buildingName == "东院地下室") {
            this.buildingName = '巡检地点：' + res.data.data[0].buildingName + res.data.data[0].spotName;
          } else {
            this.buildingName = '巡检地点：' + res.data.data[0].spotName;
          }
        }
      }, err => {
        this.showToast('网络请求错误！', 2)
      })
    },
    methods: {
      messageShow: function (state, item, touch) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation()
        if (state == 0) {
          this.messageStyle.display = "block"
          this.currentItem = item
          this.currentIsNormal = touch
        } else {
          this.messageStyle.display = "none"
        }
      },
      overHintShow: function (state) {
        if (state == 0) {
          this.overStyle.display = "block"
        } else {
          this.overStyle.display = "none"
        }
      },
      showDetail: function (item) {
        /*if (item.openDetail.display == 'none') {
          item.openDetail.display = ''
        } else {
          item.openDetail.display = 'none'
        }*/
      },
      overSubmit:function () {
        this.$router.push({path: '/'})
      },
      resultSubmit: function () {
        this.messageStyle.display = "none"
        var params = new FormData()
        params.append('spotId', this.currentItem.spotId)
        params.append('inspectionId', this.currentItem.inspectionId)
        params.append('workerId', this.user_id)
        params.append('isNormal', this.currentIsNormal)
        this.post('resources/biz/inspectionRecord/save_record', params, res => {
            if (res.data.code === 0) {
              this.currentItem.btnStyle.display = 'none'
              this.currentItem.stateStyle.display = 'inline-block'
              this.currentItem.stateStyle.color = 'white'
              var pollingState = JSON.parse(sessionStorage.getItem('pollingState'))
              for (var i = 0; i < pollingState.length; i++) {
                if (pollingState[i].id == this.currentItem.inspectionId) {
                  if (!this.currentIsNormal) {
                    pollingState[i].state = '报修'
                    sessionStorage.setItem('pollingState', JSON.stringify(pollingState))
                    this.currentItem.currentState = '报修'
                    this.currentItem.stateStyle.color = '#f44336'
                    this.$router.push({
                      path: 'commit',
                      query: {'polling_id': res.data.data.id, 'building_Id': this.buildingId}
                    })
                  } else {
                    pollingState[i].state = '正常'
                    sessionStorage.setItem('pollingState', JSON.stringify(pollingState))
                    this.currentItem.currentState = '正常'
                    this.currentItem.stateStyle.color = '#4caf50'
                    this.showToast('提交成功！', 2)
                    this.pollingSum++;
                    if(this.pollingSum==this.pollingList.length){
                      this.overHintShow(0);
                    }
                  }
                }
              }
            }
          },
          err => {
          })
      }
    }
  }
</script>
