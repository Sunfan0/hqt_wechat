import { Toast, Indicator } from 'mint-ui'
import Vue from 'vue'

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
Vue.prototype.http.post = (url, params, isSuccess, isFail) => {
	console.log('开始网络请求')
	console.log('请求类型 : post')
	console.log('url : ' + Vue.http.baseURL + url)
	console.log('params : ' + params)
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
			Vue.prototype.showToast('网络请求出错，稍后请重试。错误原因 : ' + err.response.data.message)
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
Vue.prototype.http.get = (url, params, isSuccess, isFail) => {
	console.log('开始网络请求')
	console.log('请求类型 : get')
	console.log('url : ' + Vue.http.baseURL + url)
	console.log('params : ' + params)
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
			Vue.prototype.showToast('网络请求出错，稍后请重试。错误原因 : ' + err.response.data.message)
			isFail(err)
		})
}

Vue.prototype.wechat.init = (res, isSuccess, isFail) => {
	Vue.wechat.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: res.data.data.appId, // 必填，公众号的唯一标识
		timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
		nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
		signature: res.data.data.signature, // 必填，签名，见附录1
		jsApiList: [
			"startRecord",
			"stopRecord",
			"onVoiceRecordEnd",
			"playVoice",
			"stopVoice",
			"onVoicePlayEnd",
			"uploadVoice",
			"chooseImage",
			"previewImage",
			"uploadImage"
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
	Vue.wechat.ready(() => {
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		console.log("微信初始化成功")
		isSuccess()
	})
	Vue.wechat.error(err => {
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		console.log("微信sdk初始化错误，错误原因：")
		console.log(err)
		isFail(err)
	})

}