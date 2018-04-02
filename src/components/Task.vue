<style scoped>
  body {
    background-color: #fbf9fe !important;
  }

  .bottom_box {
    color: #888;
    padding: 100px 0;
    text-align: center;
  }

  .order_box {
    margin-top: 20px;
    padding: 0 20px;
    background-color: white;
    border-top: 1px solid rgba(236, 236, 236, 0.63);
    border-bottom: 1px solid rgba(236, 236, 236, 0.63)
  }

  .order_box .top {
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid rgba(236, 236, 236, 0.63);
    font-size: 32px;
  }

  .order_box .bar {
    text-align: left;
  }

  .order_box .bar .right {
    float: right;
  }

  .order_box .detail {
    padding: 15px 0;
  }

  .order_box .detail p {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    color: #5a5a5a;
  }

  .order_box .detail .bar span {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }

  .stateInput .label {
    margin-right: 30px;
  }

  /*.stateInput input[type="radio"] + label::before {
    content: "\a0"; !*不换行空格*!
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

  .stateInput input[type="radio"]:checked + label::before {
    background-color: #FFA135;
    background-clip: content-box;
  }
*/

  .stateInput input[type="radio"] + label {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    margin: 0 -4.5px;
    padding: 20px;
    font-size: 30px;
    color: #495060;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border: 1px solid #dddee1;
    border-right: 0;
  }

  .stateInput input:first-child[type="radio"] + label {
    border-radius: 10px 0 0 10px;
    border-left: 1px solid #dddee1;
  }

  .stateInput input[type="radio"] + label:last-child {
    border-radius: 0 10px 10px 0;
    border-right: 1px solid #dddee1;
  }

  .stateInput input[type="radio"]:checked + label {
    border: 1px solid #57a3f3;
    color: #57a3f3;
    box-shadow: -1px 0 0 0 #2d8cf0;
  }

  .stateInput input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>
<template>
  <div class="content">
    <div class="stateInput" style="margin: 15px;text-align: center">
      <input type="radio" id="state1" name="state" v-on:click="getOrderList('未完成')"/>
      <label for="state1">未完成</label>
      <input type="radio" id="state2" name="state" v-on:click="getOrderList('待评价')"/>
      <label for="state2">待评价</label>
      <input type="radio" id="state3" name="state" v-on:click="getOrderList('已完成')"/>
      <label for="state3">已完成</label>
      <input type="radio" id="state4" name="state" v-on:click="getOrderList('')"/>
      <label for="state4">全部</label>
    </div>
    <div class="order_list">
      <div class="order_box" v-for="item in orderList" v-on:click="onItemClick(item.type,item.id)">
        <div class="bar top">
          <span>{{ item.orderType }}</span>
          <span class="right" v-bind:style="item.stateStyle">
            {{ item.state }}
            <img src="../assets/arraws_right.png" width="8" height="12.5"/>
          </span>
        </div>
        <div class="detail">
          <p class="bar" style="display: block;overflow: auto;height: 100%;">
            <span style="float: left;margin-right: 20px;">
              单号：<span style="color: rgb(255, 130, 37);display: inline;">
                {{item.orderNumber.substr(0,1)}}{{item.orderNumber.substr(item.orderNumber.length-4,item.orderNumber.length)}}</span>
              </span>
          </p>
          <p class="bar" style="display: block;overflow: auto;height: 100%;">
            <span style="float: left;margin-right: 20px;">创建人：{{item.authorName}}({{item.authorCode}})</span>
            <span style="float: right" v-bind:style="item.isLeaderEmShow">是否领导：
              <span style="display: inline;" v-bind:style="item.isLeaderColor">{{item.isLeader}}</span></span>
          </p>
          <p class="bar" style="display: block;overflow: auto;height: 100%;">
            <span style="float: left;margin-right: 20px;">部门：{{item.department}}</span>
            <span>区域：{{item.location}}</span>
          </p>
          <p>创建时间：{{item.createdDate}}</p>
        </div>
      </div>
    </div>
    <div class="bottom_box" v-bind:style="getData">上拉加载更多</div>
    <div class="bottom_box" v-bind:style="noData">没有更多数据了</div>
  </div>
</template>

<script>
  document.title = '任务列表'
  export default {
    data () {
      return {
        stateChoice: '未完成',
        user_id: '',
        orderList: [],
        formItem: {
          name: ''
        },
        getData: {
          display: 'none'
        },
        noData: {
          display: 'none'
        },
        page: 1,
        pageSize: 5,
        showDate: 0,
        overDate: false,
        pageHeight: 0,
        task_id: '',
        browseHistory: false
      }
    },
    created () {
      if (this.$route.query.task_id) {
        this.task_id = this.$route.query.task_id
      }
      if (sessionStorage.getItem('stateChoice')) {
        if (sessionStorage.getItem('stateChoice') == '全部') {
          this.stateChoice = ''
        } else {
          this.stateChoice = sessionStorage.getItem('stateChoice')
        }
      }
      // console.log(sessionStorage.getItem('page'))
      // console.log(sessionStorage.getItem('showDate'))
      // console.log(sessionStorage.getItem('pageHeight'))
      if (sessionStorage.getItem('pageHeight')) {
        this.browseHistory = true
        this.showDate = parseInt(sessionStorage.getItem('showDate'))
        if (sessionStorage.getItem('showDate') > 0) {
          this.pageSize = parseInt(sessionStorage.getItem('showDate'))
        }
      }
      this.getOrderList()
      window.addEventListener('scroll', this.handleScroll)
    },
    mounted () {
      window.onbeforeunload = this.checkLeave
      if (sessionStorage.getItem('stateChoice')) {
        switch (sessionStorage.getItem('stateChoice')) {
          case '未完成':
            document.getElementById('state1').checked = true
            break
          case '待评价':
            document.getElementById('state2').checked = true
            break
          case '已完成':
            document.getElementById('state3').checked = true
            break
          case '全部':
            document.getElementById('state4').checked = true
            break
        }
      } else {
        document.getElementById('state1').checked = true
      }
    },
    methods: {
      handleScroll: function () {
        if ((!this.overDate) && (document.body.clientHeight <= window.screen.availHeight + window.scrollY) && (document.body.clientHeight > this.pageHeight)) {
          this.pageHeight = document.body.clientHeight
          this.page++
          this.getOrderList()
        }
      },
      checkLeave: function () {
        sessionStorage.setItem('page', this.page)
        sessionStorage.setItem('showDate', this.showDate)
        sessionStorage.setItem('pageHeight', window.scrollY)
      },
      onItemClick: function (type, id) {
        this.checkLeave()
        var path = ''
        switch (type) {
          case 'REPAIR':
            path = 'repairsInfo'
            break
          case 'WATER':
            path = 'waterordercommit'
            break
          case 'DELIVER':
            path = 'deliver'
            break
          case 'CLEANER':
            path = 'waterordercommit'
            break
        }
        this.$router.push({path: path, query: {'type': type, 'order_id': id}})
      },
      getOrderList: function (state) {
        if (state != undefined || state == '') {
          this.stateChoice = state
          this.orderList = []
          this.showDate = 0
          this.page = 1
          this.overDate = 0
          this.pageHeight = 0
          this.getData.display = 'none'
          this.noData.display = 'block'
          if (state == '') {
            sessionStorage.setItem('stateChoice', '全部')
          } else {
            sessionStorage.setItem('stateChoice', state)
          }
        }
        this.user_id = this.getUserInfo().id
        // this.user_id = '2eab852efcc311e79abe00163e06e1b0'
        var params = new FormData()
        params.append('page', this.page)
        params.append('pageSize', this.pageSize)
        params.append('workerId', this.user_id)
        params.append('type', this.task_id)
        params.append('state', this.stateChoice)
        this.post('resources/biz/repairOrder/order_list', params, res => {
          console.log(res)
          if (!this.browseHistory) {
            this.showDate += res.data.data.length
          }
          console.log(this.showDate, res.data.count)
          if (this.showDate >= res.data.count) {
            this.overDate = true
            this.getData.display = 'none'
            this.noData.display = 'block'
          } else {
            this.overDate = false
            this.getData.display = 'block'
            this.noData.display = 'none'
          }
          for (var i = 0; i < res.data.data.length; i++) {
            var orderType = ''
            switch (res.data.data[i].orderType) {
              case 'REPAIR':
                orderType = '报修单'
                break
              case 'WATER':
                orderType = '送水单'
                break
              case 'DELIVER':
                orderType = '运送单'
                break
              case 'CLEANER':
                orderType = '保洁单'
                break
            }
            var stateStyle = {}
            switch (res.data.data[i].state) {
              case '已创建':
                stateStyle.color = '#F5A623'
                break
              case '已分配':
                stateStyle.color = '#009EDD'
                break
              case '维修员退回' :
                stateStyle.color = '#F5A623'
                break
              case '维修小组长退回' :
                stateStyle.color = '#F5A623'
                break
              case '已分配给维修小组长':
                stateStyle.color = '#009EDD'
                break
              case '已分配给维修员':
                stateStyle.color = '#009EDD'
                break
              case '已退回':
                stateStyle.color = '#09BB07'
                break
              case '已完成':
                stateStyle.color = '#09BB07'
                break
              case '待评价':
                stateStyle.color = '#FF8225'
                break
              default:
                stateStyle.color = '#5a5a5a'
            }
            var leaderColor = {}
            leaderColor.color = '#5a5a5a'
            var leaderEmShow = {}
            leaderEmShow.display = 'none'
            var d = {}
            d.id = res.data.data[i].id
            d.type = res.data.data[i].orderType
            d.orderNumber = res.data.data[i].orderNumber
            d.orderType = orderType
            d.state = res.data.data[i].state
            d.createdDate = res.data.data[i].createdDate
            if (res.data.data[i].orderType == 'DELIVER') {
              d.location = res.data.data[i].takeGoods
            } else {
              d.location = res.data.data[i].location
            }

            d.authorName = res.data.data[i].authorName
            d.authorCode = res.data.data[i].authorCode
            if (res.data.data[i].isLeader) {
              d.isLeader = '是'
              leaderColor.color = '#e64340'
            } else {
              d.isLeader = '否'
            }
            if (sessionStorage.getItem('wx') == 'd') {
              leaderEmShow.display = 'none'
            }else{
              if (this.user_id != res.data.data[i].author) {
                leaderEmShow.display = 'block'
              }
            }
            d.isLeaderColor = leaderColor
            d.isLeaderEmShow = leaderEmShow
            d.department = res.data.data[i].department
            d.stateStyle = stateStyle
            this.orderList.push(d)
            if (this.browseHistory) {
              this.pageSize = 5
              this.page = parseInt(sessionStorage.getItem('page'))
              this.browseHistory = false
              setTimeout(function () {
                document.body.scrollTop = sessionStorage.getItem('pageHeight')
              }, 50)
            }
          }
        }, err => {
        })
      }
    }
  }
</script>
