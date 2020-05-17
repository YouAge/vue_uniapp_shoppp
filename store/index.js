import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import user from './modules/user.js'
import cat from './modules/cat.js'

const state ={
	// 热门搜索
	hotSerch:[
		'自嗨火锅',
		'iphone12',
		'有机酸奶',
		'茅台',
		'泡面'
	]
	
}



export default new Vuex.Store({
	state,
	modules:{
		user,
		cat
	},
	// 添加，持久化存储插件，
	 // plugins: [createPersistedState()]
})