import request from '../utils/request.js'

//用户登陆
export function apiLogin(data) {
	return request.request({
		url: '/user/login/login',
		method: 'POST',
		data
	})
}

//用户注册
export function apiRegister(data) {
	return request.request({
		url: '/user/login/createAccount',
		method: 'POST',
		data
	})
}

//获取验证码
export function apiGetCode(data) {
	return request.request({
		url: '/user/login/getSecCode',
		method: 'POST',
		data
	})
}

//找回密码
export function apiResetPassword(data) {
	return request.request({
		url: '/user/login/restPassword',
		method: 'POST',
		data
	})
}

//轮播图接口
export function apiGetBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data
	})
}