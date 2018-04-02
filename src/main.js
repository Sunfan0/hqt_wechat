// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Index'
// import Home from './components/login'
import 'mint-ui/lib/style.css'

import { AjaxPlugin, AlertPlugin, WechatPlugin, LoadingPlugin, cookie } from 'vux'

Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
// Vue.http.defaults.baseURL = 'http://h.xasqkj.com/hqt/'
// Vue.http.defaults.baseURL = 'http://192.168.1.110:888/rdp/'
Vue.http.defaults.baseURL = 'http://203j98021s.imwork.net:17285/rdp/'
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;'
Vue.http.defaults.headers.common['Authorization'] = 'Basic cm9vdDpyb290'

import { Toast, Indicator, Cell, Field, Button, Checklist, Popup } from 'mint-ui'

Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Checklist.name, Checklist)
Vue.component(Popup.name, Popup)
/**
 * 配置全局toast方法
 * @param {String} text toast文字
 * @param {Int} time 显示时间
 */
Vue.prototype.showToast = (text, time) => {
  Toast({
    message: text,
    position: 'bottom',
    duration: !time ? 2000 : time * 1000
  })
}

/**
 * 显示等待框
 * @param {String} text 等待框文字
 */
Vue.prototype.showLoading = (text) => {
  Indicator.open({
    text: text,
    spinnerType: 'fading-circle'
  })
}

/**
 * 关闭等待框
 */
Vue.prototype.closeLoading = () => {
  Indicator.close()
}
/**
 * http请求
 * @param {String} url 请求地址
 * @param {URLSearchParams} params 请求参数
 * @param {Function} isSuccess 成功回调，带res
 * @param {Function} isFail 失败回掉，带error
 */
Vue.prototype.post = (url, params, isSuccess, isFail) => {
  console.log('开始网络请求')
  console.log('请求类型 : post')
  console.log('url : ' + Vue.http.defaults.baseURL + url)
  // console.log('params : ' + params)
  console.log('params : ' + JSON.stringify(params))
  Vue.prototype.showLoading('数据请求中')
  Vue.http.post(url, params)
    .then((res) => {
      Vue.prototype.closeLoading()
      console.log('网络请求成功,res:')
      console.log(res)
      isSuccess(res)
    }, (err) => {
      Vue.prototype.closeLoading()
      console.error('网络请求出错。错误原因：')
      console.error('code = ' + err.code + '。message = ' + err.response.data.message)
      console.log(err.response.data.message)
      // Vue.prototype.showToast('网络请求出错，稍后请重试。错误原因 : ' + err.response.data.message)
      isFail(err)
    })
}
/**
 * http请求
 * @param {String} url 请求地址
 * @param {JSON} params 请求参数
 * @param {Function} isSuccess 成功回调，带res
 * @param {Function} isFail 失败回掉，带error
 */
Vue.prototype.get = (url, params, isSuccess, isFail) => {
  console.log('开始网络请求')
  console.log('请求类型 : get')
  console.log('url : ' + Vue.http.defaults.baseURL + url)
  console.log('params : ' + JSON.stringify(params))
  Vue.prototype.showLoading('数据请求中')
  Vue.http.get(url, {
    params: params
  })
    .then((res) => {
      Vue.prototype.closeLoading()
      console.log('网络请求成功,res:')
      console.log(res)
      isSuccess(res)
    }, (err) => {
      Vue.prototype.closeLoading()
      console.error('网络请求出错。错误原因：')
      console.error('code = ' + err.code + '。message = ' + err.response.data.message)
      console.log(err.response.data.message)
      // Vue.prototype.showToast('网络请求出错，稍后请重试。错误原因 : ' + err.response.data.message)
      isFail(err)
    })
}

function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

Vue.prototype.wechatVerification = (isSuccess) => {
  let code = getUrlKey('code')
  let arr = document.URL.split('#')
  let url = arr[0]
  let state = arr.length > 1 ? arr[1] : '/'
  state = state.substr(1)
  if (code === null) {
    let appId = 'wx8f55548adcb28638'
    if (sessionStorage.getItem('wx') == 'd') {
      appId = 'wxb20a5071bd6f4dad'
    }
    location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
  } else {
    state = getUrlKey('state')
    isSuccess(code, state)
  }
}

Vue.prototype.init = (res, isSuccess, isFail) => {
  console.log('微信初始化参数：')
  console.log(JSON.stringify(res))
  Vue.wechat.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.data.appId, // 必填，公众号的唯一标识
    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    signature: res.data.data.signature, // 必填，签名，见附录1
    jsApiList: [
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'getLocalImgData'
    ]
  })
  Vue.wechat.ready(() => {
    console.log('微信初始化成功')
    isSuccess()
  })
  Vue.wechat.error(err => {
    console.log('微信sdk初始化错误，错误原因：')
    console.log(err)
    isFail(err)
  })

}
/*
Vue.prototype.getUserInfo = (page) => {
  let user = JSON.parse(localStorage.getItem('hqt_worker_info') || '{}')
  if (user.id == null) {
    if (localStorage.getItem(sessionStorage.getItem('wx') + 'hqt_open_id') != null) {
      Vue.prototype.get('/resources/biz/worker/validate', {
        openId: localStorage.getItem(sessionStorage.getItem('wx') + 'hqt_open_id')
      }, (res) => {
        if (res.data.code === 0) {
          localStorage.setItem('hqt_worker_info', JSON.stringify(res.data.data))
          router.push({
            name: 'index'
          })
        } else {
          router.push({
            name: 'login'
          })
        }
      }, (err) => {
      })
    } else {
      Vue.prototype.wechatVerification((code, state) => {
        Vue.prototype.get('resources/biz/wx/detail', {
          code: code,
          wx: sessionStorage.getItem('wx')
        }, (res) => {
          if (res.data.code === 0) {
            localStorage.setItem('hqt_wx_info', JSON.stringify(res.data.data))
            localStorage.setItem(sessionStorage.getItem('wx') + 'hqt_open_id', res.data.data.openid)
            Vue.prototype.get('/resources/biz/worker/validate', {
              openId: res.data.data.openid
            }, (res) => {
              if (res.data.code === 0) {
                localStorage.setItem('hqt_worker_info', JSON.stringify(res.data.data))
                if (null == state || state == '') {
                  state = 'index'
                }
                router.push({
                  name: state
                })
              } else {
                router.push({
                  name: 'login'
                })
              }
            }, (err) => {
            })
          }
        }, (error) => {
          console.log(error)
        })
      })
    }
  } else {
    if (page === 'login') {
      router.push({
        name: 'index'
      })
    } else {
      return user
    }
  }
}

if (null == sessionStorage.getItem('wx')) {
  let wx = getUrlKey('wx') || 'f'
  sessionStorage.setItem('wx', wx)
}

Vue.prototype.getUserInfo()
*/
const routes = [
  {
    // path: '/',
    path: '/index',
    name: 'index',
    component: Home
  },
  {
    // path: '/login',
    path: '/',
    name: 'login',
    component: function (resolve) {
      require(['./components/Login'], resolve)
    }
  }, {
    name: 'commit',
    path: '/commit',
    component: function (resolve) {
      require(['./components/Commit'], resolve)
    }
  },
  {
    name: 'success',
    path: '/success',
    component: function (resolve) {
      require(['./components/Success'], resolve)
    }
  },
  {
    name: 'waterordercommit',
    path: '/waterordercommit',
    component: function (resolve) {
      require(['./components/WaterOrderCommit'], resolve)
    }
  },
  {
    name: 'main',
    path: '/main',
    component: function (resolve) {
      require(['./components/Main'], resolve)
    }
  },
  {
    name: 'scan',
    path: '/scan',
    component: function (resolve) {
      require(['./components/Scan'], resolve)
    }
  },
  {
    name: 'task',
    path: '/task',
    component: function (resolve) {
      require(['./components/Task'], resolve)
    }
  },
  {
    name: 'deliver',
    path: '/deliver',
    component: function (resolve) {
      require(['./components/Deliver'], resolve)
    }
  },
  {
    name: 'polling',
    path: '/polling',
    component: function (resolve) {
      require(['./components/Polling'], resolve)
    }
  },
  {
    name: 'repairsInfo',
    path: '/repairsInfo',
    component: function (resolve) {
      require(['./components/RepairsInfo'], resolve)
    }
  },
  {
    name: 'mine',
    path: '/mine',
    component: function (resolve) {
      require(['./components/Mine'], resolve)
    }
  },
  {
    name: 'restaurant',
    path: '/restaurant',
    component: function (resolve) {
      require(['./components/Restaurant'], resolve)
    }
  },
  {
    name: 'wholelist',
    path: '/wholelist',
    component: function (resolve) {
      require(['./components/Wholelist'], resolve)
    }
  },
  {
    name: 'datalist',
    path: '/datalist',
    component: function (resolve) {
      require(['./components/Datalist'], resolve)
    }
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')


