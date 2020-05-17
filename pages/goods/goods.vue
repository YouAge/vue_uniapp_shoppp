<template>
	<view class="content">
		<!-- 导航 -->
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 4}" @click="tabClick(4)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 4}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 4}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<!-- 商品 -->
		<block v-if='goodsList.length >0'>
			<ShopList :productList="goodsList"></ShopList>
		</block>
		<view v-else style="height: 500rpx; width: 100%; text-align: center;">
			<text> 没有搜索到您想要的数据， 换别的搜索看看</text>
		</view>

		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red" :text="contentText.contentrefresh" ></tui-loadmore>
		<!-- <view style="align-items: center; text-align: center; color: red;">没有更多数据了</view> -->
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
		<SocllBut :scrollTop='scrollTop' @topScrollTap='topScrollTap'></SocllBut>
	</view>
</template>

<script>
	import ShopList from '../../component/index/ShopList.vue'
	import SocllBut from '../../component/commont/SocllBut.vue'
	export default {
		components: {
			ShopList,
			SocllBut
		},
		data() {
			return {
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				goodsList: [], // 搜到的的商品
				keyWork:'' ,// 要搜索的商品关键词
				pddSort:5,
				scrollTop:false,
				loadding:false,
				pageIndex:1,
				pullUpOn:true,
				sort:0 //  排序编号，2，销量，0是综合，4低价，6高佣金，1最新
			};
		},
		onPageScroll: function(e) {
			// 监听滑动
			console.log('huadong')
			this.scrollTop = e.scrollTop > 300;
		},
		onLoad(options){
			this.keyWork = options.keyWork;
			this.loadData()
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			console.log(this.headerTop)
			// #endif	
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			console.log('下拉刷新，重新加载')
		},
		//加载更多
		onReachBottom(){
			console.log('加载到底部了')
			this.loadding = true;
			if (this.pageIndex == 10) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				this.pageIndex += 1;
				this.loadData()
				this.loadding = false
			}
			
	
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			loadData() {
				// 获取关键字搜素的数据
				let url = `api/supersearch/apikey/maxd/keyword/${this.keyWork}/back/20/sort/${this.sort}/min_id/${this.pageIndex}/is_coupon/1/tb_p/${this.pageIndex}`
				this.$fly.get(url).then(res=>{
					const {data,code,min_id,msg} = res.data
					console.log(url)
					if (data.length >0){
						// 对数据进行处理一下，改成自己需要的样式，
						const GoodList = this.$tol.shop_data(data)
						this.goodsList.push(...GoodList)
					}	
				})
			},
			//筛选点击
			tabClick(index){
				if (this.filterIndex === index && index !==4) return;
				this.filterIndex = index
				this.sort = index
				if (this.filterIndex ===4){
					this.priceOrder =this.priceOrder ===1?2:1
					if (this.priceOrder === 1) this.sort =1 
				}else{
					this.priceOrder =0
				}
				// 加载数据，根据索引加载不同的数据
				this.goodsList=[]
				this.loadData()
					
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){},
			topScrollTap(){
				// 回顶部按钮
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>
