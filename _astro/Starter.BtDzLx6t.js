import{S as V,i as j,s as q,b as U,c as z,E as F,a as G,d as g,e as y,t as C,f as D,g as N,h as L,j as p,m as I,k as b,l as _,n as x,W as O,o as T,p as A,q as $,r as w,u as B,x as P,y as W}from"./ECharts.BSvq92Jr.js";import"./index.CV-e_qxF.js";import{T as H}from"./Toggle.Cdeb9E4H.js";import{b as J,D as K}from"./common.DfdZzzxi.js";function M(s){let t;return{c(){t=W("Loading Starter Example Chart...")},l(e){t=P(e,"Loading Starter Example Chart...")},m(e,n){L(e,t,n)},d(e){e&&g(t)}}}function Q(s){let t,e,n,l="Theme",f,r,u,k,d,h,o,v;function R(a){s[3](a)}let E={id:"themeToggle",layout:"labels",label:["light","dark"]};return s[0]!==void 0&&(E.checked=s[0]),r=new H({props:E}),U.push(()=>z(r,"checked",R)),o=new F({props:{class:"chart-container-starter-example",id:"test-id-charts",init:G,theme:s[1],options:s[2],$$slots:{default:[M]},$$scope:{ctx:s}}}),{c(){t=$("div"),e=$("div"),n=$("span"),n.textContent=l,f=w(),B(r.$$.fragment),k=w(),d=$("div"),h=$("div"),B(o.$$.fragment),this.h()},l(a){t=_(a,"DIV",{class:!0});var i=x(t);e=_(i,"DIV",{class:!0});var c=x(e);n=_(c,"SPAN",{"data-svelte-h":!0}),O(n)!=="svelte-hhztpt"&&(n.textContent=l),f=T(c),A(r.$$.fragment,c),c.forEach(g),k=T(i),d=_(i,"DIV",{class:!0});var m=x(d);h=_(m,"DIV",{class:!0});var S=x(h);A(o.$$.fragment,S),S.forEach(g),m.forEach(g),i.forEach(g),this.h()},h(){b(e,"class","flex items-center justify-end gap-2"),b(h,"class","absolute top-0 right-0 bottom-0 left-0"),b(d,"class","relative grow"),b(t,"class","flex grow flex-col gap-2")},m(a,i){L(a,t,i),p(t,e),p(e,n),p(e,f),I(r,e,null),p(t,k),p(t,d),p(d,h),I(o,h,null),v=!0},p(a,[i]){const c={};!u&&i&1&&(u=!0,c.checked=a[0],N(()=>u=!1)),r.$set(c);const m={};i&2&&(m.theme=a[1]),i&16&&(m.$$scope={dirty:i,ctx:a}),o.$set(m)},i(a){v||(D(r.$$.fragment,a),D(o.$$.fragment,a),v=!0)},o(a){C(r.$$.fragment,a),C(o.$$.fragment,a),v=!1},d(a){a&&g(t),y(r),y(o)}}}function X(s,t,e){let n,l=!1;const f={grid:{top:85,left:15,right:15,bottom:15,containLabel:!0},title:{text:"Getting Started",subtext:"ECharts Basic Example",padding:15},tooltip:{},xAxis:{data:["shirt","cardigan","chiffon","pants","heels","socks"]},yAxis:{},series:[{name:"sales",type:"bar",data:[5,20,36,10,10,20],emphasis:{itemStyle:{color:"inherit"}},itemStyle:J(K)}]};function r(u){l=u,e(0,l)}return s.$$.update=()=>{s.$$.dirty&1&&e(1,n=l?"dark":"light")},[l,n,f,r]}class at extends V{constructor(t){super(),j(this,t,X,Q,q,{})}}export{at as default};
