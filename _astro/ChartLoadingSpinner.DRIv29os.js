import{S as E,i as d,s as I,z as c,d as a,A as r,h as O,j as A,k as i,l as L,n as _,q as l}from"./ECharts.BfJ7rUUm.js";const N=(t,s=1)=>{if(!t)return"";(s<0||s>1)&&(s=1),t=t.toUpperCase();const o=parseInt(t.slice(1,3),16),e=parseInt(t.slice(3,5),16),n=parseInt(t.slice(5,7),16);return`rgba(${o}, ${e}, ${n}, ${s})`},F="#f9fafb",R="#6b7280",M="#0891b2",h="#3b82f6",m="#f59e0b",Y="#5c6660",T="#a3a3a3",v={type:[1,3],color:T},C={SOLID:"solid"},f="Reference Power",D="#ea580c",u=2,U=C.SOLID,y={label:f,color:D,width:u,type:U},K="ddd",g="DD.MM.YYYY",P=8,w=(t=0,s=0)=>({borderRadius:[t,t,s,s]}),B=()=>{},G=()=>{},$=()=>{};function b(t){let s,o;return{c(){s=l("div"),o=l("div"),this.h()},l(e){s=L(e,"DIV",{class:!0});var n=_(s);o=L(n,"DIV",{class:!0,style:!0}),_(o).forEach(a),n.forEach(a),this.h()},h(){i(o,"class","h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"),r(o,"border-top-color",t[0]),i(s,"class","flex h-full w-full items-center justify-center")},m(e,n){O(e,s,n),A(s,o)},p(e,[n]){n&1&&r(o,"border-top-color",e[0])},i:c,o:c,d(e){e&&a(s)}}}function p(t,s,o){let{color:e=R}=s;return t.$$set=n=>{"color"in n&&o(0,e=n.color)},[e]}class j extends E{constructor(s){super(),d(this,s,p,b,I,{color:0})}}export{R as C,$ as D,Y as L,K as W,F as a,g as b,j as c,P as d,h as e,m as f,B as g,N as h,v as i,w as j,y as k,G as l,M as m};
