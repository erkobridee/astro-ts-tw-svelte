import{d as e}from"./dayjs.min.Cbbdfn5l.js";import{S as T,i as E,s as f,z as c,d as r,A as i,h as O,j as A,k as _,l,n as d,q as L}from"./ECharts.BfJ7rUUm.js";const I="DD.MM.YYYY",R="HH:mm",m=`${I}, ${R}`,D="MMM",Y="ddd",u="dd HH:mm",H=({date:t,template:s,defaultValue:a=""})=>t?e(t).format(s):a,K=t=>e(t).format(m),x=t=>e(t).format(D),w=t=>e(t).format(u),p=3,P=(t,s=p,a=navigator?.language)=>new Intl.NumberFormat(a,{maximumFractionDigits:s}).format(t),j="#f9fafb",h="#6b7280",k="#0891b2",W="#3b82f6",$="#f59e0b",B="#5c6660",C="#a3a3a3",G={type:[1,3],color:C},M={SOLID:"solid"},F="Reference Power",b="#ea580c",S=2,U=M.SOLID,q={label:F,color:b,width:S,type:U},V=8,z=(t=0,s=0)=>({borderRadius:[t,t,s,s]}),X=({color:t,label:s,value:a})=>{let o="<div>";return t&&(o+=`<span style="display:inline-block;border-radius:10px;width:10px;height:10px;margin-right:5px;background-color:${t};"></span>`),s&&(o+=`<span>${s}</span>`),o+=`<span style="float:right;margin-left:20px;font-weight:600">${a}</span>`,o+="</div>",o},J=()=>{},Q=()=>{},Z=()=>{};function N(t){let s,a;return{c(){s=L("div"),a=L("div"),this.h()},l(o){s=l(o,"DIV",{class:!0});var n=d(s);a=l(n,"DIV",{class:!0,style:!0}),d(a).forEach(r),n.forEach(r),this.h()},h(){_(a,"class","h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"),i(a,"border-top-color",t[0]),_(s,"class","flex h-full w-full items-center justify-center")},m(o,n){O(o,s,n),A(s,a)},p(o,[n]){n&1&&i(a,"border-top-color",o[0])},i:c,o:c,d(o){o&&r(s)}}}function y(t,s,a){let{color:o=h}=s;return t.$$set=n=>{"color"in n&&a(0,o=n.color)},[o]}class tt extends T{constructor(s){super(),E(this,s,y,N,f,{color:0})}}export{h as C,Z as D,B as L,Y as W,j as a,I as b,tt as c,V as d,H as e,X as f,P as g,W as h,$ as i,k as j,J as k,G as l,z as m,p as n,q as o,Q as p,w as q,K as r,x as s};
