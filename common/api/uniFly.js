
import uniFly from 'unifly'
// import store from '@/store/index.js'

uniFly.baseUrl = 'https://www.gomyorder.cn/'

// 设置请求头
// uniFly.headers['xxx']= ''



//设置全局请求超时时间
uniFly.timeOut = 20000


/**
 * 自定义请求拦截
 * @param request
 * @returns {*}
 */
uniFly.requestInterceptors.success = function(request) {
    console.log('自定义请求拦截')
    //配置基本信息
    // request.headers = uniFly.headers
    uni.showLoading()
    // console.log( request.headers)
    return request
}
uniFly.responseInterceptors.success = function(request) {
    console.log('自定义响应拦截')
    uni.hideLoading()
    return Promise.resolve(request)
}



/**
 * 所有的接口请在此处统一定义
 * @type {{post: (function(*=): *), get: (function(*=): *)}}
 */
const $fly = {
    /**
     * post方法
     * @param data
     * @returns {*}
     */
    post: function(url, data) {
        return uniFly.post({
            url: url,
            params: data
        })
    },
    /**
     * get方法
     * @param data
     * @returns {*}
     */
    get: function(url, data) {
        return uniFly.get({
            url: url,
            params: data
        })
    }
}

export default $fly