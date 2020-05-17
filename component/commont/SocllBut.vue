<template>
	<!-- 悬浮上拉 -->
	<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']">
		<text class="cuIcon-usefullfill"></text>
	</view>
</template>

<script>
	export default {
		props:{
			scrollTop:{
				default:false
			}
		},
		methods:{
			topScrollTap(){
				this.$emit('topScrollTap')
			}
		}
		
	}
</script>

<style scoped>
	.scroll_top {
	    background: rgba(51, 51, 51, .8);
	    width: 35px;
	    height: 35px;
	    border-radius: 35px;
	    -moz-border-radius: 35px;
	    -webkit-border-radius: 35px;
	    -o-border-radius: 35px;
	    -ms-border-radius: 35px;
	    text-align: center;
	    line-height: 35px;
	    color: #fff;
	    position: fixed;
	    z-index: 1;
	    zoom: 1;
	    right: 38rpx;
	    bottom: 20rpx;
	    opacity: 0;
	    -webkit-transform: translateY(100px) translateX(0);
	    transform: translateY(100px) translateX(0);
	    transition: all .4s ease 0s;
	    -o-transition: all .4s ease 0s;
	    -moz-transition: all .4s ease 0s;
	    -webkit-transition: all .4s ease 0s;
	    transform-origin: center;
	}
	
	.scroll_top.active {
	    opacity: 1;
	    -webkit-transform: translateY(-25px) translateX(0);
	    transform: translateY(-25px) translateX(0);
	}
</style>
