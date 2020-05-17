<template>

	<view class="mg-search round" style="width: 100%;">
		<!-- <text class="cuIcon-search" style="font-size: 38rpx;"></text>
		<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
		<text class="cuIcon-camera" style="padding-right: 2px;font-size: 38rpx;"></text> -->
		
		
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input type="text" placeholder="儿童口罩" confirm-type="search" @input="searchIcon"></input>
		</view>
	</view>

</template>

<script>
	export default{
		props:{
			color:String,
			default: 'red'
		}
	}
	
</script>

<style scoped>
	.mg-search{
		display: flex;
		height: 100%;
	}
	
</style>
