import{S as m,i as y,s as p,E as I,l as h,u as A,d as r,a as f,t as _,b as g,c as B,q as $,m as v,e as x,f as c,g as l,h as E,j as u,k as L}from"./ECharts.btR8DHUZ.js";import"./index.FyIYuhg6.js";import{b as S,D as b}from"./common.DfdZzzxi.js";function D(n){let e,s,a,i;return a=new I({props:{id:"dataset-mapped-to-series",init:h,options:n[0]}}),{c(){e=u("div"),s=u("div"),L(a.$$.fragment),this.h()},l(t){e=c(t,"DIV",{class:!0});var o=l(e);s=c(o,"DIV",{class:!0});var d=l(s);E(a.$$.fragment,d),d.forEach(r),o.forEach(r),this.h()},h(){x(s,"class","absolute top-0 right-0 bottom-0 left-0"),x(e,"class","relative grow")},m(t,o){B(t,e,o),$(e,s),v(a,s,null),i=!0},p:A,i(t){i||(g(a.$$.fragment,t),i=!0)},o(t){_(a.$$.fragment,t),i=!1},d(t){t&&r(e),f(a)}}}function R(n){const e={type:"bar",emphasis:{itemStyle:{color:"inherit"}},itemStyle:S(b)};return[{legend:{},tooltip:{},dataset:{source:[["product","2020","2021","2022","2023"],["Matcha Latte",41.1,30.4,65.1,53.3],["Milk Tea",86.5,92.1,85.7,83.1],["Cheese Cocoa",24.1,67.2,79.5,86.4]]},grid:[{bottom:"55%"},{top:"55%"}],xAxis:[{type:"category",gridIndex:0},{type:"category",gridIndex:1}],yAxis:[{gridIndex:0},{gridIndex:1}],series:[{...e,seriesLayoutBy:"row",xAxisIndex:0,yAxisIndex:0},{...e,seriesLayoutBy:"row",xAxisIndex:0,yAxisIndex:0},{...e,seriesLayoutBy:"row",xAxisIndex:0,yAxisIndex:0},{...e,seriesLayoutBy:"column",xAxisIndex:1,yAxisIndex:1},{...e,seriesLayoutBy:"column",xAxisIndex:1,yAxisIndex:1},{...e,seriesLayoutBy:"column",xAxisIndex:1,yAxisIndex:1},{...e,seriesLayoutBy:"column",xAxisIndex:1,yAxisIndex:1}]}]}class T extends m{constructor(e){super(),y(this,e,R,D,p,{})}}export{T as default};
