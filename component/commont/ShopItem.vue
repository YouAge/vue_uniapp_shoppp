<template>
	
	<!--商品列表-->
	<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(Product)">
		<image :src="Product.gooddata.img" class="tui-pro-img" mode="aspectFill" />
		 <!-- @load="onImageLoad('Product', Product.gooddata.id)"  @error="onImageError('Product', Product.gooddata.id)" -->
		<view class="tui-pro-content">
			<view class="tui-pro-tit">{{Product.gooddata.name}}</view>
			<view>
				<view class="tui-pro-price">
					<text class="tui-sale-price">￥{{Product.gooddata.itemendprice}}</text>
					<text class="tui-factory-price">￥{{Product.gooddata.itemprice}}</text>
				</view>
				<view class="tui-pro-pay">{{Product.gooddata.itemsale}}人付款</view>
			</view>
		</view>
	</view>
	<!--商品列表-->
</template>

<script>

export default{
	props:{
		Product:{
			type:Object
		}
	},
	data(){
		return{
			
		}
	},
	methods:{
		detail(data){
			uni.navigateTo({
				url:`../../myInfo/product/product?shopid=${data.id}`,
			})
			// uni.setStorage({
			// 	key:'shopName'
			// })
			// 直接缓存本地， 获取
			uni.setStorageSync('shopName', data);
		},
		
		//监听image加载完成
		onImageLoad(key, index) {
			console.log(key,index)
			this.$set(this[key][index], 'loaded', 'loaded');
		},
		//监听image加载失败
		onImageError(key, index) {
			this[key][index].img = '../../static/errorImage.jpg';
		},

	}
	
}
</script>

<style scoped>
	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}
	
	.tui-pro-img {
		width: 100%;
		display: block;
	}
	
	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	
	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.tui-pro-price {
		padding-top: 18rpx;
	}
	
	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}
	
	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	
	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	
	
</style>
