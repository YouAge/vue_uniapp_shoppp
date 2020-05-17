export default{
	state:{
		// 登入状态
		loginStartus:false,
		//token
		token:null,
		// 用户信息
		userInfo:{},
		// 我的地址,所有，
		userAdds:[],
		// 付款地址
		paymentAdds:{},
		loginNumber:[
			{phoneNumber: '15607195236',
				passwd:'123456'}
		],
		addPitch:false ,// 判断是 付款进入，还是设置中页面进入
		modifyAdd:{}, // 待修改的地址，存储
	
	},
	getters:{},
	mutations:{
		
		// 获取用户信息，打开app时获取用户信息
		initUser(state){
			let userInfo = uni.getStorageInfoSync('userInfo')
			if(userInfo){
				userInfo.JSON.parse(userInfo);
				state.userInfo = UserInfo,
				state.loginStartus = true;
				state.token = UserInfo.token || UserInfo.openId || UserInfo.OpenId
			}
		},
		
		// 登入后保存用户信息
		login(state,UserInfo){
			state.userInfo = UserInfo,
			state.loginStartus = true;
			state.token = UserInfo.token
			console.log('----------（）',state.userInfo,state.loginStartus)
			// 永久缓存信息
			uni.setStorageSync('userInfo',JSON.stringify(UserInfo));			
		},
		verifyLogin(state,data){
			if ( state.loginNumber.forEach(res=>{
				if(res.phoneNumber === data.phoneNumber && res.passwd === data.passwd) return true
			})) return true
			return false
			
		},
		// 新增用户
		apdloginNumber(state,data){
			state.loginNumber.push(data)
		},
	
		// 推出登入
		loginOut(state){
			state.loginStartus = false;
			state.userInfo ={},
			state.token = null,
			uni.removeStorageSync('userinfo')
		},
		
		// 获取用户地址
		setAdd(state,adds){
			state.userAdds = adds
		},
		// 添加用户地址
		appendAdd(state,adds){
			if (state.userAdds.length >0){
				if(state.userAdds.some((res,index)=>{
						if (res.id === adds.id){
							if (adds.default){
								state.userAdds.forEach(res=>{
									res.default = false
								})
							}
							state.userAdds[index] = adds
							return true
						}
						
					})){return} else {
						if (adds.default){
							state.userAdds.forEach(res=>{
								res.default = false
							})
						}
						state.userAdds.push(adds)
					}
				
			}else {
				adds.default = true
				state.userAdds.push(adds)
			}
		
		},
		defAdd(state,item){
			state.userAdds.some((res,i)=>{
				if (res.id === item.id ){
					// 如果删除的是默认的，将第一个设置成默认的
					state.userAdds.splice(index,1)
					return
				}
			})
			
		},
		// 设置 购买地地址
		setPaymentAdds(state,item){
			state.paymentAdds =item
		},
		setAddPitch(state,stated){
			state.addPitch = stated
		}
		
		
	},
	actions:{
		
		
	}
}