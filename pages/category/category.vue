<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in categoryList" :key="item.cid" class="f-item b-b" 
			:class="{active: item.cid === currentId}" @click="tabtap(item)">
				{{item.main_name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="(item,index) in slist" :key="index" class="s-list" :id="'main-'+index">
				<text class="s-item">{{item.next_name}}</text>
				<view class="t-list">
					<view @click="navToList(v.son_name)" class="t-item" v-for="(v,j) in item.info" :key="j">
						<image :src="v.imgurl" lazy-load="true"></image>
						<text>{{v.son_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

	
</template>

<script>
	import {categoryList} from '../../mock/datas/index.js'
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				// flist: [],
				slist: [], // 右边商品
				// tlist: [],
				// cateList:cateList,
				categoryList:categoryList
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			 loadData(){
				this.categoryList.forEach(item=>{
					item.data.forEach((k,i,ary)=>{
						// this.$set(ary,'pid',item.cid)
						k.pid = item.cid
						this.slist.push(k)
					})
				})
				
			},
			//一级分类点击
			tabtap(item){
				// 计算每个的高度，让后定位到哪里， 直接修改 scroll-top 的高度
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.cid;
				let index = this.slist.findIndex(sitem=>sitem.pid === item.cid);
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				
				let h = 0;
				this.slist.forEach((item,index)=>{
					let view = uni.createSelectorQuery().select("#main-" + index);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(keyword){
				// 直接搜索
				uni.navigateTo({
					url: `/pages/goods/goods?keyWork=${keyword}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
