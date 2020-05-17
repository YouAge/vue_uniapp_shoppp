import Mock from 'mockjs'



const loginStatus = function(){
	let flag = Mock.Random.Boolean()
	return {
		user:Mock.Random.string(32)
		status:flag?'success':'failed',
		msg:flag?'':'登入错误'
	}
	
}

export {
	loginStatus
}