<template>
	<view class="product-container">
		<view class="product-item" v-for="(item,index) in productList" :key='index'>
			<ShopItem :Product='item'></ShopItem>
		</view>
	</view>
</template>

<script>
	import ShopItem from '../commont/ShopItem.vue'
	export default{
		components:{
			ShopItem
		},
		props:{
			productList:{
				type:Array
			}
		},
		data(){
			return{}
		},
		methods:{
			
		}
	}
	
</script>

<style scoped>
	
	.product-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;
	
	}
	
	.product-container:last-child {
		margin-right: 0;
	}
	
	.product-item{
		width: 48%;
		margin-right: 2%;
	}
</style>
