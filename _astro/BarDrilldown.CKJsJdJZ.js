import{S as v,i as B,s as R,E as k,a as y,b as w,c as C,d as h,e as G,t as L,f as M,g as T,h as $,j as O,m as x,k as D,l as S,n as E,o as U,p as b,q as V,r as q}from"./ECharts.BlEy2D0V.js";import"./index.CYiTn92U.js";import{b as z,D as F}from"./common.DfdZzzxi.js";function P(n){let r,t,s,d,l;function p(a){n[3](a)}let f={id:"bar-drilldown",init:y,options:n[0],notMerge:n[1]};return n[2]!==void 0&&(f.chart=n[2]),s=new k({props:f}),w.push(()=>C(s,"chart",p)),{c(){r=b("div"),t=b("div"),V(s.$$.fragment),this.h()},l(a){r=S(a,"DIV",{class:!0});var e=E(r);t=S(e,"DIV",{class:!0});var o=E(t);U(s.$$.fragment,o),o.forEach(h),e.forEach(h),this.h()},h(){D(t,"class","absolute top-0 right-0 bottom-0 left-0"),D(r,"class","relative grow")},m(a,e){$(a,r,e),O(r,t),x(s,t,null),l=!0},p(a,[e]){const o={};e&1&&(o.options=a[0]),e&2&&(o.notMerge=a[1]),!d&&e&4&&(d=!0,o.chart=a[2],T(()=>d=!1)),s.$set(o)},i(a){l||(M(s.$$.fragment,a),l=!0)},o(a){L(s.$$.fragment,a),l=!1},d(a){a&&h(r),G(s)}}}function j(n,r,t){const s={itemStyle:{color:"inherit"}},d=z(F),l=[{dataGroupId:"animals",data:[["Cats",4],["Dogs",2],["Cows",1],["Sheep",2],["Pigs",1]]},{dataGroupId:"fruits",data:[["Apples",4],["Oranges",2]]},{dataGroupId:"cars",data:[["Toyota",4],["Opel",2],["Volkswagen",2]]}],p={type:"bar",id:"sales",itemStyle:d,emphasis:s,universalTransition:{enabled:!0,divideShape:"clone"}},a={xAxis:{data:["Animals","Fruits","Cars"]},yAxis:{},dataGroupId:"",animationDurationUpdate:500,series:{...p,cursor:"zoom-in",data:[{value:5,groupId:"animals"},{value:2,groupId:"fruits"},{value:4,groupId:"cars"}]}};let e=a,o=!1,i;const m=c=>{if(console.log("onChartClick",c),!c.data)return;const g=c.data.groupId;if(!g)return;const _=l.find(u=>u.dataGroupId===g);if(!_)return;const I=_.data;t(1,o=!1),t(0,e={xAxis:{data:I.map(u=>u[0])},series:{...p,dataGroupId:_.dataGroupId,cursor:"default",data:I.map(u=>u[1])},graphic:[{type:"text",left:50,top:20,style:{text:"Back",fontSize:18},onclick:()=>{t(1,o=!0),t(0,e=a)}}]})};q(()=>(i.on("click",m),console.log("BarDrilldown - mounted",{chart:i}),()=>{i.off("click",m),console.log("BarDrilldown - destroyed",{chart:i})}));function A(c){i=c,t(2,i)}return[e,o,i,A]}class Y extends v{constructor(r){super(),B(this,r,j,P,R,{})}}export{Y as default};
