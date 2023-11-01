import request from '../utils/request.js'

//轮播图接口
export function apiGetBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data
	})
}