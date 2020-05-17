import Vue from 'vue'
import App from './App'
import store from 'store'
import request from './common/api/request.js'
// import cuCustom from 'static/colorui/components/cu-custom'
import cuCustom from './colorui/components/cu-custom.vue'
import {msg,shopShare,showMsg} from './common/utils/sdk/index.js'
import $fly from './common/api/uniFly.js'
import $tol from './common/utils/tools.js'

Vue.component('cu-custom', cuCustom);

// 全局函数组测
Vue.config.productionTip = false


const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

let vm = new Vue()
Vue.prototype.$vm = vm
Vue.prototype.$store = store;
Vue.prototype.$api = {msg,prePage,shopShare,showMsg};
Vue.prototype.$http = request
Vue.prototype.$fly = $fly
Vue.prototype.$tol = $tol


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
	
})
app.$mount()
