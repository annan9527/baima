webpackJsonp([2],{"4UDB":function(t,i,e){"use strict";var o=e("JkW1"),a=e("R07y");Object(o.a)(a.a)},TstG:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e("kN50"),a=(e("4UDB"),e("Oq2I"),{props:{options:{type:Object},height:{type:String}},data:function(){return{option_column:{tooltip:{trigger:"axis"},color:["#c44b7d","#3fafec"],legend:{textStyle:{color:"#999999",fontSize:"20px"}},grid:{left:"3%",right:"4%",bottom:"4%",containLabel:!0},toolbox:{},xAxis:{type:"category",boundaryGap:!1,data:[]},yAxis:{type:"value"},series:[{type:"line",stack:"Total",data:[]},{type:"line",stack:"Total",data:[]}]}}},created:function(){this.option_column=this.options},mounted:function(){var t=this;window.addEventListener("resize",function(){return t.$refs.ref_echart1.resize()})},methods:{getHeight:function(){return this.height}}}),s={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("v-chart",{ref:"ref_echart1",style:{height:this.getHeight()},attrs:{option:this.option_column}})],1)},staticRenderFns:[]},n=e("VU/8")(a,s,!1,null,null,null).exports,l=e("7f5k"),p={name:"index",components:{PieChart:o.a,LinesChart:n},data:function(){return{loading:!0,time:"",date:"",week:"",title:"数字白马·基层单元智治中心",activeName:"first",scoresList:[],options:{tooltip:{trigger:"axis"},color:["#c44b7d","#3fafec"],grid:{left:"3%",right:"4%",bottom:"4%",containLabel:!0},toolbox:{},xAxis:{type:"category",boundaryGap:!1,data:["2021一季度","2021二季度","2021三季度","2021四季度","2022一季度","2022二季度"]},yAxis:{type:"value"},series:[{name:"女",type:"line",stack:"Total",data:[1e3,2e3,3e3,3500,4100,4200,4400,4500]}]},options1:{tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value",boundaryGap:[0,.01]},yAxis:{type:"category",data:["2021一季度","2021二季度","2021三季度","2021四季度","2022一季度","2022二季度"]},series:[{color:"#02cde6",height:"5px",name:"",type:"bar",data:[1e3,2e3,3e3,3500,4100,4200,4400,4500]}]},options2:{radar:{indicator:[{name:"就业率"},{name:"待岗率"},{name:"未就业率"},{name:"就业投诉"},{name:"退休率"}]},series:[{name:"Budget vs spending",type:"radar",data:[{value:[4200,3e3,2e4,35e3,5e4]}]}]},data:[]}},mounted:function(){this.cancelLoading(),setInterval(this.getTime,1e3),this.getScoresData()},methods:{getScoresData:function(){var t=this;Object(l.a)("http://47.100.166.173:8099/qujiangqu/api/users/statistics/scores/list",{num:10}).then(function(i){console.log(i.data),t.scoresList=i.data})},handleClick:function(t,i){console.log(t,i)},cancelLoading:function(){var t=this;setTimeout(function(){t.loading=!1},500)},getTime:function(){var t=new Date,i=t.getFullYear(),e=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,o=t.getDate()<10?"0"+t.getDate():t.getDate(),a=t.getHours()<10?"0"+t.getHours():t.getHours(),s=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),n=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds(),l=t.getDay();this.time=a+":"+s+":"+n,this.date=i+"年"+e+"月"+o+"号",this.week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][l]}}},r={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"index"}},[e("dv-full-screen-container",{staticClass:"bg"},[t.loading?e("dv-loading",[t._v("Loading...")]):t._e(),t._v(" "),e("div",{staticClass:"header-box"},[e("div",{staticClass:"time-box"},[e("div",{staticClass:"time"},[t._v(t._s(t.time))]),t._v(" "),e("div",{staticStyle:{"margin-left":"1rem"}},[e("div",{staticClass:"date"},[t._v(t._s(t.date))]),t._v(" "),e("div",{staticClass:"date"},[t._v(t._s(t.week))])])]),t._v(" "),e("div",{staticClass:"title-box"},[e("span",[t._v(t._s(t.title))])]),t._v(" "),e("div",{staticClass:"return",on:{click:function(i){return t.$router.back()}}},[e("img",{staticStyle:{width:"26px",height:"24px","margin-top":"10px","margin-left":"11px","margin-right":"7px"},attrs:{src:"/static/return.png"}}),t._v(" "),e("span",[t._v("返回")])])]),t._v(" "),e("div",{staticClass:"content-box",staticStyle:{margin:"0",position:"relative"}},[e("div",{staticClass:"cunjiti",staticStyle:{position:"absolute",top:"0",left:"60px"}},[e("div",{staticClass:"name1"},[t._v("村集体收入")]),t._v(" "),e("div",{staticClass:"box-page"},[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("div",{staticStyle:{display:"flex","align-items":"center","background-color":"rgb(8, 44, 97)",height:"80px",width:"350px"}},[e("span",{staticStyle:{"font-size":"40px",color:"#ffff20","font-weight":"bold"}},[t._v("220377")])]),t._v(" "),e("span",{staticStyle:{"font-size":"20px","padding-left":"20px",color:"#237dbf"}},[t._v("元")])]),t._v(" "),e("div",{staticStyle:{"padding-top":"10px"}},[e("span",{staticStyle:{"font-size":"18px"}},[t._v("较往年 (产值)：")]),t._v(" "),e("lines-chart",{attrs:{options:t.options,height:"180px"}})],1)])]),t._v(" "),e("div",{staticClass:"cunjiti",staticStyle:{position:"absolute",top:"0",left:"590px"}},[e("div",{staticClass:"name1"},[t._v("衢南科技经营情况")]),t._v(" "),e("div",{staticClass:"box-page"},[e("lines-chart",{attrs:{options:t.options1,height:"300px"}})],1)]),t._v(" "),e("div",{staticClass:"shehuifuwuxin",staticStyle:{position:"absolute",top:"0",right:"50px"}},[e("div",{staticClass:"name1"},[t._v("物业服务")]),t._v(" "),e("div",{staticClass:"box-page",staticStyle:{position:"relative"}},[e("div",{staticStyle:{width:"430px","font-size":"18px"}},[t._v("\r\n              白马新村物业服务,重点关注孤寡老人、残疾人、未成年人等弱势群体,\r\n              提供精准心理服务援助。\r\n            ")])]),t._v(" "),e("span",{staticStyle:{position:"absolute","font-size":"36px",color:"#ffff20",top:"50px",right:"200px"}},[t._v("4.8")]),t._v(" "),e("img",{staticStyle:{position:"absolute",right:"80px",top:"40px"},attrs:{src:"static/xin.png"}})]),t._v(" "),e("div",{staticClass:"cunjiti",staticStyle:{position:"absolute",top:"420px",left:"590px"}},[e("div",{staticClass:"name1"},[t._v("就业情况")]),t._v(" "),e("div",{staticClass:"box-page"},[e("lines-chart",{attrs:{options:t.options2,height:"300px"}})],1)]),t._v(" "),e("div",{staticClass:"cunjiti",staticStyle:{position:"absolute",top:"420px",left:"60px"}},[e("div",{staticClass:"name1"},[t._v("一老一小服务")]),t._v(" "),e("div",{staticClass:"box-page"},[e("img",{attrs:{src:"static/1.jpg"}}),t._v(" "),e("img",{attrs:{src:"static/2.jpg"}}),t._v(" "),e("img",{attrs:{src:"static/3.jpg"}}),t._v(" "),e("img",{attrs:{src:"static/4.jpg"}})])]),t._v(" "),e("div",{staticClass:"nongcanping",staticStyle:{position:"absolute",top:"200px",right:"50px"}},[e("div",{staticClass:"name1"},[t._v("乡城共富平台")]),t._v(" "),e("el-tabs",{staticStyle:{"padding-left":"30px","padding-right":"30px","font-size":"18px"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(i){t.activeName=i},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"产业助农",name:"first"}},[e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"30px",height:"50px",position:"relative"}},[e("img",{staticStyle:{position:"absolute",bottom:"0px"},attrs:{src:"static/土蜂蜜.jpg"}}),t._v(" "),e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"100px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("龙游蜜蜂园土蜂蜜500g 莲花花农家自产")]),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"2px","font-size":"16px",left:"100px",color:"#ffff40","font-weight":"bold"}},[t._v("￥24.5")])])]),t._v(" "),e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("img",{staticStyle:{position:"absolute",bottom:"0px"},attrs:{src:"static/土鸡蛋.jpg"}}),t._v(" "),e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"100px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("农家田园AA级鸡蛋土鸡蛋40g*40枚草鸡蛋新鲜鸡蛋")]),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"2px","font-size":"16px",left:"100px",color:"#ffff40","font-weight":"bold"}},[t._v("￥29.9")])])]),t._v(" "),e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("img",{staticStyle:{position:"absolute",bottom:"0px"},attrs:{src:"static/龙鼎.jpg"}}),t._v(" "),e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"100px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("正宗开化龙鼎茶核心产区农家绿茶叶新茶2022")]),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"2px","font-size":"16px",left:"100px",color:"#ffff40","font-weight":"bold"}},[t._v("￥199.9")])])]),t._v(" "),e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("img",{staticStyle:{position:"absolute",bottom:"0px"},attrs:{src:"static/发糕.jpg"}}),t._v(" "),e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"100px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("红糖发糕龙游发糕正宗红枣糕即食加热早餐馒头")]),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"2px","font-size":"16px",left:"100px",color:"#ffff40","font-weight":"bold"}},[t._v("￥19.9")])])]),t._v(" "),e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("img",{staticStyle:{position:"absolute",bottom:"0px"},attrs:{src:"static/淀粉.jpg"}}),t._v(" "),e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"100px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("纯红薯粉淀粉开化特产地瓜粉红召粉农家番薯粉纯手工")]),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"2px","font-size":"16px",left:"100px",color:"#ffff40","font-weight":"bold"}},[t._v("￥49.5")])])])]),t._v(" "),e("el-tab-pane",{attrs:{label:"邻里服务",name:"second"}},[e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("div",[e("span",{staticStyle:{position:"absolute",top:"15px",left:"20px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("水电工 邱成坤 13750703352")])])]),t._v(" "),e("div",{staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"50px",height:"50px",position:"relative"}},[e("div",[e("span",{staticStyle:{position:"absolute",top:"15px",left:"20px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v("泥瓦工 柳昌远 13957022761")])])])]),t._v(" "),e("el-tab-pane",{attrs:{label:"共富分排行",name:"third"}},t._l(t.scoresList,function(i,o){return e("div",{key:o,staticStyle:{"background-color":"#00186a","margin-left":"30px","margin-right":"30px","margin-top":"15px",height:"30px",position:"relative"}},[e("div",[e("span",{staticStyle:{position:"absolute",top:"5px",left:"20px","font-size":"14px",color:"#ffffff","font-weight":"bold"}},[t._v(t._s(i.userName)+" "+t._s(i.scores)+"分")])])])}),0)],1)],1)])],1)],1)},staticRenderFns:[]};var c=e("VU/8")(p,r,!1,function(t){e("b6+t")},null,null);i.default=c.exports},"b6+t":function(t,i){},kN50:function(t,i,e){"use strict";e("Vb+l"),e("Oq2I");var o={props:{options:{type:Object}},data:function(){return{option_column:{tooltip:{},series:[{name:"销量",type:"pie",color:["#18A1DF","#00E676","#FFEA00","#FF9100","#FF3D00"],data:[{value:this.options["人在户在"],name:"人在户在"},{value:this.options["人在户不在"],name:"人在户不在"},{value:this.options["人不在户在"],name:"人不在户在"},{value:this.options["人户都不在"],name:"人户都不在"},{value:this.options["租户"],name:"租户"}],label:{normal:{textStyle:{color:"#fff",fontSize:"20px"},formatter:"{b}{d}%"}}}]}}},mounted:function(){var t=this;window.addEventListener("resize",function(){return t.$refs.ref_echart1.resize()})},methods:{}},a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("v-chart",{ref:"ref_echart1",staticStyle:{height:"400px"},attrs:{option:this.option_column}})],1)},staticRenderFns:[]},s=e("VU/8")(o,a,!1,null,null,null);i.a=s.exports}});
//# sourceMappingURL=2.3a0dafb4ebd4ff9624a9.js.map