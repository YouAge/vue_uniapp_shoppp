<template>
	<view>
	<!-- //订单商品 -->
		<view class="goods-section">
			<view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">{{shop_goods.shopName}}</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item,index) in shop_goods.gooddata" :key='index'>
				<image :src="item.img"></image>
				<view class="right">
					<text class="title clamp">{{item.name}}</text>
					<view class="title-spec">
						<view class="spec" style="margin: 0 10rpx;" v-for="(v,j) in item.attribute" :key='j'>{{v.name}}</view>
					</view>
					<view class="price-box">
						<text class="price">￥{{item.itemprice}}</text>
						<text class="number">x {{item.shopNumber}}</text>
					</view>
				</view>
			</view>


		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			shop_goods:{
				type:Object
			}
		},
		
		data(){
			return{
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			.title-spec{
				display: flex;
				margin-top: 10rpx;
				height: 30rpx;
				line-height: 30rpx;
				align-items: center;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	
</style>
