import{S as Y,i as j,s as q,E as ft,a as ht,b as gt,c as mt,d as f,e as K,t as X,f as H,g as _t,h as w,j as A,m as J,k as g,l as _,n as b,o as bt,p as Q,q as v,r as vt,u as Z,v as yt,w as Ct,x as pt,y as kt,z}from"./ECharts.DF4cteOg.js";import"./index.BiZfemjP.js";import{C as G,a as At,D as wt,h as N,b as W,L as xt,c as Dt}from"./common.C16CT1O5.js";function B(n){let t,e,r,a;return{c(){t=v("div"),e=v("span"),r=kt(n[0]),this.h()},l(o){t=_(o,"DIV",{class:!0});var c=b(t);e=_(c,"SPAN",{class:!0,title:!0});var l=b(e);r=pt(l,n[0]),l.forEach(f),c.forEach(f),this.h()},h(){g(e,"class","text-[0.7rem]"),g(e,"title",a="Unit: "+n[0]),g(t,"class","absolute top-2 left-4 z-10")},m(o,c){w(o,t,c),A(t,e),A(e,r)},p(o,c){c&1&&Ct(r,o[0]),c&1&&a!==(a="Unit: "+o[0])&&g(e,"title",a)},d(o){o&&f(t)}}}function Et(n){let t,e;return{c(){t=v("div"),e=v("div"),this.h()},l(r){t=_(r,"DIV",{class:!0});var a=b(t);e=_(a,"DIV",{class:!0,style:!0}),b(e).forEach(f),a.forEach(f),this.h()},h(){g(e,"class","h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"),z(e,"border-top-color",n[1]),g(t,"class","flex h-full w-full items-center justify-center")},m(r,a){w(r,t,a),A(t,e)},p(r,a){a&2&&z(e,"border-top-color",r[1])},d(r){r&&f(t)}}}function St(n){let t,e,r,a,o,c,l=n[0]&&B(n);function k(s){n[11](s)}let y={init:ht,options:n[3],notMerge:!0,$$slots:{default:[Et]},$$scope:{ctx:n}};return n[2]!==void 0&&(y.chart=n[2]),a=new ft({props:y}),gt.push(()=>mt(a,"chart",k)),{c(){t=v("div"),l&&l.c(),e=vt(),r=v("div"),Z(a.$$.fragment),this.h()},l(s){t=_(s,"DIV",{class:!0});var u=b(t);l&&l.l(u),e=bt(u),r=_(u,"DIV",{class:!0});var d=b(r);Q(a.$$.fragment,d),d.forEach(f),u.forEach(f),this.h()},h(){g(r,"class","absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"),g(t,"class","relative grow")},m(s,u){w(s,t,u),l&&l.m(t,null),A(t,e),A(t,r),J(a,r,null),c=!0},p(s,[u]){s[0]?l?l.p(s,u):(l=B(s),l.c(),l.m(t,e)):l&&(l.d(1),l=null);const d={};u&8&&(d.options=s[3]),u&16386&&(d.$$scope={dirty:u,ctx:s}),!o&&u&4&&(o=!0,d.chart=s[2],_t(()=>o=!1)),a.$set(d)},i(s){c||(H(a.$$.fragment,s),c=!0)},o(s){X(a.$$.fragment,s),c=!1},d(s){s&&f(t),l&&l.d(),K(a)}}}const M="en-US";function Lt(n,t,e){let{unit:r=""}=t,{xAxisAttribute:a="startedAt"}=t,{yAxisAttribute:o="value"}=t,{currentColor:c=G}=t,{previousColor:l=G}=t,{colorOpacity:k=.7}=t,{backgroundColor:y=At}=t,{data:s}=t,{onclick:u=wt}=t,d,S={};const $=(i,C,I,x,O,T,et)=>{const at=N(x,T),rt=N(O,T),{current:U,previous:R}=i,F=U.length-1,ot=new Intl.DateTimeFormat(M),it=new Intl.DateTimeFormat(M,{weekday:"short"}),D=U.reduce((h,p,m)=>{const P=m===F?x:at,V=m===F?O:rt;return h.xAxis.push(p[C]),h.current.push({value:p[I],date:p[C],itemStyle:{borderRadius:W,borderWidth:1,borderColor:P,color:P}}),h.previous.push({value:R[m][I],date:R[m][C],itemStyle:{borderRadius:W,borderWidth:1,borderColor:V,color:V}}),h},{xAxis:[],current:[],previous:[]}),E="2%",nt={top:"10%",bottom:"10%",left:"12%",right:E},st={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}},formatter:h=>{let p="";return h.forEach(m=>{p+=`
            <div>
              <span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:${m.color};"></span>
              <span>${ot.format(new Date(m.data.date))}</span>
              <span style="float:right;margin-left:20px;font-weight:600">${m.value}</span>
            </div>
          `}),p}},lt={type:"category",data:D.xAxis,axisLabel:{formatter:h=>it.format(new Date(h)),color:xt},axisLine:{show:!1},axisTick:{show:!1}},ct={type:"value",show:!1},ut={type:"bar",data:D.previous},dt={type:"bar",data:D.current,barCategoryGap:30,markLine:{symbol:["none","none"],data:[{type:"average",x:E,lineStyle:{color:x,width:2,type:"solid"},emphasis:{disabled:!0},label:{show:!0,position:"insideStartTop",fontWeight:"bold",fontSize:12,formatter:h=>Number(h.value).toFixed(3)}},{type:"average",name:"Average",x:E,lineStyle:{color:"transparent"},label:{show:!0,position:"insideStartBottom",fontSize:12,formatter:"{b}",opacity:.8}}]}};e(3,S={backgroundColor:et,grid:nt,tooltip:st,xAxis:lt,yAxis:ct,series:[ut,dt]})},L=i=>{if(console.log("onChartClick",i),!i.data)return;const C=i.dataIndex;u({current:s.current[C],previous:s.previous[C]})};yt(()=>(d.on("click",L),console.log("EnergyOverviewChart - mounted",{chart:d}),()=>{d.off("click",L),console.log("EnergyOverviewChart - destroyed",{chart:d})}));function tt(i){d=i,e(2,d)}return n.$$set=i=>{"unit"in i&&e(0,r=i.unit),"xAxisAttribute"in i&&e(4,a=i.xAxisAttribute),"yAxisAttribute"in i&&e(5,o=i.yAxisAttribute),"currentColor"in i&&e(1,c=i.currentColor),"previousColor"in i&&e(6,l=i.previousColor),"colorOpacity"in i&&e(7,k=i.colorOpacity),"backgroundColor"in i&&e(8,y=i.backgroundColor),"data"in i&&e(9,s=i.data),"onclick"in i&&e(10,u=i.onclick)},n.$$.update=()=>{n.$$.dirty&1010&&$(s,a,o,c,l,k,y)},[r,c,d,S,a,o,l,k,y,s,u,tt]}class It extends Y{constructor(t){super(),j(this,t,Lt,St,q,{unit:0,xAxisAttribute:4,yAxisAttribute:5,currentColor:1,previousColor:6,colorOpacity:7,backgroundColor:8,data:9,onclick:10})}}function Ot(n){let t,e,r;return e=new It({props:{data:n[0],unit:"kWh",currentColor:Dt,onclick:n[1]}}),{c(){t=v("div"),Z(e.$$.fragment),this.h()},l(a){t=_(a,"DIV",{class:!0});var o=b(t);Q(e.$$.fragment,o),o.forEach(f),this.h()},h(){g(t,"class","flex h-[300px] w-[600px]")},m(a,o){w(a,t,o),J(e,t,null),r=!0},p(a,[o]){const c={};o&1&&(c.data=a[0]),e.$set(c)},i(a){r||(H(e.$$.fragment,a),r=!0)},o(a){X(e.$$.fragment,a),r=!1},d(a){a&&f(t),K(e)}}}function Tt(n,t,e){let{data:r}=t;const a=o=>{console.log("DailyElectricityUsage.onChartClick dayUsage:",o)};return n.$$set=o=>{"data"in o&&e(0,r=o.data)},[r,a]}class Vt extends Y{constructor(t){super(),j(this,t,Tt,Ot,q,{data:0})}}export{Vt as default};
