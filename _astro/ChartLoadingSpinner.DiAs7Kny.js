import{d as e}from"./dayjs.min.Cbbdfn5l.js";import{S as L,i as T,s as A,z as c,d as r,A as i,h as f,j as O,k as _,l,n as d,q as E}from"./ECharts.BSvq92Jr.js";const I="DD.MM.YYYY",R="HH:mm",m=`${I}, ${R}`,D="MMM",Y="ddd",u="dd HH:mm",K=({date:t,template:s,defaultValue:a=""})=>t?e(t).format(s):a,H=t=>e(t).format(m),x=t=>e(t).format(D),w=t=>e(t).format(u),M=3,P=(t,s=M,a=navigator?.language)=>new Intl.NumberFormat(a,{maximumFractionDigits:s}).format(t),W="#f9fafb",p="#6b7280",j="#0891b2",k="#3b82f6",B="#f59e0b",G="#5c6660",h="#a3a3a3",$={type:[1,3],color:h},C={SOLID:"solid"},q=["none","none"],F="Reference Power",b="#ea580c",U=2,N=C.SOLID,V={label:F,color:b,width:U,type:N},z={type:"average",label:{fontWeight:"bold"}},X=8,J=(t=0,s=0)=>({borderRadius:[t,t,s,s]}),Q=({color:t,label:s,value:a})=>{let o="<div>";return t&&(o+=`<span style="display:inline-block;border-radius:10px;width:10px;height:10px;margin-right:5px;background-color:${t};"></span>`),s&&(o+=`<span>${s}</span>`),o+=`<span style="float:right;margin-left:20px;font-weight:600">${a}</span>`,o+="</div>",o},Z=()=>{},tt=()=>{},st=()=>{};function S(t){let s,a;return{c(){s=E("div"),a=E("div"),this.h()},l(o){s=l(o,"DIV",{class:!0});var n=d(s);a=l(n,"DIV",{class:!0,style:!0}),d(a).forEach(r),n.forEach(r),this.h()},h(){_(a,"class","h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"),i(a,"border-top-color",t[0]),_(s,"class","flex h-full w-full items-center justify-center")},m(o,n){f(o,s,n),O(s,a)},p(o,[n]){n&1&&i(a,"border-top-color",o[0])},i:c,o:c,d(o){o&&r(s)}}}function y(t,s,a){let{color:o=p}=s;return t.$$set=n=>{"color"in n&&a(0,o=n.color)},[o]}class ot extends L{constructor(s){super(),T(this,s,y,S,A,{color:0})}}export{p as C,st as D,G as L,Y as W,W as a,I as b,ot as c,X as d,K as e,Q as f,P as g,k as h,B as i,j,Z as k,$ as l,J as m,M as n,V as o,tt as p,q,z as r,w as s,H as t,x as u};
