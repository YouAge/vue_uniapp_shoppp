<template>
	<view>
		
		<view class="fame-3d-more">
		    <view class="fame-title">
		        <span class="title">热门搜索</span>
		        <span class="more" @tap="fameMoreClick('more')">更多>></span>
		    </view>
			<!-- // 类型显示 -->
		    <view class="fame-3d-box">
		        <image src="./img/3d-bg.png"></image>
		        <view class="tag-ball">
		            <span class="tag" v-for="(item, index) of tagEle" :key="index" :style="{ background:item.style}" @tap="fameMoreClick(item)">
		                {{item.title}}
		            </span>
		        </view>
		    </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		
		data(){
			return{
				tagEle:[
					{
						id:2,
						name:"百度",
						style:'#f37b1d'
					},{
						id:3,
						name:"百度",
						style:'#f37b1d'
					},{
						id:4,
						name:"百度",
						style:'#f37b1d'
					},{
						id:5,
						name:"百度",
						style:'#f37b1d'
					}
				]
			}
		},
		created(){
			this.cloudInnit(this.tagEle)
		},
		methods:{
			cloudInnit(cloudArr) {
			    let tagEle = [];
			    if (Array.isArray(cloudArr) && cloudArr.length) {
			        cloudArr.forEach(item => {
			            tagEle.push({title: item.name, x: 0, y: 0, z: 0, s: 0, o: 1, f: 15, angleX: 0, angleY: 0, isNew: item.isNew, value: item.value, num: item.num})
			        })
			    }
			
			    let fallLength = 100;
			    let angleX = Math.PI / 100;
			    let angleY = Math.PI / 100;
			    for (let i = 0; i < tagEle.length; i++) {
			        let k = (2 * (i + 1) - 1) /tagEle.length - 1;
			        // 计算圆形旋转
			        let a = Math.acos(k);
			        let b = a * Math.sqrt(tagEle.length * Math.PI);
			        // 计算元素x, y 坐标
			        let numx = 120 * Math.sin(a) * Math.cos(b);
			        let numy = 120 * Math.sin(a) * Math.sin(b);
			        let numz = 220 * Math.cos(a);
			
			        // 计算元素缩放大小
			        tagEle[i].x = numx * 1.8;
			        tagEle[i].y = numy * 1.8;
			        tagEle[i].z = numz;
			        tagEle[i].s = 250 / (400 - tagEle[i].z);
			    }
			
			    // 动画， 定时动画
			    this.cloudInterval = setInterval(() => {
			        for (let i = 0; i < tagEle.length; i++) {
			            let k = (2 * (i + 1) - 1) / tagEle.length - 1;
			            let a = Math.acos(k);
			            let numz = 240 * Math.cos(a);
			            tagEle[i].s = 250 / (500 - tagEle[i].z);
			            var cos = Math.cos(angleX);
			            var sin = Math.sin(angleX);
			            var y1 = tagEle[i].y * cos - tagEle[i].z * sin;
			            var z1 = tagEle[i].z * cos + tagEle[i].y * sin;
			            tagEle[i].y = y1;
			            tagEle[i].z = z1;
			
			            var cos = Math.cos(angleY);
			            var sin = Math.sin(angleY);
			            var x1 = tagEle[i].x * cos - tagEle[i].z * sin;
			            var z1 = tagEle[i].z * cos + tagEle[i].x * sin;
			            tagEle[i].x = x1;
			            tagEle[i].z = z1;
			            tagEle[i].style = `opacity:${tagEle[i].o};z-index:${tagEle[i].z};left:${tagEle[i].x}rpx;top:${tagEle[i].y}rpx;transform:scale(${tagEle[i].s})`
			        }
			        this.tagEle = tagEle;
			    }, 200)
			}
		},
		fameMoreClick(item){
			console.log(item)
		}
	}
	
</script>

<style scoped lang="less">
	 @x: 1.042;
	
	.publicTitle() {
	    .fame-title {
	        width: auto;
	        height: auto;
	        display: flex;
	        justify-content: space-between;
	        padding-top: 26rpx;
	        & span.title {
	            height: 100%;
	            border-left: 6rpx solid #1E82D2;
	            padding-left: 20rpx;
	            font-size: 32rpx;
	            font-weight: revert;
	            margin-left: 20rpx;
	        }
	        & span.more {
	            margin-right: 20rpx;
	            color: #999999;
	        }
	    }
	}
	
	.fame-3d-more {
	    width: 680rpx*@x;
	    height: 500rpx*@x;
	    background: white;
	    border-radius: 20rpx;
	    margin: 15rpx auto 0;
	    .publicTitle();
	    .fame-3d-box {
	        position: relative;
	        width: 375rpx*@x;
	        height: 375rpx*@x;
	        /*background: url("../../static/imgs/myReport/3d-bg.png") no-repeat center center;*/
	        /*background-size: 100% 100%;*/
	        margin: 20rpx auto 0;
	        & image {
	            width: 100%;
	            height: 100%;
	        }
	        .tag-ball {
	            position: absolute;
	            top: 45%;
	            left: 44%;
	            margin: 0 auto;
	            width: 150rpx*@x;
	            height: 150rpx*@x;
	            .tag {
	                display: block;
	                position: absolute;
	                left: 0rpx;
	                top: 0rpx;
	                color: #000;
	                text-decoration: none;
	                font-size: 24rpx;
	            }
	            .tag:hover {
	                border:1px solid #666;
	            }
	            & a:first-child {color: rgb(50,51,136);}
	            & a:nth-child(2) {color: rgb(77,117,85);}
	            & a:nth-child(3) {color: rgb(53,119,114);}
	            & a:nth-child(4) {color: rgb(145,158,140);}
	            & a:nth-child(5) {color: rgb(108,81,218);}
	            & a:nth-child(6) {color: rgb(16,118,49);}
	            & a:nth-child(7) {color: rgb(116,59,0);}
	            & a:nth-child(8) {color: rgb(167,220,166);}
	            & a:nth-child(9) {color: rgb(231,242,49);}
	            & a:nth-child(10) {color: rgb(8,132,62);}
	            & a:nth-child(11) {color: rgb(49,126,39);}
	            & a:nth-child(12) {color: rgb(202,230,49);}
	            & a:nth-child(13) {color: rgb(28,136,215);}
	            & a:nth-child(14) {color: rgb(132,59,112);}
	            & a:nth-child(15) {color: rgb(31,180,160);}
	            & a:nth-child(16) {color: rgb(117,137,245);}
	            & a:nth-child(17) {color: rgb(146,4,9);}
	            & a:nth-child(18) {color: rgb(60,51,154);}
	            & a:nth-child(19) {color: rgb(244,121,50);}
	            & a:nth-child(20) {color: rgb(49,184,97);}
	            & a:nth-child(21) {color: #e54d42;}
	            & a:nth-child(22) {color: #f37b1d;}
	            & a:nth-child(23) {color: #fbbd08;}
	            & a:nth-child(24) {color: #8dc63f;}
	            & a:nth-child(25) {color: #1cbbb4;}
	            & a:nth-child(26) {color: #0081ff;}
	            & a:nth-child(27) {color: #6739b6;}
	            & a:nth-child(28) {color: #9c26b0;}
	            & a:nth-child(29) {color: #e03997;}
	            & a:nth-child(30) {color: #a5673f;}
	            & a:last-child {color: #39b54a;}
	        }
	    }
	}
	
</style>
