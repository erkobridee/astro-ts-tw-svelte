const e=()=>Math.random()>=.5,g=(t,n)=>Math.random()*(n-t+1)+t,h=(t,n)=>Math.floor(g(t,n)),c=(t,n=0)=>{const o=[];switch(t.length){case 0:return o;case 1:return[t[0]]}if(t.length<5||n===1)return[t[Math.floor(Math.random()*t.length)]];if(n<1)n=h(1,3);else if(n>=t.length){const r=Math.floor(t.length/2);n=h(1,r)}for(t=[...t];o.length<n&&t.length>0;){const r=Math.floor(Math.random()*t.length);o.push(t[r]),t.splice(r,1),t=[...t]}return o};export{e as a,h as b,c as g};
