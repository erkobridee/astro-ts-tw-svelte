import{S as c,i as m,s as l,d as a,e as f,t as u,f as h,h as p,m as v,k as _,l as d,n as g,p as C,q as $,u as w}from"./ECharts.D_PwvaFx.js";import{E as y}from"./EnergyOverviewChart.BosS6dnQ.js";import{k as E}from"./ChartLoadingSpinner.B1vm3YO_.js";import"./index.t4S9YAZx.js";import"./colors.DRy8vmPD.js";import"./dayjs.min.2rai63wT.js";function O(s){let t,i,n;return i=new y({props:{timeseries:s[0],unit:"kWh",color:E,onclick:s[1]}}),{c(){t=$("div"),w(i.$$.fragment),this.h()},l(e){t=d(e,"DIV",{class:!0});var r=g(t);C(i.$$.fragment,r),r.forEach(a),this.h()},h(){_(t,"class","flex h-[300px] w-[600px]")},m(e,r){p(e,t,r),v(i,t,null),n=!0},p(e,[r]){const o={};r&1&&(o.timeseries=e[0]),i.$set(o)},i(e){n||(h(i.$$.fragment,e),n=!0)},o(e){u(i.$$.fragment,e),n=!1},d(e){e&&a(t),f(i)}}}function k(s,t,i){let{timeseries:n}=t;const e=r=>{console.log("ElectricityProductionOverview.onChartClick timeserie:",r)};return s.$$set=r=>{"timeseries"in r&&i(0,n=r.timeseries)},[n,e]}class D extends c{constructor(t){super(),m(this,t,k,O,l,{timeseries:0})}}export{D as default};
