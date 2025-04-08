import{S as ue,i as fe,s as pe,A as at,B as ve,d as k,t as O,f as I,C as it,D as ct,F as dt,G as Pe,H as ut,h as P,I as ft,J as pt,l as R,n as G,q as T,K as Ge,L as Le,M as qe,N as Je,O as de,w as Ae,j as z,k as D,x as Se,o as q,y as Me,r as J,e as W,m as B,p as F,u as K,z as Xe,b as gt,c as bt,g as mt}from"./ECharts.BA_zIMAu.js";import{d as he}from"./dayjs.min.2rai63wT.js";import{e as He,u as ht,o as wt,A as y,b as Qe,E as yt,U as vt}from"./EnergyChart.BE1zykAn.js";import{T as xt}from"./Toggle.DtV3VRQV.js";import{m as kt,j as Ye,n as ie}from"./ChartLoadingSpinner.DTggnxbL.js";import"./index.hEkYiYuq.js";const S={YEAR:"YEAR",MONTH:"MONTH",DAY:"DAY"};function Ze(e){var t,o,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(o=Ze(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}function _t(){for(var e,t,o=0,r="",n=arguments.length;o<n;o++)(e=arguments[o])&&(t=Ze(e))&&(r&&(r+=" "),r+=t);return r}const Ee="-",At=e=>{const t=Mt(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{const d=a.split(Ee);return d[0]===""&&d.length!==1&&d.shift(),$e(d,t)||St(a)},getConflictingClassGroupIds:(a,d)=>{const l=o[a]||[];return d&&r[a]?[...l,...r[a]]:l}}},$e=(e,t)=>{if(e.length===0)return t.classGroupId;const o=e[0],r=t.nextPart.get(o),n=r?$e(e.slice(1),r):void 0;if(n)return n;if(t.validators.length===0)return;const s=e.join(Ee);return t.validators.find(({validator:a})=>a(s))?.classGroupId},De=/^\[(.+)\]$/,St=e=>{if(De.test(e)){const t=De.exec(e)[1],o=t?.substring(0,t.indexOf(":"));if(o)return"arbitrary.."+o}},Mt=e=>{const{theme:t,classGroups:o}=e,r={nextPart:new Map,validators:[]};for(const n in o)xe(o[n],r,n,t);return r},xe=(e,t,o,r)=>{e.forEach(n=>{if(typeof n=="string"){const s=n===""?t:Ue(t,n);s.classGroupId=o;return}if(typeof n=="function"){if(Et(n)){xe(n(r),t,o,r);return}t.validators.push({validator:n,classGroupId:o});return}Object.entries(n).forEach(([s,a])=>{xe(a,Ue(t,s),o,r)})})},Ue=(e,t)=>{let o=e;return t.split(Ee).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},Et=e=>e.isThemeGetter,Ct=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=new Map,r=new Map;const n=(s,a)=>{o.set(s,a),t++,t>e&&(t=0,r=o,o=new Map)};return{get(s){let a=o.get(s);if(a!==void 0)return a;if((a=r.get(s))!==void 0)return n(s,a),a},set(s,a){o.has(s)?o.set(s,a):n(s,a)}}},ke="!",_e=":",zt=_e.length,Rt=e=>{const{prefix:t,experimentalParseClassName:o}=e;let r=n=>{const s=[];let a=0,d=0,l=0,u;for(let v=0;v<n.length;v++){let m=n[v];if(a===0&&d===0){if(m===_e){s.push(n.slice(l,v)),l=v+zt;continue}if(m==="/"){u=v;continue}}m==="["?a++:m==="]"?a--:m==="("?d++:m===")"&&d--}const i=s.length===0?n:n.substring(l),c=Tt(i),g=c!==i,h=u&&u>l?u-l:void 0;return{modifiers:s,hasImportantModifier:g,baseClassName:c,maybePostfixModifierPosition:h}};if(t){const n=t+_e,s=r;r=a=>a.startsWith(n)?s(a.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(o){const n=r;r=s=>o({className:s,parseClassName:n})}return r},Tt=e=>e.endsWith(ke)?e.substring(0,e.length-1):e.startsWith(ke)?e.substring(1):e,It=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const n=[];let s=[];return r.forEach(a=>{a[0]==="["||t[a]?(n.push(...s.sort(),a),s=[]):s.push(a)}),n.push(...s.sort()),n}},Nt=e=>({cache:Ct(e.cacheSize),parseClassName:Rt(e),sortModifiers:It(e),...At(e)}),Ot=/\s+/,Pt=(e,t)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:s}=t,a=[],d=e.trim().split(Ot);let l="";for(let u=d.length-1;u>=0;u-=1){const i=d[u],{isExternal:c,modifiers:g,hasImportantModifier:h,baseClassName:v,maybePostfixModifierPosition:m}=o(i);if(c){l=i+(l.length>0?" "+l:l);continue}let A=!!m,M=r(A?v.substring(0,m):v);if(!M){if(!A){l=i+(l.length>0?" "+l:l);continue}if(M=r(v),!M){l=i+(l.length>0?" "+l:l);continue}A=!1}const H=s(g).join(":"),re=h?H+ke:H,X=re+M;if(a.includes(X))continue;a.push(X);const Q=n(M,A);for(let b=0;b<Q.length;++b){const N=Q[b];a.push(re+N)}l=i+(l.length>0?" "+l:l)}return l};function Gt(){let e=0,t,o,r="";for(;e<arguments.length;)(t=arguments[e++])&&(o=et(t))&&(r&&(r+=" "),r+=o);return r}const et=e=>{if(typeof e=="string")return e;let t,o="";for(let r=0;r<e.length;r++)e[r]&&(t=et(e[r]))&&(o&&(o+=" "),o+=t);return o};function Lt(e,...t){let o,r,n,s=a;function a(l){const u=t.reduce((i,c)=>c(i),e());return o=Nt(u),r=o.cache.get,n=o.cache.set,s=d,d(l)}function d(l){const u=r(l);if(u)return u;const i=Pt(l,o);return n(l,i),i}return function(){return s(Gt.apply(null,arguments))}}const _=e=>{const t=o=>o[e]||[];return t.isThemeGetter=!0,t},tt=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,rt=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Ht=/^\d+\/\d+$/,Yt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Dt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ut=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Vt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,jt=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,$=e=>Ht.test(e),w=e=>!!e&&!Number.isNaN(Number(e)),V=e=>!!e&&Number.isInteger(Number(e)),Ve=e=>e.endsWith("%")&&w(e.slice(0,-1)),Y=e=>Yt.test(e),Wt=()=>!0,Bt=e=>Dt.test(e)&&!Ut.test(e),Ce=()=>!1,Ft=e=>Vt.test(e),Kt=e=>jt.test(e),qt=e=>!f(e)&&!p(e),Jt=e=>ee(e,st,Ce),f=e=>tt.test(e),j=e=>ee(e,lt,Bt),we=e=>ee(e,lr,w),Xt=e=>ee(e,ot,Ce),Qt=e=>ee(e,nt,Kt),Zt=e=>ee(e,Ce,Ft),p=e=>rt.test(e),ce=e=>te(e,lt),$t=e=>te(e,ar),er=e=>te(e,ot),tr=e=>te(e,st),rr=e=>te(e,nt),or=e=>te(e,ir,!0),ee=(e,t,o)=>{const r=tt.exec(e);return r?r[1]?t(r[1]):o(r[2]):!1},te=(e,t,o=!1)=>{const r=rt.exec(e);return r?r[1]?t(r[1]):o:!1},ot=e=>e==="position",nr=new Set(["image","url"]),nt=e=>nr.has(e),sr=new Set(["length","size","percentage"]),st=e=>sr.has(e),lt=e=>e==="length",lr=e=>e==="number",ar=e=>e==="family-name",ir=e=>e==="shadow",cr=()=>{const e=_("color"),t=_("font"),o=_("text"),r=_("font-weight"),n=_("tracking"),s=_("leading"),a=_("breakpoint"),d=_("container"),l=_("spacing"),u=_("radius"),i=_("shadow"),c=_("inset-shadow"),g=_("drop-shadow"),h=_("blur"),v=_("perspective"),m=_("aspect"),A=_("ease"),M=_("animate"),H=()=>["auto","avoid","all","avoid-page","page","left","right","column"],re=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],X=()=>["auto","hidden","clip","visible","scroll"],Q=()=>["auto","contain","none"],b=()=>[p,f,l],N=()=>[$,"full","auto",...b()],ze=()=>[V,"none","subgrid",p,f],Re=()=>["auto",{span:["full",V,p,f]},p,f],oe=()=>[V,"auto",p,f],Te=()=>["auto","min","max","fr",p,f],ge=()=>["start","end","center","between","around","evenly","stretch","baseline"],Z=()=>["start","end","center","stretch"],L=()=>["auto",...b()],U=()=>[$,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...b()],x=()=>[e,p,f],be=()=>[Ve,j],E=()=>["","none","full",u,p,f],C=()=>["",w,ce,j],ne=()=>["solid","dashed","dotted","double"],Ie=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],Ne=()=>["","none",h,p,f],Oe=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",p,f],se=()=>["none",w,p,f],le=()=>["none",w,p,f],me=()=>[w,p,f],ae=()=>[$,"full",...b()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Y],breakpoint:[Y],color:[Wt],container:[Y],"drop-shadow":[Y],ease:["in","out","in-out"],font:[qt],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Y],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Y],shadow:[Y],spacing:["px",w],text:[Y],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",$,f,p,m]}],container:["container"],columns:[{columns:[w,f,p,d]}],"break-after":[{"break-after":H()}],"break-before":[{"break-before":H()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...re(),f,p]}],overflow:[{overflow:X()}],"overflow-x":[{"overflow-x":X()}],"overflow-y":[{"overflow-y":X()}],overscroll:[{overscroll:Q()}],"overscroll-x":[{"overscroll-x":Q()}],"overscroll-y":[{"overscroll-y":Q()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:N()}],"inset-x":[{"inset-x":N()}],"inset-y":[{"inset-y":N()}],start:[{start:N()}],end:[{end:N()}],top:[{top:N()}],right:[{right:N()}],bottom:[{bottom:N()}],left:[{left:N()}],visibility:["visible","invisible","collapse"],z:[{z:[V,"auto",p,f]}],basis:[{basis:[$,"full","auto",d,...b()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[w,$,"auto","initial","none",f]}],grow:[{grow:["",w,p,f]}],shrink:[{shrink:["",w,p,f]}],order:[{order:[V,"first","last","none",p,f]}],"grid-cols":[{"grid-cols":ze()}],"col-start-end":[{col:Re()}],"col-start":[{"col-start":oe()}],"col-end":[{"col-end":oe()}],"grid-rows":[{"grid-rows":ze()}],"row-start-end":[{row:Re()}],"row-start":[{"row-start":oe()}],"row-end":[{"row-end":oe()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":Te()}],"auto-rows":[{"auto-rows":Te()}],gap:[{gap:b()}],"gap-x":[{"gap-x":b()}],"gap-y":[{"gap-y":b()}],"justify-content":[{justify:[...ge(),"normal"]}],"justify-items":[{"justify-items":[...Z(),"normal"]}],"justify-self":[{"justify-self":["auto",...Z()]}],"align-content":[{content:["normal",...ge()]}],"align-items":[{items:[...Z(),"baseline"]}],"align-self":[{self:["auto",...Z(),"baseline"]}],"place-content":[{"place-content":ge()}],"place-items":[{"place-items":[...Z(),"baseline"]}],"place-self":[{"place-self":["auto",...Z()]}],p:[{p:b()}],px:[{px:b()}],py:[{py:b()}],ps:[{ps:b()}],pe:[{pe:b()}],pt:[{pt:b()}],pr:[{pr:b()}],pb:[{pb:b()}],pl:[{pl:b()}],m:[{m:L()}],mx:[{mx:L()}],my:[{my:L()}],ms:[{ms:L()}],me:[{me:L()}],mt:[{mt:L()}],mr:[{mr:L()}],mb:[{mb:L()}],ml:[{ml:L()}],"space-x":[{"space-x":b()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":b()}],"space-y-reverse":["space-y-reverse"],size:[{size:U()}],w:[{w:[d,"screen",...U()]}],"min-w":[{"min-w":[d,"screen","none",...U()]}],"max-w":[{"max-w":[d,"screen","none","prose",{screen:[a]},...U()]}],h:[{h:["screen",...U()]}],"min-h":[{"min-h":["screen","none",...U()]}],"max-h":[{"max-h":["screen",...U()]}],"font-size":[{text:["base",o,ce,j]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,p,we]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Ve,f]}],"font-family":[{font:[$t,f,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,p,f]}],"line-clamp":[{"line-clamp":[w,"none",p,we]}],leading:[{leading:[s,...b()]}],"list-image":[{"list-image":["none",p,f]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",p,f]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:x()}],"text-color":[{text:x()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ne(),"wavy"]}],"text-decoration-thickness":[{decoration:[w,"from-font","auto",p,j]}],"text-decoration-color":[{decoration:x()}],"underline-offset":[{"underline-offset":[w,"auto",p,f]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:b()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",p,f]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",p,f]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...re(),er,Xt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",tr,Jt]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},V,p,f],radial:["",p,f],conic:[V,p,f]},rr,Qt]}],"bg-color":[{bg:x()}],"gradient-from-pos":[{from:be()}],"gradient-via-pos":[{via:be()}],"gradient-to-pos":[{to:be()}],"gradient-from":[{from:x()}],"gradient-via":[{via:x()}],"gradient-to":[{to:x()}],rounded:[{rounded:E()}],"rounded-s":[{"rounded-s":E()}],"rounded-e":[{"rounded-e":E()}],"rounded-t":[{"rounded-t":E()}],"rounded-r":[{"rounded-r":E()}],"rounded-b":[{"rounded-b":E()}],"rounded-l":[{"rounded-l":E()}],"rounded-ss":[{"rounded-ss":E()}],"rounded-se":[{"rounded-se":E()}],"rounded-ee":[{"rounded-ee":E()}],"rounded-es":[{"rounded-es":E()}],"rounded-tl":[{"rounded-tl":E()}],"rounded-tr":[{"rounded-tr":E()}],"rounded-br":[{"rounded-br":E()}],"rounded-bl":[{"rounded-bl":E()}],"border-w":[{border:C()}],"border-w-x":[{"border-x":C()}],"border-w-y":[{"border-y":C()}],"border-w-s":[{"border-s":C()}],"border-w-e":[{"border-e":C()}],"border-w-t":[{"border-t":C()}],"border-w-r":[{"border-r":C()}],"border-w-b":[{"border-b":C()}],"border-w-l":[{"border-l":C()}],"divide-x":[{"divide-x":C()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":C()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ne(),"hidden","none"]}],"divide-style":[{divide:[...ne(),"hidden","none"]}],"border-color":[{border:x()}],"border-color-x":[{"border-x":x()}],"border-color-y":[{"border-y":x()}],"border-color-s":[{"border-s":x()}],"border-color-e":[{"border-e":x()}],"border-color-t":[{"border-t":x()}],"border-color-r":[{"border-r":x()}],"border-color-b":[{"border-b":x()}],"border-color-l":[{"border-l":x()}],"divide-color":[{divide:x()}],"outline-style":[{outline:[...ne(),"none","hidden"]}],"outline-offset":[{"outline-offset":[w,p,f]}],"outline-w":[{outline:["",w,ce,j]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",i,or,Zt]}],"shadow-color":[{shadow:x()}],"inset-shadow":[{"inset-shadow":["none",p,f,c]}],"inset-shadow-color":[{"inset-shadow":x()}],"ring-w":[{ring:C()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:x()}],"ring-offset-w":[{"ring-offset":[w,j]}],"ring-offset-color":[{"ring-offset":x()}],"inset-ring-w":[{"inset-ring":C()}],"inset-ring-color":[{"inset-ring":x()}],opacity:[{opacity:[w,p,f]}],"mix-blend":[{"mix-blend":[...Ie(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Ie()}],filter:[{filter:["","none",p,f]}],blur:[{blur:Ne()}],brightness:[{brightness:[w,p,f]}],contrast:[{contrast:[w,p,f]}],"drop-shadow":[{"drop-shadow":["","none",g,p,f]}],grayscale:[{grayscale:["",w,p,f]}],"hue-rotate":[{"hue-rotate":[w,p,f]}],invert:[{invert:["",w,p,f]}],saturate:[{saturate:[w,p,f]}],sepia:[{sepia:["",w,p,f]}],"backdrop-filter":[{"backdrop-filter":["","none",p,f]}],"backdrop-blur":[{"backdrop-blur":Ne()}],"backdrop-brightness":[{"backdrop-brightness":[w,p,f]}],"backdrop-contrast":[{"backdrop-contrast":[w,p,f]}],"backdrop-grayscale":[{"backdrop-grayscale":["",w,p,f]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[w,p,f]}],"backdrop-invert":[{"backdrop-invert":["",w,p,f]}],"backdrop-opacity":[{"backdrop-opacity":[w,p,f]}],"backdrop-saturate":[{"backdrop-saturate":[w,p,f]}],"backdrop-sepia":[{"backdrop-sepia":["",w,p,f]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":b()}],"border-spacing-x":[{"border-spacing-x":b()}],"border-spacing-y":[{"border-spacing-y":b()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",p,f]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[w,"initial",p,f]}],ease:[{ease:["linear","initial",A,p,f]}],delay:[{delay:[w,p,f]}],animate:[{animate:["none",M,p,f]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,p,f]}],"perspective-origin":[{"perspective-origin":Oe()}],rotate:[{rotate:se()}],"rotate-x":[{"rotate-x":se()}],"rotate-y":[{"rotate-y":se()}],"rotate-z":[{"rotate-z":se()}],scale:[{scale:le()}],"scale-x":[{"scale-x":le()}],"scale-y":[{"scale-y":le()}],"scale-z":[{"scale-z":le()}],"scale-3d":["scale-3d"],skew:[{skew:me()}],"skew-x":[{"skew-x":me()}],"skew-y":[{"skew-y":me()}],transform:[{transform:[p,f,"","none","gpu","cpu"]}],"transform-origin":[{origin:Oe()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ae()}],"translate-x":[{"translate-x":ae()}],"translate-y":[{"translate-y":ae()}],"translate-z":[{"translate-z":ae()}],"translate-none":["translate-none"],accent:[{accent:x()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:x()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",p,f]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":b()}],"scroll-mx":[{"scroll-mx":b()}],"scroll-my":[{"scroll-my":b()}],"scroll-ms":[{"scroll-ms":b()}],"scroll-me":[{"scroll-me":b()}],"scroll-mt":[{"scroll-mt":b()}],"scroll-mr":[{"scroll-mr":b()}],"scroll-mb":[{"scroll-mb":b()}],"scroll-ml":[{"scroll-ml":b()}],"scroll-p":[{"scroll-p":b()}],"scroll-px":[{"scroll-px":b()}],"scroll-py":[{"scroll-py":b()}],"scroll-ps":[{"scroll-ps":b()}],"scroll-pe":[{"scroll-pe":b()}],"scroll-pt":[{"scroll-pt":b()}],"scroll-pr":[{"scroll-pr":b()}],"scroll-pb":[{"scroll-pb":b()}],"scroll-pl":[{"scroll-pl":b()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",p,f]}],fill:[{fill:["none",...x()]}],"stroke-w":[{stroke:[w,ce,j,we]}],stroke:[{stroke:["none",...x()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},dr=Lt(cr),je=(...e)=>dr(_t(e));function ur(e){let t,o,r,n,s,a;const d=e[6].default,l=at(d,e,e[5],null);let u=[{type:"button"},{class:o=je(e[2],e[3].class)},{disabled:r=e[0]||e[3].disabled},e[4]],i={};for(let c=0;c<u.length;c+=1)i=ve(i,u[c]);return{c(){t=T("button"),l&&l.c(),this.h()},l(c){t=R(c,"BUTTON",{type:!0,class:!0});var g=G(t);l&&l.l(g),g.forEach(k),this.h()},h(){Pe(t,i)},m(c,g){P(c,t,g),l&&l.m(t,null),t.autofocus&&t.focus(),n=!0,s||(a=ft(t,"click",function(){pt(e[1])&&e[1].apply(this,arguments)}),s=!0)},p(c,[g]){e=c,l&&l.p&&(!n||g&32)&&it(l,d,e,e[5],n?dt(d,e[5],g,null):ct(e[5]),null),Pe(t,i=ut(u,[{type:"button"},(!n||g&8&&o!==(o=je(e[2],e[3].class)))&&{class:o},(!n||g&9&&r!==(r=e[0]||e[3].disabled))&&{disabled:r},g&16&&e[4]]))},i(c){n||(I(l,c),n=!0)},o(c){O(l,c),n=!1},d(c){c&&k(t),l&&l.d(c),s=!1,a()}}}function fr(e,t,o){const r=["isSelected","onclick"];let n=Ge(t,r),{$$slots:s={},$$scope:a}=t,{isSelected:d=!1}=t,{onclick:l}=t;const u=`
    rounded-md border border-slate-300
    px-2 py-1
    text-center text-sm
    transition-all shadow-sm hover:shadow-lg
    text-slate-700
    cursor-pointer
    hover:text-white hover:bg-blue-500 hover:border-blue-500 hover:bg-blue-500
    focus:text-white focus:bg-blue-500 focus:border-blue-500 focus:bg-blue-500
    active:border-blue-500 active:text-white active:bg-blue-500
    disabled:pointer-events-none disabled:shadow-none disabled:border-transparent
  `;return e.$$set=i=>{o(3,t=ve(ve({},t),Le(i))),o(4,n=Ge(t,r)),"isSelected"in i&&o(0,d=i.isSelected),"onclick"in i&&o(1,l=i.onclick),"$$scope"in i&&o(5,a=i.$$scope)},t=Le(t),[d,l,u,t,n,a,s]}class pr extends ue{constructor(t){super(),fe(this,t,fr,ur,pe,{isSelected:0,onclick:1})}}function We(e,t,o){const r=e.slice();return r[2]=t[o],r[4]=o,r}function Be(e){let t,o,r,n,s=[],a=new Map,d,l=He(e[1]);const u=i=>i[4];for(let i=0;i<l.length;i+=1){let c=We(e,l,i),g=u(c);a.set(g,s[i]=Ke(g,c))}return{c(){t=T("ul"),o=T("span"),r=Me(e[0]),n=J();for(let i=0;i<s.length;i+=1)s[i].c();this.h()},l(i){t=R(i,"UL",{class:!0});var c=G(t);o=R(c,"SPAN",{class:!0});var g=G(o);r=Se(g,e[0]),g.forEach(k),n=q(c);for(let h=0;h<s.length;h+=1)s[h].l(c);c.forEach(k),this.h()},h(){D(o,"class","font-semibold"),D(t,"class","flex-inline flex items-center gap-1")},m(i,c){P(i,t,c),z(t,o),z(o,r),z(t,n);for(let g=0;g<s.length;g+=1)s[g]&&s[g].m(t,null);d=!0},p(i,c){(!d||c&1)&&Ae(r,i[0]),c&2&&(l=He(i[1]),qe(),s=ht(s,c,u,1,i,l,a,t,wt,Ke,null,We),Je())},i(i){if(!d){for(let c=0;c<l.length;c+=1)I(s[c]);d=!0}},o(i){for(let c=0;c<s.length;c+=1)O(s[c]);d=!1},d(i){i&&k(t);for(let c=0;c<s.length;c+=1)s[c].d()}}}function Fe(e){let t,o="/";return{c(){t=T("span"),t.textContent=o},l(r){t=R(r,"SPAN",{"data-svelte-h":!0}),Xe(t)!=="svelte-ocknwt"&&(t.textContent=o)},m(r,n){P(r,t,n)},d(r){r&&k(t)}}}function gr(e){let t=e[2].label+"",o;return{c(){o=Me(t)},l(r){o=Se(r,t)},m(r,n){P(r,o,n)},p(r,n){n&2&&t!==(t=r[2].label+"")&&Ae(o,t)},d(r){r&&k(o)}}}function Ke(e,t){let o,r,n,s,a,d,l=t[4]>0&&Fe();return s=new pr({props:{isSelected:t[2].isSelected,onclick:t[2].onclick,$$slots:{default:[gr]},$$scope:{ctx:t}}}),{key:e,first:null,c(){o=de(),l&&l.c(),r=J(),n=T("li"),K(s.$$.fragment),a=J(),this.h()},l(u){o=de(),l&&l.l(u),r=q(u),n=R(u,"LI",{});var i=G(n);F(s.$$.fragment,i),a=q(i),i.forEach(k),this.h()},h(){this.first=o},m(u,i){P(u,o,i),l&&l.m(u,i),P(u,r,i),P(u,n,i),B(s,n,null),z(n,a),d=!0},p(u,i){t=u,t[4]>0?l||(l=Fe(),l.c(),l.m(r.parentNode,r)):l&&(l.d(1),l=null);const c={};i&2&&(c.isSelected=t[2].isSelected),i&2&&(c.onclick=t[2].onclick),i&34&&(c.$$scope={dirty:i,ctx:t}),s.$set(c)},i(u){d||(I(s.$$.fragment,u),d=!0)},o(u){O(s.$$.fragment,u),d=!1},d(u){u&&(k(o),k(r),k(n)),l&&l.d(u),W(s)}}}function br(e){let t,o,r=e[1].length>0&&Be(e);return{c(){r&&r.c(),t=de()},l(n){r&&r.l(n),t=de()},m(n,s){r&&r.m(n,s),P(n,t,s),o=!0},p(n,[s]){n[1].length>0?r?(r.p(n,s),s&2&&I(r,1)):(r=Be(n),r.c(),I(r,1),r.m(t.parentNode,t)):r&&(qe(),O(r,1,1,()=>{r=null}),Je())},i(n){o||(I(r),o=!0)},o(n){O(r),o=!1},d(n){n&&k(t),r&&r.d(n)}}}function mr(e,t,o){let{label:r}=t,{list:n}=t;return e.$$set=s=>{"label"in s&&o(0,r=s.label),"list"in s&&o(1,n=s.list)},[r,n]}class ye extends ue{constructor(t){super(),fe(this,t,mr,br,pe,{label:0,list:1})}}function hr(e){let t,o,r,n,s,a,d;return o=new ye({props:{label:"Year",list:e[0]}}),n=new ye({props:{label:"Month",list:e[1]}}),a=new ye({props:{label:"Day",list:e[2]}}),{c(){t=T("div"),K(o.$$.fragment),r=J(),K(n.$$.fragment),s=J(),K(a.$$.fragment),this.h()},l(l){t=R(l,"DIV",{class:!0});var u=G(t);F(o.$$.fragment,u),r=q(u),F(n.$$.fragment,u),s=q(u),F(a.$$.fragment,u),u.forEach(k),this.h()},h(){D(t,"class","flex flex-col gap-4 md:flex-row md:items-center")},m(l,u){P(l,t,u),B(o,t,null),z(t,r),B(n,t,null),z(t,s),B(a,t,null),d=!0},p(l,[u]){const i={};u&1&&(i.list=l[0]),o.$set(i);const c={};u&2&&(c.list=l[1]),n.$set(c);const g={};u&4&&(g.list=l[2]),a.$set(g)},i(l){d||(I(o.$$.fragment,l),I(n.$$.fragment,l),I(a.$$.fragment,l),d=!0)},o(l){O(o.$$.fragment,l),O(n.$$.fragment,l),O(a.$$.fragment,l),d=!1},d(l){l&&k(t),W(o),W(n),W(a)}}}function wr(e,t,o){let{energyType:r}=t,{aggregation:n}=t,{layout:s=S.YEAR}=t,{onclick:a}=t,d=[],l=[],u=[];const i=(g,h,v)=>{const m=v===S.YEAR;o(1,l=[]),o(2,u=[]),o(0,d=[{label:"Months",isSelected:m&&h===y.MONTH,onclick:c(y.MONTH,S.YEAR)},{label:"Weeks",isSelected:m&&h===y.WEEK,onclick:c(y.WEEK,S.YEAR)}]),v===S.MONTH&&(o(1,l=[{label:"Weeks",isSelected:h===y.WEEK,onclick:c(y.WEEK,S.MONTH)}]),[y.DAY,y.HOUR].includes(h)&&l.push({label:"Days",isSelected:h===y.DAY,onclick:c(y.DAY,S.MONTH)}),g===Qe.GAS&&h===y.HOUR&&l.push({label:"Hours",isSelected:h===y.HOUR,onclick:c(y.HOUR,S.MONTH)})),v===S.DAY&&o(2,u=[{label:"Hours",isSelected:h===y.HOUR,onclick:c(y.HOUR,S.DAY)},{label:"Minutes",isSelected:h===y.MINUTES,onclick:c(y.MINUTES,S.DAY)}])},c=(g,h)=>v=>a(g,h);return e.$$set=g=>{"energyType"in g&&o(3,r=g.energyType),"aggregation"in g&&o(4,n=g.aggregation),"layout"in g&&o(5,s=g.layout),"onclick"in g&&o(6,a=g.onclick)},e.$$.update=()=>{e.$$.dirty&56&&i(r,n,s)},[d,l,u,r,n,s,a]}class yr extends ue{constructor(t){super(),fe(this,t,wr,hr,pe,{energyType:3,aggregation:4,layout:5,onclick:6})}}function vr(e){let t,o;return t=new yr({props:{aggregation:e[0],energyType:Qe.GAS,layout:e[1],onclick:e[5]}}),{c(){K(t.$$.fragment)},l(r){F(t.$$.fragment,r)},m(r,n){B(t,r,n),o=!0},p(r,n){const s={};n&1&&(s.aggregation=r[0]),n&2&&(s.layout=r[1]),t.$set(s)},i(r){o||(I(t.$$.fragment,r),o=!0)},o(r){O(t.$$.fragment,r),o=!1},d(r){W(t,r)}}}function xr(e){let t,o,r,n,s,a,d="Data started at:",l,u,i=Ye(e[3])+"",c,g;function h(m){e[8](m)}let v={id:"showAverageToggle",label:"show average mark line"};return e[2]!==void 0&&(v.checked=e[2]),o=new xt({props:v}),gt.push(()=>bt(o,"checked",h)),{c(){t=T("div"),K(o.$$.fragment),n=J(),s=T("div"),a=T("span"),a.textContent=d,l=J(),u=T("span"),c=Me(i),this.h()},l(m){t=R(m,"DIV",{class:!0});var A=G(t);F(o.$$.fragment,A),n=q(A),s=R(A,"DIV",{class:!0});var M=G(s);a=R(M,"SPAN",{"data-svelte-h":!0}),Xe(a)!=="svelte-1cta1ja"&&(a.textContent=d),l=q(M),u=R(M,"SPAN",{class:!0});var H=G(u);c=Se(H,i),H.forEach(k),M.forEach(k),A.forEach(k),this.h()},h(){D(u,"class","font-semibold"),D(s,"class","flex items-center gap-1 text-sm"),D(t,"class","flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0")},m(m,A){P(m,t,A),B(o,t,null),z(t,n),z(t,s),z(s,a),z(s,l),z(s,u),z(u,c),g=!0},p(m,A){const M={};!r&&A&4&&(r=!0,M.checked=m[2],mt(()=>r=!1)),o.$set(M),(!g||A&8)&&i!==(i=Ye(m[3])+"")&&Ae(c,i)},i(m){g||(I(o.$$.fragment,m),g=!0)},o(m){O(o.$$.fragment,m),g=!1},d(m){m&&k(t),W(o)}}}function kr(e){let t,o,r,n;return r=new yt({props:{showAverageMarkline:e[2],onclick:e[6],color:kt,unit:vt.M3,timeseries:e[4],aggregation:e[0],$$slots:{footer:[xr],headerActions:[vr]},$$scope:{ctx:e}}}),{c(){t=T("div"),o=T("div"),K(r.$$.fragment),this.h()},l(s){t=R(s,"DIV",{class:!0});var a=G(t);o=R(a,"DIV",{class:!0});var d=G(o);F(r.$$.fragment,d),d.forEach(k),a.forEach(k),this.h()},h(){D(o,"class","absolute top-0 right-0 bottom-0 left-0"),D(t,"class","relative grow")},m(s,a){P(s,t,a),z(t,o),B(r,o,null),n=!0},p(s,[a]){const d={};a&4&&(d.showAverageMarkline=s[2]),a&16&&(d.timeseries=s[4]),a&1&&(d.aggregation=s[0]),a&1039&&(d.$$scope={dirty:a,ctx:s}),r.$set(d)},i(s){n||(I(r.$$.fragment,s),n=!0)},o(s){O(r.$$.fragment,s),n=!1},d(s){s&&k(t),W(r)}}}function _r(e,t,o){let{data:r}=t,n=y.MONTH,s=S.YEAR,a=!1,d,l=[];const u=h=>{o(0,n=y.MONTH),o(1,s=S.YEAR),o(4,l=h.months),o(3,d=l[0].startedAt)},i=(h,v)=>{if(v===S.YEAR){switch(h){case y.MONTH:o(4,l=r.months);break;case y.WEEK:o(4,l=r.weeks);break}o(3,d=l[0].startedAt),o(0,n=h),o(1,s=v);return}const m=ie(he(d).startOf("month"));switch(h){case y.WEEK:o(4,l=r.weeksMap[m]);break;case y.DAY:o(4,l=r.daysMap[m]);break}o(3,d=l[0].startedAt),o(0,n=h)},c=h=>{const{startedAt:v}=h;let m=ie(v);if(s===S.YEAR){switch(n){case y.MONTH:o(0,n=y.WEEK),o(4,l=r.weeksMap[m]);break;case y.WEEK:m=ie(he(v).startOf("month")),o(0,n=y.DAY),o(4,l=r.daysMap[m]);break}o(3,d=l[0].startedAt),o(1,s=S.MONTH);return}switch(n){case y.WEEK:m=ie(he(v).startOf("month")),o(0,n=y.DAY),o(4,l=r.daysMap[m]);break;case y.DAY:o(0,n=y.HOUR),o(4,l=r.hoursMap[m]);break}o(3,d=l[0].startedAt)};function g(h){a=h,o(2,a)}return e.$$set=h=>{"data"in h&&o(7,r=h.data)},e.$$.update=()=>{e.$$.dirty&128&&u(r)},[n,s,a,d,l,i,c,r,g]}class Rr extends ue{constructor(t){super(),fe(this,t,_r,kr,pe,{data:7})}}export{Rr as default};
