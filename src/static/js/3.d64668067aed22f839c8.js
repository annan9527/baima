webpackJsonp([3],{"8hXn":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"index",data:function(){return{loading:!0,time:"",date:"",week:"",title:"数字白马·基层单元智治中心"}},mounted:function(){this.cancelLoading(),setInterval(this.getTime,1e3)},methods:{cancelLoading:function(){var t=this;setTimeout(function(){t.loading=!1},500)},getTime:function(){var t=new Date,e=t.getFullYear(),i=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,n=t.getDate()<10?"0"+t.getDate():t.getDate(),s=t.getHours()<10?"0"+t.getHours():t.getHours(),a=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),c=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds(),l=t.getDay();this.time=s+":"+a+":"+c,this.date=e+"年"+i+"月"+n+"号",this.week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][l]}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"index"}},[i("dv-full-screen-container",{staticClass:"bg"},[t.loading?i("dv-loading",[t._v("Loading...")]):t._e(),t._v(" "),i("div",{staticClass:"header-box"},[i("div",{staticClass:"time-box"},[i("div",{staticClass:"time"},[t._v(t._s(t.time))]),t._v(" "),i("div",{staticStyle:{"margin-left":"1rem"}},[i("div",{staticClass:"date"},[t._v(t._s(t.date))]),t._v(" "),i("div",{staticClass:"date"},[t._v(t._s(t.week))])])]),t._v(" "),i("div",{staticClass:"title-box"},[i("span",[t._v(t._s(t.title))])])]),t._v(" "),i("div",{staticClass:"content-box"},[i("div",{staticStyle:{display:"inline-block"}},[i("div",{staticStyle:{display:"inline-block"},on:{click:function(e){return t.$router.push("/renyuanguanli")}}},[i("img",{staticClass:"item",attrs:{src:"/static/1.png"}})]),t._v(" "),i("div",{staticStyle:{display:"inline-block"},on:{click:function(e){return t.$router.push("/zhilifuwu")}}},[i("img",{staticClass:"item",attrs:{src:"/static/2.png"}})]),t._v(" "),i("div",{staticStyle:{display:"inline-block"},on:{click:function(e){return t.$router.push("/gongtongfuyu")}}},[i("img",{staticClass:"item",attrs:{src:"/static/3.png"}})])])])],1)],1)},staticRenderFns:[]};var a=i("VU/8")(n,s,!1,function(t){i("jbB7")},null,null);e.default=a.exports},jbB7:function(t,e){}});
//# sourceMappingURL=3.d64668067aed22f839c8.js.map