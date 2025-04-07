import{S as Ee,i as be,s as De,E as ze,p as Qe,q as pe,r as Ce,a as z,t as p,b as v,u as Ne,m as Q,j as J,l as Z,x as Je,Q as ke,d as y,y as ue,R as we,c as X,e as I,f as F,g as k,h as w,n as me,v as H,k as L,o as he,w as K,A as Ke,M as de,N as _e,C as Ye,D as qe,F as je,T as Ze,O as Le}from"./ECharts.SLfbBKHq.js";import{g as $e,d as et}from"./dayjs.min.2rai63wT.js";import{p as tt,b as G,e as at,i as Y,q as fe,L as ge,r as rt,f as nt,T as Te,s as Oe,t as xe,u as st,l as ot,v as Se,w as it,x as lt,h as ct,n as x,y as Me}from"./ChartLoadingSpinner.9HWc-NSv.js";import"./index.B7R5YsXE.js";var re={exports:{}},ft=re.exports,Re;function ut(){return Re||(Re=1,function(r,e){(function(a,t){r.exports=t()})(ft,function(){return function(a,t){t.prototype.isSameOrBefore=function(s,n){return this.isSame(s,n)||this.isBefore(s,n)}}})}(re)),re.exports}var mt=ut();const ht=$e(mt);et.extend(ht);const ae={KW:"kW",KWH:"kWh",M3:"m³",UNDEFINED:""},M={MONTH:"month",WEEK:"week",DAY:"day",HOUR:"hour",MINUTES:"15_minutes",UNDEFINED:""},Lt={GAS:"GAS"};function dt(r){let e,a;return e=new at({props:{color:r[3]}}),{c(){Z(e.$$.fragment)},l(t){J(e.$$.fragment,t)},m(t,s){Q(e,t,s),a=!0},p(t,s){const n={};s&8&&(n.color=t[3]),e.$set(n)},i(t){a||(v(e.$$.fragment,t),a=!0)},o(t){p(e.$$.fragment,t),a=!1},d(t){z(e,t)}}}function _t(r){let e,a,t,s;function n(o){r[7](o)}function i(o){r[8](o)}let c={init:Qe,options:r[2],notMerge:!0,$$slots:{default:[dt]},$$scope:{ctx:r}};return r[1]!==void 0&&(c.chart=r[1]),r[0]!==void 0&&(c.chartContainerDOMRect=r[0]),e=new ze({props:c}),pe.push(()=>Ce(e,"chart",n)),pe.push(()=>Ce(e,"chartContainerDOMRect",i)),{c(){Z(e.$$.fragment)},l(o){J(e.$$.fragment,o)},m(o,_){Q(e,o,_),s=!0},p(o,[_]){const d={};_&4&&(d.options=o[2]),_&4104&&(d.$$scope={dirty:_,ctx:o}),!a&&_&2&&(a=!0,d.chart=o[1],Ne(()=>a=!1)),!t&&_&1&&(t=!0,d.chartContainerDOMRect=o[0],Ne(()=>t=!1)),e.$set(d)},i(o){s||(v(e.$$.fragment,o),s=!0)},o(o){p(e.$$.fragment,o),s=!1},d(o){z(e,o)}}}const gt=r=>{const e=r.length-1;return r[e].itemStyle=rt(nt),r};function Et(r,e,a){let t,{isTinyScreen:s=!1}=e,{chartOptions:n}=e,{onclick:i=tt}=e,c,o={},_;const d=(l,m)=>{const{color:b,categories:A,series:D,xAxisLabelFormatter:P,yAxisLabelFormatter:V=R=>Y(R),tooltipFormatter:W}=l;a(4,s=(()=>{if(!m)return!1;const{width:R,height:B}=m;switch(screen.orientation.angle){case 0:return R<=Oe&&B<=Te;case 90:return R<=Te&&B<=Oe}return!1})());const ne={trigger:"axis",axisPointer:{type:"shadow",z:0,shadowStyle:{color:"rgba(150,150,150,0.1)"}},formatter:W},se={containLabel:!0,left:0,right:0,top:0,bottom:0},u=A.length,T={type:"category",data:A,axisLabel:{color:ge,formatter:P,hideOverlap:!0,showMinLabel:!(s&&A.length>10||A.length>12)},axisTick:{show:!1,alignWithLabel:!0},axisLine:{lineStyle:fe},splitLine:{show:!0,lineStyle:fe,showMinLine:!1,showMaxLine:!1,interval:u>50?10:2}};a(2,o={color:b,tooltip:ne,grid:se,xAxis:T,yAxis:{type:"value",position:"right",axisLabel:{verticalAlign:"bottom",padding:[0,-10,2,0],color:ge,showMinLabel:!1,showMaxLabel:!1,formatter:V},splitLine:{lineStyle:fe,showMaxLine:!1}},series:gt(D)})};let h="";const f=l=>{if(!s){i(l);return}const m=l.name;if(h&&m===h){i(l),h="";return}h=m};Je(()=>(c.on("click",f),console.log("BaseColumnsChart - mounted",{chart:c}),()=>{c.off("click",f),console.log("BaseColumnsChart - destroyed",{chart:c})}));function C(l){c=l,a(1,c)}function E(l){_=l,a(0,_)}return r.$$set=l=>{"isTinyScreen"in l&&a(4,s=l.isTinyScreen),"chartOptions"in l&&a(5,n=l.chartOptions),"onclick"in l&&a(6,i=l.onclick)},r.$$.update=()=>{r.$$.dirty&32&&a(3,t=n.color[1]??n.color[0]??G),r.$$.dirty&33&&d(n,_)},[_,c,o,t,s,n,i,C,E]}class bt extends Ee{constructor(e){super(),be(this,e,Et,_t,De,{isTinyScreen:4,chartOptions:5,onclick:6})}}function Fe(r){let e,a;return{c(){e=L("span"),a=he(r[3])},l(t){e=k(t,"SPAN",{});var s=w(e);a=me(s,r[3]),s.forEach(y)},m(t,s){X(t,e,s),I(e,a)},p(t,s){s&8&&ue(a,t[3])},d(t){t&&y(e)}}}function Dt(r){let e,a,t,s,n,i,c=Y(r[1],r[4])+"",o,_,d=r[3]&&Fe(r);return{c(){e=L("div"),a=L("span"),t=he(r[0]),s=K(),n=L("div"),i=L("span"),o=he(c),_=K(),d&&d.c(),this.h()},l(h){e=k(h,"DIV",{class:!0});var f=w(e);a=k(f,"SPAN",{});var C=w(a);t=me(C,r[0]),C.forEach(y),s=H(f),n=k(f,"DIV",{class:!0,style:!0});var E=w(n);i=k(E,"SPAN",{class:!0});var l=w(i);o=me(l,c),l.forEach(y),_=H(E),d&&d.l(E),E.forEach(y),f.forEach(y),this.h()},h(){F(i,"class","text-sm tabular-nums"),F(n,"class","text-sm font-semibold"),we(n,"color",r[2]),F(e,"class","flex items-center gap-2")},m(h,f){X(h,e,f),I(e,a),I(a,t),I(e,s),I(e,n),I(n,i),I(i,o),I(n,_),d&&d.m(n,null)},p(h,[f]){f&1&&ue(t,h[0]),f&18&&c!==(c=Y(h[1],h[4])+"")&&ue(o,c),h[3]?d?d.p(h,f):(d=Fe(h),d.c(),d.m(n,null)):d&&(d.d(1),d=null),f&4&&we(n,"color",h[2])},i:ke,o:ke,d(h){h&&y(e),d&&d.d()}}}function At(r,e,a){let{label:t}=e,{value:s}=e,{valueColor:n=ge}=e,{unit:i}=e,{maximumFractionDigits:c=xe}=e;return r.$$set=o=>{"label"in o&&a(0,t=o.label),"value"in o&&a(1,s=o.value),"valueColor"in o&&a(2,n=o.valueColor),"unit"in o&&a(3,i=o.unit),"maximumFractionDigits"in o&&a(4,c=o.maximumFractionDigits)},[t,s,n,i,c]}class Ge extends Ee{constructor(e){super(),be(this,e,At,Dt,De,{label:0,value:1,valueColor:2,unit:3,maximumFractionDigits:4})}}const vt=r=>({}),Be=r=>({}),It=r=>({}),Ue=r=>({});function Pe(r){let e,a,t,s;e=new Ge({props:{label:r[5](0),value:r[3][0],valueColor:r[6](0),unit:r[0],maximumFractionDigits:r[1]}});let n=r[3][1]&&Ve(r);return{c(){Z(e.$$.fragment),a=K(),n&&n.c(),t=Le()},l(i){J(e.$$.fragment,i),a=H(i),n&&n.l(i),t=Le()},m(i,c){Q(e,i,c),X(i,a,c),n&&n.m(i,c),X(i,t,c),s=!0},p(i,c){const o={};c&8&&(o.value=i[3][0]),c&1&&(o.unit=i[0]),c&2&&(o.maximumFractionDigits=i[1]),e.$set(o),i[3][1]?n?(n.p(i,c),c&8&&v(n,1)):(n=Ve(i),n.c(),v(n,1),n.m(t.parentNode,t)):n&&(de(),p(n,1,1,()=>{n=null}),_e())},i(i){s||(v(e.$$.fragment,i),v(n),s=!0)},o(i){p(e.$$.fragment,i),p(n),s=!1},d(i){i&&(y(a),y(t)),z(e,i),n&&n.d(i)}}}function Ve(r){let e,a;return e=new Ge({props:{label:r[5](1),value:r[3][1],valueColor:r[6](1),unit:r[0],maximumFractionDigits:r[1]}}),{c(){Z(e.$$.fragment)},l(t){J(e.$$.fragment,t)},m(t,s){Q(e,t,s),a=!0},p(t,s){const n={};s&8&&(n.value=t[3][1]),s&1&&(n.unit=t[0]),s&2&&(n.maximumFractionDigits=t[1]),e.$set(n)},i(t){a||(v(e.$$.fragment,t),a=!0)},o(t){p(e.$$.fragment,t),a=!1},d(t){z(e,t)}}}function We(r){let e;const a=r[18].footer,t=Ke(a,r,r[17],Be);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,n){t&&t.m(s,n),e=!0},p(s,n){t&&t.p&&(!e||n&131072)&&Ye(t,a,s,s[17],e?je(a,s[17],n,vt):qe(s[17]),Be)},i(s){e||(v(t,s),e=!0)},o(s){p(t,s),e=!1},d(s){t&&t.d(s)}}}function yt(r){let e,a,t,s,n,i,c,o,_,d,h,f=r[2].length>0&&Pe(r);const C=r[18].headerActions,E=Ke(C,r,r[17],Ue);_=new bt({props:{chartOptions:r[4],onclick:r[7]}});let l=r[8].footer&&We(r);return{c(){e=L("div"),a=L("div"),t=L("div"),f&&f.c(),s=K(),n=L("div"),E&&E.c(),i=K(),c=L("div"),o=L("div"),Z(_.$$.fragment),d=K(),l&&l.c(),this.h()},l(m){e=k(m,"DIV",{class:!0});var b=w(e);a=k(b,"DIV",{class:!0});var A=w(a);t=k(A,"DIV",{class:!0});var D=w(t);f&&f.l(D),D.forEach(y),s=H(A),n=k(A,"DIV",{});var P=w(n);E&&E.l(P),P.forEach(y),A.forEach(y),i=H(b),c=k(b,"DIV",{class:!0});var V=w(c);o=k(V,"DIV",{class:!0});var W=w(o);J(_.$$.fragment,W),W.forEach(y),V.forEach(y),d=H(b),l&&l.l(b),b.forEach(y),this.h()},h(){F(t,"class","flex items-center gap-4"),F(a,"class","flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0"),F(o,"class","absolute top-0 right-0 bottom-0 left-0"),F(c,"class","relative min-h-[300px] grow"),F(e,"class","flex min-h-full grow flex-col gap-2")},m(m,b){X(m,e,b),I(e,a),I(a,t),f&&f.m(t,null),I(a,s),I(a,n),E&&E.m(n,null),I(e,i),I(e,c),I(c,o),Q(_,o,null),I(e,d),l&&l.m(e,null),h=!0},p(m,[b]){m[2].length>0?f?(f.p(m,b),b&4&&v(f,1)):(f=Pe(m),f.c(),v(f,1),f.m(t,null)):f&&(de(),p(f,1,1,()=>{f=null}),_e()),E&&E.p&&(!h||b&131072)&&Ye(E,C,m,m[17],h?je(C,m[17],b,It):qe(m[17]),Ue);const A={};b&16&&(A.chartOptions=m[4]),_.$set(A),m[8].footer?l?(l.p(m,b),b&256&&v(l,1)):(l=We(m),l.c(),v(l,1),l.m(e,null)):l&&(de(),p(l,1,1,()=>{l=null}),_e())},i(m){h||(v(f),v(E,m),v(_.$$.fragment,m),v(l),h=!0)},o(m){p(f),p(E,m),p(_.$$.fragment,m),p(l),h=!1},d(m){m&&y(e),f&&f.d(),E&&E.d(m),z(_),l&&l.d()}}}const He={PLAIN:"PLAIN",REPARTITION:"REPARTITION"};function pt(r,e,a){let{$$slots:t={},$$scope:s}=e;const n=Ze(t);let{type:i=He.PLAIN}=e,{showAverageMarkline:c=!1}=e,{unit:o=ae.UNDEFINED}=e,{aggregation:_=M.UNDEFINED}=e,{maximumFractionDigits:d=xe}=e,{color:h=G}=e,{timeseries:f=[]}=e,{referencePower:C=void 0}=e,{referencePowerOptions:E=st}=e,{labels:l=["Consumption","Exceedance"]}=e,{onclick:m=ot}=e,b=!1,A=[0,NaN],D={color:[],categories:[],series:[]};const P=(u,T,q,R,B,oe,$,Ae,Xe)=>{b=V(q,R);const ve=!!Ae,ie=u===He.REPARTITION;let le=0,Ie=0;const j=$.reduce((g,S)=>{const{startedAt:U,value:O=NaN,anotherValue:N=NaN}=S;return le+=O??0,Ie+=N??0,g.startedAtData.push(U),ie?(g.valueData.push(O),g.anotherValueData.push(N),g):(g.valueData.push(O),g)},{startedAtData:[],valueData:[],anotherValueData:[]});if(a(4,D.color=Array.isArray(oe)?oe:[oe],D),a(4,D.categories=j.startedAtData,D),ie||ve){a(3,A=[le,Ie]);const g={type:"bar",stack:"energy",name:l[0],data:j.valueData},S={type:"bar",stack:"energy",name:l[1],data:j.anotherValueData};a(4,D.series=[g,S],D)}else{a(3,A=[le,NaN]);const g={type:"bar",data:j.valueData};a(4,D.series=[g],D)}D.series.forEach(g=>{if(T){let S=g.markLine;const U={type:"average",label:{fontWeight:"bold",position:"insideEndTop",backgroundColor:"white",padding:2,borderRadius:5,textBorderColor:"white",textBorderWidth:3,formatter:O=>Y(O.value,B)}};if(S){const{symbol:O=Se,data:N=[]}=S;g.markLine={symbol:O,data:[...N,U]}}else g.markLine={symbol:Se,data:[U]}}g.cursor=b?"zoom-in":"default"}),console.log("EnergyChart.updateChartOptions",{type:u,showAverageMarkline:T,unit:q,aggregation:R,maximumFractionDigits:B,timeseries:$,isDrilldownEnabled:b,hasReferencePower:ve,referencePower:Ae,referencePowerOptions:Xe,data:j});let ee=it,te=g=>lt(g.startedAt);switch(R){case M.MONTH:ee=Me,te=g=>Me(g.startedAt);break;case M.WEEK:ee=x,te=g=>`${x(g.startedAt)} - ${x(g.endedAt)}`;break;case M.DAY:ee=x,te=g=>x(g.startedAt);break}a(4,D.xAxisLabelFormatter=ee,D),a(4,D.tooltipFormatter=g=>{const S=g;let U=$[S[0].dataIndex],O=0,N="";return N+=`<div>${te(U)}</div>`,S.reverse().forEach(ce=>{U=$[ce.dataIndex];const ye=ce.value;O+=ye,N+=ct({color:ce.color,value:`${Y(ye,B)} ${q}`})}),ie&&(N+='<div style="padding-top: 5px;"><hr>',N+=`<span style="float:right;margin-left:20px;font-weight:600">${Y(O,B)} ${q}</span>`,N+="</div>"),N},D)},V=(u,T)=>{switch(u){case ae.M3:return![M.HOUR,M.MINUTES,M.UNDEFINED].includes(T);case ae.KW:case ae.KWH:return![M.MINUTES,M.UNDEFINED].includes(T);default:return!1}},W=(u=0)=>Array.isArray(l)?l[u]??"":l,ne=(u=0)=>{let T=G;return h&&(T=Array.isArray(h)?h[u]??G:u===0?h:G),T},se=u=>{console.log("EnergyChart.onChartClick",{isDrilldownEnabled:b,event:u}),u.data&&m(f[u.dataIndex])};return r.$$set=u=>{"type"in u&&a(9,i=u.type),"showAverageMarkline"in u&&a(10,c=u.showAverageMarkline),"unit"in u&&a(0,o=u.unit),"aggregation"in u&&a(11,_=u.aggregation),"maximumFractionDigits"in u&&a(1,d=u.maximumFractionDigits),"color"in u&&a(12,h=u.color),"timeseries"in u&&a(2,f=u.timeseries),"referencePower"in u&&a(13,C=u.referencePower),"referencePowerOptions"in u&&a(14,E=u.referencePowerOptions),"labels"in u&&a(15,l=u.labels),"onclick"in u&&a(16,m=u.onclick),"$$scope"in u&&a(17,s=u.$$scope)},r.$$.update=()=>{r.$$.dirty&32263&&P(i,c,o,_,d,h,f,C,E)},[o,d,f,A,D,W,ne,se,n,i,c,_,h,C,E,l,m,s,t]}class Tt extends Ee{constructor(e){super(),be(this,e,pt,yt,De,{type:9,showAverageMarkline:10,unit:0,aggregation:11,maximumFractionDigits:1,color:12,timeseries:2,referencePower:13,referencePowerOptions:14,labels:15,onclick:16})}}export{M as A,Tt as E,ae as U,He as a,Lt as b};
