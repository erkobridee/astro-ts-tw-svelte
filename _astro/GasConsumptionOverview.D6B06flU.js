import{S as m,i as c,s as l,d as o,e as f,t as u,f as h,h as p,m as v,k as _,l as d,n as g,p as C,q as $,u as w}from"./ECharts.DF4cteOg.js";import{E as O}from"./EnergyOverviewChart.rtLEaRCF.js";import{e as y}from"./common.C16CT1O5.js";import"./index.BiZfemjP.js";function k(i){let t,n,r;return n=new O({props:{timeseries:i[0],unit:"m3",color:y,onclick:i[1]}}),{c(){t=$("div"),w(n.$$.fragment),this.h()},l(e){t=d(e,"DIV",{class:!0});var s=g(t);C(n.$$.fragment,s),s.forEach(o),this.h()},h(){_(t,"class","flex h-[300px] w-[600px]")},m(e,s){p(e,t,s),v(n,t,null),r=!0},p(e,[s]){const a={};s&1&&(a.timeseries=e[0]),n.$set(a)},i(e){r||(h(n.$$.fragment,e),r=!0)},o(e){u(n.$$.fragment,e),r=!1},d(e){e&&o(t),f(n)}}}function x(i,t,n){let{timeseries:r}=t;const e=s=>{console.log("GasConsumptionOverview.onChartClick timeserie:",s)};return i.$$set=s=>{"timeseries"in s&&n(0,r=s.timeseries)},[r,e]}class I extends m{constructor(t){super(),c(this,t,x,k,l,{timeseries:0})}}export{I as default};
