import store from '@/store/index.js'
export default{
	common:{
		baseUrl:"https://www.fastmock.site/mock/dc057b6bf9537acad8dee45d1c4debdd/aip01",
		data:{},
		header:{
			"Content-Type":"application/json",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET",
		dataType:"json"
	},
	request( options={} ){
		
		uni.showLoading({
		    title: '加载中'
		});
		options.baseUrl = options.baseUrl || this.common.baseUrl
		options.url = options.baseUrl + options.url;
		options.data = 	options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = 	options.dataType || this.common.dataType;
		
		//判断是否传入了header头的token进行用户是否登录的验证
		if(options.header.token){
			options.header.token = store.state.user.token;
			if(!options.header.token){
				uni.showToast({
					title:"请先登录",
					icon:"none"
				})
				return uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
		
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					if(result.data.code != "0000"){
						return rej();
					}
					setTimeout(function () {
					    uni.hideLoading();
					}, 500);
					let data = result.data.data;
					res(data);
				}
			})
		})
	}
}