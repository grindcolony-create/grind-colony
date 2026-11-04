(()=>{
document.head.insertAdjacentHTML('beforeend','<style>.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}.cal>b{font-size:11px;color:var(--mut)}.cd{aspect-ratio:1/1.05;border-radius:10px;background:var(--ice);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:13px;line-height:1.1;min-width:0;padding:1px}.cd small{font-size:9px;font-weight:600;max-width:100%;overflow:hidden}.cd.l1{background:var(--sky)}.cd.l2{background:var(--yel)}.cd.has{background:#FFF3C4}.cd.sel{outline:2px solid var(--ink)}.cd.td{font-weight:700}.chead{display:flex;align-items:center;justify-content:space-between;margin:8px 0}.chead button{font-size:24px;padding:0 14px}</style>');
const KEEP=/^(d|ma|mn|mc|nh|u|p|e|r|c\w{8,})$/,_d=draw;
draw=function(){const a=document.activeElement,id=a&&a.id,s=a&&a.selectionStart,v={};
 document.querySelectorAll('input[id],textarea[id],select[id]').forEach(x=>{if(KEEP.test(x.id)&&x.type!='file')v[x.id]=x.value});
 _d();
 for(const k in v){const x=document.getElementById(k);if(x&&x.value!==v[k]&&(x.tagName!='SELECT'||[...x.options].some(o=>o.value==v[k])))x.value=v[k]}
 if(id){const x=document.getElementById(id);if(x){x.focus();try{x.setSelectionRange(s,s)}catch(e){}}}};
const typing=()=>document.activeElement.matches('input,textarea');
if(LIVE){
 API.watch=cb=>fs.collection('posts').orderBy('ts','desc').limit(40).onSnapshot(s=>{cb(s.docs.map(d=>({id:d.id,...d.data()})));if(me&&view!='hive'&&typing())draw()});
 API.watchN=(id,cb)=>fs.collection('notes').where('to','==',id).limit(80).onSnapshot(q=>{cb(q.docs.map(d=>({id:d.id,...d.data()})));if(me&&typing())draw()});
 let um;const _st=start;
 start=function(){_st();um&&um();um=null;if(me)um=fs.doc('users/'+me.id).onSnapshot(s=>{if(s.metadata.hasPendingWrites||!s.exists)return;const d=s.data();if(JSON.stringify(d)!==JSON.stringify(me)){me=d;draw()}})};
}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="like"],[data-a="rs"]');if(!b)return;e.stopPropagation();
 const p=posts.find(x=>x.id==b.dataset.v);if(!p)return;const a=b.dataset.a,f=a=='like'?'likes':'reshares',L=p[f]=p[f]||[],on=L.includes(me.id);
 if(a=='rs'){if(on)return;if(p.uid==me.id)return alert('You can’t repost your own post.')}
 on?L.splice(L.indexOf(me.id),1):L.push(me.id);draw();
 try{await API.patch(p.id,{k:a=='rs'?'r':on?'unlike':'like',uid:me.id});if(!on)ping(p,a=='rs'?'reshare':'like')}catch(x){on?L.push(me.id):L.splice(L.indexOf(me.id),1);draw();alert('That did not go through. Try again.')}},true);
let mm=new Date(),hm=new Date(),sel=today(),remId=null;mm.setDate(1);hm.setDate(1);
const key=(y,m,d)=>y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'),CF=new Intl.NumberFormat(undefined,{notation:'compact',maximumFractionDigits:1});
const grid=(y,m,fn)=>{const off=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate();return'<div class="cal">'+['M','T','W','T','F','S','S'].map(x=>`<b>${x}</b>`).join('')+'<i></i>'.repeat(off)+[...Array(n)].map((_,i)=>fn(i+1,key(y,m,i+1))).join('')+'</div>'};
const head=(p,n,d)=>`<div class="chead"><button data-a="${p}" aria-label="Previous month">‹</button><b>${d.toLocaleString(undefined,{month:'long',year:'numeric'})}</b><button data-a="${n}" aria-label="Next month">›</button></div>`;
const net=k=>{let e=0,s=0;mo().tx.forEach(x=>{if(x.d!=k)return;const v=cv(x.a,x.c,mo().base);if(v==null)return;x.t=='in'?e+=v:s+=v});return[e,s]};
const _m2=moneyView,_h2=hiveView;
moneyView=function(){let h=_m2(),b=mo().base,E=0,S=0;
 const cells=grid(mm.getFullYear(),mm.getMonth(),(d,k)=>{const[e,s]=net(k),n=e-s;E+=e;S+=s;return`<button class="cd ${e||s?'has':''} ${k==sel?'sel':''} ${k==today()?'td':''}" data-a="mday" data-v="${k}">${d}${e||s?`<small style="color:${n<0?'var(--red)':'var(--blue)'}">${n<0?'-':'+'}${CF.format(Math.abs(n))}</small>`:''}</button>`}),list=mo().tx.filter(x=>x.d==sel);
 const card=`<div class="card"><h2>Money calendar</h2>${head('mprev','mnext',mm)}${cells}<p class="note" style="margin-top:8px">This month: earned ${fmt(E,b)}, spent ${fmt(S,b)}</p><h2 style="margin-top:12px">${sel}</h2>${list.length?list.map(x=>`<div class="hb"><span>${esc(x.k)}${x.n?': '+esc(x.n):''}</span><b style="color:${x.t=='in'?'var(--blue)':'var(--red)'}">${x.t=='in'?'+':'−'}${fmt(x.a,x.c)}</b><button class="x" data-a="mdel" data-v="${x.id}" aria-label="Delete entry">×</button></div>`).join(''):'<p class="note" style="text-align:left">Nothing recorded this day.</p>'}</div>`;
 return h.replace('<div class="card"><div class="seg">',card+'<div class="card"><div class="seg">').replace('<button class="btn" style="margin-top:12px" data-a="madd">',`<label style="margin-top:10px">Date<input id="md" type="date" value="${sel}"></label><button class="btn" style="margin-top:12px" data-a="madd">`)};
hiveView=function(){let h=_h2();
 h=h.replace(/<button class="x" data-a="del" data-v="([^"]+)"/g,(m,id)=>{const q=me.habits.find(x=>x.id==id);return(q&&q.t?`<small>⏰ ${q.t}</small>`:'')+`<button class="x" data-a="rem" data-v="${id}" aria-label="Set reminder">⏰</button>`+m});
 const q=me.habits.find(x=>x.id==remId),n=me.habits.length,perm='Notification'in window&&Notification.permission!='granted';
 const ed=q?`<div class="card"><h2>⏰ Reminder: ${esc(q.name)}</h2><label style="margin-top:8px">Time<input id="rt" type="time" value="${q.t||''}"></label><div class="chips" style="margin-top:12px"><button class="btn sm" data-a="rsave">Save</button><button class="pick" data-a="rics">Add to phone calendar</button>${q.t?'<button class="pick" data-a="rclear">Remove</button>':''}<button class="pick" data-a="rclose">Close</button></div>${perm?'<button class="lnk" style="margin-top:10px" data-a="rperm">Turn on notifications</button>':''}<p class="note" style="text-align:left;margin-top:8px">Reminders pop up while the app is open or running in the background. For one that always rings, tap Add to phone calendar.</p></div>`:'';
 const cal=`<div class="card"><h2>Habit calendar</h2>${head('hprev','hnext',hm)}${grid(hm.getFullYear(),hm.getMonth(),(d,k)=>{const c=done(k);return`<div class="cd ${n&&c?c<n?'l1':'l2':''} ${k==today()?'td':''}">${d}</div>`})}<p class="note" style="margin-top:8px">Honey = all habits done. Blue = some.</p></div>`;
 return h.replace('<div class="card"><h2>Today’s habits</h2>',ed+'<div class="card"><h2>Today’s habits</h2>').replace('<button class="btn" data-a="share">',cal+'<button class="btn" data-a="share">')};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="madd"]');if(!b)return;e.stopPropagation();
 const a=parseFloat($('#ma').value);if(!(a>0))return alert('Enter an amount above 0.');
 const d=$('#md').value||today();sel=d;mm=new Date(d+'T00:00:00');mm.setDate(1);
 mo().tx.push({id:Date.now()+'',t:mt,a,c:$('#mc').value,k:$('#mk').value,n:$('#mn').value.trim(),d});$('#ma').value='';$('#mn').value='';await API.saveMe(me);draw()},true);
function ics(q){const t=($('#rt')&&$('#rt').value)||q.t;if(!t)return alert('Pick a time first.');const[h,m]=t.split(':'),d=today().replace(/-/g,''),nm=q.name.replace(/[,;]/g,' ');
 const x=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Grind Colony//EN','BEGIN:VEVENT','UID:'+q.id+'@grindcolony','DTSTAMP:'+d+'T000000Z','DTSTART:'+d+'T'+h+m+'00','DURATION:PT15M','RRULE:FREQ=DAILY','SUMMARY:'+nm,'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:'+nm,'END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([x],{type:'text/calendar'}));a.download='grind-colony-reminder.ics';document.body.appendChild(a);a.click();a.remove()}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v,q=me.habits.find(x=>x.id==remId);
 if(a=='mprev'||a=='mnext'){mm.setMonth(mm.getMonth()+(a=='mnext'?1:-1));draw()}
 else if(a=='hprev'||a=='hnext'){hm.setMonth(hm.getMonth()+(a=='hnext'?1:-1));draw()}
 else if(a=='mday'){sel=v;draw()}
 else if(a=='rem'){remId=v;draw()}
 else if(a=='rclose'){remId=null;draw()}
 else if(a=='rsave'&&q){q.t=$('#rt').value||'';if(!q.t)delete q.t;remId=null;await API.saveMe(me);draw()}
 else if(a=='rclear'&&q){delete q.t;remId=null;await API.saveMe(me);draw()}
 else if(a=='rperm'){Notification.requestPermission().then(()=>draw())}
 else if(a=='rics'&&q)ics(q)});
function banner(msg,id){const b=document.createElement('div');b.style.cssText='position:fixed;left:12px;right:12px;top:12px;z-index:20;background:#0D0D0D;color:#FFC72C;border-radius:16px;padding:12px 14px;display:flex;gap:10px;align-items:center;font:600 14px system-ui;box-shadow:0 3px 0 #E5252A';
 b.innerHTML='<span style="flex:1">⏰ '+esc(msg)+'</span><button style="background:#FFC72C;color:#0D0D0D;border:0;border-radius:999px;padding:8px 14px;font:700 14px system-ui">Done</button><button aria-label="Close" style="background:none;border:0;color:#FFC72C;font-size:22px">×</button>';
 const[ok,x]=b.querySelectorAll('button');ok.onclick=async()=>{const h=me.habits.find(k=>k.id==id);if(h){h.log[today()]=1;await API.saveMe(me);draw()}b.remove()};x.onclick=()=>b.remove();document.body.appendChild(b)}
function check(){if(!me)return;const n=new Date(),c=n.getHours()*60+n.getMinutes();
 me.habits.forEach(h=>{if(!h.t||h.log[today()])return;const[a,b]=h.t.split(':').map(Number),t=a*60+b,k='gc_r_'+h.id+'_'+today();
  if(c>=t&&c-t<180&&!localStorage[k]){localStorage[k]=1;const msg='Time for: '+h.name;
   if('Notification'in window&&Notification.permission=='granted'){try{navigator.serviceWorker.ready.then(r=>r.showNotification('Grind Colony',{body:msg,icon:'logo.jpg',tag:h.id}))}catch(x){new Notification('Grind Colony',{body:msg})}}
   banner(msg,h.id)}})}
setInterval(check,3e4);setTimeout(check,3e3);document.addEventListener('visibilitychange',check);
if(me){start();draw()}else if(app.firstChild)draw();
})();
