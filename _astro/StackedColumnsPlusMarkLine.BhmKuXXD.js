import{S as y,i as b,s as f,E as S,a as E,z as _,d as l,e as A,t as L,f as v,h as x,j as k,m as $,k as d,l as m,n as p,p as w,q as h,u as D}from"./ECharts.BfJ7rUUm.js";import"./index.DgoW5roq.js";import{b as I,L as c,a as R,W as B,D as M}from"./common.DfdZzzxi.js";function T(r){let e,a,s,i;return s=new S({props:{id:"stacket-columns-plus-markline",init:E,options:r[0]}}),{c(){e=h("div"),a=h("div"),D(s.$$.fragment),this.h()},l(t){e=m(t,"DIV",{class:!0});var n=p(e);a=m(n,"DIV",{class:!0});var o=p(a);w(s.$$.fragment,o),o.forEach(l),n.forEach(l),this.h()},h(){d(a,"class","absolute top-0 right-0 bottom-0 left-0"),d(e,"class","relative grow")},m(t,n){x(t,e,n),k(e,a),$(s,a,null),i=!0},p:_,i(t){i||(v(s.$$.fragment,t),i=!0)},o(t){L(s.$$.fragment,t),i=!1},d(t){t&&l(e),A(s)}}}function C(r){const e={direct:[320,332,301,334,390,330,320],email:[120,132,101,134,90,230,210],unionAds:[220,182,191,234,290,330,310],videoAds:[150,232,201,154,190,330,410],searchEngine:[862,1018,964,1026,1679,1600,1570],baidu:[620,732,701,734,1090,1130,1120],google:[120,132,101,134,290,230,220],bing:[60,72,71,74,190,130,110],others:[62,82,91,84,109,110,120]},a={focus:"series",itemStyle:{color:"inherit"}},s=I(M),i={top:5},t={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}}},n={left:"3%",right:"4%",bottom:"3%",top:"8%",containLabel:!0},o={type:"category",data:B,boundaryGap:!0,axisLabel:{color:R},axisTick:{show:!1},axisLine:{lineStyle:c},splitLine:{show:!0,lineStyle:c,showMinLine:!1,showMaxLine:!1,interval:1}},u={type:"value",position:"right",axisLabel:{inside:!1,verticalAlign:"bottom",padding:[0,0,2,0],showMaxLabel:!1},splitLine:{lineStyle:c,showMaxLine:!1}},g=[{name:"Direct",type:"bar",itemStyle:s,emphasis:a,data:e.direct},{name:"Email",type:"bar",stack:"Ad",emphasis:a,data:e.email},{name:"Union Ads",type:"bar",stack:"Ad",emphasis:a,data:e.unionAds},{name:"Video Ads",type:"bar",stack:"Ad",emphasis:a,data:e.videoAds},{name:"Search Engine",type:"bar",data:e.searchEngine,itemStyle:s,emphasis:a,markLine:{label:{position:"end",distance:10},lineStyle:{type:"dashed"},data:[[{type:"min"},{type:"max"}]]}},{name:"Baidu",type:"bar",barWidth:5,stack:"Search Engine",emphasis:a,data:e.baidu},{name:"Google",type:"bar",stack:"Search Engine",emphasis:a,data:e.google},{name:"Bing",type:"bar",stack:"Search Engine",emphasis:a,data:e.bing},{name:"Others",type:"bar",stack:"Search Engine",emphasis:a,data:e.others}];return[{legend:i,tooltip:t,grid:n,xAxis:o,yAxis:u,series:g}]}class W extends y{constructor(e){super(),b(this,e,C,T,f,{})}}export{W as default};
