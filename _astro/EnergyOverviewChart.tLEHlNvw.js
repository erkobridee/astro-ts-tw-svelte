import{S as nt,i as st,s as it,E as lt,a as ct,b as ut,c as ft,d as g,e as N,t as M,f as P,g as dt,h as B,j as y,m as V,k as _,l as x,n as C,o as ht,p as j,q as k,r as mt,u as q,v as _t,w as gt,x as bt,y as At}from"./ECharts.CpYfIO0D.js";import{d as T}from"./dayjs.min.2rai63wT.js";import"./index.DACIwEDX.js";import{h as F}from"./colors.DRy8vmPD.js";import{C as yt,a as xt,t as Ct,c as kt,L as p,d as pt,y as vt}from"./ChartLoadingSpinner.DX3ZOeiQ.js";function G(c){let t,o,a,n;return{c(){t=k("div"),o=k("span"),a=At(c[0]),this.h()},l(l){t=x(l,"DIV",{class:!0});var u=C(t);o=x(u,"SPAN",{class:!0,title:!0});var r=C(o);a=bt(r,c[0]),r.forEach(g),u.forEach(g),this.h()},h(){_(o,"class","text-[0.7rem]"),_(o,"title",n="Unit: "+c[0]),_(t,"class","absolute top-2 left-4 z-10")},m(l,u){B(l,t,u),y(t,o),y(o,a)},p(l,u){u&1&&gt(a,l[0]),u&1&&n!==(n="Unit: "+l[0])&&_(o,"title",n)},d(l){l&&g(t)}}}function Et(c){let t,o;return t=new kt({props:{color:c[1]}}),{c(){q(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,n){V(t,a,n),o=!0},p(a,n){const l={};n&2&&(l.color=a[1]),t.$set(l)},i(a){o||(P(t.$$.fragment,a),o=!0)},o(a){M(t.$$.fragment,a),o=!1},d(a){N(t,a)}}}function Ot(c){let t,o,a,n,l,u,r=c[0]&&G(c);function b(s){c[10](s)}let d={init:ct,options:c[3],notMerge:!0,$$slots:{default:[Et]},$$scope:{ctx:c}};return c[2]!==void 0&&(d.chart=c[2]),n=new lt({props:d}),ut.push(()=>ft(n,"chart",b)),{c(){t=k("div"),r&&r.c(),o=mt(),a=k("div"),q(n.$$.fragment),this.h()},l(s){t=x(s,"DIV",{class:!0});var i=C(t);r&&r.l(i),o=ht(i),a=x(i,"DIV",{class:!0});var f=C(a);j(n.$$.fragment,f),f.forEach(g),i.forEach(g),this.h()},h(){_(a,"class","absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"),_(t,"class","relative grow")},m(s,i){B(s,t,i),r&&r.m(t,null),y(t,o),y(t,a),V(n,a,null),u=!0},p(s,[i]){s[0]?r?r.p(s,i):(r=G(s),r.c(),r.m(t,o)):r&&(r.d(1),r=null);const f={};i&8&&(f.options=s[3]),i&16386&&(f.$$scope={dirty:i,ctx:s}),!l&&i&4&&(l=!0,f.chart=s[2],dt(()=>l=!1)),n.$set(f)},i(s){u||(P(n.$$.fragment,s),u=!0)},o(s){M(n.$$.fragment,s),u=!1},d(s){s&&g(t),r&&r.d(),N(n)}}}const Lt="en-US";function wt(c,t,o){let{unit:a=""}=t,{xAxisAttribute:n="startedAt"}=t,{yAxisAttribute:l="value"}=t,{color:u=yt}=t,{colorOpacity:r=.55}=t,{backgroundColor:b=xt}=t,{timeseries:d=[]}=t,{onclick:s=Ct}=t,i,f={};const z=(e,h,A,E,K,X)=>{const H=F(E,K),J=F(p,.75);e=W(e);const O=e.length-1,Q=new Intl.NumberFormat(Lt,{maximumFractionDigits:0}),L=e.reduce((m,I,S)=>{const R=S===O?E:H,at=S===O?p:J;return m.xAxis.push(I[h]),m.yAxis.push({value:I[A],itemStyle:{borderRadius:pt,borderWidth:1,borderColor:R,color:R},label:{show:!0,position:"top",color:at,fontWeight:"bold",formatter:rt=>{const U=rt.value;return U===0?"":Q.format(U)}}}),m},{xAxis:[],yAxis:[]}),w="2%",D="10%",Z={top:D,bottom:D,left:w,right:w},$={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}},formatter:()=>""},tt={type:"category",data:L.xAxis,axisLabel:{formatter:vt,color:p},axisLine:{show:!1},axisTick:{show:!1}},et={type:"value",show:!1,max:m=>m.max+m.max*(15/100)},ot={type:"bar",data:L.yAxis,barCategoryGap:10};o(3,f={backgroundColor:X,grid:Z,tooltip:$,xAxis:tt,yAxis:et,series:[ot]})},W=e=>{if(e.length>0)return e;for(let h=5;h>=0;h--){const A=(h>0?T().subtract(h,"month"):T()).startOf("month").startOf("day");e.push({startedAt:A.format(),endedAt:A.endOf("month").endOf("day").format(),value:0})}return e},v=e=>{console.log("onChartClick",e),e.data&&s(d[e.dataIndex])};_t(()=>(i.on("click",v),console.log("EnergyOverviewChart - mounted",{chart:i}),()=>{i.off("click",v),console.log("EnergyOverviewChart - destroyed",{chart:i})}));function Y(e){i=e,o(2,i)}return c.$$set=e=>{"unit"in e&&o(0,a=e.unit),"xAxisAttribute"in e&&o(4,n=e.xAxisAttribute),"yAxisAttribute"in e&&o(5,l=e.yAxisAttribute),"color"in e&&o(1,u=e.color),"colorOpacity"in e&&o(6,r=e.colorOpacity),"backgroundColor"in e&&o(7,b=e.backgroundColor),"timeseries"in e&&o(8,d=e.timeseries),"onclick"in e&&o(9,s=e.onclick)},c.$$.update=()=>{c.$$.dirty&498&&z(d,n,l,u,r,b)},[a,u,i,f,n,l,r,b,d,s,Y]}class Ft extends nt{constructor(t){super(),st(this,t,wt,Ot,it,{unit:0,xAxisAttribute:4,yAxisAttribute:5,color:1,colorOpacity:6,backgroundColor:7,timeseries:8,onclick:9})}}export{Ft as E};
