import{S as p,i as g,s as $,d as c,e as C,t as E,f as v,h as l,j as y,m as I,k as m,l as f,n as u,p as x,q as d,u as R,x as h,y as _}from"./ECharts.BfJ7rUUm.js";import{E as k,A as w,U as A}from"./EnergyChart.BAogtzrx.js";import{f as O}from"./ChartLoadingSpinner.CI0ueKHX.js";import"./dayjs.min.Cbbdfn5l.js";import"./index.DgoW5roq.js";function P(s){let t;return{c(){t=_("Electricity Consumption header actions")},l(e){t=h(e,"Electricity Consumption header actions")},m(e,r){l(e,t,r)},d(e){e&&c(t)}}}function T(s){let t;return{c(){t=_("Footer Row")},l(e){t=h(e,"Footer Row")},m(e,r){l(e,t,r)},d(e){e&&c(t)}}}function U(s){let t,e,r,n;return r=new k({props:{timeseries:s[0],onclick:s[1],color:O,unit:A.KW,aggregation:w.MINUTES,labels:["Production","Exceedance"],$$slots:{footer:[T],headerActions:[P]},$$scope:{ctx:s}}}),{c(){t=d("div"),e=d("div"),R(r.$$.fragment),this.h()},l(o){t=f(o,"DIV",{class:!0});var i=u(t);e=f(i,"DIV",{class:!0});var a=u(e);x(r.$$.fragment,a),a.forEach(c),i.forEach(c),this.h()},h(){m(e,"class","absolute top-0 right-0 bottom-0 left-0"),m(t,"class","relative grow")},m(o,i){l(o,t,i),y(t,e),I(r,e,null),n=!0},p(o,[i]){const a={};i&1&&(a.timeseries=o[0]),i&4&&(a.$$scope={dirty:i,ctx:o}),r.$set(a)},i(o){n||(v(r.$$.fragment,o),n=!0)},o(o){E(r.$$.fragment,o),n=!1},d(o){o&&c(t),C(r)}}}function b(s,t,e){let{timeseries:r=[]}=t;const n=o=>{console.log("ElectricityProduction.onChartClick timeserie:",o)};return s.$$set=o=>{"timeseries"in o&&e(0,r=o.timeseries)},[r,n]}class N extends p{constructor(t){super(),g(this,t,b,U,$,{timeseries:0})}}export{N as default};
