import{S as m,i as c,s as l,d as a,e as f,t as p,f as u,h,m as v,k as _,l as d,n as C,p as g,q as $,u as w}from"./ECharts.BfJ7rUUm.js";import{E as y}from"./EnergyOverviewChart.DfLbRnH8.js";import{e as E}from"./ChartLoadingSpinner.bNe3PTbO.js";import"./index.DgoW5roq.js";import"./colors.DRy8vmPD.js";import"./format.DTLDyVsJ.js";import"./dayjs.min.Cbbdfn5l.js";function O(s){let t,r,n;return r=new y({props:{timeseries:s[0],unit:"kWh",color:E,onclick:s[1]}}),{c(){t=$("div"),w(r.$$.fragment),this.h()},l(e){t=d(e,"DIV",{class:!0});var i=C(t);g(r.$$.fragment,i),i.forEach(a),this.h()},h(){_(t,"class","flex h-[300px] w-[600px]")},m(e,i){h(e,t,i),v(r,t,null),n=!0},p(e,[i]){const o={};i&1&&(o.timeseries=e[0]),r.$set(o)},i(e){n||(u(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){e&&a(t),f(r)}}}function k(s,t,r){let{timeseries:n}=t;const e=i=>{console.log("ElectricityConsumptionOverview.onChartClick timeserie:",i)};return s.$$set=i=>{"timeseries"in i&&r(0,n=i.timeseries)},[n,e]}class R extends m{constructor(t){super(),c(this,t,k,O,l,{timeseries:0})}}export{R as default};
