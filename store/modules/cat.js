import {deepClone} from '../../common/utils/index.js'
import Vue from 'vue';
// 购物车的 数据交付
export default {

	state: {
		list: [], // 购物车
		// selectedList: [],
		shopAll: false,
		sameitems:[],
		cartStorg:"cart",
		// 商品浏览记录
		historyLog:[] // 限制10条数据
		
	},

	getters: {
		// 判断是否， 全选
		// 合计，结算
		totalCount(state){
			let total={
				price:0, // 优惠价
				num:0,
				goodNum:0  ,// 商品总数量
				originalprice:0
			}
			state.list.forEach(res=>{
				res.gooddata.forEach(j=>{
					// 只对选中的状态计算
					total.goodNum += 1
					if (j.stated){
						total.originalprice  += Number(j.itemprice) * Number(j.shopNumber) 
						total.price += j.itemendprice * Number(j.shopNumber)
						total.num += 1
					}
				})
			})
			total.price = total.price.toFixed(2)
			// console.log(total.price,total.originalprice)
			uni.setStorageSync(state.cartStorg,JSON.stringify(state.list))
			return total
		}
	},

	mutations: {
		alter(state,stated){
			state.list.forEach(res=>{
				res.stated =stated
				res.gooddata.forEach(j=>{
					j.stated =stated
				})
			})
		},
		
		// 对比商品，是否存在
		judgeCordItem(state,shopitem){
			let shopping = false
			let shopIndex = 0
			let goods = false
			if (state.list.length <=0) return state.list.push(shopitem)
			state.list.forEach((item,index)=>{
				if (item.id === shopitem.id){
					item.gooddata.forEach((v,i)=>{
						if(v.id== shopitem.gooddata[0].id){
							item[i] = shopitem.gooddata
							goods = true
						}
					})
					shopping = true
					shopIndex=index
				}
				
			})
			if (!shopping){
				console.log(shopitem)
				state.list.push(shopitem)
			}else if (!goods && shopIndex !==0){
				state.list[shopIndex].goodLend +=1
				state.list[shopIndex].push(shopitem.gooddata[0])
			}
			// 重新更新一边购物车数据缓存
			this.commit('initGetDate',state.list)
			state.shopAll = false
				
		},
		
		// 修改good
		setGoods(state,gooditem){
			state.list.forEach((res,index)=>{
				res.gooddata.forEach((j,i)=>{
					if(j.id === gooditem.id){
						j.shopNumber = gooditem.shopNumber
						// Vue.set(state.list,state.list[index].gooddata[i],gooditem)
					}
				})
			})
			console.log(state.list)
			// 缓存起来
			this.commit('initGetDate',state.list)
			// uni.setStorageSync(state.cartStorg,JSON.stringify(state.list))
		},
		
		// 获取购物车的数据， 
		initGetDate(state, data) {
			
			data.forEach(res=>{
				// 每个商店增加一个 商品的长度的字段
				res.goodLend = res.gooddata.length
			})
			state.list=[]
			state.list = data
			uni.setStorageSync(state.cartStorg,JSON.stringify(state.list))
			//  data.map((res,i,ary)=>{
			// 	console.log(res)
			// 	// res['goodLend'] = res.gooddata.length
			// 	// this.$set(ary,'goodLend',res.gooddata.length)
			// 	state.list .push(Object.assign({}, res, { goodLend: res.gooddata.length }))
			// })
	
		},
		// 全选，全不选
		cheackAll(state) {
			if (!state.shopAll) {
				this.commit('alter',true)
				state.selectedList = state.list
				state.shopAll = true	
			} else {
				this.commit('alter',false)
				state.selectedList = []
				state.shopAll = false
			}
		},
		// 判断是否修改全选状态
		shopAllStated(state){
			// 判断是否全部全选，添加
			let tp = state.list.some(res=>{
				if (!res.stated) return true
			})
			if (!tp){ state.shopAll = true}
		},
		//  // 判断将选中的商品提出来,
		paymentItem(state){
			// 不知道什么鬼，teturn出去的 是undefined
			// 撸出选中的的店铺，商品，
			let i= state.list.length;
			while(i--){
				let goods = state.list[i]
				console.log('商品',goods)
				if (goods.stated){
					// return true
					this.commit('appendShop',goods)
					continue
				}
				let j = goods.gooddata.length;
				while(j--){
					console.log(j,goods)
					if (goods.gooddata[j].stated){
						// 拿出店铺，在组装数据，添加， 并且还要判断店铺是否存在
						const sd = state.sameitems.some( (res,ind)=>{
							if(res.id === goods.id){
								state.sameitems[ind].gooddata.push(goods.gooddata[j])
								return true
							}
						})
						if (!sd){
							let NewGoods = deepClone(goods)
							NewGoods.gooddata = [goods.gooddata[j]]
							this.commit('appendShop',NewGoods)
						}
						
						// state.sameitems.push(goods[j])
					}
				}
				console.log('数据',state.sameitems)
				
			}
		},
		
		// 单选店铺
		selectedItem(state, payload) {
			let shopId = payload.shopId // 店铺索引
			let shopData = state.list[shopId] // 获取店铺
			// 获取店铺 是否是全选状态 
			/*1. 是选中状态， 就删掉，为全不选，再将 shopAll=false
			2. 不是选中状态，=》 1. 直接全部选择，再判断， shopAll要不要为全选
			*/
		   
		   console.log(shopData)
			if (shopData.stated){
				// 选择状态。
				 state.list[shopId].gooddata.forEach(res=>{
					 res.stated = false
				 })
				 state.list[shopId].stated = false
				 state.shopAll = false		
			}else{
				// 不是选中状态
				shopData.gooddata.forEach(res=>{
					 res.stated = true
				})
				shopData.stated=true
				// state.selectedList.push(shopData)
				// 判断是否是店铺状态
				this.commit('shopAllStated')
				
			}
		
			
		},
		// 点选 商品
		selectedGood(state,payload){
			let shopId = payload.shopId // 索引
			let goodId = payload.goodId // 索引
			// 逻辑一样，就是多家了一成的味道
			/*1. 先判定是否存在，
			*/
			let shopData = state.list[shopId] // 店铺
			let goodData = shopData.gooddata[goodId]  // 商品
			if (goodData.stated){
				// 选中 状态， 
				goodData.stated = false
				shopData.stated =false
				state.shopAll = false	
			}else {
				// 未选中状态
				goodData.stated = true
				// 清楚掉 shopData 没有选中的， 需要深拷贝一份， 
				// let newShopData = deepClone( shopData)

				let newGoodsList = shopData.gooddata.filter(res=>{
					return res.stated 
				})
				console.log(newGoodsList,shopData.goodLend)
				if (newGoodsList.length == shopData.goodLend){
					shopData.stated = true
					this.commit('shopAllStated')
				}
				}
			},
			// 删除，选中的数据
		remoeItem(state){
				// 针对选中的数据，删除
				let i= state.list.length;
				while(i--){
					let goods = state.list[i].gooddata
					if (goods.stated){
						state.list.splice(i,1)
						continue
					}
					let j = goods.length;
					while(j--){
						if (goods[j].stated){
							goods.splice(j,1)
							console.log('删除成功')
						}
					}
					if (goods.length <=0){
						state.list.splice(i,1)
					}	
				}
				state.sameitems =[] // 清除要下单列表
			},
			
		// 下单列表添加商品
		appendShop(state,item){
			state.sameitems.push(item)
		},
		// 清空，选中要支付的商品
		delsameitems(state){
			state.sameitems = []
		},
		// 添加历史浏览
		apphistoryLog(state,item){
			if (state.historyLog.some((res,i)=>{
				if  (res.id === item.id){
					state.historyLog.splice(i,1)
					state.historyLog.unshift(item)
					return true
				}
			})) return
			// 这里应该还要判断一下商品是否存在，存在放到最前, ，就跟搜索历史一样的，这里就不弄了
			if (state.historyLog.length >10){
				// 删除最后的一个，长度是1-10，角标是从0-9
				state.historyLog.splice(9,1)	
			}
			state.historyLog.unshift(item)	
		}
		
		
			
	},

	actions: {
		// 全选，全不选
		
		checkedAllFn({commit}){
			commit('cheackAll')
		},
		actsetGoods({commit},item){
			commit('initGetDate',item)
		}
	}

}
