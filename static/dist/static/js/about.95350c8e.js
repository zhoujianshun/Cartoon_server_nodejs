(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0371":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-grid",t._l(t.list,(function(e,a){return n("van-grid-item",{key:a,attrs:{text:e,to:{name:"CartoonPlayer",params:{name:t.name,chapter:e}}}})})),1)},r=[],i=(n("b0c0"),n("d3b7"),n("284c")),s=(n("96cf"),n("3bb8")),c={name:"CartoonInfo",data:function(){return{list:[],name:""}},created:function(){var t,e,n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return t=this.$route.params.name,this.name=t,console.log(t),a.prev=3,a.next=6,regeneratorRuntime.awrap(s["a"].getCartton(t));case 6:n=a.sent,console.log(n),(e=this.list).push.apply(e,Object(i["a"])(n.chapters)),a.next=13;break;case 11:a.prev=11,a.t0=a["catch"](3);case 13:case"end":return a.stop()}}),null,this,[[3,11]])}},o=c,l=n("2877"),u=Object(l["a"])(o,a,r,!1,null,null,null);e["default"]=u.exports},6125:function(t,e,n){"use strict";var a=n("b105"),r=n.n(a);r.a},b0c0:function(t,e,n){var a=n("83ab"),r=n("9bf2").f,i=Function.prototype,s=i.toString,c=/^\s*function ([^ (]*)/,o="name";!a||o in i||r(i,o,{configurable:!0,get:function(){try{return s.call(this).match(c)[1]}catch(t){return""}}})},b105:function(t,e,n){},ce4b:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-list",{attrs:{finished:t.finished,"finished-text":""},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(t,e){return n("van-cell",{key:e,staticClass:"image-cell"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.url,expression:"item.url"}],staticClass:"cartoon-image"})])})),1)},r=[],i=(n("b0c0"),n("d3b7"),n("284c")),s=(n("96cf"),n("3bb8")),c={name:"CartoonPlayer",data:function(){return{list:[],loading:!1,finished:!1,imgHeight:80}},components:{},methods:{onLoad:function(){var t,e,n,a;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e=this.$route.params.name,n=this.$route.params.chapter,r.next=5,regeneratorRuntime.awrap(s["a"].getCarttonChapter(e,n));case 5:a=r.sent,console.log(a),(t=this.list).push.apply(t,Object(i["a"])(a.images)),this.loading=!1,this.finished=!0,r.next=15;break;case 12:r.prev=12,r.t0=r["catch"](0),console.log(r.t0);case 15:case"end":return r.stop()}}),null,this,[[0,12]])}},created:function(){},mounted:function(){console.log("this.imgHeight"+this.imgHeight)}},o=c,l=(n("6125"),n("2877")),u=Object(l["a"])(o,a,r,!1,null,"1b880b22",null);e["default"]=u.exports},f820:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("h1",[t._v("This is an about page")])])}],i=n("2877"),s={},c=Object(i["a"])(s,a,r,!1,null,null,null);e["default"]=c.exports}}]);