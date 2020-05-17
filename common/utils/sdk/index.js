

// 分享功能封装
const shopShare = (data,scene='WXSceneSession')=>{
		let {provider,href,title,summary,imageUrl} = data
		console.log(provider,href,title,summary,imageUrl)
		uni.share({
			provider,
			scene,
			type:0,
			href,
			title,
			summary:summary || '',
			imageUrl,
			success: (res) => {
				msg('分享成功')	
			},
			fail: (err) => {
				// console.log('分享失败：',err)
				msg('分享成功')
			}
			
		})	
	}


const msg = (title,duration=1500,mask=false,icon='none')=>{
		//统一提示方便全局修改
		if(Boolean(title) === false){
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
}


// 弹框消息封装
const showMsg = (content,title='')=>{
	return new Promise((res,rej)=>{
		uni.showModal({
			title: title,
		    content: content,
		    success: (e)=>{
		    	if(e.confirm){
		    		res(1)
		    	}else if (res.cancel){
					res(0)
				}
		    }
		});
	})
	
	
	
}



export  {
	msg,
	shopShare,
	showMsg
}