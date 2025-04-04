import{S as rt,i as at,s as it,E as st,a as nt,b as lt,c as ct,d as _,e as T,t as F,f as G,g as ut,h as M,j as b,m as N,k as m,l as A,n as x,o as ft,p as P,q as C,r as ht,u as B,v as dt,w as mt,x as _t,y as gt}from"./ECharts.BfJ7rUUm.js";import"./index.DgoW5roq.js";import{h as R}from"./colors.DRy8vmPD.js";import{f as bt}from"./format.DTLDyVsJ.js";import{C as At,a as xt,h as Ct,c as yt,L as y,d as kt}from"./ChartLoadingSpinner.bNe3PTbO.js";function U(c){let t,e,o,i;return{c(){t=C("div"),e=C("span"),o=gt(c[0]),this.h()},l(l){t=A(l,"DIV",{class:!0});var u=x(t);e=A(u,"SPAN",{class:!0,title:!0});var a=x(e);o=_t(a,c[0]),a.forEach(_),u.forEach(_),this.h()},h(){m(e,"class","text-[0.7rem]"),m(e,"title",i="Unit: "+c[0]),m(t,"class","absolute top-2 left-4 z-10")},m(l,u){M(l,t,u),b(t,e),b(e,o)},p(l,u){u&1&&mt(o,l[0]),u&1&&i!==(i="Unit: "+l[0])&&m(e,"title",i)},d(l){l&&_(t)}}}function vt(c){let t,e;return t=new yt({props:{color:c[1]}}),{c(){B(t.$$.fragment)},l(o){P(t.$$.fragment,o)},m(o,i){N(t,o,i),e=!0},p(o,i){const l={};i&2&&(l.color=o[1]),t.$set(l)},i(o){e||(G(t.$$.fragment,o),e=!0)},o(o){F(t.$$.fragment,o),e=!1},d(o){T(t,o)}}}function Et(c){let t,e,o,i,l,u,a=c[0]&&U(c);function g(s){c[10](s)}let h={init:nt,options:c[3],notMerge:!0,$$slots:{default:[vt]},$$scope:{ctx:c}};return c[2]!==void 0&&(h.chart=c[2]),i=new st({props:h}),lt.push(()=>ct(i,"chart",g)),{c(){t=C("div"),a&&a.c(),e=ht(),o=C("div"),B(i.$$.fragment),this.h()},l(s){t=A(s,"DIV",{class:!0});var n=x(t);a&&a.l(n),e=ft(n),o=A(n,"DIV",{class:!0});var f=x(o);P(i.$$.fragment,f),f.forEach(_),n.forEach(_),this.h()},h(){m(o,"class","absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"),m(t,"class","relative grow")},m(s,n){M(s,t,n),a&&a.m(t,null),b(t,e),b(t,o),N(i,o,null),u=!0},p(s,[n]){s[0]?a?a.p(s,n):(a=U(s),a.c(),a.m(t,e)):a&&(a.d(1),a=null);const f={};n&8&&(f.options=s[3]),n&8194&&(f.$$scope={dirty:n,ctx:s}),!l&&n&4&&(l=!0,f.chart=s[2],ut(()=>l=!1)),i.$set(f)},i(s){u||(G(i.$$.fragment,s),u=!0)},o(s){F(i.$$.fragment,s),u=!1},d(s){s&&_(t),a&&a.d(),T(i)}}}const pt="en-US";function Lt(c,t,e){let{unit:o=""}=t,{xAxisAttribute:i="startedAt"}=t,{yAxisAttribute:l="value"}=t,{color:u=At}=t,{colorOpacity:a=.55}=t,{backgroundColor:g=xt}=t,{timeseries:h}=t,{onclick:s=Ct}=t,n,f={};const V=(r,z,W,v,Y,j)=>{const K=R(v,Y),X=R(y,.75),E=r.length-1,H=new Intl.NumberFormat(pt,{maximumFractionDigits:0}),p=r.reduce((d,O,D)=>{const I=D===E?v:K,et=D===E?y:X;return d.xAxis.push(O[z]),d.yAxis.push({value:O[W],itemStyle:{borderRadius:kt,borderWidth:1,borderColor:I,color:I},label:{show:!0,position:"top",color:et,fontWeight:"bold",formatter:ot=>{const S=ot.value;return S===0?"":H.format(S)}}}),d},{xAxis:[],yAxis:[]}),L="2%",w="10%",J={top:w,bottom:w,left:L,right:L},Q={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}},formatter:()=>""},Z={type:"category",data:p.xAxis,axisLabel:{formatter:bt,color:y},axisLine:{show:!1},axisTick:{show:!1}},$={type:"value",show:!1,max:d=>d.max+d.max*(15/100)},tt={type:"bar",data:p.yAxis,barCategoryGap:10};e(3,f={backgroundColor:j,grid:J,tooltip:Q,xAxis:Z,yAxis:$,series:[tt]})},k=r=>{console.log("onChartClick",r),r.data&&s(h[r.dataIndex])};dt(()=>(n.on("click",k),console.log("EnergyOverviewChart - mounted",{chart:n}),()=>{n.off("click",k),console.log("EnergyOverviewChart - destroyed",{chart:n})}));function q(r){n=r,e(2,n)}return c.$$set=r=>{"unit"in r&&e(0,o=r.unit),"xAxisAttribute"in r&&e(4,i=r.xAxisAttribute),"yAxisAttribute"in r&&e(5,l=r.yAxisAttribute),"color"in r&&e(1,u=r.color),"colorOpacity"in r&&e(6,a=r.colorOpacity),"backgroundColor"in r&&e(7,g=r.backgroundColor),"timeseries"in r&&e(8,h=r.timeseries),"onclick"in r&&e(9,s=r.onclick)},c.$$.update=()=>{c.$$.dirty&498&&V(h,i,l,u,a,g)},[o,u,n,f,i,l,a,g,h,s,q]}class Ut extends rt{constructor(t){super(),at(this,t,Lt,Et,it,{unit:0,xAxisAttribute:4,yAxisAttribute:5,color:1,colorOpacity:6,backgroundColor:7,timeseries:8,onclick:9})}}export{Ut as E};
