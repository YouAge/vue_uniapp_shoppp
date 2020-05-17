<template>
	<!-- 搜索框 -->
	<view class="cu-bar search fixed" style="width: 100%;" :style="{backgroundColor:color}">
		<view class="search-form round" style="margin: 0rpx 10rpx">
			<text class="cuIcon-search"></text>
			<input type="text" placeholder="儿童口罩" disabled  @tap="serchTo" confirm-type="search"></input>
			<text class="cuIcon-camera" @tap='picture' style="padding-right: 2px;font-size: 38rpx;"></text>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			color:{
				type:String,
				default:'#E41F19'
			}
		},
		methods:{
			serchTo(){
				uni.navigateTo({
					url:'../../pages/search/search'
				})
			},
			
			picture(){
				// 获取用户摄像头授权，
				// uni.authorize({
				//     scope: 'scope.camera',
				//     success() {
				//         // uni.getLocation()
				// 		console.log('获取用户授权')
				//     }
				// })
				
				
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera','album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
				    },
					complete:function(res){
						console.log(res)
					}
				});
				
			},
			takePhoto(){
				
			}
		}
	}
</script>

<style>
	
</style>
