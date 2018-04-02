<style>
  .div-content .div-logo img {
    width: 160px !important;
    height: 160px !important;
  }

  .div-input {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }

  .div-input:nth-child(2) {
    border-top: 0 !important;
    border-bottom: 1px solid #ececec;
  }

  .div-input:last-child {
    margin-top: 20px !important;
  }

  .weui-cells {
    background-color: #F6F6F6 !important;
  }

  .mint-cell-text {
    vertical-align: initial !important;
  }

  .mint-field .mint-cell-title {
    width: 208px !important;
  }

  .mint-field .mint-cell-value {
    padding-left: 40px;
    border-left: 1px solid #ececec;
  }

  /* .mint-cell:last-child .mint-cell-value .mint-field-core {
     text-align: right;
   }*/

  .x-button {
    width: 90% !important;
    margin-left: 5% !important;
  }

  .goRegister {
    width: 90% !important;
    margin-left: 5% !important;
    color: white;
    border: none;
    border-radius: 0.311526rem;
    margin-top: 1.869159rem;
    margin-right: 0.934579rem;
    height: 2.741433rem;
    line-height: 2.741433rem;
    background-color: #009EDD;
    font-size: 1.121495rem;
    text-align: center;
    display: block;
  }
</style>
<template>
  <div class="div-content">
    <div class="div-logo">
      <img class="logo" src="../assets/logo.png">
    </div>
    <group>
      <mt-field label="我的姓名" placeholder="请输入" class="div-input" v-model="usernamemodel"/>
      <mt-field label="我的工号" placeholder="请输入" class="div-input" v-model="passwrodmodel"/>
      <!-- <selector title="类型" placeholder="请选择员工类型" v-model="demo01" :options="commonList" class="div-selector" /> -->
      <!-- <mt-field label="职位类型" placeholder="请选择 ＞" class="div-input" v-model="typeNames" @click.native="showPopup"
                 readonly=true />-->
    </group>
    <!-- <mt-popup v-model="popupVisible" style="width:100%;">
       <mt-checklist title="员工类型" :max="10" :options="commonList" v-model="types" class="div-selector"
                     align='right'></mt-checklist>
     </mt-popup>-->
    <!--<mt-button type="primary" class="x-button" v-on:click="signUp()">立即注册</mt-button>-->
    <a class="goRegister" style="cursor: pointer" v-on:click="signUp">立即注册</a>
  </div>
</template>

<script>
  document.title = '复旦大学附属中山医院'
  import Field from 'mint-ui'
  import {
    XInput,
    Group,
    Selector,
    XButton,
    cookie
  } from 'vux'

  export default {
    components: {
      XInput,
      Group,
      Selector,
      XButton
    },
    data () {
      return {
        popupVisible: false,
        usernamemodel: '',
        passwrodmodel: '',
        demo01: '',
        types: [],
        title: '我的姓名',
        placeholder: '请输入',
        commonList: [{
          label: '本院职工',
          value: 'HOSPITAL'
        }, {
          label: '巡俢职工',
          value: 'PATROL'
        }, {
          label: '派单员',
          value: 'ALLOT'
        }, {
          label: '部门负责人',
          value: 'RESPONSIBLE'
        }, {
          label: '维修员',
          value: 'FIX'
        }, {
          label: '送水员',
          value: 'WATER'
        }, {
          label: '运送员',
          value: 'DELIVER'
        }, {
          label: '清洁员',
          value: 'CLEANER'
        }, {
          label: '仓库管理员',
          value: 'KEEPER'
        }]
      }
    },
    created () {
      this.startProject('login')
    },
    computed: {
      typeNames: function () {
        var t = ''
        for (var i = 0; i < this.types.length; i++) {
          for (var j = 0; j < this.commonList.length; j++) {
            if (this.types[i] === this.commonList[j].value) {
              t = t + this.commonList[j].label + ','
              break
            }
          }
        }
        return t
      },
      typeValues: function () {
        var t = ''
        for (var i = 0; i < this.types.length; i++) {
          t = t + this.types[i] + ','
        }
        return t
      }
    },
    methods: {
      showPopup () {
        this.popupVisible = true
      },
      signUp () {
        /*if (this.usernamemodel == '' || this.passwrodmodel == '') {
          this.showToast('姓名或工号不能为空')
          return
        }*/

       /* var wxInfo = JSON.parse(localStorage.getItem('hqt_wx_info') || '{}')
        var params = new URLSearchParams()
        params.append('userId', '4842dcced35311e7b66200163e06e1b0')
        params.append('content', '2018-03-19;测试测试;' + this.usernamemodel + ';' + wxInfo.openid + sessionStorage.getItem('wx'))

        this.post('resources/biz/feedBack/save_feedBack',params, res => {
            if (res.data.code === 0) {
              this.showToast('测试反馈成功', 2)
            }
          },
          err => {
          })*/

        var wxInfo = JSON.parse(localStorage.getItem('hqt_wx_info') || '{}')
        var params = new FormData()
        params.append('name', this.usernamemodel)
        params.append('code', this.passwrodmodel)
        // params.append('role', this.typeValues)
        params.append('openId', wxInfo.openid)
        params.append('nickname', '')
        params.append('head', wxInfo.headimgurl)
        params.append('wx', sessionStorage.getItem('wx'))
        this.post('/resources/biz/worker/register', params, res => {
          if (res.data.code === 0) {
            localStorage.setItem('hqt_worker_info', JSON.stringify(res.data.data))
            this.$router.push({
              name: 'success'
            })
          }
        }, err => {
          this.showToast(err.response.data.message, 2)
        })
      }
    }
  }
</script>

<style>
  .div-content {
    width: 100%;
    margin: 0 0 0 0;
    background-color: #F6F6F6;
  }

  .div-logo {
    height: 280px;
    background-color: #F6F6F6;
    text-align: center;
  }

  .logo {
    width: 160px;
    height: 160px;
    margin-top: 60px;
  }

  .div-input {
    width: 100%;
    font-size: 34px;
    background-color: white;
    height: 78px;
  }

  .div-selector {
    font-size: 34px;
    width: 100%;
    background-color: white;
  }

  .div-button {
    margin-top: 60px;
    width: 100%;
    height: 88px;
    background-color: #009EDD;
    padding-bottom: 50px;
  }

  .x-button {
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 60px;
    margin-left: 30px;
    margin-right: 30px;
    height: 88px;
    width: 690px;
    background-color: #009EDD;
    font-size: 36px;
  }
</style>
