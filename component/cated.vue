<template>
	<view class="catd">
		<!-- //顶部 -->
		<view class='catd-top'>
			<text class="catd-top-t">购物测共有4件商品</text>
			<text class="catd-top-g">编辑</text>
		</view>
		
		<!-- // 商品商城 -->
		
		<view class='catd-shop'>
			
			<view class="catd-shop-top">
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-name">苏宁易购</view>
			</view>
			
			<view class="shop-goods">
				<!-- //左右布局 -->
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-imgs">
					<image src="//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/60222/3/6940/359134/5d525e6dEbf25e2d5/74fa096df3d10b29.jpg!q70.dpg.webp" mode=""></image>
				</view>
				<view class="shop-goods-text">
						<!-- 垂直布局 -->
					<view class="good-text"><text class="good-text">商品是否是卡sgfdsagssgfdsagsdgasdg简历 </text></view>
					<view class="price-box">
						<view  class="model-text">
							<view class="text-heith">{{index%2==0?"440ml;10件;套装":"500ml;2支"}}</view>
							<text class="yticon icon-you text-ico"></text>
						</view>
					</view>
					<view class="shop-good-money">
						<text>￥199.00</text>
						<NumberAdd
							class="nuber"
							:value="1" :max = 99 :min = 0 :step =1 @change="numberChange"></NumberAdd>
					</view>
				</view>
			</view>
			<view class="shop-goods">
				<!-- //左右布局 -->
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-imgs">
					<image src="//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/60222/3/6940/359134/5d525e6dEbf25e2d5/74fa096df3d10b29.jpg!q70.dpg.webp" mode=""></image>
				</view>
				<view class="shop-goods-text">
						<!-- 垂直布局 -->
					<view class="good-text"><text class="good-text">商品是否是卡sgfdsagssgfdsagsdgasdg简历 </text></view>
					<view class="price-box">
						<view  class="model-text">
							<view class="text-heith">{{index%2==0?"440ml;10件;套装":"500ml;2支"}}</view>
							<text class="yticon icon-you text-ico"></text>
						</view>
					</view>
					<view class="shop-good-money">
						<text>￥199.00</text>
						<NumberAdd
							class="nuber"
							:value="1" :max = 99 :min = 0 :step =1 @change="numberChange"></NumberAdd>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class='catd-shop'>
			
			<view class="catd-shop-top">
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-name">苏宁易购</view>
			</view>
			
			<view class="shop-goods">
				<!-- //左右布局 -->
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-imgs">
					<image src="//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/60222/3/6940/359134/5d525e6dEbf25e2d5/74fa096df3d10b29.jpg!q70.dpg.webp" mode=""></image>
				</view>
				<view class="shop-goods-text">
						<!-- 垂直布局 -->
					<view class="good-text"><text class="good-text">商品是否是卡sgfdsagssgfdsagsdgasdg简历 </text></view>
					<view class="price-box">
						<view  class="model-text">
							<view class="text-heith">{{index%2==0?"440ml;10件;套装":"500ml;2支"}}</view>
							<text class="yticon icon-you text-ico"></text>
						</view>
					</view>
					<view class="shop-good-money">
						<text>￥199.00</text>
						<NumberAdd
							class="nuber"
							:value="1" :max = 99 :min = 0 :step =1 @change="numberChange"></NumberAdd>
					</view>
				</view>
			</view>
			<view class="shop-goods">
				<!-- //左右布局 -->
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-imgs">
					<image src="//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/60222/3/6940/359134/5d525e6dEbf25e2d5/74fa096df3d10b29.jpg!q70.dpg.webp" mode=""></image>
				</view>
				<view class="shop-goods-text">
						<!-- 垂直布局 -->
					<view class="good-text"><text class="good-text">商品是否是卡sgfdsagssgfdsagsdgasdg简历 </text></view>
					<view class="price-box">
						<view  class="model-text">
							<view class="text-heith">{{index%2==0?"440ml;10件;套装":"500ml;2支"}}</view>
							<text class="yticon icon-you text-ico"></text>
						</view>
					</view>
					<view class="shop-good-money">
						<text>￥199.00</text>
						<NumberAdd
							class="nuber"
							:value="1" :max = 99 :min = 0 :step =1 @change="numberChange"></NumberAdd>
					</view>
				</view>
			</view>
			
		</view>
	
		<!-- // 底部固定 -->
		
		<view class="cat-botter">
			
			<view class="catd-shop-top">
				<view class="yticon icon-xuanzhong2 checkbox checked"></view>
				<view class="shop-name">全选</view>
			</view>
			
		<!-- 	<view class="catd-botter-mony">
				<view class="catd-mony">
					<view class="catd-text">
						<text>合计：</text>
						<view class="catd-money-color"><text>￥</text>999.00</view>
					</view>
					<text>已优惠 100 元</text>
				</view>
				<button class="cu-btn round bg-yellow catd-but">去结算(5)</button>
			</view> -->
			
			<button class="cu-btn round line-grey catd-but">删除</button>
			
		</view>
	</view>
</template>

<script>
	import NumberAdd from './NumberAdd.vue'
	export default{
		components:{
			NumberAdd
		},
		data(){
			return{
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页现实  true|false
			cartList: [],	
			}	
		},
		methods:{
			numberChange(data){
				console.log(data)
			}
		}
	}
</script>

<style lang='less' scoped>
	@textHe : 230rpx;
	
	.catd-top{
		display: flex;
		justify-content:space-between;
		align-items: center;
		background-color: #f8f8f8;
		border-bottom: 2rpx solid  #E1E1E1;
		box-sizing: border-box;
		text{
			display: inline-block;
			line-height: 50rpx;
			font-weight: bolder;
			border-radius: 10rpx;
			padding: 0 10rpx;
			color:#C0C4CC;
		}
		.catd-top-t{
			margin-left: 20rpx;
		}
		.catd-top-g{
			margin-right: 20rpx;
		}
	}
	
	
	.catd-shop{
		margin: 20rpx 20rpx;
		border-radius: 6%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction:column; // 垂直布局
		.checked{
			color: #fa436a;
		}
		
	}
	/* // 对勾 */
	.checkbox{
		margin: 0 5rpx;
		font-size: 34upx;
		line-height: 1;
		padding: 4upx;
		color:  #C0C4CC;
		background:#fff;
		border-radius: 50%;
		}
		/* // 店子 */
	.catd-shop-top{

		display: flex;
		padding: 10rpx 20rpx;
		background-color: #FAFAFA;
		border-bottom: 2rpx solid  #E1E1E1;
		.shop-name{
			font-weight: bolder;
			margin-left: 30rpx;
		}
	}
	
	/* // 商品 */
	.shop-goods{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding:20rpx 20rpx;
		
		.shop-imgs{
			height: @textHe;
			width: 200rpx;
			border-radius: 10rpx;
			margin: 0 20rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}
	/* // 字体信息 */
	.shop-goods-text{
		flex: 1;
		display: flex;
		align-self:flex-start;
		flex-direction:column; // 垂直布局
		padding: 0 10rpx;
		color:  #808080;
		
		/* // 字数限制2排 */
		.good-text{
			word-break: break-all;
			display: -webkit-box;
			overflow: hidden;
			line-height: 1.5;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;  
			
		}
		
		.shop-good-money{
			display: flex;
			justify-content: space-between;
			line-height: 1.5;
			text{
				font-weight: bolder;
				font-size: 26rpx;
				color: #fa436a;
			}
		}
		
		.price-box {
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin: 15rpx 0;
		}
		.model-text {
			display: flex;
			max-width: 100%;
			padding: 0 30rpx;
			background-color: #808080;
			border-radius: 20rpx;
			height: 48rpx;
			transform: scale(0.9);
			transform-origin: 0 center;
			font-size: 28rpx;
			color: #FFFFFF;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height:48rpx;
			.text-heith{
				line-height:48rpx;
				margin-right: 10rpx;
			}
			.text-ico{
				transform: rotate(90deg);
			}
		}
	}
	
/* // 底部定位	 */

.cat-botter{

	display: flex;
	position: fixed;
	height: 50px;
	width: 100%;
	bottom: 0;
	left: 0;
	justify-content: space-between;
	align-items:center;
	background-color:#FFFFFF;
	z-index: 99;
	.catd-shop-top{
		background-color:#FFFFFF;
	}
	/* // 右边 */
	.catd-botter-mony{
		display: flex;
		
	}
	.catd-mony{
		display: flex;
		flex-direction: column;
		align-items: center;
		.catd-text{
			display: flex;
			font-size: 32rpx;
			
			.catd-money-color{
				font-size: 28rpx;
			}
			view{
				font-weight: bolder;
				color: red;
			}
		}
		>text{
			font-size: 25rpx;
		}
	}
	
	
	.catd-but{
		margin: 0 20rpx;
	}
}
	
</style>
