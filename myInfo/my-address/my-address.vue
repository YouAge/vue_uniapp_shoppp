<template>
	<view class="content b-t cu-list menu-avatar">
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"  @tap="checkAddress(item)"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
			 v-for="(item, index) in userAdds" :key="index">
				<view class="content add-cont">
					<view class="text-grey">
						<text v-if="item.default" class="tag">默认</text>
						<text class="address">{{item.addressName}} {{item.area}}</text>
					</view>
					<view class="text-gray text-sm box-text">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
				</view>
				<view class="action">
					<text class="yticon icon-bianji" @click.stop="addAddress('edit',item)"></text>
				</view>
				<view class="move" style="width: 150rpx;flex: 1;">
					<view class="bg-red" @click.stop="delAdds(item)">删除</view>
				</view>
			</view>
		</view>
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {adds} from '../../mock/datas/index.js'
	export default {
		data() {
			return {
				listTouchStart: 0,
				listTouchDirection: null,
				modalName:null,
				source: 0,
			}
		},
		onShow() {
			// 获取地址
			this.setAdd(adds)
		},
		onLoad(option){
		 //  实际开发中，这个应该是不需要的，这只是修复，未选择地址返回时为空的情况
		 if (this.userAdds.length >0){
			 this.userAdds.some(res=>{
				 if (res.default){
					 this.setPaymentAdds(res)
				 }
			 })
		 }
		 
		},
		computed:{
		  ...mapState({
			  userAdds:state=>state.user.userAdds,
			  addPitch:state=>state.user.addPitch
			  })
		},
		methods: {
			...mapMutations(['setPaymentAdds','setAdd','defAdd']),
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
			},
			//选择地址
			checkAddress(item){
				if (this.addPitch){
					// 数据添加到，
					this.setPaymentAdds(item)
					// 跳转上一页
					uni.navigateBack()
				}
				
			},
		
			addAddress(type, item){
				// 修改，添加地址
				uni.navigateTo({
					url: `./addInfo?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			delAdds(item){
				this.defAdd(item)
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
		
	}
	.add-cont{
		left: 30rpx !important;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.address{
		color:  #606266;
		font-weight: bolder;
	}
/* // 地址 */

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

/* ?? */
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
