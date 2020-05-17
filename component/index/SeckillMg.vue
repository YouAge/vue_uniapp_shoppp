<template>
		<!-- /* 秒杀专区 */ -->
	<view class="seckill-section m-t">
		<view class="s-header">
			<image class="s-img" src="/static/secskill-img.jpg" mode="widthFix"></image>
			<text class="tip">{{times.tim}}点场</text>
			<text class="hour timer">{{times.h}}</text>
			<text class="minute timer">{{times.i}}</text>
			<text class="second timer">{{times.s}}</text>
			<text class="yticon icon-you"></text>
		</view>
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="floor-item"
					@click="navToDetailPage(item)">
					<image :src="item.image" mode="aspectFill"></image>
					<text class="price">￥{{item.price}}</text>
					<text class="m-price">￥188</text> 
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default{
	name:'seckill',
	props:{
		goodsList:{
			type:Array,
		},
		times:Object,
	},
	data(){
		return{
			Tiems:16  ,//0-24	
		}
	},
	onLoad() {
		// 秒杀倒计时
	},
	methods:{
		newkiller(){
			
		},
		navToDetailPage(item){
			console.log(item)
		}
		
	}
}
</script>

<style scoped lang="scss">
	.seckill-section{
		padding: 8upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			display: flex;
			flex-direction: column;
			width: 150upx;
			margin-right: 20upx;
			font-size: $uni-font-size-sm + 2rpx;
			color: $font-color-dark;
			line-height: 1.8;
			align-items: center;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
			.m-price{
				font-size: $uni-font-size-sm - 4rpx;
				text-decoration: line-through;
				color: $font-color-light;
				font-weight: bolder;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	
</style>
