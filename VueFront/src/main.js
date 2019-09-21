// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import url_params from './Unitls/url_params'    //获取url参数
import JsBarcode from 'jsbarcode'

Vue.use(ElementUI)
Vue.use(MintUI)



Vue.config.productionTip = false


//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
Vue.prototype.$url_params=url_params   //注册全局方法
Vue.prototype.$axios = axios

// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(function(request) {
	if (!sessionStorage.getItem('store_id')||sessionStorage.getItem('store_id')=='null') { // 判断是否存在token，如果存在的话，则每个http header都加上token
		// console.log('token存在')
    	router.replace({
    						path: '/Error',
    						query: {
    							redirect: router.currentRoute.fullPath
    						} ,//登录成功后跳入浏览的当前页面
                })
	}
	return request;
	// 给视频添加评论提交之前对评论进行判断
}, function(error) {
	return Promise.reject(error);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
