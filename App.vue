<script>
	import Vue from 'vue'
	
	export default {
		onLaunch: function() {
		    console.log('App Launch')
			// 打开软件， 判断手机类型， CustomBar获取顶部高度，导航栏
		    uni.getSystemInfo({
		        success: function (e) {
		            // #ifndef MP
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            if (e.platform === 'android') {
		                Vue.prototype.CustomBar = e.statusBarHeight + 50;
		            } else {
		                Vue.prototype.CustomBar = e.statusBarHeight + 45;
		            }
		            // #endif
		            // #ifdef MP-WEIXIN
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            let custom = wx.getMenuButtonBoundingClientRect();  // 获取小程序，右边胶囊按钮
		            Vue.prototype.CustomBar = custom;
		            Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		            // #endif
		            // #ifdef MP-ALIPAY
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
		            // #endif
		        }
		    }),
			// 全局色彩
		    Vue.prototype.ColorList = 
			[{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				}, {
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				}, {
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				}, {
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				}, {
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				}, {
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				}, {
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				}, {
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				}, {
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				}, {
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				}, {
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				}, {
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				}, {
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				}, {
					title: '墨黑',
					name: 'black',
					color: '#333333'
				}, {
					title: '雅白',
					name: 'white',
					color: '#ffffff'
		    }]
		},
		
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/app.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
