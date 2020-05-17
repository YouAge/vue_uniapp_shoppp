<template>
	<view>
        <view class="logo">
			<view class="img">
				<image mode="widthFix" src='http://static.blinkfox.com/20190601.png'></image>
			</view>
		</view>
		<view class="form re">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doReset">重置密码</view>

		</view>
		
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				phoneNumber:"",
				code:'',
				passwd:"",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false
			}
		},
		onLoad() {

		},
		methods: {
			Timer(){},
			getCode(){
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				//示例用定时器模拟请求效果
				setTimeout(()=>{
					uni.showToast({title: '验证码已发送',icon:"none"});
					//示例默认1234，生产中请删除这一句。
					this.code=1234;
					this.setTimer();
				},1000)
				
				
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(()=>{
					if(holdTime<=0){
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return ;
					}
					this.getCodeText = "重新获取("+holdTime+")"
					holdTime--;
					
				},1000)
			},
			doReset(){
				uni.hideKeyboard()
				//模板示例部分验证规则
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 

				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				if(this.code!=1234){ 
					uni.showToast({title: '验证码不正确',icon:"none"});
					return false; 
				}
				uni.showLoading({
					title: '提交中...'
				})
				//模板示例修改本地储存的用户信息，实际使用中请替换为上传服务器修改。
				setTimeout(()=>{
					uni.getStorage({
						key: 'UserList',
						success: (res)=>{
							uni.hideLoading()
							for(let i in res.data){
								let row = res.data[i];
								if(row.username==this.phoneNumber){
									//修改记录，密码md5
									res.data[i].passwd = md5(this.passwd);
									uni.setStorage({
										key: 'UserList',
										data: res.data,
										success: function () {
											uni.showToast({title: '密码已重置',icon:"success"});
											setTimeout(()=>{
												uni.navigateBack();
											},1000)
										}
									});
									return ;
								}
							}
							uni.showToast({title: '手机号码未注册',icon:"none"});
							
						},
						fail:function(e){
							uni.hideLoading()
							uni.showToast({title: '手机号码未注册',icon:"none"});
						}
					});
				},1000)
				
				
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";

	
</style>
