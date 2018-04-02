<template>
  <div class="content">
    <div class="titlebg">
      <p class="title">{{dataTitle}}</p>
      <div v-bind:style="dateShow">
        <input class="dateInput" type="date" v-model="startDate" style="margin-left: 10px"/> -
        <input class="dateInput" type="date" v-model="endDate"/>
        <a  class="searchBtn" v-on:click="updateList(0)">搜索</a>
      </div>
    </div>
    <div class="dataList">
      <table>
        <thead>
        <tr>
          <th v-for="item in orderTitle">{{item.label}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in orderList" v-bind:style="item.orderBgStyle" v-on:click="onItemClick(item.orderType,item.id,item.list)">
          <td v-bind:style="orderColStyle1">{{item.orderCol1}}</td>
          <td v-bind:style="orderColStyle2">{{item.orderCol2}}</td>
          <td v-bind:style="orderColStyle3">{{item.orderCol3}}</td>
          <td v-bind:style="orderColStyle4">{{item.orderCol4}}</td>
          <td v-bind:style="orderColStyle5">{{item.orderCol5}}</td>
          <td v-bind:style="orderColStyle6">{{item.orderCol6}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom_box" v-bind:style="getData">上拉加载更多</div>
    <div class="bottom_box" v-bind:style="noData">没有更多数据了</div>
    <div class="pop_bg" v-bind:style="feedBackStyle" v-on:click="ClosePage"></div>
    <div class="evaluate_detail" v-bind:style="feedBackStyle" style="top: 140px;">
      <p class="title">反馈内容详情：</p>
      <p class="content">{{feedBackText}}</p>
    </div>
    <div class="pop_bg" v-bind:style="pollingStyle" v-on:click="ClosePage"></div>
    <div class="evaluate_detail" v-bind:style="pollingStyle" style="top: 140px;">
      <p class="title" style="font-size: 0.9em">{{pollingText}}</p>
      <div class="dataList" style="margin-top:0 !important;max-height: 350px;overflow: scroll;">
        <table>
          <thead>
          <tr>
            <th>项目名称</th>
            <th>详情</th>
            <th>是否正常</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pollingList" v-bind:style="item.fontColorStyle">
            <td>{{item.name}}</td>
            <td>{{item.content}}</td>
            <td>{{item.normal}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  document.title = '实时数据'

  export default {
    data () {
      return {
        pollingList: [],
        orderTitle: [],
        orderList: [],
        orderColStyle1: {
          display: ''
        },
        orderColStyle2: {
          display: ''
        },
        orderColStyle3: {
          display: ''
        },
        orderColStyle4: {
          display: 'none'
        },
        orderColStyle5: {
          display: 'none'
        },
        orderColStyle6: {
          display: 'none'
        },
        getData: {
          display: 'none'
        },
        noData: {
          display: 'none'
        },
        feedBackStyle: {
          display: 'none'
        },
        pollingStyle: {
          display: 'none'
        },
        dateShow: {
          display: 'none'
        },
        dataTitle: '',
        page: 1,
        limit: 30,
        showDate: 0,
        overDate: false,
        pageHeight: 0,
        showId: this.$route.query.showId,
        feedBackText: '',
        pollingText: '',
        startDate: '',
        endDate: ''
      }
    },
    created () {
      document.body.style.backgroundColor = 'white'
      window.addEventListener('scroll', this.handleScroll)
      this.setTime()
    },
    methods: {
      setTime: function () {
        var date = new Date()
        var month1 = date.getMonth()
        var month2 = date.getMonth() + 1
        if (month1 < 10) {
          month1 = '0' + month1
        }
        if (month2 < 10) {
          month2 = '0' + month2
        }
        var formatDate1 = date.getFullYear() + '-' + month1 + '-' + date.getDate()
        var formatDate2 = date.getFullYear() + '-' + month2 + '-' + date.getDate()
        this.startDate = formatDate1
        this.endDate = formatDate2
        this.updateList()
      },
      ClosePage: function () {
        this.feedBackStyle.display = 'none'
        this.pollingStyle.display = 'none'
      },
      onItemClick: function (type, id, list) {
        switch (type) {
          case 'REPAIR':
            this.$router.push({path: 'repairsInfo', query: {'type': type, 'order_id': id}})
            break
          case 'WATER':
            this.$router.push({path: 'waterordercommit', query: {'type': type, 'order_id': id}})
            break
          case 'DELIVER':
            this.$router.push({path: 'deliver', query: {'type': type, 'order_id': id}})
            break
          case 'CLEANER':
            this.$router.push({path: 'waterordercommit', query: {'type': type, 'order_id': id}})
            break
          case 'polling':
            this.pollingText = id
            this.pollingList = list
            this.pollingStyle.display = 'block'
            break
          case 'feedback':
            this.feedBackText = id
            this.feedBackStyle.display = 'block'
            break
        }
      },
      handleScroll: function () {
        if ((!this.overDate) && (document.body.clientHeight <= window.screen.availHeight + window.scrollY) && (document.body.clientHeight > this.pageHeight)) {
          this.pageHeight = document.body.clientHeight
          this.page++
          this.updateList()
        }
      },
      dataTitleLabel: function (type) {
        var titleList = []
        switch (type) {
          case 'order':
            titleList.push({label: '单号'})
            titleList.push({label: '发起者'})
            titleList.push({label: '状态'})
            this.orderTitle = titleList
            break
          case 'polling':
            this.orderColStyle4.display = ''
            titleList.push({label: '巡检时间'})
            titleList.push({label: '巡检地点'})
            titleList.push({label: '巡检人'})
            titleList.push({label: '状态'})
            this.orderTitle = titleList
            break
          case 'repair':
            this.orderColStyle1.display = 'table-cell'
            this.orderColStyle1.width = '20px'
            this.orderColStyle4.display = ''
            this.orderColStyle5.display = ''
            this.orderColStyle6.display = ''
            titleList.push({label: ''})
            titleList.push({label: '报修总数'})
            titleList.push({label: '完成数量'})
            titleList.push({label: '主动报修数'})
            titleList.push({label: '完成率'})
            titleList.push({label: '主动报修率'})
            this.orderTitle = titleList
            break
          case 'feedBack':
            this.orderColStyle2.display = 'table-cell'
            this.orderColStyle2.width = '40px'
            this.orderColStyle3.display = 'table-cell'
            this.orderColStyle3.width = '80px'
            titleList.push({label: '反馈内容'})
            titleList.push({label: '反馈人'})
            titleList.push({label: '时间'})
            this.orderTitle = titleList
            break
        }
      },
      updateList: function (state) {
        console.error('-----',this.startDate)
        console.error('-----',this.endDate)
        if (state == 0) {
          this.page = 1
          this.orderList = []
        }
        var url = ''
        var params = new FormData()
        params.append('page', this.page)
        switch (this.showId) {
          case '1':
            this.dateShow.display = 'block'
            this.dataTitleLabel('order')
            this.dataTitle = '报修工单列表'
            params.append('limit', this.limit)
            params.append('orderType', 'REPAIR')
            params.append('start', this.startDate)
            params.append('end', this.endDate)
            url = 'resources/biz/repairOrder/web_order_list'
            break
          case '2':
            this.dateShow.display = 'block'
            this.dataTitleLabel('order')
            this.dataTitle = '送水工单列表'
            params.append('limit', this.limit)
            params.append('orderType', 'WATER')
            params.append('start', this.startDate)
            params.append('end', this.endDate)
            url = 'resources/biz/repairOrder/web_order_list'
            break
          case '3':
            this.dateShow.display = 'block'
            this.dataTitleLabel('order')
            this.dataTitle = '保洁工单列表'
            params.append('limit', this.limit)
            params.append('orderType', 'CLEANER')
            params.append('start', this.startDate)
            params.append('end', this.endDate)
            url = 'resources/biz/repairOrder/web_order_list'
            break
          case '4':
            this.dateShow.display = 'block'
            this.dataTitleLabel('order')
            this.dataTitle = '运送工单列表'
            params.append('limit', this.limit)
            params.append('orderType', 'DELIVER')
            params.append('start', this.startDate)
            params.append('end', this.endDate)
            url = 'resources/biz/repairOrder/web_order_list'
            break
          case '5':
            this.dataTitleLabel('polling')
            this.dataTitle = '巡检记录'
            params.append('pageSize', this.limit)
            url = 'resources/biz/inspectionRecord/task_list'
            break
          case '6':
            this.dataTitleLabel('repair')
            this.dataTitle = '报修工单统计'
            params.append('limit', this.limit)
            url = 'resources/biz/repairOrder/repair_order_count'
            break
          case '7':
            this.dataTitleLabel('feedBack')
            this.dataTitle = '意见反馈列表'
            params.append('limit', this.limit)
            url = 'resources/biz/feedBack/web_list'
            break
        }
        this.post(url, params, res => {
          this.showDate += res.data.data.length
          if (this.showDate == res.data.count) {
            this.overDate = true
            this.getData.display = 'none'
            this.noData.display = 'block'
          } else {
            this.overDate = false
            this.getData.display = 'block'
            this.noData.display = 'none'
          }
          let array = res.data.data
          console.log(array)
          if (this.showId == '1' || this.showId == '2' || this.showId == '3' || this.showId == '4') {
            for (var i = 0; i < array.length; i++) {
              var orderNumber = ''
              var str = array[i].orderNumber
              orderNumber = str.substr(0, 1) + str.substr(str.length - 4, str.length)
              var orderBgStyle = {}
              if (array[i].state == '已创建' || array[i].state == '维修员退回') {
                orderBgStyle.backgroundColor = '#009edc'
                orderBgStyle.color = 'white'
              }
              var b = {}
              b.orderType = array[i].orderType
              b.id = array[i].id
              b.orderBgStyle = orderBgStyle
              b.orderCol1 = orderNumber
              b.orderCol2 = array[i].authorName
              b.orderCol3 = array[i].state
              this.orderList.push(b)
            }
          }
          if (this.showId == '5') {
            for (var i = 0; i < array.length; i++) {
              var sumNormal = ''
              var orderBgStyle = {}
              if (array[i].normal.indexOf('0') > -1) {
                sumNormal = '报修'
                orderBgStyle.backgroundColor = '#9E9E9E'
                orderBgStyle.color = 'white'
              } else {
                sumNormal = '正常'
              }

              var project = []
              if (array[i].inspectionId != undefined && array[i].inspectionId != '') {
                var inspectionId = array[i].inspectionId.split('@')
                var content = array[i].content.split('@')
                var normal = array[i].normal.split('@')
                var orderId = array[i].orderId.split('@')
                for (var p = 0; p < inspectionId.length; p++) {
                  if (inspectionId[p] != '') {
                    var isnormal = '否'
                    var fontColor = {}
                    var showStyle = {}
                    fontColor.color = 'rgb(255, 152, 0) !important'
                    showStyle.display = 'block'
                    if (normal[p] == 1) {
                      isnormal = '是'
                      fontColor.color = '#111 !important'
                    }
                    if (orderId[p] == 0) {
                      showStyle.display = 'none'
                    }
                    project.push({
                      fontColorStyle: fontColor,
                      showStyle: showStyle,
                      name: inspectionId[p],
                      content: content[p],
                      normal: isnormal,
                      orderId: orderId[p],
                    })
                  }
                }
              }

              var b = {}
              b.orderType = 'polling'
              b.id = array[i].location
              b.list = project
              b.orderBgStyle = orderBgStyle
              b.orderCol1 = array[i].createdDate
              b.orderCol2 = array[i].location
              b.orderCol3 = array[i].name
              b.orderCol4 = sumNormal
              this.orderList.push(b)
            }
          }
          if (this.showId == '6') {
            this.overDate = true
            this.getData.display = 'none'
            this.noData.display = 'none'
            var orderBgStyle = {}
            // orderBgStyle.backgroundColor = 'rgb(255, 153, 0)'
            // orderBgStyle.color = 'white'
            var b = {}
            b.orderBgStyle = orderBgStyle
            b.orderCol1 = '日统计'
            b.orderCol2 = res.data.data.allNum
            b.orderCol3 = res.data.data.finishNum
            b.orderCol4 = res.data.data.activeNum
            b.orderCol5 = ((res.data.data.finishNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
            b.orderCol6 = ((res.data.data.activeNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
            this.orderList.push(b)
            var params = new FormData()
            params.append('type', 'month')
            this.post(url, params, res => {
              console.log(res.data.data)
              var orderBgStyle = {}
              // orderBgStyle.backgroundColor = 'rgb(255, 153, 0)'
              // orderBgStyle.color = 'white'
              var b = {}
              b.orderBgStyle = orderBgStyle
              b.orderCol1 = '月度统计'
              b.orderCol2 = res.data.data.allNum
              b.orderCol3 = res.data.data.finishNum
              b.orderCol4 = res.data.data.activeNum
              b.orderCol5 = ((res.data.data.finishNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
              b.orderCol6 = ((res.data.data.activeNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
              this.orderList.push(b)
              var params = new FormData()
              params.append('type', 'year')
              this.post(url, params, res => {
                console.log(res.data.data)
                var orderBgStyle = {}
                // orderBgStyle.backgroundColor = 'rgb(255, 153, 0)'
                // orderBgStyle.color = 'white'
                var b = {}
                b.orderBgStyle = orderBgStyle
                b.orderCol1 = '年度统计'
                b.orderCol2 = res.data.data.allNum
                b.orderCol3 = res.data.data.finishNum
                b.orderCol4 = res.data.data.activeNum
                b.orderCol5 = ((res.data.data.finishNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
                b.orderCol6 = ((res.data.data.activeNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0)
                this.orderList.push(b)
              }, err => {
              }, false)
            }, err => {
            }, false)
          }
          if (this.showId == '7') {
            for (var i = 0; i < array.length; i++) {
              var content = ''
              if (array[i].content.length >= 30) {
                content = array[i].content.substr(0, 30) + '...'
              } else {
                content = array[i].content.substr(0, 30)
              }
              var b = {}
              b.orderType = 'feedback'
              b.id = content
              b.orderBgStyle = orderBgStyle
              b.content = array[i].content
              b.orderCol1 = content
              b.orderCol2 = ''
              if (array[i].name != undefined) {
                b.orderCol2 = array[i].name + '(' + array[i].code + ')'
              }
              b.orderCol3 = array[i].feedbackDate
              this.orderList.push(b)
            }
          }

        }, err => {
        })
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: white !important;
  }

  .content {
    overflow: hidden;
  }

  .bottom_box {
    color: #888;
    padding: 100px 0;
    text-align: center;
  }

  .titlebg {
    width: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
  }

  .titlebg .title {
    border-left: 5px solid #009edc;
    line-height: 50px;
    margin: 20px 0 20px 10px;
    padding-left: 20px;
    font-size: 1em;
  }

  .dataList {
    margin-top: 90px;
  }

  .dataList table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #E1E6EB;
    border-left: none;
  }

  .dataList table thead th {
    line-height: 50px;
    padding: 8px 12px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    white-space: nowrap;
    text-align: center;
    font-weight: normal !important;
    letter-spacing: 1px;
    font-size: 0.8em;
  }

  .dataList table tbody td {
    text-align: center;
    line-height: 50px;
    padding: 8px 10px;
    font-size: 0.6em;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    font-size: 0.8em;
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
    padding: 30px;
  }

  .evaluate_detail .title {
    font-size: 1em;
    margin-bottom: 20px;
  }

  .evaluate_detail .content {
    font-size: 0.8em;
    padding-left: 10px;
    max-height: 350px;
    overflow-y: scroll;
  }

  .dateInput {
    z-index: 900;
    margin-bottom: 20px;
    outline: 0;
    vertical-align: -webkit-baseline-middle;
  }

  .searchBtn {
    padding: 3px 20px;
    font-size: 0.9em;
    border-radius: 5px;
    color: #26a2ff;
    border: 1px solid #26a2ff;
    margin-left: 20px;
    vertical-align: middle;
  }
</style>
