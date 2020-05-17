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
				<input placeholder="请输入手机号" v-model="dataReg.phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="dataReg.code" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="dataReg.passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				dataReg:{
					phoneNumber:"",
					code:'',
					passwd:"",
				},
				 userInfo: {
				      username: "zhangsan",
				      userId: 234,
				      avator: "http://static.blinkfox.com/20190601.png",
				      token: "e10adc3949ba59abbe56e057f20f883e"
				    },
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false,
				moCode:'',
				
			}
		},
		onLoad() {
		
		},
		computed:{
				...mapState({
					loginNumber:state=>state.user.loginNumber
				})
		},
		methods: {
			...mapMutations(['apdloginNumber','apdloginNumber','login']),
			Timer(){},
			// 模拟获取验证码
			getCode(){
				uni.hideKeyboard()
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.dataReg.phoneNumber))){ 
					this.$api.msg('请填写正确手机号码')
					return false; 
				}
				this.loginNumber.forEach(res=>{
					if (res.iphon === this.dataReg.phoneNumber){
						this.$api.msg('手机号码已经被注册')
						return false; 
					}
				})
				
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				//示例用定时器模拟请求效果
				setTimeout(()=>{
					this.$api.msg('验证码已发送')
					// 用来测试 随机给定验证码
					let randomNum =('000000' + Math.floor(Math.random() * 999999)).slice(-6)
					this.moCode = randomNum
					this.dataReg.code=this.moCode;
					this.setTimer();
				},1000)
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(10)"
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
			doReg(){
				// 注册前验证
				
				uni.hideKeyboard()
				//模板示例部分验证规则
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.dataReg.phoneNumber))){ 
					this.$api.msg('请填写正确手机号码')
					return false; 
				} 
				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				if(this.dataReg.code!=this.moCode){ 
					this.$api.msg('验证码不正确')
					return false; 
				}
				uni.showLoading({
					title: '提交中...'
				})
				
				if (this.dataReg.passwd ==='' || this.dataReg.passwd.length<6 || this.dataReg.passwd.length>16 ){
					this.$api.msg('密码不能为空和小于6为大于16为')
					return false
				}
				console.log(this.dataReg)
				this.apdloginNumber(this.dataReg) 
				this.login(this.userInfo)
				uni.hideLoading()
				this.$api.msg('注册成功')
				setTimeout(function(){
					uni.navigateBack();
				},1000)
				
				
				// this.$http.request({
				// 	// method:'GET',
				// 	url:'/login',
				// 	data:this.dataReg
				// }).then((res)=>{
				// 	// 缓存起来， 实际中这里是后台给的结果，直接判断就行了
					
				// }).catch((err)=>{
				// 	uni.hideLoading()
				// 	this.$api.msg('注册失败')
				// })
				

			},
			toLogin(){ 
				uni.hideKeyboard()
				uni.redirectTo({url: 'login'});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
</style>

