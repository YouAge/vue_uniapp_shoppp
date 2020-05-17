<template>
	<view>
	<view class="cu-list menu-avatar">
		<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
		 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
			<view class="content">
				<view class="text-grey">
					<text v-if="defop" class="tag">默认</text>
					<text class="address">是覅少  是否合适了进来</text>
				</view>
				<view class="text-gray text-sm box-text">
					<text class="name">闪电发货</text>
					<text class="mobile">sahfdjsah</text>
				</view>
			</view>
			<view class="action">
			</view>
			<view class="move">
				<view class="bg-grey">修改</view>
				<view class="bg-red">删除</view>
			</view>
		</view>
	</view>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			defop:1,
			listTouchStart: 0,
			listTouchDirection: null,
			modalName: null,
		}
	},
	methods:{
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},

		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},

		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		}
	}
}
	
</script>

<style scoped lang="less">
	.content{
		left: 30rpx !important;
	}
	.tag{
			font-size: 24upx;
			color: red;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		
		
	.box-text{
		font-size: 28upx;
		color:#909399;
		margin-top: 16upx;
	}
	.box-text .name{
		margin-right: 30upx;
	}
</style>
