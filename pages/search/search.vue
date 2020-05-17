<template>
	<view class="search">
		<view class="cu-bar search bg-white search-case">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<!-- //@focus="InputFocus" @blur="InputBlur" -->
				<!-- 必须在input标签外面套上form表单，并设置 action="javascript:void 0"，action属性很关键，不能省略  -->
				<!-- action="javascript:void 0" @submit.prevent action="#" -->
				<form action="javascript:void 0" @submit.prevent>
					<input   v-model="keyWork" 
					 focus :adjust-position="false" type="text" placeholder="请输入"
					 confirm-type="search" @keypress="search" cursor="-1" selection-end="-1" selection-start="-1"></input>
				 </form>
			</view>
			<view class="action">
				<text class="shadow-blur round" @tap="search">搜索</text>
			</view>
		</view>
		<!-- // 搜索记录 -->
		<view class="seach-item">
			<view class="seach-title">
				<view class="f-color">最近搜索</view>
				<view class="cuIcon-deletefill" @tap="clearHistory"></view>
			</view>
			<view v-if="searchData.length >0">
				<view class="seach-name f-color" @tap="toSearchList(item)" v-for="(item,index) in searchData" :key='index'>{{item}}</view>
			</view>
			<view class="seach-text" v-else>暂无搜索记录</view>
		</view>
		
		<view class="seach-item">
			<view class="seach-title">
				<view class="f-color">热门搜索</view>
				<!-- <view class="iconfont icon-iconset0213"></view> -->
			</view>
			<view>
				<view class="seach-name f-color" @tap="toSearchList(item)" v-for="(item,index) in hotSerch" :key='index'>{{item}}</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				keyWork : '',
				searchData:[],
				storKey:'search'
			}
		},
		onReady() {
			// uni.onKeyboardHeightChange(res => {
			//   console.log(res.height)
			// })
		 let searchKey =uni.getStorageSync(this.storKey)
		 if (searchKey){
			 	this.searchData = JSON.parse(searchKey)
		 }
		
		},
		computed:{
			...mapState({
				hotSerch:state=>state.hotSerch
			})
		},
		methods: {
			search(){
				//带关键字 跳转 商品goods页面，
				if(this.keyWork ==='') return this.$api.msg('请输入搜索词')
				
				uni.navigateTo({
					url: `/pages/goods/goods?keyWork=${this.keyWork}`
				})
				this.storgeKeyWord(this.keyWork)
				uni.hideKeyboard()
			},
		
			// onNavigationBarSearchInputConfirmed(){
			// 	//监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
			// 	console.log('------------12-')
			// },
			// onNavigationBarSearchInputChanged(e){
			// 	//监听原生标题栏搜索输入框输入内容变化事件
			// 	console.log('触发 监听搜索框',e)
			// 	this.keyWork = e.text
			// 	console.log('--------12---12-',)
			// },
			toSearchList(item){
				// 最近收索，和热门搜素
				this.keyWork = item
				this.search()
		
			},
			async clearHistory(){
				// 清楚最近收索
				let stated = await this.$api.showMsg('确定删除全部历史记录吗')
				if (stated ===1 ){
					this.searchData=[]
					uni.removeStorageSync(this.storKey)
				}
			},
			
			//搜索记录存储
			storgeKeyWord(key){
				// 查找是否存在 收索中，不存在添加在最前面
				// 存在， 改动到最前面
				let id = this.searchData.indexOf(key)
				if (id != -1){
					this.searchData.splice(id,1)
				}
				this.searchData.unshift(key)
				// 永久存错
				console.log(JSON.stringify(this.searchData))
				uni.setStorageSync(this.storKey,JSON.stringify(this.searchData))
			}
				
		}
	}
</script>

<style scoped lang="scss">
.search-case{
		width: 100%;
}
input{
	width: 100%;
}
form{
	flex: 1;
}
.seach-item{
		padding: 20rpx;
	
	}
	.seach-title{
		display: flex;
		justify-content: space-between;
	}

	.seach-name{
		padding: 4rpx 24rpx;
		background-color: #e1e1e1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
	.seach-text{
		text-align: center;
		font-weight: bolder;
	}
</style>
