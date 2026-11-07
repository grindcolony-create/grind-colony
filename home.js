(()=>{
const PRO='Professionals',OLD='Contractor / Skilled worker';
document.head.insertAdjacentHTML('beforeend','<style>body>pre{display:none!important}.tk{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line)}.tk span{flex:1}.tk.od span{color:var(--red)}.bell{min-height:40px}</style>');
const mins=t=>{const[a,b]=t.split(':').map(Number);return a*60+b},nowM=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()};
let AC2,tm2,SB=new Set(),sbl=false,landed=false,lastBack=0,armed=false;const trep={};
const later=()=>{clearTimeout(tm2);tm2=setTimeout(()=>{if(me)draw()},150)};
document.addEventListener('click',()=>{try{AC2=AC2||new(window.AudioContext||window.webkitAudioContext)();AC2.resume()}catch(e){}});
const beep=()=>{if(localStorage.gc_snd=='off'||!AC2)return;try{const o=AC2.createOscillator(),g=AC2.createGain();o.frequency.value=880;g.gain.value=.2;o.connect(g);g.connect(AC2.destination);o.start();o.stop(AC2.currentTime+.35)}catch(e){}};
const tks=()=>me.tasks||(me.tasks=[]);
function tasksCard(){const t=today(),L=tks(),k=x=>x.due+(x.time||'99:99'),d=new Date();d.setDate(d.getDate()+7);const lim=dk(d);
 const open=L.filter(x=>!x.done&&x.due<=lim).sort((a,b)=>k(a)<k(b)?-1:1);
 const row=x=>`<div class="tk ${x.due<t?'od':''}"><button class="tick" data-a="tt" data-v="${x.id}" aria-label="Mark ${esc(x.t)} done"></button><span>${esc(x.t)}<br><small>${x.due<t?'Overdue since '+x.due:x.due==t?'Today':x.due}${x.time?', '+x.time:''}</small></span><button class="x" data-a="td" data-v="${x.id}" aria-label="Delete task">×</button></div>`;
 return`<div class="card"><h2>Tasks and plan</h2>${open.map(row).join('')||'<p class="note" style="text-align:left;margin:8px 0">Nothing planned. Add a task for today or a later day.</p>'}<div class="add"><input id="tk1" maxlength="60" placeholder="Add a task, e.g. Call the bank" aria-label="Task"></div><div class="add"><input id="tk2" type="date" value="${t}" aria-label="Date"><input id="tk3" type="time" aria-label="Time, optional"><button class="btn sm" data-a="tka">Add</button></div></div>`}
const _h12=hiveView,_cv12=colonyView,_me12=meView,_al12=alertsView;
hiveView=function(){return _h12().replace('contractors and skilled workers','professionals').replace('<div class="card"><h2>Today’s habits</h2>',tasksCard()+'<div class="card"><h2>Today’s habits</h2>')};
colonyView=function(){return _cv12().replace('Professionalss','Professionals')};
alertsView=function(){return _al12().split('<div class="nt"').map(c=>/data-t="post"/.test(c)?c.replace('sent an alert','posted something new'):c).join('<div class="nt"')};
meView=function(){return _me12().replace(/<p class="note" style="text-align:left;margin-top:8px">Following \d+ people\.<\/p>/,'').replace(/(<button class="fol[^"]*" data-a="fol" data-v="([^"]+)">[^<]*<\/button>)/,(m,a,u)=>a+` <button class="pick bell" data-a="bell" data-v="${u}" aria-pressed="${SB.has(u)}">${SB.has(u)?'🔔 Post alerts on':'🔕 Post alerts off'}</button>`)};
function loadSB(){if(!LIVE||!me||sbl)return;sbl=true;fs.collection('subs').where('s','==',me.id).get().then(s=>{SB=new Set(s.docs.map(d=>d.data().a));later()}).catch(()=>{sbl=false})}
if(LIVE){const _ad=API.add;API.add=async p=>{const r=await _ad(p);try{if(r&&r.id&&p.uid==me.id&&!p.via)fs.collection('subs').where('a','==',me.id).limit(200).get().then(s=>s.docs.forEach(d=>API.note({to:d.data().s,from:me.id,fromName:me.username,type:'post',postId:r.id,ts:Date.now(),read:false})))}catch(e){}return r}}
const _d12=draw;
draw=function(){if(!me){sbl=false;SB=new Set()}
 if(me&&me.role==OLD&&ROLES.includes(PRO)){me.role=PRO;API.saveMe(me)}
 const first=me&&!landed;_d12();
 if(first){landed=true;if(view=='colony'){view='hive';_d12()}}
 if(me)loadSB()};
setInterval(()=>{if(!me||!me.tasks)return;const t=today(),n=nowM();me.tasks.forEach(x=>{if(x.done||!x.time||x.due!=t)return;const late=n-mins(x.time);if(late<0||late>120||(trep[x.id]||0)>Date.now())return;trep[x.id]=Date.now()+12e4;beep();alert('Task due: '+x.t);
 if('Notification'in window&&Notification.permission=='granted'){try{navigator.serviceWorker.ready.then(r=>r.showNotification('Grind Colony',{body:'Task due: '+x.t,icon:'logo.jpg',tag:x.id,renotify:true}))}catch(e){}}})},2e4);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v,sv=async()=>{await API.saveMe(me);draw()},val=i=>(document.getElementById(i)||{}).value||'';
 if(a=='tka'){const x=val('tk1').trim();if(!x)return alert('Type the task first.');tks().push({id:Date.now()+'',t:x.slice(0,60),due:val('tk2')||today(),time:val('tk3')||''});sv()}
 else if(a=='tt'){const x=tks().find(k=>k.id==v);if(x){x.done=!x.done;sv()}}
 else if(a=='td'){me.tasks=tks().filter(k=>k.id!=v);sv()}
 else if(a=='bell'){const on=SB.has(v);try{if(on){await fs.doc('subs/'+v+'_'+me.id).delete();SB.delete(v);alert('Post alerts turned off.')}else{await fs.doc('subs/'+v+'_'+me.id).set({a:v,s:me.id});SB.add(v);alert('You will be alerted when they post.')}draw()}catch(x){alert('Could not change that. Try again.')}}});
const goBack=()=>{const ov=document.querySelector('.ov,[role=dialog],[role=alertdialog]');if(ov){if(ov.id=='onb'||ov.id=='onb2')return true;ov.remove();return true}
 const q=s=>document.querySelector(s);
 if(view=='post'||view=='user'){const b=q('[data-a="sback"],[data-a="pback"]');if(b){b.click();return true}}
 if(view=='money'&&q('[data-a="jb"]')){q('[data-a="jb"]').click();return true}
 if(q('[data-a="rclose"]')){q('[data-a="rclose"]').click();return true}
 if(view!='hive'){view='hive';draw();return true}
 return false};
document.addEventListener('click',()=>{if(!armed){armed=true;history.replaceState({gc:'base'},'');history.pushState({gc:'app'},'')}},{capture:true});
addEventListener('popstate',()=>{if(!armed)return;if(goBack()){history.pushState({gc:'app'},'');return}
 if(Date.now()-lastBack<2200){history.back();return}lastBack=Date.now();alert('Press back again to exit');history.pushState({gc:'app'},'')});
if(me){start();draw()}else if(app.firstChild)draw();
})();
