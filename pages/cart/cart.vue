<template>
	<view class="cart">
		<!-- 空白页 -->
		<view v-if="loginStartus===false" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<!-- // 没有去登入 -->
			<view class="empty-tips">
				<!-- 空空如也 -->
				<navigator class="navigator" url="../../myInfo/login/login"> >>去登陆</navigator>
	
				<!-- <button open-type="getUserInfo" bindgetuserinfo='bindGetUserInfo'>微信登入</button> -->
				<!-- <button open-type="getUserInfo" @bindgetuserinfo='bindGetUserInfo' withCredentials="true">微信登入</button> -->
				<!-- 获取用户个人信息  测试-->
				<!-- #ifdef MP-WEIXIN -->
						<!-- <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登入</button>  -->
				<!-- #endif -->
		
			</view>
		</view>

		<view v-else>

			<block v-if="goodList.length>0">
				<!-- //顶部 -->
				<view class='catd-top'>
					<text class="catd-top-t">购物测共有{{ totalCount.goodNum}}件商品</text>
					<text class="catd-top-g" @tap="edit">编辑</text>
				</view>
				<view class="catd-blog"></view>
				
			<!-- 	<cu-custom>
					<text class="catd-top-t">购物测共有{{ totalCount.goodNum}}件商品</text>
					<text class="catd-top-g" @tap="edit">编辑</text>
				</cu-custom> -->
				
				<!-- // 商品商城 -->

				<view class='catd-shop' v-for="(shops,shopId) in goodList" :key='shopId'>

					<view class="catd-shop-top">
						<view class="yticon icon-xuanzhong2 checkbox" :class="shops.stated?'checked':''" 
						@click="selectedItem({shopId})"></view>
						<view class="shop-name">{{shops.shopName}}</view>
					</view>
					<!-- // 商品列表 -->
					<view class="shop-goods" v-for="(item,goodId) in shops.gooddata" :key='goodId'>
						<!-- //左右布局 -->
						<view class="yticon icon-xuanzhong2 checkbox" :class="item.stated?'checked':''" 
						@click="selectedGood({goodId,shopId})"></view>
						<view class="shop-imgs">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="shop-goods-text">
							<!-- 垂直布局 -->
							<view class="good-text"><text class="good-text">{{item.name}}</text></view>
							<view class="price-box">
								<view class="model-text">
									<!-- // 类型选择 -->
									<view class="text-heith">
										<text class="selected-text" style="font-size: 26rpx; margin-right: 10rpx;"
										 v-for="(sItem, sIndex) in item.attribute" :key="sIndex">
											{{sItem.name }} 
										</text>
									</view>
									<text class="yticon icon-you text-ico"></text>
								</view>
							</view>
							<view class="shop-good-money">
								<view class="my-good-text" style="color: #fa436a;">￥{{item.itemendprice}}
									<text style="font-size: 20rpx;text-decoration:line-through;padding-left: 20rpx;">{{ item.itemprice}}</text>
								</view>
								<NumberAdd class="nuber" :value="item.shopNumber" :max='20'
								 :min=1 :step='1' @change="numberChange" :itemdata='item'></NumberAdd>
							</view>
						</view>
					</view>


				</view>

				<!-- // 底部固定 -->

				<view class="cat-botter">
					<view class="catd-shop-top">
						<view class="yticon icon-xuanzhong2 checkbox" :class="shopAll?'checked':''" @click="cheackAll"></view>
						<view class="shop-name">全选</view>
					</view>
					<view class="catd-botter-mony" v-if="redactGo===true">
						<view class="catd-mony">
							<view class="catd-text">
								<text>合计：</text>
								<view class="catd-money-color"><text>￥</text>{{totalCount.price}}</view>
							</view>
							<text>已优惠{{ (totalCount.originalprice -totalCount.price).toFixed(2)  }}元</text>
						</view>
						<button class="cu-btn round bg-yellow catd-but" @click="buyShop">去结算({{ totalCount.num}})</button>
					</view>
					<button class="cu-btn round line-grey catd-but" v-else @click="defGoods">删除</button>
				</view>
			</block>


			<view class="empty" v-else>
				<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
				<!-- // 没有去登入 -->
				<view class="empty-tips">
					<!-- 空空如也 -->
					<navigator class="navigator" url="../index/index" open-type="switchTab">快去商城逛逛吧</navigator>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex';
	import NumberAdd from '../../component/NumberAdd.vue'
	export default {
		components: {
			NumberAdd
		},
		data() {
			return {
				redactGo: true, // 编辑按钮
				// shopAll: false, // 全选状态
				// 商品初始化转台
				step: 2, // 每次点击的值
				minGood: 1, // 最小值
				value: 1 // 输入框当前值

			}
		},
		computed: {
			// 检查是否是登入状态
			...mapState({
				loginStartus: state => state.user.loginStartus,
				goodList: state => state.cat.list,
				shopAll: state => state.cat.shopAll,
				sameitems:state=>state.cat.sameitems,
				catStorg:state=>state.cartStorg
			}),
				...mapGetters(['totalCount'])
		},
		watch:{
			// goodList:{
			// 	 handler(newName, oldName){
			// 		 console.log('升读',newName)
			// 	 },
			// 	immediate: true,
			// 	deep: true
			// }
		},
		onLoad() {
			// 只初始化一次
		},
		onShow() {
			// 每次页面都会调用，
			if (this.loginStartus) {
				this.getCatData()
				console.log('list',this.goodList)
			}
			this.redactGo =true
			
		},
		// 下拉刷新在重新请求 购物车
		
		methods: {
			bindGetUserInfo(res){
				console.log(res.detail.userInfo)
				
			},
			...mapMutations(['initGetDate','setGoods', 'login','cheackAll','paymentItem',
			'selectedItem','selectedGood','remoeItem']),
			...mapActions(['actsetGoods']),
			// 获取购物车的数据
			getCatData() {
				// 获取本地存储
				let carData = uni.getStorageSync(this.catStorg)
				if(carData){
					this.initGetDate(JSON.parse(carData))
				}
				// this.$http.request({
				// 	url: '/cartlist',
				// 	// methods: 'POST',
				// 	headher: {
				// 		token: true
				// 	},
				// 	data:{
				// 		//商品店铺id，商品id，修改
				// 	},
				// }).then((res) => {
				// 	this.initGetDate(res.list)
				// 	console.log(res.list)
				// })

			},
			defGoods(){
				//  // 判断是否有选中的商品
				let state = this.pitchItem()
				console.log('删除',state)
				if (state){
					// 有选中商品
					// 提示是否确定要删除
					uni.showModal({
					    content: '确定要删除吗',
					    success: (e)=>{
					    	if(e.confirm){
					    		this.remoeItem()
					    	}
					    }
					});
				}else {
					this.$api.msg('您还未选中商品')
				}
				
			},
			navToLogin() {
				console.log('dengru ')
			},
			edit() {
				this.redactGo = !this.redactGo
			},
			numberChange(e,item) {
				item.shopNumber = Number(e)
				this.setGoods(item)
				 // 重新请求,保持与数据库一致，这是是修改数据库中的购物的商品数量
				this.getCatData()
			},
			check() {

			},
			buyShop(){
				// 结算， 获取选中的商品， 结算
				//  // 判断是否有选中的商品
				const state = this.pitchItem()
				console.log(this.pitchItem())
				if (state){
					// 有选中商品， 下单成功删除，这里不是删除，
					// 直接跳转付款页面
					this.paymentItem()
					uni.navigateTo({
						url:'/pages/orderItems/orderItems'
					})
					
				}else {
					this.$api.msg('您还未选中商品')
				}
			},
			//  // 判断是否有选中的商品
			pitchItem(){			
				let i= this.goodList.length;
				while(i--){
					let goods = this.goodList[i].gooddata
					if (goods.stated){
						return true
					}
					let j = goods.length;
					while(j--){
						if (goods[j].stated){
							return true
						}
					}
				}
				return false
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.cart {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	// ---------购物测---

	$textHe : 230rpx;

	.catd-top {
		position: fixed;
		top: 0;
		// left: 0;
		z-index: 55;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f8f8f8;
		border-bottom: 2rpx solid #E1E1E1;
		border-top: 2rpx solid #E1E1E1;
		box-sizing: border-box;

		text {
			display: inline-block;
			line-height: 50rpx;
			font-weight: bolder;
			border-radius: 5rpx;
			padding: 0 10rpx;
			color: black;
		}

		.catd-top-t {
			margin-left: 20rpx;
		}

		.catd-top-g {
			margin-right: 20rpx;
		}
	}

	.catd-blog {
		// position: relative;
		width: 100%;
		height: 50rpx;
		// top: 0;
		// left: 0;
	}

	.catd-shop {
		margin: 20rpx 20rpx;
		border-radius: 3%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column; // 垂直布局
		.checked {
			color: #fa436a;
		}
	}
	

	/* // 对勾 */
	.checkbox {
		margin: 0 5rpx;
		font-size: 34upx;
		line-height: 1;
		padding: 4upx;
		color: #C0C4CC;
		background: #fff;
		border-radius: 50%;
	}

	/* // 店子 */
	.catd-shop-top {

		display: flex;
		padding: 20rpx 20rpx;
		height: 50rpx;
		justify-content: flex-start;
		align-items: center;
		line-height: 50rpx;
		width: 100%;
		// box-sizing: border-box;
		// background-color: #FAFAFA;
		// border-bottom: 2rpx solid #E1E1E1;

		.shop-name {
			font-weight: bolder;
			margin-left: 30rpx;
			
		}
		.checked {
			color: #fa436a;
		}
		
	}

	/* // 商品 */
	.shop-goods {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 20rpx;

		.shop-imgs {
			height: $textHe;
			width: 200rpx;
			border-radius: 10rpx;
			margin: 0 20rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}

	/* // 字体信息 */
	.shop-goods-text {
		flex: 1;
		display: flex;
		align-self: flex-start;
		flex-direction: column; // 垂直布局
		padding: 0 10rpx;
		color: #808080;

		/* // 字数限制2排 */
		.good-text {
			word-break: break-all;
			display: -webkit-box;
			overflow: hidden;
			line-height: 1.5;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;

		}

		.shop-good-money {
			display: flex;
			justify-content: space-between;
			// app下需要高度
			height: 50rpx;
			line-height: 50rpx;

			.my-good-text {
				font-weight: bolder;
				font-size: 26rpx;
			
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
			line-height: 48rpx;

			.text-heith {
				line-height: 48rpx;
				margin-right: 10rpx;
			}

			.text-ico {
				transform: rotate(90deg);
			}
		}
	}

	/* // 底部定位	 */

	.cat-botter {

		display: flex;
		position: fixed;
		height: 50px;
		width: 100%;
		bottom: 0;
		left: 0;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		z-index: 99;
		box-sizing: border-box;

		.catd-shop-top {
			background-color: #FFFFFF !important;
			border: none;
			width: 300rpx;
		}

		/* // 右边 */
		.catd-botter-mony {
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-self:flex-end;
			box-sizing: border-box;
		}

		.catd-mony {
			display: flex;
			flex-direction: column;
			align-items: center;

			.catd-text {
				display: flex;
				font-size: 32rpx;

				.catd-money-color {
					font-size: 28rpx;
				}

				view {
					font-weight: bolder;
					color: red;
				}
			}

			>text {
				font-size: 25rpx;
			}
		}


		.catd-but {
			margin: 0 20rpx;
		}
	}
</style>
