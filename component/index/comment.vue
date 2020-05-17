<template>
<!-- 评价 -->
	<view class="eva-section">
		<view class="e-header">
			<text class="tit">评价</text>
			<text>(86)</text>
			<text class="tip">好评率 100%</text>
			<text class="yticon icon-you"></text>
		</view> 
		<view class="eva-box">
			<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
			<view class="right">
				<text class="name">Leo yo</text>
				<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
				<view class="comment-img" v-if="imgs.length >0">
					<image :src="item.url" @tap="CkickImage(index)" v-for="(item,index) in imgs" :key='index'></image>
				</view>
				<view class="bot">
					<text class="attr">购买类型：XL 红色</text>
					<text class="time">2019-04-01 19:21</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgs:[
					{url:'http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg'},
					{url:'http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg'}

				]
			}
		},
		methods:{
			CkickImage(index){
				let urllist = this.imgs.map(res=>{
					return res.url
				})
				uni.previewImage({
					current:index,  // 查看图标的 索引，确保用户点击
					urls:urllist // 必须时数组
				})
			}
		}
	}
</script>

<style lang="scss">
	
		/* 评价 */
		.eva-section{
			display: flex;
			flex-direction: column;
			padding: 20upx 30upx;
			background: #fff;
			margin-top: 16upx;
			.e-header{
				display: flex;
				align-items: center;
				height: 70upx;
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				.tit{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					margin-right: 4upx;
				}
				.tip{
					flex: 1;
					text-align: right;
				}
				.icon-you{
					margin-left: 10upx;
				}
			}
		}
		.eva-box{
			display: flex;
			padding: 20upx 0;
			.portrait{
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100px;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $font-base;
				color: $font-color-base;
				padding-left: 26upx;
				.con{
					font-size: $font-base;
					color: $font-color-dark;
					padding: 20upx 0;
				}
				.bot{
					display: flex;
					justify-content: space-between;
					font-size: $font-sm;
					color:$font-color-light;
				}
			}
		}

	.comment-img{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		box-sizing: border-box;
		image{
			width: calc(100% / 3);
			height: 200rpx;
			margin: 5rpx;
		}
	}

</style>
