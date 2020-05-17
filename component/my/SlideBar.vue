<template>
	<view class="slide-bar">
		<swiper class="swiper-tag square-dot" :indicator-dots="true" :circular="false" :autoplay="false" interval="5000" duration="500"
		>
				<swiper-item v-for="(conts,index) in menuList" :key='index' class="unicorn-border-radius-swiper">
					<view class="grid">
						<view class="grid-item-5" v-for="(item, index) in conts" :key="index">
							<image :src="item.url" mode=""></image>
							<view v-text="item.name"></view>
						</view>
					</view>
			</swiper-item>
		</swiper>
					<image mode="widthFix" src="https://m.360buyimg.com/babel/jfs/t1/114263/22/6646/73522/5ebd1d8fE15105437/63fce3955c867e2c.gif" style="background: transparent !important;width: 100%;margin-top: -1px;"></image>
	</view>
</template>

<script>
	import {menuList,banner} from '../../mock/datas/index.js'
export default{
	name:"slidebar",	
	data(){
		return{
			menuList:menuList,
			showTip:''
		}
	}
	
}

</script>

<style lang="less" scoped>
	.swiper-tag{
		height: 385rpx;
		margin-top: 85rpx;
	}
	
	.grid-title{
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: rgba(0,0,0,.63);
		padding: 10rpx 0;
		view{
			width: 8rpx;
			height: 30rpx;
			background-color: rgba(255,82,65,1);
			margin-right: 20rpx;
		}
	}
	.grid{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.grid-item-5,.grid-item-4{
			box-sizing: border-box;
			width: calc(100% / 5);
			text-align: center;
			padding: 20rpx 0;
			position: relative;
			image{
				width: 80rpx;
				height: 80rpx;
			}
			view{
				font-size: 28rpx;
				margin-top: 16rpx;
				color: rgba(0,0,0,.53);
			}
			text{
				display: block;
				padding: 4rpx 8rpx;
				text-align: center;
				border-radius: 36rpx;
				font-size: 24rpx;
				background-color: rgba(255,82,65,1);
				color: rgba(255,255,255,1);
				position: absolute;
				right: 6rpx;
				top: 6rpx;
			}
		}
		.grid-item-4{
			width: calc(100% / 5);
		}
	}
</style>
