import{S as c,i as m,s as l,d as o,a as f,t as h,b as u,c as v,m as _,e as d,f as p,g,h as C,j as $,k as w}from"./ECharts.btR8DHUZ.js";import{E as y,a as E}from"./EnergyOverviewChart.DcGIXg5n.js";import"./dayjs.min.Cbbdfn5l.js";import"./index.FyIYuhg6.js";function O(n){let t,i,s;return i=new y({props:{timeseries:n[0],color:E,onclick:n[1]}}),{c(){t=$("div"),w(i.$$.fragment),this.h()},l(e){t=p(e,"DIV",{class:!0});var r=g(t);C(i.$$.fragment,r),r.forEach(o),this.h()},h(){d(t,"class","flex h-[300px] w-[600px]")},m(e,r){v(e,t,r),_(i,t,null),s=!0},p(e,[r]){const a={};r&1&&(a.timeseries=e[0]),i.$set(a)},i(e){s||(u(i.$$.fragment,e),s=!0)},o(e){h(i.$$.fragment,e),s=!1},d(e){e&&o(t),f(i)}}}function k(n,t,i){let{timeseries:s}=t;const e=r=>{console.log("ElectricityProductionOverview.onChartClick timeserie:",r)};return n.$$set=r=>{"timeseries"in r&&i(0,s=r.timeseries)},[s,e]}class T extends c{constructor(t){super(),m(this,t,k,O,l,{timeseries:0})}}export{T as default};
