(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0345":function(e,t,o){"use strict";o.r(t);var n=o("1feb"),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},"1feb":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(o("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}var a={onLaunch:function(){console.log("App Launch"),e.getSystemInfo({success:function(e){n.default.prototype.StatusBar=e.statusBarHeight;var t=wx.getMenuButtonBoundingClientRect();n.default.prototype.CustomBar=t,n.default.prototype.CustomBar=t.bottom+t.top-e.statusBarHeight}}),n.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=a}).call(this,o("543d")["default"])},"5a39":function(e,t,o){"use strict";o.r(t);var n=o("0345");for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);o("5e98");var a,l,u,c,f=o("f0c5"),i=Object(f["a"])(n["default"],a,l,!1,null,null,null,!1,u,c);t["default"]=i.exports},"5e98":function(e,t,o){"use strict";var n=o("6908"),r=o.n(n);r.a},6908:function(e,t,o){},cfe0:function(e,t,o){"use strict";(function(e){o("a28b");var t=f(o("66fd")),n=f(o("5a39")),r=f(o("5adc")),a=f(o("02fe")),l=o("7ef1"),u=f(o("1f2f")),c=f(o("8ebc"));function f(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function p(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){s(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var d=function(){o.e("colorui/components/cu-custom").then(function(){return resolve(o("ccbd"))}.bind(null,o)).catch(o.oe)};t.default.component("cu-custom",d),t.default.config.productionTip=!1;var b=function(){var e=getCurrentPages(),t=e[e.length-2];return t.$vm},m=new t.default;t.default.prototype.$vm=m,t.default.prototype.$store=r.default,t.default.prototype.$api={msg:l.msg,prePage:b,shopShare:l.shopShare,showMsg:l.showMsg},t.default.prototype.$http=a.default,t.default.prototype.$fly=u.default,t.default.prototype.$tol=c.default,n.default.mpType="app";var g=new t.default(p({store:r.default},n.default));e(g).$mount()}).call(this,o("543d")["createApp"])}},[["cfe0","common/runtime","common/vendor"]]]);