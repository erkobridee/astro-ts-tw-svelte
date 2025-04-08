import{S as be,i as Ae,s as ve,E as $e,a as et,b as Ne,c as Ce,e as J,t as y,f as v,g as pe,m as Z,p as $,u as ee,v as tt,Q as Te,d as I,w as he,R as Le,h as Q,j as k,k as B,l as p,n as T,x as de,o as K,q as L,y as _e,r as j,A as qe,M as ge,N as Ee,C as Ge,D as ze,F as Xe,T as at,O as we}from"./ECharts.D_PwvaFx.js";import{g as nt,d as rt}from"./dayjs.min.2rai63wT.js";import{q as st,C as X,c as ot,g as x,r as ue,L as De,s as Oe,d as Se,T as Me,t as Fe,u as Qe,v as it,m as lt,w as Re,x as ct,y as ft,f as ut,o as z,z as Be}from"./ChartLoadingSpinner.Cz1SxX42.js";import"./index.t4S9YAZx.js";var se={exports:{}},mt=se.exports,Ue;function ht(){return Ue||(Ue=1,function(n,e){(function(a,t){n.exports=t()})(mt,function(){return function(a,t){t.prototype.isSameOrBefore=function(r,s){return this.isSame(r,s)||this.isBefore(r,s)}}})}(se)),se.exports}var dt=ht();const _t=nt(dt);rt.extend(_t);const re={KW:"kW",KWH:"kWh",M3:"m³",UNDEFINED:""},R={MONTH:"month",WEEK:"week",DAY:"day",HOUR:"hour",MINUTES:"15_minutes",UNDEFINED:""},Ft={GAS:"GAS"},gt=300,Et=(n,e=gt)=>{let a;return function(...t){clearTimeout(a),a=setTimeout(()=>n.apply(this,t),e)}};function Dt(n){let e,a;return e=new ot({props:{color:n[3]}}),{c(){ee(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,r){Z(e,t,r),a=!0},p(t,r){const s={};r&8&&(s.color=t[3]),e.$set(s)},i(t){a||(v(e.$$.fragment,t),a=!0)},o(t){y(e.$$.fragment,t),a=!1},d(t){J(e,t)}}}function bt(n){let e,a,t,r;function s(i){n[7](i)}function l(i){n[8](i)}let o={init:et,options:n[2],notMerge:!0,$$slots:{default:[Dt]},$$scope:{ctx:n}};return n[1]!==void 0&&(o.chart=n[1]),n[0]!==void 0&&(o.chartContainerDOMRect=n[0]),e=new $e({props:o}),Ne.push(()=>Ce(e,"chart",s)),Ne.push(()=>Ce(e,"chartContainerDOMRect",l)),{c(){ee(e.$$.fragment)},l(i){$(e.$$.fragment,i)},m(i,u){Z(e,i,u),r=!0},p(i,[u]){const m={};u&4&&(m.options=i[2]),u&32776&&(m.$$scope={dirty:u,ctx:i}),!a&&u&2&&(a=!0,m.chart=i[1],pe(()=>a=!1)),!t&&u&1&&(t=!0,m.chartContainerDOMRect=i[0],pe(()=>t=!1)),e.$set(m)},i(i){r||(v(e.$$.fragment,i),r=!0)},o(i){y(e.$$.fragment,i),r=!1},d(i){J(e,i)}}}const At=n=>{const e={};for(let a=0;a<n[0].data.length;++a)for(let t=0;t<n.length;++t){const r=n[t],s=r.stack;if(!s)continue;e[s]||(e[s]={stackStart:[],stackEnd:[]});const l=e[s],o=r.data[a];(()=>{const u=o&&o.value?o.value:o;if(!u||u===null)return!1;switch(typeof u){case"number":return!isNaN(u);case"string":return u!=="-"}})()&&(l.stackStart[a]==null&&(l.stackStart[a]=t),l.stackEnd[a]=t)}return e},vt=n=>{const e=At(n);for(let a=0;a<n.length;++a){const t=n[a];if(!t.stack){t.itemStyle=Oe(Se);continue}const r=t.data,s=r.length,l=e[t.stack];for(let o=0;o<s;++o){const i=l.stackEnd[o]===a,u=r[o]&&r[o].value||r[o],m=Oe(i?Se:0);r[o]={value:u,itemStyle:m}}}return n},Pe="click",me="mousemove";function kt(n,e,a){let t,{isTinyScreen:r=!1}=e,{chartOptions:s}=e,{onclick:l=st}=e,o,i={},u;const m=(_,b)=>{const{color:P,categories:S,series:V,xAxisLabelFormatter:oe,yAxisLabelFormatter:ie=M=>x(M),tooltipFormatter:f}=_;a(4,r=(()=>{if(!b)return!1;const{width:M,height:q}=b;switch(screen.orientation.angle){case 0:return M<=Fe&&q<=Me;case 90:return M<=Me&&q<=Fe}return!1})());const w={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}},formatter:f},W={containLabel:!0,left:0,right:0,top:0,bottom:0},Y=S.length,H={type:"category",data:S,axisLabel:{color:De,formatter:oe,hideOverlap:!0,showMinLabel:!(r&&S.length>10||S.length>12)},axisTick:{show:!1,alignWithLabel:!0},axisLine:{lineStyle:ue},splitLine:{show:!0,lineStyle:ue,showMinLine:!1,showMaxLine:!1,interval:Y>50?10:2}};a(2,i={color:P,tooltip:w,grid:W,xAxis:H,yAxis:{type:"value",position:"right",axisLabel:{verticalAlign:"bottom",padding:[0,-10,2,0],color:De,showMinLabel:!1,showMaxLabel:!1,formatter:ie},splitLine:{lineStyle:ue,showMaxLine:!1}},series:vt(V)})};let d="",c="";const D=Et(_=>{!r||_.event?.type!==me||(c=_.name)}),h=_=>{if(!r){l(_);return}const b=_.name;if(d&&b===d||c&&b===c){l(_),d="",c="";return}d=b,c=""};tt(()=>(o.on(Pe,"series",h),o.on(me,"series",D),console.log("BaseColumnsChart - mounted",{chart:o}),()=>{o.off(Pe,h),o.off(me,D),console.log("BaseColumnsChart - destroyed",{chart:o})}));function g(_){o=_,a(1,o)}function A(_){u=_,a(0,u)}return n.$$set=_=>{"isTinyScreen"in _&&a(4,r=_.isTinyScreen),"chartOptions"in _&&a(5,s=_.chartOptions),"onclick"in _&&a(6,l=_.onclick)},n.$$.update=()=>{n.$$.dirty&32&&a(3,t=s.color[1]??s.color[0]??X),n.$$.dirty&33&&m(s,u)},[u,o,i,t,r,s,l,g,A]}class It extends be{constructor(e){super(),Ae(this,e,kt,bt,ve,{isTinyScreen:4,chartOptions:5,onclick:6})}}function Ve(n){let e,a;return{c(){e=L("span"),a=_e(n[3])},l(t){e=p(t,"SPAN",{});var r=T(e);a=de(r,n[3]),r.forEach(I)},m(t,r){Q(t,e,r),k(e,a)},p(t,r){r&8&&he(a,t[3])},d(t){t&&I(e)}}}function yt(n){let e,a,t,r,s,l,o=x(n[1],n[4])+"",i,u,m=n[3]&&Ve(n);return{c(){e=L("div"),a=L("span"),t=_e(n[0]),r=j(),s=L("div"),l=L("span"),i=_e(o),u=j(),m&&m.c(),this.h()},l(d){e=p(d,"DIV",{class:!0});var c=T(e);a=p(c,"SPAN",{});var N=T(a);t=de(N,n[0]),N.forEach(I),r=K(c),s=p(c,"DIV",{class:!0,style:!0});var D=T(s);l=p(D,"SPAN",{class:!0});var h=T(l);i=de(h,o),h.forEach(I),u=K(D),m&&m.l(D),D.forEach(I),c.forEach(I),this.h()},h(){B(l,"class","text-sm tabular-nums"),B(s,"class","text-sm font-semibold"),Le(s,"color",n[2]),B(e,"class","flex flex-col md:flex-row md:items-center md:gap-2")},m(d,c){Q(d,e,c),k(e,a),k(a,t),k(e,r),k(e,s),k(s,l),k(l,i),k(s,u),m&&m.m(s,null)},p(d,[c]){c&1&&he(t,d[0]),c&18&&o!==(o=x(d[1],d[4])+"")&&he(i,o),d[3]?m?m.p(d,c):(m=Ve(d),m.c(),m.m(s,null)):m&&(m.d(1),m=null),c&4&&Le(s,"color",d[2])},i:Te,o:Te,d(d){d&&I(e),m&&m.d()}}}function Nt(n,e,a){let{label:t}=e,{value:r}=e,{valueColor:s=De}=e,{unit:l}=e,{maximumFractionDigits:o=Qe}=e;return n.$$set=i=>{"label"in i&&a(0,t=i.label),"value"in i&&a(1,r=i.value),"valueColor"in i&&a(2,s=i.valueColor),"unit"in i&&a(3,l=i.unit),"maximumFractionDigits"in i&&a(4,o=i.maximumFractionDigits)},[t,r,s,l,o]}class Je extends be{constructor(e){super(),Ae(this,e,Nt,yt,ve,{label:0,value:1,valueColor:2,unit:3,maximumFractionDigits:4})}}const Ct=n=>({}),We=n=>({}),pt=n=>({}),He=n=>({});function Ke(n){let e,a,t,r;e=new Je({props:{label:n[5](0),value:n[3][0],valueColor:n[6](0),unit:n[0],maximumFractionDigits:n[1]}});let s=n[3][1]&&je(n);return{c(){ee(e.$$.fragment),a=j(),s&&s.c(),t=we()},l(l){$(e.$$.fragment,l),a=K(l),s&&s.l(l),t=we()},m(l,o){Z(e,l,o),Q(l,a,o),s&&s.m(l,o),Q(l,t,o),r=!0},p(l,o){const i={};o&8&&(i.value=l[3][0]),o&1&&(i.unit=l[0]),o&2&&(i.maximumFractionDigits=l[1]),e.$set(i),l[3][1]?s?(s.p(l,o),o&8&&v(s,1)):(s=je(l),s.c(),v(s,1),s.m(t.parentNode,t)):s&&(ge(),y(s,1,1,()=>{s=null}),Ee())},i(l){r||(v(e.$$.fragment,l),v(s),r=!0)},o(l){y(e.$$.fragment,l),y(s),r=!1},d(l){l&&(I(a),I(t)),J(e,l),s&&s.d(l)}}}function je(n){let e,a;return e=new Je({props:{label:n[5](1),value:n[3][1],valueColor:n[6](1),unit:n[0],maximumFractionDigits:n[1]}}),{c(){ee(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,r){Z(e,t,r),a=!0},p(t,r){const s={};r&8&&(s.value=t[3][1]),r&1&&(s.unit=t[0]),r&2&&(s.maximumFractionDigits=t[1]),e.$set(s)},i(t){a||(v(e.$$.fragment,t),a=!0)},o(t){y(e.$$.fragment,t),a=!1},d(t){J(e,t)}}}function xe(n){let e;const a=n[18].footer,t=qe(a,n,n[17],We);return{c(){t&&t.c()},l(r){t&&t.l(r)},m(r,s){t&&t.m(r,s),e=!0},p(r,s){t&&t.p&&(!e||s&131072)&&Ge(t,a,r,r[17],e?Xe(a,r[17],s,Ct):ze(r[17]),We)},i(r){e||(v(t,r),e=!0)},o(r){y(t,r),e=!1},d(r){t&&t.d(r)}}}function Tt(n){let e,a,t,r,s,l,o,i,u,m,d,c=n[2].length>0&&Ke(n);const N=n[18].headerActions,D=qe(N,n,n[17],He);u=new It({props:{chartOptions:n[4],onclick:n[7]}});let h=n[8].footer&&xe(n);return{c(){e=L("div"),a=L("div"),t=L("div"),c&&c.c(),r=j(),s=L("div"),D&&D.c(),l=j(),o=L("div"),i=L("div"),ee(u.$$.fragment),m=j(),h&&h.c(),this.h()},l(g){e=p(g,"DIV",{class:!0});var A=T(e);a=p(A,"DIV",{class:!0});var _=T(a);t=p(_,"DIV",{class:!0});var b=T(t);c&&c.l(b),b.forEach(I),r=K(_),s=p(_,"DIV",{});var P=T(s);D&&D.l(P),P.forEach(I),_.forEach(I),l=K(A),o=p(A,"DIV",{class:!0});var S=T(o);i=p(S,"DIV",{class:!0});var V=T(i);$(u.$$.fragment,V),V.forEach(I),S.forEach(I),m=K(A),h&&h.l(A),A.forEach(I),this.h()},h(){B(t,"class","flex justify-center gap-4 md:items-center md:justify-start"),B(a,"class","flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-between"),B(i,"class","absolute top-0 right-0 bottom-0 left-0"),B(o,"class","relative min-h-[200px] grow"),B(e,"class","flex min-h-full grow flex-col gap-2")},m(g,A){Q(g,e,A),k(e,a),k(a,t),c&&c.m(t,null),k(a,r),k(a,s),D&&D.m(s,null),k(e,l),k(e,o),k(o,i),Z(u,i,null),k(e,m),h&&h.m(e,null),d=!0},p(g,[A]){g[2].length>0?c?(c.p(g,A),A&4&&v(c,1)):(c=Ke(g),c.c(),v(c,1),c.m(t,null)):c&&(ge(),y(c,1,1,()=>{c=null}),Ee()),D&&D.p&&(!d||A&131072)&&Ge(D,N,g,g[17],d?Xe(N,g[17],A,pt):ze(g[17]),He);const _={};A&16&&(_.chartOptions=g[4]),u.$set(_),g[8].footer?h?(h.p(g,A),A&256&&v(h,1)):(h=xe(g),h.c(),v(h,1),h.m(e,null)):h&&(ge(),y(h,1,1,()=>{h=null}),Ee())},i(g){d||(v(c),v(D,g),v(u.$$.fragment,g),v(h),d=!0)},o(g){y(c),y(D,g),y(u.$$.fragment,g),y(h),d=!1},d(g){g&&I(e),c&&c.d(),D&&D.d(g),J(u),h&&h.d()}}}const Ye={PLAIN:"PLAIN",REPARTITION:"REPARTITION"};function Lt(n,e,a){let{$$slots:t={},$$scope:r}=e;const s=at(t);let{type:l=Ye.PLAIN}=e,{showAverageMarkline:o=!1}=e,{unit:i=re.UNDEFINED}=e,{aggregation:u=R.UNDEFINED}=e,{maximumFractionDigits:m=Qe}=e,{color:d=X}=e,{timeseries:c=[]}=e,{referencePower:N=void 0}=e,{referencePowerOptions:D=it}=e,{labels:h=["Consumption","Exceedance"]}=e,{onclick:g=lt}=e,A=!1,_=[0,NaN],b={color:[],categories:[],series:[]};const P=(f,w,W,Y,H,te,M,q,Ze)=>{A=S(W,Y);const ke=!!q,le=f===Ye.REPARTITION;let ce=0,Ie=0;const G=M.reduce((E,F)=>{const{startedAt:U,value:O=NaN,anotherValue:C=NaN}=F;return ce+=O??0,Ie+=C??0,E.startedAtData.push(U),le?(E.valueData.push(O),E.anotherValueData.push(C),E):(E.valueData.push(O),E)},{startedAtData:[],valueData:[],anotherValueData:[]});if(a(4,b.color=Array.isArray(te)?te:[te],b),a(4,b.categories=G.startedAtData,b),le||ke){a(3,_=[ce,Ie]);const E={type:"bar",stack:"energy",name:h[0],data:G.valueData},F={type:"bar",stack:"energy",name:h[1],data:G.anotherValueData};a(4,b.series=[E,F],b)}else{a(3,_=[ce,NaN]);const E={type:"bar",data:G.valueData};a(4,b.series=[E],b)}b.series.forEach(E=>{if(w){let F=E.markLine;const U={type:"average",label:{fontWeight:"bold",position:"insideEndTop",backgroundColor:"white",padding:2,borderRadius:5,textBorderColor:"white",textBorderWidth:3,formatter:O=>x(O.value,H)}};if(F){const{symbol:O=Re,data:C=[]}=F;E.markLine={symbol:O,data:[...C,U]}}else E.markLine={symbol:Re,data:[U]}}E.cursor=A?"zoom-in":"default"}),console.log("EnergyChart.updateChartOptions",{type:f,showAverageMarkline:w,unit:W,aggregation:Y,maximumFractionDigits:H,timeseries:M,isDrilldownEnabled:A,hasReferencePower:ke,referencePower:q,referencePowerOptions:Ze,data:G});let ae=ct,ne=E=>ft(E.startedAt);switch(Y){case R.MONTH:ae=Be,ne=E=>Be(E.startedAt);break;case R.WEEK:ae=z,ne=E=>`${z(E.startedAt)} - ${z(E.endedAt)}`;break;case R.DAY:ae=z,ne=E=>z(E.startedAt);break}a(4,b.xAxisLabelFormatter=ae,b),a(4,b.tooltipFormatter=E=>{const F=E;let U=M[F[0].dataIndex],O=0,C="";return C+=`<div>${ne(U)}</div>`,F.reverse().forEach(fe=>{U=M[fe.dataIndex];const ye=fe.value;O+=ye,C+=ut({color:fe.color,value:`${x(ye,H)} ${W}`})}),le&&(C+='<div style="padding-top: 5px;"><hr>',C+=`<span style="float:right;margin-left:20px;font-weight:600">${x(O,H)} ${W}</span>`,C+="</div>"),C},b)},S=(f,w)=>{switch(f){case re.M3:return![R.HOUR,R.MINUTES,R.UNDEFINED].includes(w);case re.KW:case re.KWH:return![R.MINUTES,R.UNDEFINED].includes(w);default:return!1}},V=(f=0)=>Array.isArray(h)?h[f]??"":h,oe=(f=0)=>{let w=X;return d&&(w=Array.isArray(d)?d[f]??X:f===0?d:X),w},ie=f=>{console.log("EnergyChart.onChartClick",{isDrilldownEnabled:A,event:f}),f.data&&g(c[f.dataIndex])};return n.$$set=f=>{"type"in f&&a(9,l=f.type),"showAverageMarkline"in f&&a(10,o=f.showAverageMarkline),"unit"in f&&a(0,i=f.unit),"aggregation"in f&&a(11,u=f.aggregation),"maximumFractionDigits"in f&&a(1,m=f.maximumFractionDigits),"color"in f&&a(12,d=f.color),"timeseries"in f&&a(2,c=f.timeseries),"referencePower"in f&&a(13,N=f.referencePower),"referencePowerOptions"in f&&a(14,D=f.referencePowerOptions),"labels"in f&&a(15,h=f.labels),"onclick"in f&&a(16,g=f.onclick),"$$scope"in f&&a(17,r=f.$$scope)},n.$$.update=()=>{n.$$.dirty&32263&&P(l,o,i,u,m,d,c,N,D)},[i,m,c,_,b,V,oe,ie,s,l,o,u,d,N,D,h,g,r,t]}class Rt extends be{constructor(e){super(),Ae(this,e,Lt,Tt,ve,{type:9,showAverageMarkline:10,unit:0,aggregation:11,maximumFractionDigits:1,color:12,timeseries:2,referencePower:13,referencePowerOptions:14,labels:15,onclick:16})}}export{R as A,Rt as E,re as U,Ye as a,Ft as b};
