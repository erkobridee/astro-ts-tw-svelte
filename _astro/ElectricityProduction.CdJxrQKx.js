import{S as p,i as g,s as $,d as c,e as C,t as E,f as v,h as l,j as y,m as I,k as m,l as u,n as f,p as x,q as d,u as R,x as h,y as _}from"./ECharts.BfJ7rUUm.js";import{E as k,A as w,U as A}from"./EnergyChart.GfKpgAuz.js";import{i as O}from"./ChartLoadingSpinner.DP9ttGov.js";import"./dayjs.min.Cbbdfn5l.js";import"./index.DgoW5roq.js";function P(i){let t;return{c(){t=_("Electricity Consumption header actions")},l(e){t=h(e,"Electricity Consumption header actions")},m(e,r){l(e,t,r)},d(e){e&&c(t)}}}function T(i){let t;return{c(){t=_("Footer Row")},l(e){t=h(e,"Footer Row")},m(e,r){l(e,t,r)},d(e){e&&c(t)}}}function U(i){let t,e,r,n;return r=new k({props:{timeseries:i[0],onclick:i[1],color:O,unit:A.KW,aggregation:w.MINUTES,labels:["Production","Exceedance"],$$slots:{footer:[T],headerActions:[P]},$$scope:{ctx:i}}}),{c(){t=d("div"),e=d("div"),R(r.$$.fragment),this.h()},l(o){t=u(o,"DIV",{class:!0});var s=f(t);e=u(s,"DIV",{class:!0});var a=f(e);x(r.$$.fragment,a),a.forEach(c),s.forEach(c),this.h()},h(){m(e,"class","absolute top-0 right-0 bottom-0 left-0"),m(t,"class","relative grow")},m(o,s){l(o,t,s),y(t,e),I(r,e,null),n=!0},p(o,[s]){const a={};s&1&&(a.timeseries=o[0]),s&4&&(a.$$scope={dirty:s,ctx:o}),r.$set(a)},i(o){n||(v(r.$$.fragment,o),n=!0)},o(o){E(r.$$.fragment,o),n=!1},d(o){o&&c(t),C(r)}}}function b(i,t,e){let{timeseries:r=[]}=t;const n=o=>{console.log("ElectricityProduction.onChartClick timeserie:",o)};return i.$$set=o=>{"timeseries"in o&&e(0,r=o.timeseries)},[r,n]}class N extends p{constructor(t){super(),g(this,t,b,U,$,{timeseries:0})}}export{N as default};
