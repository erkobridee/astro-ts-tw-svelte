import{S as I,i as T,s as D,b as x,c as S,d as h,e as k,t as C,f as w,g as V,h as q,j as g,m as E,k as p,l as u,n as _,p as b,o as L,q as v,u as y,r as N}from"./ECharts.CpYfIO0D.js";import{E as R}from"./EnergyOverviewChart.tLEHlNvw.js";import{h as j}from"./ChartLoadingSpinner.DX3ZOeiQ.js";import{T as M}from"./Toggle.DSrT7CON.js";import"./dayjs.min.2rai63wT.js";import"./index.DACIwEDX.js";import"./colors.DRy8vmPD.js";function P(r){let t,i,a,l,o,n,d,s;a=new R({props:{timeseries:r[1],unit:"kWh",color:j,onclick:r[2]}});function O(e){r[4](e)}let $={label:"show data"};return r[0]!==void 0&&($.checked=r[0]),n=new M({props:$}),x.push(()=>S(n,"checked",O)),{c(){t=v("div"),i=v("div"),y(a.$$.fragment),l=N(),o=v("div"),y(n.$$.fragment),this.h()},l(e){t=u(e,"DIV",{class:!0});var c=_(t);i=u(c,"DIV",{class:!0});var m=_(i);b(a.$$.fragment,m),m.forEach(h),l=L(c),o=u(c,"DIV",{class:!0});var f=_(o);b(n.$$.fragment,f),f.forEach(h),c.forEach(h),this.h()},h(){p(i,"class","flex h-[300px] w-[600px]"),p(o,"class","flex"),p(t,"class","flex flex-col gap-2")},m(e,c){q(e,t,c),g(t,i),E(a,i,null),g(t,l),g(t,o),E(n,o,null),s=!0},p(e,[c]){const m={};c&2&&(m.timeseries=e[1]),a.$set(m);const f={};!d&&c&1&&(d=!0,f.checked=e[0],V(()=>d=!1)),n.$set(f)},i(e){s||(w(a.$$.fragment,e),w(n.$$.fragment,e),s=!0)},o(e){C(a.$$.fragment,e),C(n.$$.fragment,e),s=!1},d(e){e&&h(t),k(a),k(n)}}}function U(r,t,i){let a,l=!0,{data:o}=t;const n=s=>{console.log("ElectricityConsumptionOverview.onChartClick timeserie:",s)};function d(s){l=s,i(0,l)}return r.$$set=s=>{"data"in s&&i(3,o=s.data)},r.$$.update=()=>{r.$$.dirty&9&&i(1,a=l?o:[])},[l,a,n,o,d]}class H extends I{constructor(t){super(),T(this,t,U,P,D,{data:3})}}export{H as default};
