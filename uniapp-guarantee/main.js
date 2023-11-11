import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import TabbarView from './pages/tabbar/TabbarView'
import vueSvgIcons from "@/components/vue-svg-icons"
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
	}
})

Vue.component('tabbar-view', TabbarView)
Vue.component('Icons', vueSvgIcons)
import "@/components/vue-svg-icons/register.js"
import tool from '@/utils/tools.js';
uni.$tool = tool;

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif