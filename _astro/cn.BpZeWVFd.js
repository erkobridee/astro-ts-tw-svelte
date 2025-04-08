function de(e){var s,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var l=e.length;for(s=0;s<l;s++)e[s]&&(t=de(e[s]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function we(){for(var e,s,t=0,r="",l=arguments.length;t<l;t++)(e=arguments[t])&&(s=de(e))&&(r&&(r+=" "),r+=s);return r}const Z="-",ye=e=>{const s=ke(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{const b=a.split(Z);return b[0]===""&&b.length!==1&&b.shift(),ue(b,s)||ve(a)},getConflictingClassGroupIds:(a,b)=>{const u=t[a]||[];return b&&r[a]?[...u,...r[a]]:u}}},ue=(e,s)=>{if(e.length===0)return s.classGroupId;const t=e[0],r=s.nextPart.get(t),l=r?ue(e.slice(1),r):void 0;if(l)return l;if(s.validators.length===0)return;const c=e.join(Z);return s.validators.find(({validator:a})=>a(c))?.classGroupId},le=/^\[(.+)\]$/,ve=e=>{if(le.test(e)){const s=le.exec(e)[1],t=s?.substring(0,s.indexOf(":"));if(t)return"arbitrary.."+t}},ke=e=>{const{theme:s,classGroups:t}=e,r={nextPart:new Map,validators:[]};for(const l in t)K(t[l],r,l,s);return r},K=(e,s,t,r)=>{e.forEach(l=>{if(typeof l=="string"){const c=l===""?s:ae(s,l);c.classGroupId=t;return}if(typeof l=="function"){if(ze(l)){K(l(r),s,t,r);return}s.validators.push({validator:l,classGroupId:t});return}Object.entries(l).forEach(([c,a])=>{K(a,ae(s,c),t,r)})})},ae=(e,s)=>{let t=e;return s.split(Z).forEach(r=>{t.nextPart.has(r)||t.nextPart.set(r,{nextPart:new Map,validators:[]}),t=t.nextPart.get(r)}),t},ze=e=>e.isThemeGetter,Ce=e=>{if(e<1)return{get:()=>{},set:()=>{}};let s=0,t=new Map,r=new Map;const l=(c,a)=>{t.set(c,a),s++,s>e&&(s=0,r=t,t=new Map)};return{get(c){let a=t.get(c);if(a!==void 0)return a;if((a=r.get(c))!==void 0)return l(c,a),a},set(c,a){t.has(c)?t.set(c,a):l(c,a)}}},Q="!",Y=":",Me=Y.length,Se=e=>{const{prefix:s,experimentalParseClassName:t}=e;let r=l=>{const c=[];let a=0,b=0,u=0,g;for(let w=0;w<l.length;w++){let y=l[w];if(a===0&&b===0){if(y===Y){c.push(l.slice(u,w)),u=w+Me;continue}if(y==="/"){g=w;continue}}y==="["?a++:y==="]"?a--:y==="("?b++:y===")"&&b--}const m=c.length===0?l:l.substring(u),z=Ae(m),V=z!==m,j=g&&g>u?g-u:void 0;return{modifiers:c,hasImportantModifier:V,baseClassName:z,maybePostfixModifierPosition:j}};if(s){const l=s+Y,c=r;r=a=>a.startsWith(l)?c(a.substring(l.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(t){const l=r;r=c=>t({className:c,parseClassName:l})}return r},Ae=e=>e.endsWith(Q)?e.substring(0,e.length-1):e.startsWith(Q)?e.substring(1):e,Ie=e=>{const s=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const l=[];let c=[];return r.forEach(a=>{a[0]==="["||s[a]?(l.push(...c.sort(),a),c=[]):c.push(a)}),l.push(...c.sort()),l}},Re=e=>({cache:Ce(e.cacheSize),parseClassName:Se(e),sortModifiers:Ie(e),...ye(e)}),Pe=/\s+/,Ge=(e,s)=>{const{parseClassName:t,getClassGroupId:r,getConflictingClassGroupIds:l,sortModifiers:c}=s,a=[],b=e.trim().split(Pe);let u="";for(let g=b.length-1;g>=0;g-=1){const m=b[g],{isExternal:z,modifiers:V,hasImportantModifier:j,baseClassName:w,maybePostfixModifierPosition:y}=t(m);if(z){u=m+(u.length>0?" "+u:u);continue}let R=!!y,M=r(R?w.substring(0,y):w);if(!M){if(!R){u=m+(u.length>0?" "+u:u);continue}if(M=r(w),!M){u=m+(u.length>0?" "+u:u);continue}R=!1}const O=c(V).join(":"),F=j?O+Q:O,P=F+M;if(a.includes(P))continue;a.push(P);const G=l(M,R);for(let i=0;i<G.length;++i){const v=G[i];a.push(F+v)}u=m+(u.length>0?" "+u:u)}return u};function Te(){let e=0,s,t,r="";for(;e<arguments.length;)(s=arguments[e++])&&(t=pe(s))&&(r&&(r+=" "),r+=t);return r}const pe=e=>{if(typeof e=="string")return e;let s,t="";for(let r=0;r<e.length;r++)e[r]&&(s=pe(e[r]))&&(t&&(t+=" "),t+=s);return t};function Ee(e,...s){let t,r,l,c=a;function a(u){const g=s.reduce((m,z)=>z(m),e());return t=Re(g),r=t.cache.get,l=t.cache.set,c=b,b(u)}function b(u){const g=r(u);if(g)return g;const m=Ge(u,t);return l(u,m),m}return function(){return c(Te.apply(null,arguments))}}const f=e=>{const s=t=>t[e]||[];return s.isThemeGetter=!0,s},be=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,fe=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Le=/^\d+\/\d+$/,Ne=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ve=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,je=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Oe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Fe=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,E=e=>Le.test(e),d=e=>!!e&&!Number.isNaN(Number(e)),A=e=>!!e&&Number.isInteger(Number(e)),ce=e=>e.endsWith("%")&&d(e.slice(0,-1)),C=e=>Ne.test(e),_e=()=>!0,Be=e=>Ve.test(e)&&!je.test(e),ee=()=>!1,$e=e=>Oe.test(e),We=e=>Fe.test(e),Ue=e=>!o(e)&&!n(e),qe=e=>L(e,he,ee),o=e=>be.test(e),I=e=>L(e,xe,Be),D=e=>L(e,tr,d),He=e=>L(e,ge,ee),Je=e=>L(e,me,We),Xe=e=>L(e,ee,$e),n=e=>fe.test(e),q=e=>N(e,xe),De=e=>N(e,or),Ke=e=>N(e,ge),Qe=e=>N(e,he),Ye=e=>N(e,me),Ze=e=>N(e,nr,!0),L=(e,s,t)=>{const r=be.exec(e);return r?r[1]?s(r[1]):t(r[2]):!1},N=(e,s,t=!1)=>{const r=fe.exec(e);return r?r[1]?s(r[1]):t:!1},ge=e=>e==="position",er=new Set(["image","url"]),me=e=>er.has(e),rr=new Set(["length","size","percentage"]),he=e=>rr.has(e),xe=e=>e==="length",tr=e=>e==="number",or=e=>e==="family-name",nr=e=>e==="shadow",sr=()=>{const e=f("color"),s=f("font"),t=f("text"),r=f("font-weight"),l=f("tracking"),c=f("leading"),a=f("breakpoint"),b=f("container"),u=f("spacing"),g=f("radius"),m=f("shadow"),z=f("inset-shadow"),V=f("drop-shadow"),j=f("blur"),w=f("perspective"),y=f("aspect"),R=f("ease"),M=f("animate"),O=()=>["auto","avoid","all","avoid-page","page","left","right","column"],F=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],P=()=>["auto","hidden","clip","visible","scroll"],G=()=>["auto","contain","none"],i=()=>[n,o,u],v=()=>[E,"full","auto",...i()],re=()=>[A,"none","subgrid",n,o],te=()=>["auto",{span:["full",A,n,o]},n,o],_=()=>[A,"auto",n,o],oe=()=>["auto","min","max","fr",n,o],H=()=>["start","end","center","between","around","evenly","stretch","baseline"],T=()=>["start","end","center","stretch"],k=()=>["auto",...i()],S=()=>[E,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...i()],p=()=>[e,n,o],J=()=>[ce,I],h=()=>["","none","full",g,n,o],x=()=>["",d,q,I],B=()=>["solid","dashed","dotted","double"],ne=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],se=()=>["","none",j,n,o],ie=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",n,o],$=()=>["none",d,n,o],W=()=>["none",d,n,o],X=()=>[d,n,o],U=()=>[E,"full",...i()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[C],breakpoint:[C],color:[_e],container:[C],"drop-shadow":[C],ease:["in","out","in-out"],font:[Ue],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[C],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[C],shadow:[C],spacing:["px",d],text:[C],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",E,o,n,y]}],container:["container"],columns:[{columns:[d,o,n,b]}],"break-after":[{"break-after":O()}],"break-before":[{"break-before":O()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...F(),o,n]}],overflow:[{overflow:P()}],"overflow-x":[{"overflow-x":P()}],"overflow-y":[{"overflow-y":P()}],overscroll:[{overscroll:G()}],"overscroll-x":[{"overscroll-x":G()}],"overscroll-y":[{"overscroll-y":G()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:v()}],"inset-x":[{"inset-x":v()}],"inset-y":[{"inset-y":v()}],start:[{start:v()}],end:[{end:v()}],top:[{top:v()}],right:[{right:v()}],bottom:[{bottom:v()}],left:[{left:v()}],visibility:["visible","invisible","collapse"],z:[{z:[A,"auto",n,o]}],basis:[{basis:[E,"full","auto",b,...i()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[d,E,"auto","initial","none",o]}],grow:[{grow:["",d,n,o]}],shrink:[{shrink:["",d,n,o]}],order:[{order:[A,"first","last","none",n,o]}],"grid-cols":[{"grid-cols":re()}],"col-start-end":[{col:te()}],"col-start":[{"col-start":_()}],"col-end":[{"col-end":_()}],"grid-rows":[{"grid-rows":re()}],"row-start-end":[{row:te()}],"row-start":[{"row-start":_()}],"row-end":[{"row-end":_()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":oe()}],"auto-rows":[{"auto-rows":oe()}],gap:[{gap:i()}],"gap-x":[{"gap-x":i()}],"gap-y":[{"gap-y":i()}],"justify-content":[{justify:[...H(),"normal"]}],"justify-items":[{"justify-items":[...T(),"normal"]}],"justify-self":[{"justify-self":["auto",...T()]}],"align-content":[{content:["normal",...H()]}],"align-items":[{items:[...T(),"baseline"]}],"align-self":[{self:["auto",...T(),"baseline"]}],"place-content":[{"place-content":H()}],"place-items":[{"place-items":[...T(),"baseline"]}],"place-self":[{"place-self":["auto",...T()]}],p:[{p:i()}],px:[{px:i()}],py:[{py:i()}],ps:[{ps:i()}],pe:[{pe:i()}],pt:[{pt:i()}],pr:[{pr:i()}],pb:[{pb:i()}],pl:[{pl:i()}],m:[{m:k()}],mx:[{mx:k()}],my:[{my:k()}],ms:[{ms:k()}],me:[{me:k()}],mt:[{mt:k()}],mr:[{mr:k()}],mb:[{mb:k()}],ml:[{ml:k()}],"space-x":[{"space-x":i()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":i()}],"space-y-reverse":["space-y-reverse"],size:[{size:S()}],w:[{w:[b,"screen",...S()]}],"min-w":[{"min-w":[b,"screen","none",...S()]}],"max-w":[{"max-w":[b,"screen","none","prose",{screen:[a]},...S()]}],h:[{h:["screen",...S()]}],"min-h":[{"min-h":["screen","none",...S()]}],"max-h":[{"max-h":["screen",...S()]}],"font-size":[{text:["base",t,q,I]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,n,D]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ce,o]}],"font-family":[{font:[De,o,s]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[l,n,o]}],"line-clamp":[{"line-clamp":[d,"none",n,D]}],leading:[{leading:[c,...i()]}],"list-image":[{"list-image":["none",n,o]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",n,o]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:p()}],"text-color":[{text:p()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...B(),"wavy"]}],"text-decoration-thickness":[{decoration:[d,"from-font","auto",n,I]}],"text-decoration-color":[{decoration:p()}],"underline-offset":[{"underline-offset":[d,"auto",n,o]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:i()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",n,o]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",n,o]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...F(),Ke,He]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",Qe,qe]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},A,n,o],radial:["",n,o],conic:[A,n,o]},Ye,Je]}],"bg-color":[{bg:p()}],"gradient-from-pos":[{from:J()}],"gradient-via-pos":[{via:J()}],"gradient-to-pos":[{to:J()}],"gradient-from":[{from:p()}],"gradient-via":[{via:p()}],"gradient-to":[{to:p()}],rounded:[{rounded:h()}],"rounded-s":[{"rounded-s":h()}],"rounded-e":[{"rounded-e":h()}],"rounded-t":[{"rounded-t":h()}],"rounded-r":[{"rounded-r":h()}],"rounded-b":[{"rounded-b":h()}],"rounded-l":[{"rounded-l":h()}],"rounded-ss":[{"rounded-ss":h()}],"rounded-se":[{"rounded-se":h()}],"rounded-ee":[{"rounded-ee":h()}],"rounded-es":[{"rounded-es":h()}],"rounded-tl":[{"rounded-tl":h()}],"rounded-tr":[{"rounded-tr":h()}],"rounded-br":[{"rounded-br":h()}],"rounded-bl":[{"rounded-bl":h()}],"border-w":[{border:x()}],"border-w-x":[{"border-x":x()}],"border-w-y":[{"border-y":x()}],"border-w-s":[{"border-s":x()}],"border-w-e":[{"border-e":x()}],"border-w-t":[{"border-t":x()}],"border-w-r":[{"border-r":x()}],"border-w-b":[{"border-b":x()}],"border-w-l":[{"border-l":x()}],"divide-x":[{"divide-x":x()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":x()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...B(),"hidden","none"]}],"divide-style":[{divide:[...B(),"hidden","none"]}],"border-color":[{border:p()}],"border-color-x":[{"border-x":p()}],"border-color-y":[{"border-y":p()}],"border-color-s":[{"border-s":p()}],"border-color-e":[{"border-e":p()}],"border-color-t":[{"border-t":p()}],"border-color-r":[{"border-r":p()}],"border-color-b":[{"border-b":p()}],"border-color-l":[{"border-l":p()}],"divide-color":[{divide:p()}],"outline-style":[{outline:[...B(),"none","hidden"]}],"outline-offset":[{"outline-offset":[d,n,o]}],"outline-w":[{outline:["",d,q,I]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",m,Ze,Xe]}],"shadow-color":[{shadow:p()}],"inset-shadow":[{"inset-shadow":["none",n,o,z]}],"inset-shadow-color":[{"inset-shadow":p()}],"ring-w":[{ring:x()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:p()}],"ring-offset-w":[{"ring-offset":[d,I]}],"ring-offset-color":[{"ring-offset":p()}],"inset-ring-w":[{"inset-ring":x()}],"inset-ring-color":[{"inset-ring":p()}],opacity:[{opacity:[d,n,o]}],"mix-blend":[{"mix-blend":[...ne(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ne()}],filter:[{filter:["","none",n,o]}],blur:[{blur:se()}],brightness:[{brightness:[d,n,o]}],contrast:[{contrast:[d,n,o]}],"drop-shadow":[{"drop-shadow":["","none",V,n,o]}],grayscale:[{grayscale:["",d,n,o]}],"hue-rotate":[{"hue-rotate":[d,n,o]}],invert:[{invert:["",d,n,o]}],saturate:[{saturate:[d,n,o]}],sepia:[{sepia:["",d,n,o]}],"backdrop-filter":[{"backdrop-filter":["","none",n,o]}],"backdrop-blur":[{"backdrop-blur":se()}],"backdrop-brightness":[{"backdrop-brightness":[d,n,o]}],"backdrop-contrast":[{"backdrop-contrast":[d,n,o]}],"backdrop-grayscale":[{"backdrop-grayscale":["",d,n,o]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[d,n,o]}],"backdrop-invert":[{"backdrop-invert":["",d,n,o]}],"backdrop-opacity":[{"backdrop-opacity":[d,n,o]}],"backdrop-saturate":[{"backdrop-saturate":[d,n,o]}],"backdrop-sepia":[{"backdrop-sepia":["",d,n,o]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":i()}],"border-spacing-x":[{"border-spacing-x":i()}],"border-spacing-y":[{"border-spacing-y":i()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",n,o]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[d,"initial",n,o]}],ease:[{ease:["linear","initial",R,n,o]}],delay:[{delay:[d,n,o]}],animate:[{animate:["none",M,n,o]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[w,n,o]}],"perspective-origin":[{"perspective-origin":ie()}],rotate:[{rotate:$()}],"rotate-x":[{"rotate-x":$()}],"rotate-y":[{"rotate-y":$()}],"rotate-z":[{"rotate-z":$()}],scale:[{scale:W()}],"scale-x":[{"scale-x":W()}],"scale-y":[{"scale-y":W()}],"scale-z":[{"scale-z":W()}],"scale-3d":["scale-3d"],skew:[{skew:X()}],"skew-x":[{"skew-x":X()}],"skew-y":[{"skew-y":X()}],transform:[{transform:[n,o,"","none","gpu","cpu"]}],"transform-origin":[{origin:ie()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:U()}],"translate-x":[{"translate-x":U()}],"translate-y":[{"translate-y":U()}],"translate-z":[{"translate-z":U()}],"translate-none":["translate-none"],accent:[{accent:p()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:p()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",n,o]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":i()}],"scroll-mx":[{"scroll-mx":i()}],"scroll-my":[{"scroll-my":i()}],"scroll-ms":[{"scroll-ms":i()}],"scroll-me":[{"scroll-me":i()}],"scroll-mt":[{"scroll-mt":i()}],"scroll-mr":[{"scroll-mr":i()}],"scroll-mb":[{"scroll-mb":i()}],"scroll-ml":[{"scroll-ml":i()}],"scroll-p":[{"scroll-p":i()}],"scroll-px":[{"scroll-px":i()}],"scroll-py":[{"scroll-py":i()}],"scroll-ps":[{"scroll-ps":i()}],"scroll-pe":[{"scroll-pe":i()}],"scroll-pt":[{"scroll-pt":i()}],"scroll-pr":[{"scroll-pr":i()}],"scroll-pb":[{"scroll-pb":i()}],"scroll-pl":[{"scroll-pl":i()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",n,o]}],fill:[{fill:["none",...p()]}],"stroke-w":[{stroke:[d,q,I,D]}],stroke:[{stroke:["none",...p()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},ir=Ee(sr),lr=(...e)=>ir(we(e));export{lr as c};
