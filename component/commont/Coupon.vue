<template>
	<view class="mg-copon">
		<!-- //优惠劵 -->
		
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满30可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			maskState:{
				type:[String,Number],
				default:0
			}
		},
		data(){
			return{
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '优惠券优惠券优惠券优惠券',
						price: 15,
					}
				],
			}
			
		},
		methods:{
			toggleMask(){
				this.$emit('close',this.maskState)
			},
			stopPrevent(){
				console.log('112')
			}
		}
		
	}
	
</script>

<style scoped lang="scss">
	/* 优惠券面板 */
		.mask{
			display: flex;
			align-items: flex-end;
			position: fixed;
			left: 0;
			top: var(--window-top);
			bottom: 0;
			width: 100%;
			background: rgba(0,0,0,0);
			z-index: 9995;
			transition: .3s;
			
			.mask-content{
				width: 100%;
				min-height: 30vh;
				max-height: 70vh;
				background: #f3f3f3;
				transform: translateY(100%);
				transition: .3s;
				overflow-y:scroll;
			}
			&.none{
				display: none;
			}
			&.show{
				background: rgba(0,0,0,.4);
				
				.mask-content{
					transform: translateY(0);
				}
			}
		}
	/* 优惠券列表 */
		.coupon-item{
			display: flex;
			flex-direction: column;
			margin: 20upx 24upx;
			background: #fff;
			.con{
				display: flex;
				align-items: center;
				position: relative;
				height: 120upx;
				padding: 0 30upx;
				&:after{
					position: absolute;
					left: 0;
					bottom: 0;
					content: '';
					width: 100%;
					height: 0;
					border-bottom: 1px dashed #f3f3f3;
					transform: scaleY(50%);
				}
			}
			.left{
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				overflow: hidden;
				height: 100upx;
			}
			.title{
				font-size: 32upx;
				color: $font-color-dark;
				margin-bottom: 10upx;
			}
			.time{
				font-size: 24upx;
				color: $font-color-light;
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 26upx;
				color: $font-color-base;
				height: 100upx;
			}
			.price{
				font-size: 44upx;
				color: $base-color;
				&:before{
					content: '￥';
					font-size: 34upx;
				}
			}
			.tips{
				font-size: 24upx;
				color: $font-color-light;
				line-height: 60upx;
				padding-left: 30upx;
			}
			.circle{
				position: absolute;
				left: -6upx;
				bottom: -10upx;
				z-index: 10;
				width: 20upx;
				height: 20upx;
				background: #f3f3f3;
				border-radius: 100px;
				&.r{
					left: auto;
					right: -6upx;
				}
			}
		}

</style>
