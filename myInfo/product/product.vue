<template>
	<!-- 商品详情 -->
	<view class="product">
		<!-- // 轮播图 -->
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in shopDatas.taobao_image" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
			<!-- 商品信息	 -->
		<view class="introduce-section">
			<!-- <text class="title">{{shopDatas.shopName}}</text> -->
			<view class="title"><text style="color: red;">【{{shopDatas.shopName}}】</text> {{shopDatas.shoptitle}}</view>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{shopDatas.gooddata.itemendprice }}</text>
				<text class="m-price">¥{{shopDatas.gooddata.itemprice }}</text>
				<text class="coupon-tip">7折</text>
			</view>
			<view class="bot-row">
				<text>销量:{{shopDatas.gooddata.itemsale}}</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view>
		</view>
		
	<!--  分享 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<!-- 分享组件 -->
		<Share ref="share" :contentHeight="580" :shareList="shareList"></Share>
		
		<!-- // 列表 -->
	<view class="c-list">
		<view class="c-row b-b" @click="toggleSpec">
			<text class="tit">购买类型</text>
			<view class="con">
				<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
					{{sItem.name}}
				</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="c-row b-b">
			<text class="tit">优惠券</text>
			<text class="con t-r red">领取优惠券</text>
			<text class="yticon icon-you"></text>
		</view>
		<view class="c-row b-b">
			<text class="tit">促销活动</text>
			<view class="con-list">
				<text>新人首单送20元无门槛代金券</text>
				<text>订单满50减10</text>
				<text>订单满100减30</text>
				<text>单笔购买满两件免邮费</text>
			</view>
		</view>
		<view class="c-row b-b">
			<text class="tit">服务</text>
			<view class="bz-list con">
				<text>7天无理由退换货 ·</text>
				<text>假一赔十 ·</text>
			</view>
		</view>
	</view>
	
	<!-- // 商品选项 -->
	
		<!-- 规格-模态层弹窗 -->
		<!-- @touchmove.stop.prevent="stopPrevent" -->
			<view 
				class="popup spec" 
				:class="specClass"
				@tap="toggleSpec">
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer attr-content" @click.stop="stopPrevent">
					<view class="mg-cancel" @click="toggleSpec">x</view>
					<view class="a-t">
						<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
						<view class="right">
							<text class="price">¥328.00</text>
							<text class="stock">库存：188件</text>
							<view class="selected">
								已选：
								<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
									{{sItem.name}}
								</text>
							</view>
						</view>
					</view>
				
					<view v-for="(item,index) in specList" :key="index" class="attr-list">
						<text>{{item.name}}</text>
						<view class="item-list">
							<text 
								v-for="(childItem, childIndex) in specChildList" 
								v-if="childItem.pid === item.id"
								:key="childIndex" class="tit"
								:class="{selected: childItem.selected}"
								@click="selectSpec(childIndex, childItem.pid)">
								{{childItem.name}}
							</text>
						</view>
					</view>
					<view class="mg-number">
						<view>数量：</view>
						<NumberAdd class="nuber" :value=shopNumber :max='20'
						 :min=1 :step='1' @change="numberChange"></NumberAdd>
					</view>
					
					<block v-if="stopstated !=='none'">
						<button class="btn" @click.stop="bugConmp">确定</button>
					</block>
						<view v-else class="btn-buy">
							<button class="btn" @click.stop="shopCart('hide')">加入购物车</button>
							<button class="btn" @click.stop="buy('hide')">立即购买</button>
						</view>
				</view>
			</view>
	
	
	<!-- // 评论区 -->
	
	<Conmment></Conmment>
	
	
		<Coard>
			<template  v-slot:title>
				<text>商品详情</text>
			</template>
			
			<!--商品详情图-->
			<template v-slot:content>
				<view>
					<image class='details-img' v-for="(item,index) in shopDatas.taobao_image" :key='index' :src="item"></image>
				</view>
			</template>
			
		</Coard>

		
	<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn badge-tg">
				<view class="yticon icon-gouwuche">
					<view class="cu-tag badge badge-number" v-if="totalCount.goodNum">{{totalCount.goodNum}}</view>
				</view>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>
			
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @tap="shopCart('show')">加入购物车</button>
				<button type="primary" class=" action-btn no-border add-cart-btn"  @tap="buy('show')">立即购买</button>
			</view>
		</view>
		
	
	</view>
</template>

<script>
	import {mapMutations,mapGetters,mapState} from 'vuex'
	
	import Share from '../../component/commont/Share'
	import Conmment from '../../component/index/comment.vue'
	import NumberAdd from '../../component/NumberAdd.vue'
	import Coard from '../../component/commont/Coard.vue'
	export default {
		components:{
			Share,
			Conmment,
			NumberAdd,
			Coard
		},
		data() {
			return {
				favorite: true,
				menuArrow: 'false',
				specClass: 'none', // show
				shopDatas:{},// 店铺商品数据
				specSelected:[],  // 选中属性 
				stopstated:'none', // 'buy'//'cart' //'none'
				specChildList:[], // 属性
				shopNumber:1,
				specList:[], // 初始化规格数据
				shareList: [{
						type: 1,
						icon: '/static/temp/share_wechat.png',
						text: 'weixin',
						name: "微信"
					},
					{
						type: 2,
						icon: '/static/temp/share_moment.png',
						text: 'weixin2',
						name: "朋友圈"
					},
					{
						type: 3,
						icon: '/static/temp/share_qq.png',
						text: 'qq',
						name: "QQ"
					},
					{
						type: 4,
						icon: '/static/temp/share_qqzone.png',
						text: 'qq',
						name: "QQ空间"
					}
				],
			}
		
		},
		onResize(e){
			console.log(e)
		},
		computed:{
			...mapGetters(['totalCount']),
			...mapState({
				shopList:state=>state.cat.list,
				loginStartus:state=>state.user.loginStartus
				// sameitems:state=>state.cat.sameitems
			})
		},
		onShow() {
			// 每次进入都获取 onLoad只初始化一次
			this.shopDatas = uni.getStorageSync('shopName')
		},
		onLoad(options) {
			// 接收页面进来的商品id值
			let id = options.shopName
			if(id){
				this.$api.msg(`进入商品${id}`)
			}
			// 添加历史
			this.apphistoryLog(uni.getStorageSync('shopName'))
			//
			this.$http.request({
				url:'/specchildlist'
			}).then(res=>{
				this.specChildList = res.specChildList
				this.specList = res.specList
				// 数据处理
				this.specList.forEach(item=>{
					for (let j of this.specChildList){
						if(j.pid ===item.id){
							this.$set(j,'selected',true) //设置属性，selected:true
							this.specSelected.push(j)
							break; // 结束for循环，只加入一个， selected:true
						}
					}
				})
				console.log('初始化规格',this.specSelected)
			})	
		},
		methods: {
			...mapMutations(['judgeCordItem','appendShop','apphistoryLog']),
			numberChange(value){
				// 获取数量
				this.shopNumber = value
			},
			selectSpec(index,pid){
				// 商品类型 显示
				let list = this.specChildList
				list.forEach(item=>{
					if(item.pid==pid){
						this.$set(item,'selected',false)
					}
				})
				this.$set(list[index], 'selected', true);
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){ 
						this.specSelected.push(item); 
					} 
				})
				console.log('规格',this.specSelected)
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			// <!-- 规格-模态层弹窗 -->
			toggleSpec(){
				// 显示商品，属性，和隐藏
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
						this.stopstated = 'none'
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				};			
			},
			stopPrevent(e){
				 // event.preventDefault() 穿透
				return false
			},
			buy(e){
				console.log('点击购买')
				this.toggleSpec()
				if(e==='show') {this.stopstated = 'buy'}
				else{
					if (this.LoginBase()) return
					this.bugBuy()
				}
			},
			shopCart(e){
				//在点击属性中 ，加入购物车
				this.toggleSpec()
				if (e==='show'){this.stopstated = 'cart'}
				else{
					if (this.LoginBase()) return
					// console.log('添加购物车成功')
					this.getNewGoodData()
					this.judgeCordItem(this.shopDatas)
					this.$api.msg('添加到购物车')
				}

			},
			bugConmp(){
				if (this.LoginBase()) return
				// 点击购物车还是购买时，确认的判断
				this.toggleSpec()
				if (this.stopstated === 'buy'){
					this.bugBuy()
				}else if(this.stopstated === 'cart'){
					// console.log('添加购物车成功')	
					this.getNewGoodData() 
					this.judgeCordItem(this.shopDatas)
					// console.log(this.shopList)
					this.$api.msg('添加到购物车')
					
				}
				this.stopstated='none'
				
			},
			toFavorite(){
				console.log('添加搜查成功')
				this.favorite = !this.favorite;
			},
			bugBuy(){
				this.getNewGoodData()
				this.appendShop(this.shopDatas)
				console.log(this.shopDatas)
				// 直接购买
				uni.navigateTo({
					url:'../../pages/orderItems/orderItems'
				})
			},
			// 获取商品新数据，
			getNewGoodData(){
				this.shopDatas.gooddata.shopNumber =this.shopNumber
				this.shopDatas.gooddata.attribute = this.specSelected
				this.shopDatas.gooddata=[this.shopDatas.gooddata]
				this.shopDatas.goodLend = 1
			},
			// 判读是否登入，跳转登入页面
			LoginBase(){
				if (!this.loginStartus){
					this.$api.msg('请先登入')
					uni.navigateTo({
						url:'../login/login'
					})
					return true
				}
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>

	    .alpha {
	     height: 100%;
	     overflow: hidden;
	    }
	    .alpha page {
	     height: 100%;
	     overflow: hidden;
	    }

	.mg-number{
		margin: 20rpx;
		display: flex;
		justify-content: space-between;
		
		.nuber{
			height: 50rpx;
		}
	}

	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}

/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		display: flex;
		flex-direction: column;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			// height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}




	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

// 列表

.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		position: relative;
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			bottom: -100;
			width: 100%;
			height: 100%;
			z-index: 50;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	.btn-buy{
		display: flex;
		.btn{
			flex: 1;
		}
		
	}

	/* 底部操作菜单 */
	.badge-tg{
		position: relative;
	}
	.page-bottom{
		position:fixed;
		// left: 30upx;
		// bottom:30upx;
		bottom: 0;
		left: 0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100rpx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}


// #----
.details-img{
	width: 100%;
	height:345px;
}

	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}

.mg-cancel{
	position: absolute;
	right: 30rpx;
	top: 10rpx;
	height: 10rpx;
	width: 10rpx;
	border-radius: 5rpx;
	background-color: #F7F7F7;
}
</style>
