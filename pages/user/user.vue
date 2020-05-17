<template>
	<view class="my-user">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" @click="login" :src="loginStartus? userInfo.avator : '/static/missing-face.png'"></image>
				</view>
				<view class="info-box" @click="login">
					<text class="username">{{ loginStartus? userInfo.username : '点击登入'}}</text>
				</view>
				
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="b-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					无bug会员
				</view>
				<text class="e-m">master</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text>
			</view>
		</view>
		<!-- // -->

		<!-- <image class="arc" src="/static/arc.png"></image> -->
		<view class="tj-sction">
			<view class="tj-item">
				<text class="num">128.8</text>
				<text>余额</text>
			</view>
			<view class="tj-item">
				<text class="num">0</text>
				<text>优惠券</text>
			</view>
			<view class="tj-item">
				<text class="num">20</text>
				<text>积分</text>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order-section">
			<view class="order-item" @click="navTo('/pages/my-orders/my-orders?state=0')" hover-class="common-hover"  :hover-stay-time="50">
				<text class="yticon icon-shouye"></text>
				<text>全部订单</text>
			</view>
			<view class="order-item" @click="navTo('/pages/my-orders/my-orders?state=1')"  hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text>待付款</text>
			</view>
			<view class="order-item" @click="navTo('/pages/my-orders/my-orders?state=2')" hover-class="common-hover"  :hover-stay-time="50">
				<text class="yticon icon-yishouhuo"></text>
				<text>待收货</text>
			</view>
			<view class="order-item" @click="navTo('/pages/my-orders/my-orders?state=3')" hover-class="common-hover"  :hover-stay-time="50">
				<text class="yticon icon-shouhoutuikuan"></text>
				<text>退款/售后</text>
			</view>
		</view>
		<!-- 浏览历史 -->
		<view class="history-section icon">
			<view class="sec-header">
				<text class="yticon icon-lishijilu"></text>
				<text>浏览历史</text>
			</view>
			<scroll-view scroll-x class="h-list">
				<image  v-for="(item,index) in historyLog" @click="goodproduct(item)"
				:key='index'  :src="item.gooddata.img" mode="aspectFill"></image>
			</scroll-view>
			<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的钱包" tips="您的会员还有3天过期"></list-cell>
			<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navAddress"></list-cell>
			<list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
			<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell>
			<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell>
			<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('../../myInfo/sett/sett')"></list-cell>
		</view>
				

	</view>
</template>


<script>
	import ListCell from '../../component/mix-list-cell.vue'
	import {ImagUrl} from '../../mock/datas/index.js'
	import {mapMutations,mapState} from 'vuex'
	export default{
		components:{
			ListCell
		},
		data(){
			return{
				autoplay: false,
				canGetInfo: false, //授权状态，能否获取用户信息
				code: "", //wx.login拿回来的code
				loading: true,
				newClient: false, //新用户
				ImagUrl:ImagUrl
				
			}
		},
		onLoad() {
			// 页面加载
			
		},
		onShow() {
			// console.log('sddf',this.loginStartus,this.userInfo)
			console.log(this.historyLog)
		},
		computed:{
			// 获取登入状态
			...mapState({
				loginStartus:state=>state.user.loginStartus,
				userInfo:state=>state.user.userInfo,
				historyLog:state=>state.cat.historyLog
			})
		},
		methods:{
			...mapMutations(['initUser','setAddPitch']),
			
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			login(){
				if (this.loginStartus){
					this.navTo('../../myInfo/sett/sett')
					return
				}
				
				// #ifdef APP-PLUS
				this.navTo('../../myInfo/login/login')
				// #endif
				// #ifdef MP-WEIXIN
				let self = this
				// 需要，hideLoading 来取消这个加载效果
				// wx.showLoading({'title':'登入中...'})
				this.navTo('../../myInfo/login/login')
				return
				wx.login({
					success:(res)=>{
						console.log(res)
						if(res.code){
							self.code = res.code;
							console.log(self.code) // 获取到用户授权后， 将code返回给服务器，获取用户登入信息
							// self.wxGetUserInfo(self.code)
							this.$http.request({url:'/login'}).then((res)=>{
								console.log(res)
								// 授权失败
								wx.hideLoading();
							})
						}
					},
					fail:(err)=>{
						// 授权失败
						wx.hideLoading();
						// 显示消息提示框
						wx.showToast({
							title: "wx.login失败" + err,
							icon: "none",
							duration: 1000
						})
					}
				})
				// #endif
			},
			// 微信拿到权限后，获取用户信息保持登入
			wxGetUserInfo(code){
				// 获取用户授权后的信息
				wx.getSetting({
					success:(res)=>{
						console.log(res.authSetting['scope.userInfo'])
					}	
				})
				const self = this
				wx.getUserInfo({
					withCredentials:true,
					success:(res)=>{
						console.log('234')
						console.log('获取到用户信息',res)
						
					},fail:()=>{
						self.loading = false
						wx.hideLoading(); // 关闭加载
					}
				})
			},
			
			goodproduct(item){
				// 设置
				uni.setStorageSync('shopName',item)
				uni.navigateTo({
					url:'../../myInfo/product/product'
				})
				
			},
			navAddress(){
				// 地址页面跳转
				this.setAddPitch(false)
				uni.navigateTo({
					url:'../../myInfo/my-address/my-address'
				})
			}
			
			
			
		}
	
		
	}
</script>

<style scoped lang="scss">
	
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}
	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

</style>