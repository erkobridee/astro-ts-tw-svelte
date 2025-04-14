import{S as dt,i as ht,s as mt,E as _t,a as gt,b as At,c as bt,d as g,e as B,t as M,f as z,g as xt,h as W,j as y,m as j,k as _,l as C,n as O,o as yt,p as q,q as E,r as Ct,u as H,v as Ot,w as Et,x as kt,y as pt}from"./ECharts.CpYfIO0D.js";import{d as Y}from"./dayjs.min.2rai63wT.js";import"./index.DACIwEDX.js";import{h as G}from"./colors.DRy8vmPD.js";import{C as Lt,y as vt,a as Dt,t as wt,c as It,L,d as St,z as Rt,A as Tt}from"./ChartLoadingSpinner.DA6qNb_2.js";import{a as P}from"./math.4fE8PRGd.js";function N(l){let t,a,o,s;return{c(){t=E("div"),a=E("span"),o=pt(l[0]),this.h()},l(i){t=C(i,"DIV",{class:!0});var c=O(t);a=C(c,"SPAN",{class:!0,title:!0});var r=O(a);o=kt(r,l[0]),r.forEach(g),c.forEach(g),this.h()},h(){_(a,"class","text-[0.7rem]"),_(a,"title",s="Unit: "+l[0]),_(t,"class","absolute top-2 left-4 z-10")},m(i,c){W(i,t,c),y(t,a),y(a,o)},p(i,c){c&1&&Et(o,i[0]),c&1&&s!==(s="Unit: "+i[0])&&_(a,"title",s)},d(i){i&&g(t)}}}function Ut(l){let t,a;return t=new It({props:{color:l[1]}}),{c(){H(t.$$.fragment)},l(o){q(t.$$.fragment,o)},m(o,s){j(t,o,s),a=!0},p(o,s){const i={};s&2&&(i.color=o[1]),t.$set(i)},i(o){a||(z(t.$$.fragment,o),a=!0)},o(o){M(t.$$.fragment,o),a=!1},d(o){B(t,o)}}}function Vt(l){let t,a,o,s,i,c,r=l[0]&&N(l);function A(n){l[11](n)}let h={init:gt,options:l[3],notMerge:!0,$$slots:{default:[Ut]},$$scope:{ctx:l}};return l[2]!==void 0&&(h.chart=l[2]),s=new _t({props:h}),At.push(()=>bt(s,"chart",A)),{c(){t=E("div"),r&&r.c(),a=Ct(),o=E("div"),H(s.$$.fragment),this.h()},l(n){t=C(n,"DIV",{class:!0});var u=O(t);r&&r.l(u),a=yt(u),o=C(u,"DIV",{class:!0});var f=O(o);q(s.$$.fragment,f),f.forEach(g),u.forEach(g),this.h()},h(){_(o,"class","absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"),_(t,"class","relative grow")},m(n,u){W(n,t,u),r&&r.m(t,null),y(t,a),y(t,o),j(s,o,null),c=!0},p(n,[u]){n[0]?r?r.p(n,u):(r=N(n),r.c(),r.m(t,a)):r&&(r.d(1),r=null);const f={};u&8&&(f.options=n[3]),u&32770&&(f.$$scope={dirty:u,ctx:n}),!i&&u&4&&(i=!0,f.chart=n[2],xt(()=>i=!1)),s.$set(f)},i(n){c||(z(s.$$.fragment,n),c=!0)},o(n){M(s.$$.fragment,n),c=!1},d(n){n&&g(t),r&&r.d(),B(s)}}}const Ft="en-US";function Yt(l,t,a){let{unit:o=""}=t,{xAxisAttribute:s="startedAt"}=t,{yAxisAttribute:i="value"}=t,{color:c=Lt}=t,{colorOpacity:r=vt}=t,{backgroundColor:A=Dt}=t,{catchClickOnEmpty:h=!1}=t,{timeseries:n=[]}=t,{onclick:u=wt}=t,f,v={};const K=(e,m,b,w,J,Q,I)=>{const $=G(w,J),tt=G(L,.75);e=X(e);const S=e.length-1,et=new Intl.NumberFormat(Ft,{maximumFractionDigits:0}),x=e.reduce((d,k,V)=>{const F=V===S?w:$,lt=V===S?L:tt,p=k.value,ct=p===0;return p>d.maxYAxisValue&&(d.maxYAxisValue=p),d.xAxis.push(k[m]),d.yAxis.push({value:k[b],itemStyle:{borderRadius:St,borderWidth:1,borderColor:F,color:F},label:{show:!0,position:"top",color:lt,fontWeight:"bold",formatter:ut=>{const ft=ut.value;return ct?"":et.format(ft)}}}),d},{xAxis:[],yAxis:[],maxYAxisValue:0}),R="2%",T="10%",at={top:T,bottom:T,left:R,right:R},ot={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:Tt}},formatter:()=>""},rt={type:"category",data:x.xAxis,axisLabel:{formatter:Rt,color:L},axisLine:{show:!1},axisTick:{show:!1}},nt={type:"value",show:!1,max:d=>I?d.max:P(d.max,15)},U={type:"bar",data:x.yAxis,barCategoryGap:10},st=P(x.maxYAxisValue,15),it={type:"bar",color:"transparent",data:x.yAxis.map(()=>st),barGap:"-100%"};a(3,v={backgroundColor:Q,grid:at,tooltip:ot,xAxis:rt,yAxis:nt,series:I?[it,U]:[U]})},X=e=>{if(e.length>0)return e;for(let m=5;m>=0;m--){const b=(m>0?Y().subtract(m,"month"):Y()).startOf("month").startOf("day");e.push({startedAt:b.format(),endedAt:b.endOf("month").endOf("day").format(),value:0})}return e},D=e=>{console.log("onChartClick",e),e.data&&u(n[e.dataIndex])};Ot(()=>(f.on("click",D),console.log("EnergyOverviewChart - mounted",{chart:f}),()=>{f.off("click",D),console.log("EnergyOverviewChart - destroyed",{chart:f})}));function Z(e){f=e,a(2,f)}return l.$$set=e=>{"unit"in e&&a(0,o=e.unit),"xAxisAttribute"in e&&a(4,s=e.xAxisAttribute),"yAxisAttribute"in e&&a(5,i=e.yAxisAttribute),"color"in e&&a(1,c=e.color),"colorOpacity"in e&&a(6,r=e.colorOpacity),"backgroundColor"in e&&a(7,A=e.backgroundColor),"catchClickOnEmpty"in e&&a(8,h=e.catchClickOnEmpty),"timeseries"in e&&a(9,n=e.timeseries),"onclick"in e&&a(10,u=e.onclick)},l.$$.update=()=>{l.$$.dirty&1010&&K(n,s,i,c,r,A,h)},[o,c,f,v,s,i,r,A,h,n,u,Z]}class jt extends dt{constructor(t){super(),ht(this,t,Yt,Vt,mt,{unit:0,xAxisAttribute:4,yAxisAttribute:5,color:1,colorOpacity:6,backgroundColor:7,catchClickOnEmpty:8,timeseries:9,onclick:10})}}export{jt as E};
