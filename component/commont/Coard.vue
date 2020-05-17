<template>
	<!-- // 插槽  卡片 -->
	<view class="product-box">
		<view class="group-name">
			<!-- <text>热门推荐</text> -->
			<slot name="title"></slot>
		</view>
		<slot name="content"></slot>
	</view>
</template>

<script>
	
</script>

<style scoped>
.product-box {
		margin-top: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
.group-name {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		padding: 24rpx 0;
	}
</style>
