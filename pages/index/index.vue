<template>
	<view class="container">
		<Search :color='searchColor'></Search>
		<!--header-->
		<view class="tui-header-banner">
			<view class="tui-hot-search" style="margin-top:10rpx;">
				<view>热搜</view>
				<view class="tui-hot-tag"  @tap="search(item)" :key='index' v-for="(item,index) in hotSearch">{{item}}</view>
			</view>
			<!-- // lunbitu -->
			<view class="tui-banner-bg">
				<view class="tui-primary-bg tui-route-left"></view>
				<view class="tui-primary-bg tui-route-right"></view>
				<!--banner-->
				<view class="tui-banner-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper"
					 :circular="true" indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#fff">
						<swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="detail">
							<image :src="'/static/images/mall/banner/'+item" class="tui-slide-image" mode="scaleToFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>


		<!-- 中间菜单 -->
		<template>
			<SlideBar></SlideBar>
		</template>



		<!-- 限时秒杀 -->
		<template>
			<SeckillMg :goodsList='goodsList' :times='killTime'></SeckillMg>
		</template>



		<view class="tui-product-box tui-pb-20 tui-bg-white">
			<view class="tui-group-name" @tap="more">
				<text>新人专享</text>
				<tui-icon name="arrowright" :size="20" color="#555"></tui-icon>
			</view>
			<view class="tui-activity-box" @tap="detail">
				<image src="/static/images/mall/activity/activity_1.jpg" class="tui-activity-img" mode="widthFix"></image>
				<image src="/static/images/mall/activity/activity_2.jpg" class="tui-activity-img" mode="widthFix"></image>
			</view>
		</view>

		<view class="tui-product-box tui-pb-20 tui-bg-white">
			<view class="tui-group-name" @tap="more">
				<text>新品推荐</text>
				<tui-icon name="arrowright" :size="20" color="#555"></tui-icon>
			</view>
			<view class="tui-new-box">
				<view class="tui-new-item" :class="[index!=0 && index!=1 ?'tui-new-mtop':'']" v-for="(item,index) in newProduct"
				 :key="index" @tap="detail">
					<image :src="'/static/images/mall/new/'+(item.type==1?'new':'discount')+'.png'" class="tui-new-label" v-if="item.isLabel"></image>
					<view class="tui-title-box">
						<view class="tui-new-title">{{item.name}}</view>
						<view class="tui-new-price">
							<text class="tui-new-present">￥{{item.present}}</text>
							<text class="tui-new-original">￥{{item.original}}</text>
						</view>
					</view>
					<image :src="'/static/images/mall/new/'+item.pic" class="tui-new-img"></image>
				</view>
			</view>
		</view>

		<!-- // 推介 -->
		<view class="tui-product-box">
			<view class="tui-group-name">
				<text>热门推荐</text>
			</view>
			<ShopList :productList='shopGoodList'></ShopList>
		</view>

		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red" :text="contentText.contentnomore" ></tui-loadmore>
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
		<SocllBut :scrollTop='scrollTop' @topScrollTap='topScrollTap'></SocllBut>
		
	</view>
</template>
<script>
	import tuiIcon from "@/component/ThorUi/icon/icon"
	import tuiTag from "@/component/ThorUi/tag/tag"
	import tuiLoadmore from "@/component/ThorUi/loadmore/loadmore"
	import tuiNomore from "@/component/ThorUi/nomore/nomore"
	// --
	import SlideBar from '../../component/my/SlideBar.vue'
	import IconText from '../../component/my/IconText.vue'
	import SeckillMg from '../../component/index/SeckillMg.vue'
	import ShopList from '../../component/index/ShopList.vue'
	import Search from '../../component/index/Search.vue'
	// 
	import SocllBut from '../../component/commont/SocllBut.vue'
	import {
		menuList,
		goodsList
	} from '@/mock/datas/index.js'
	
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiLoadmore,
			tuiNomore,
			SlideBar,
			IconText,
			Search,
			SeckillMg,
			ShopList,
			SocllBut
		},
		data() {
			return {
				menuList: menuList,
				goodsList: goodsList,
				scrollTop: false,
				searchColor:'red',
				TabCur: 0,
				timer:'',
				killTime:{
					d:'00',
					h:'00',
					i:'00',
					s:'00',
					tim:'00'
				},
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				// ---------
				current: 0,
				hotSearch: [
					"休闲零食",
					"自热火锅",
					"小冰箱迷你",
					'iphone12'
				],
				banner: [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
				],
				newProduct: [{
					name: "时尚舒适公主裙高街修身长裙",
					present: 198,
					original: 298,
					pic: "1.jpg",
					type: 1,
					isLabel: true
				}, {
					name: "高街修身雪纺衫",
					present: 398,
					original: 598,
					pic: "2.jpg",
					type: 2,
					isLabel: true
				}, {
					name: "轻奢商务上衣",
					present: 99,
					original: 199,
					pic: "3.jpg",
					type: 1,
					isLabel: true
				}, {
					name: "品质牛皮婚鞋牛皮婚鞋品质就是好",
					present: 99,
					original: 199,
					pic: "5.jpg",
					type: 1,
					isLabel: true
				}, {
					name: "轻奢时尚大包限时新品推荐",
					present: 99,
					original: 199,
					pic: "6.jpg",
					type: 1,
					isLabel: false
				}, {
					name: "高街修身长裙",
					present: 999,
					original: 1299,
					pic: "4.jpg",
					type: 2,
					isLabel: true
				}],
				// 新品推介
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				// 商品
				shopGoodList: []
			}
		},
		onLoad() {
			// console.log(this.menuList.menuList)
			console.log('--', this.menuList, this.goodsList);

			// 获取导航栏高度， 设置搜索框自动适应
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.statusBarHeight)
				}
			})
			this.getIndexItemList()
			
		},
		onShow() {
			if (this.timer ===''){
				this.setTimeKill()
			}else{
				console.log('chufa')
				clearInterval(this.timer)
				this.setTimeKill()
			}
			
		},
		onHide(){
			// 进入后台 这个就是 tabr的卸载页面功能
			clearInterval(this.timer)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onPageScroll: function(e) {
			// 监听滑动
			this.scrollTop = e.scrollTop > 300;
			if (this.scrollTop) {this.searchColor='#ffffff;'}else{
				this.searchColor='#E41F19;'
			}
		},
		methods: {
			// 跳转详情页
			detail: function() {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				})
			},
			
			topScrollTap(){
				// 回顶部按钮
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
			},
			
			// 跳转 新品推介
			more: function(e) {
				let key = e.currentTarget.dataset.key || "";
				uni.navigateTo({
					url: '../../myInfo/product/product?id=' + key
				})
			},
			// 跳转搜索叶面
			search: function() {
				uni.navigateTo({
					url: '../cetop/cetop'
				})
			},
			// 获取首页商品信息列表
			getIndexItemList() {
				console.log('----')
				// let baseUrl = 'https://www.gomyorder.cn/'
			let url = `api/supersearch/apikey/maxd/keyword/%E5%A5%B3%E8%A3%85/back/20/sort/2/min_id/${this.pageIndex}/is_coupon/1/tb_p/`
				this.$fly.get(url).then(res => {
					const {
						data,
						code,
						min_id,
						msg
					} = res.data
					// 对数据进行处理一下，改成自己需要的样式，
					const GoodList = this.$tol.shop_data(data)
					this.shopGoodList.push(...GoodList)
				})
			},
			setTimeKill(){
				// 秒杀倒计时
				this.timer = setInterval(()=>{
					this.killTime = this.$tol.downTime()
				},1000)
				
			}
			
			
		},
		onPullDownRefresh: function() {
			// 下拉刷新
			this.pageIndex = 1;
			this.shopGoodList =[]
			this.getIndexItemList()
			this.pullUpOn = true;
			this.loadding = false
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			// 到底部
			console.log('到底部了')
			// if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 10) {
				this.loadding = true;
				this.pullUpOn = false
			} else {
				this.pageIndex += 1;
				this.getIndexItemList()
				this.loadding = false
			}
		}
	}
</script>

<style scoped lang="less">
	@import './index.css';
</style>
