import{S as d,i as f,s as v,E as h,n as g,d as s,a as _,t as y,b as x,c as $,e as b,m as E,f as p,g as m,h as u,j as T,k as c,l as A}from"./ECharts.Du4ShQ4N.js";function D(i){let t,e,r,a;return r=new h({props:{id:"formatting-tooltip-values",options:i[0]}}),{c(){t=c("div"),e=c("div"),A(r.$$.fragment),this.h()},l(o){t=m(o,"DIV",{class:!0});var n=u(t);e=m(n,"DIV",{class:!0});var l=u(e);T(r.$$.fragment,l),l.forEach(s),n.forEach(s),this.h()},h(){p(e,"class","absolute top-0 right-0 bottom-0 left-0"),p(t,"class","relative grow")},m(o,n){$(o,t,n),b(t,e),E(r,e,null),a=!0},p:g,i(o){a||(x(r.$$.fragment,o),a=!0)},o(o){y(r.$$.fragment,o),a=!1},d(o){o&&s(t),_(r)}}}function F(i){const t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],e={evaporation:[2,4.9,7,23.2,25.6,76.7,135.6],precipitation:[2.6,5.9,9,26.4,28.7,70.7,175.6],temperature:[2,2.2,3.3,4.5,6.3,10.2,20.3]};return[{tooltip:{trigger:"axis"},legend:{},xAxis:[{type:"category",data:t,axisPointer:{type:"shadow",label:{formatter:"Day of week: {value}"}}}],yAxis:[{type:"value",name:"Precipitation",alignTicks:!0,axisLabel:{formatter:"{value} ml"}},{type:"value",name:"Temperature",axisLabel:{formatter:"{value} °C"}}],series:[{name:"Evaporation",type:"bar",tooltip:{valueFormatter:a=>a+" ml"},data:e.evaporation},{name:"Precipitation",type:"bar",tooltip:{valueFormatter:a=>a+" ml"},data:e.precipitation},{name:"Temperature",type:"line",yAxisIndex:1,tooltip:{valueFormatter:a=>a+" °C"},data:e.temperature}]}]}class w extends d{constructor(t){super(),f(this,t,F,D,v,{})}}export{w as default};
