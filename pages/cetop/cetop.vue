<template>
	<view>
		<!-- // 测试页面 -->
	
			<SlideBar></SlideBar>
			<shop-list :productList='productList'></shop-list>
			<Comment></Comment>
			<GoodShop></GoodShop>
			<Coupon :maskState='show'></Coupon>
			<Adds></Adds>
			
			<Card></Card>
			<!-- <sanD></sanD> -->
			
		<view>
		   <camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		   <button type="primary" @click="takePhoto">拍照</button>
		   <view>预览</view>
		   <image mode="widthFix" :src="src"></image>
	   </view>
	</view>
</template>

<script>
	import SlideBar from '../../component/my/SlideBar.vue'
	import ShopList from '../../component/index/ShopList.vue'
	import Comment from '../../component/index/comment.vue'
	import GoodShop from '../../component/commont/GoodShop.vue'
	import Coupon from '../../component/commont/Coupon.vue'
	import Adds from '../../component/commont/adds.vue'
	import Card from '../../component/cated.vue'
	import sanD from '../../component/taestUp/sanD.vue'
	export default {
		props:{
			
		},
		components:{
			SlideBar,
			// ShopList,
			Comment,
			GoodShop,
			Coupon,Adds,
			Card,
			// sanD
		},
		data() {
			return {
					src:'',
				productList: [{
						img: 1,
						name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "百雀羚套装女补水保湿护肤品",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋",
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 6,
						name: "短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤",
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 1,
						name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "德国DMK进口牛奶",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "百雀羚套装女补水保湿护肤品",
						sale: 1599,
						factory: 2899,
						payNum: 236
					}
				]
			}
		},
		methods: {
			takePhoto() {
			            const ctx = uni.createCameraContext();
			            ctx.takePhoto({
			                quality: 'high',
			                success: (res) => {
			                    this.src = res.tempImagePath
			                }
			            });
			        },
			        error(e) {
			            console.log(e.detail);
			        }
			    }
		
	}
</script>

<style scoped>
.slide-art{
		display: flex;

	}
	
	

</style>
