
// 将时间戳和时间格式转成，str类型
let formDate = dateForm=>{
	if (dateForm === '')return '';
	const dateee = new Date(dateForm).toJSON();
	var date = new Date(+new Date(dateee)+ 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
	return date;
}

// 将字符串2019-03-20 00:00:00，转成 Date格式Sat Apr 20 2019 00:00:00 GMT+0800 (中国标准时间)
let getDate= strDate=> { 
  const st = strDate; 
  const a = st.split(" "); 
  const b = a[0].split("-"); 
  const c = a[1].split(":"); 
  const date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
  return date; 
}





function newkiller(){
	// 当前时间应该根据服务器传递过来的时间为准
	
	
	
	let date =new Date();
	let now = date.getTime()
	// 获取当前时
	let hours = date.getHours()
	if (hours >= 0 && hours <= 9) {
		hours = "0" + hours;
	}
	let year = date.getFullYear()
	let mounth = date.getMonth()
	if (mounth >= 1 && mounth <= 9) {
		mounth = "0" + mounth;
	}
	let dateStr = date.getDate()
	// 设置截止时间
	let str =[ 
		'2020-05-06 08:00:00',
		'2020-05-06 10:00:00',
		'2020-05-06 12:00:00',
		'2020-05-06 14:00:00',
		'2020-05-06 16:00:00',
		'2020-05-06 18:00:00',
		'2020-05-06 20:00:00',
		'2020-05-06 22:00:00'
	]
	
	let HostStr =  str.map(res=>{
		if (res >hours) return res
	})

	// 获取 截止时间
	entStr = `${year}-${mounth}-${dateStr} ${HostStr[0]}:00:00`
	let endDate =new Date(entStr);
	console.log(entStr)
}



function deepClone(obj){ 
    // 先判断一些类型，重新new对象生产新的地址空间
    if(obj ===null) return null
    if (typeof obj !== 'object' ) return obj;
    if(obj instanceof RegExp) return new RegExp(obj);   
    if (obj instanceof Date) return  new Date(obj);
    // = 不直接创建空对象目的， 克隆的结果和之前保持相同的所有类
    let newObj = new  obj.constructor
    for (let key in obj){
        if(obj.hasOwnProperty(key)){
        newObj[key] = deepClone(obj[key])    
        }
    }
    return newObj
}

export {
	deepClone
	
}