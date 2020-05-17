<template>
	<view>
        <view class="logo">
			<view class="img">
				<image mode="widthFix" src="http://static.blinkfox.com/20190601.png" ></image>
			</view>
		</view>
		<!-- 账号密码输入框 -->
		<view class="form">
			<view class="username">
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doLogin">登 录</view>
			<view class="res" v-if="loginStartus===false">
				<view @tap="toPage('register')">用户注册</view>
				<view @tap="toPage('resetpasswd')">忘记密码</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
		<!-- 第三方登录 -->
		<block  v-if="loginStartus===false">
			<view class="oauth" v-if="isShowOauth">
				<view class="text">— 快速登录 —</view>
				<view class="list">
					<view @tap="oauthLogin('weixin')" v-if="showProvider.weixin" class="iconfont iconweixin"></view>
					<view @tap="oauthLogin('qq')" v-if="showProvider.qq" class="iconfont iconQQ"></view>
					<view @tap="oauthLogin('sinaweibo')" v-if="showProvider.sinaweibo" class="iconfont iconweibo"></view>
					<!-- <view @tap="oauthLogin('xiaomi')" v-if="showProvider.xiaomi" class="icon xiaomi"></view> -->
				</view>
			</view>
		</block>
		
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button v-if="loginStartus===false" style="width: 100%;" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="wxLongin">微信一件登入</button>  
		<!-- #endif -->
		
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	// 通过 vuex来关系登入信息，存入setStorage中
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				phoneNumber: '15607195236',
				passwd:'123456',
				isShowOauth:false,
				// 登入方式
				showProvider:{
					weixin:false,
					qq:false,
					sinaweibo:false,
					xiaomi:false
				}
			}
		},
		onShow() {
			// 判断是否是登入
			if (this.loginStartus){
				// 获取账户，密码，再输入
			}
			
		},
		onLoad() {
			//APP显示第三方登录
			// #ifdef APP-PLUS
				this.isShowOauth=true;
			//	#endif
			// 获取第三方登入服务
			this.getProvider();
			
		}, 
		computed:{
			...mapState({
				loginStartus: state => state.user.loginStartus,
				loginNumber:state =>state.user.loginNumber
			})
		},
		methods: {
			...mapMutations(['login','verifyLogin']),
			oauthLogin(provider){
				let self = this
				uni.showLoading({title:'登入中'}); //载框
				//第三方登录
				uni.login({
					provider: provider,
					success: (loginRes)=>{
						console.log("success:"+provider, loginRes);
						//案例直接获取用户信息，一般不是在APP端直接获取用户信息，比如微信，获取一个code，传递给后端，后端再去请求微信服务器获取用户信息
						uni.getUserInfo({
							provider: provider,
							success: (infoRes)=>{
								console.log('用户信息：'+provider, infoRes );
								const data = {
									userId:989,
									username:infoRes.userInfo.nickName,
									avator:infoRes.userInfo.avatarUrl,
									token:infoRes.userInfo.openid || 'sahgiodhaoiweiob23879sdhanadsSFSDFWEfkslfag',
									signature:'个性签名',
									integral:0,
									balance:0,
									envelope:0,
								}
								self.login(data)
								uni.hideLoading()
								// uni.showToast({title: '登录成功',icon:"success"});
								self.$api.msg('登录成功',1500)
								setTimeout(function(){
									uni.navigateBack();
								},300)
							}
						});
					},
					
					fail:(e)=>{
						console.log("授权fail: "+JSON.stringify(e));
						uni.hideLoading (); // 关闭主动调用的 加载框， 会关闭所有显示框消息
						self.$api.msg('授权登入失败')
						
					},
					complete:(e)=>{
						// 成功失败都会调用， 每个服务失败的 code 都不相同，微博-100，qq -2
						console.log('授权成功失败',e)
					}
				});
				uni.hideLoading (); // 关闭主动调用的 加载框
			},
			getProvider(){
				//获取第三方登录服务， 根据服务商显示登入设备， uniapp 只提供了四个
				 // res.provider= ["qq", "xiaomi", "sinaweibo", "weixin"]
				uni.getProvider({
					service: 'oauth',
					success: (res)=>{
						let len = res.provider.length;
						for(let i=0;i<len;i++){
							//有服务才显示按钮图标
							this.showProvider[res.provider[i]] = true;
						}
						if(res.provider.length==0){
							this.isShowOauth=false;
						}
					}
				});
			},
			toPage(page){
				uni.hideKeyboard()
				uni.navigateTo({
					url: page
				})
			},
			doLogin(){
				let self = this
				uni.hideKeyboard(); // 隐藏软盘
				//验证手机号码
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					// uni.showToast({title: '请填写正确手机号码',icon:"none"});
					this.$api.msg('请填写正确手机号码')
					return false; 
				}
				uni.showLoading({
					title: '提交中...'
				})
				//模板示例比对本地储存的用户信息，实际使用中请替换为上传服务器比对。
				this.$http.request({
					url:"/login",
					data:{
						iphon:this.phoneNumber,
						pwd:md5(this.passwd)
					}
				}).then((res)=>{
					console.log(res)
					let logstated =  this.loginNumber.some(v=>{
						 if (v.phoneNumber === this.phoneNumber && v.passwd === this.passwd){
							return true
						 }
					 })
					 console.log(logstated)
					if (logstated){
						self.login(res.userInfo)
						self.$api.msg('登录成功')
						setTimeout(function(){
							uni.navigateBack();
						},300) 
					}else {
						self.$api.msg('登入失败，请检查账号或者密码是否正确',3000)
					}
					
				})
				
			},
			
			wxLongin(e){
				// 获取用户信息
				if ( e.detail){
					let user = {
						username: e.detail.userInfo.nickName,
						 userId: e.detail.cloudID,
						 avator: e.detail.userInfo.avatarUrl,
						 token: e.detail.encryptedData
					}
					this.login(user)
					this.$api.msg('登录成功')
					setTimeout(function(){
						uni.navigateBack();
					},300)
				}else{
					this.$api.msg('获取登入信息失败,检查获取用户信息接口')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './login.scss';
	
	.form {
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
		}
	}
	.oauth{
		@media all and (max-height:150vw){
			display: none;
		}
		position: absolute;
		bottom: 50upx;
		width: 100%;
		.text{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba($color: #ffffff, $alpha: 0.8);
			font-size: 28upx;
		}
		.list{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 0;
			.iconfont{
				font-size:80upx;
				margin: 0 30upx;
			}
		}
	}
</style>
