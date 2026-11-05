(()=>{
document.head.insertAdjacentHTML('beforeend','<style>#skip{position:absolute;left:-999px;top:0;background:#000;color:#FFC72C;padding:10px;z-index:99}#skip:focus{left:8px;top:8px}.add{flex-wrap:wrap}.tl{flex:1 1 100%;display:flex;align-items:center;gap:8px}.tl input{width:auto}.trk2{height:8px;border-radius:6px;background:#fff;overflow:hidden}.trk2 i{display:block;height:100%;background:var(--ink)}.bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-top:10px}.bdgc{border:2px solid var(--line);border-radius:14px;padding:10px;text-align:center;font-size:13px;opacity:.55}.bdgc.on{opacity:1;background:#FFF3C4;border-color:var(--yel)}.bdgc b{display:block;font-size:14px}.sw{display:flex!important;align-items:center;gap:10px;grid-template-columns:none!important}.sw input{width:auto}.hc{--mut:#1f2f4a;--line:#7d8ea8}.hc .card,.hc .post{border-color:#0B2A5B}.hc :focus-visible{outline:4px solid #000}@media(pointer:coarse){button,.pick,select,input[type=time],input[type=date]{min-height:44px}.tick{width:44px;height:48px}.x{min-width:44px}}</style>');
let AC;const ac=()=>AC||(AC=new(window.AudioContext||window.webkitAudioContext)());
document.addEventListener('click',()=>{try{ac().resume()}catch(e){}});
const tone=(f,t,d,v)=>{if(localStorage.gc_snd=='off')return;try{const c=ac(),o=c.createOscillator(),g=c.createGain(),s=c.currentTime+t;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(v||.15,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+d)}catch(e){}};
const pop=()=>{tone(660,0,.08);tone(990,.07,.12)},chime=()=>[0,.3,.6].forEach(t=>{tone(880,t,.22,.3);tone(1175,t+.12,.22,.25)});
const mins=t=>{const[a,b]=t.split(':').map(Number);return a*60+b},nowM=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()},fm=m=>m>=60?Math.floor(m/60)+'h '+m%60+'m':m+'m';
const lab=h=>{if(h.log[today()])return'✓ done';const d=mins(h.t)-nowM();return d>0?'⏳ '+fm(d)+' left':d==0?'⏰ now':'⏰ overdue '+fm(-d)};
const stats=()=>{const s=new Set();let k=0;me.habits.forEach(h=>Object.keys(h.log).forEach(d=>{s.add(d);k++}));const a=[...s].sort();let b=0,c=0,p=null;a.forEach(d=>{const t=Date.parse(d);c=p!==null&&t-p==864e5?c+1:1;p=t;if(c>b)b=c});
 return{best:b,ticks:k,tx:(me.money&&me.money.tx||[]).length,habits:me.habits.length,rem:me.habits.filter(h=>h.t).length,qd:(me.qd||[]).length,post:posts.some(p=>p.uid==me.id)}};
const BG=[['h1','First habit','Add your first habit',s=>s.habits>=1],['h5','Habit builder','Have 5 habits',s=>s.habits>=5],['r1','On the clock','Set a reminder time',s=>s.rem>=1],
['s3','3-day streak','3 days in a row',s=>s.best>=3],['s7','7-day streak','7 days in a row',s=>s.best>=7],['s14','14-day streak','14 days in a row',s=>s.best>=14],['s30','30-day streak','30 days in a row',s=>s.best>=30],['s60','60-day streak','60 days in a row',s=>s.best>=60],['s100','100-day streak','100 days in a row',s=>s.best>=100],
['k50','50 ticks','Tick 50 habits',s=>s.ticks>=50],['k250','250 ticks','Tick 250 habits',s=>s.ticks>=250],['k1000','1000 ticks','Tick 1000 habits',s=>s.ticks>=1000],
['m1','Money starter','Log a money entry',s=>s.tx>=1],['m30','Money keeper','Log 30 entries',s=>s.tx>=30],['p1','First post','Share a post',s=>s.post],['q7','Quest master','Finish all quests on 7 days',s=>s.qd>=7],['q30','Quest legend','Finish all quests on 30 days',s=>s.qd>=30]];
const quests=()=>{const t=today(),d=done(t),ps=posts.some(p=>p.uid==me.id&&dk(new Date(p.ts))==t),mn=(me.money&&me.money.tx||[]).some(x=>x.d==t);
 return[{t:'Tick 3 habits',v:Math.min(d,3),m:3,ok:d>=3},{t:'Post in the Colony',v:+ps,m:1,ok:ps},{t:'Log a money entry',v:+mn,m:1,ok:mn}]};
const _h8=hiveView,_me7=meView;
hiveView=function(){let h=_h8();const n=me.habits.length,d=done(today()),q=quests(),sk=streak();
 const msg=!n?'Bzzz! Add your first habit and start your hive.':d==n?'Bzzz! Hive complete today. Come back tomorrow to keep your '+sk+'-day streak.':sk>0&&d==0?'Your '+sk+'-day streak needs one habit today.':(n-d)+' more to fill today’s hive.';
 const buzz=`<div class="card" style="background:#FFF3C4;border-color:var(--yel)"><div style="display:flex;gap:10px;align-items:center"><span style="font-size:34px" aria-hidden="true">🐝</span><p style="font-weight:600">${msg}</p></div><h2 style="margin-top:12px">Daily quests</h2>${q.map(x=>`<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:14px"><span>${x.ok?'✓ ':''}${x.t}</span><span>${x.v}/${x.m}</span></div><div class="trk2" role="progressbar" aria-label="${x.t}" aria-valuenow="${x.v}" aria-valuemin="0" aria-valuemax="${x.m}"><i style="width:${x.v/x.m*100}%"></i></div></div>`).join('')}</div>`;
 h=h.replace(/<div class="hb">[\s\S]*?<\/div>/g,r=>{const m=r.match(/data-a="tick" data-v="([^"]+)"/),x=m&&me.habits.find(k=>k.id==m[1]);return x&&x.t?r.replace(/<small>⏰ \d\d:\d\d<\/small>/,'<small>'+lab(x)+'</small>'):r});
 return h.replace('<div class="card"><div class="stats">',buzz+'<div class="card"><div class="stats">').replace('<button class="btn sm" data-a="add">Add habit</button>','<label class="tl">Remind me at <input id="ht" type="time" aria-label="Reminder time"></label><button class="btn sm" data-a="add">Add habit</button>')};
meView=function(){const h=_me7();if(!/Profile settings/.test(h))return h;const E=me.badges||[],ts=+localStorage.gc_ts||0;
 const set=`<div class="card"><h2>Sounds and display</h2><label class="sw"><input type="checkbox" id="sn" ${localStorage.gc_snd=='off'?'':'checked'}> Sounds on</label><label class="sw"><input type="checkbox" id="hcb" ${localStorage.gc_hc=='1'?'checked':''}> High contrast</label><label style="margin-top:8px">Text size<select id="tsz">${['Normal','Large','Extra large'].map((o,i)=>`<option value="${i}" ${i==ts?'selected':''}>${o}</option>`).join('')}</select></label><div class="chips" style="margin-top:12px"><button class="pick" data-a="notif">Turn on phone notifications</button><button class="pick" data-a="tsnd">Test sound</button></div></div>`;
 const bd=`<div class="card"><h2>Badges (${E.length}/${BG.length})</h2><div class="bgrid">${BG.map(b=>`<div class="bdgc ${E.includes(b[0])?'on':''}"><b>${E.includes(b[0])?'🏅 ':'🔒 '}${b[1]}</b>${b[2]}</div>`).join('')}</div></div>`;
 return h.replace('<div class="card"><h2>Account</h2>',set+bd+'<div class="card"><h2>Account</h2>')};
const rep={},until={};
function showDue(l){let b=document.getElementById('gcal');if(!l.length){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='gcal';b.setAttribute('role','alert');b.style.cssText='position:fixed;left:12px;right:12px;top:56px;z-index:25;background:#0D0D0D;color:#FFC72C;border-radius:16px;padding:10px 14px;font:600 14px system-ui;box-shadow:0 3px 0 #E5252A';document.body.appendChild(b)}
 b.innerHTML=l.map(h=>`<div style="display:flex;gap:8px;align-items:center;margin:6px 0"><span style="flex:1">⏰ Time to: ${esc(h.name)}</span><button data-a="adone" data-v="${h.id}" style="background:#FFC72C;color:#0D0D0D;border-radius:99px;padding:8px 12px;font:700 13px system-ui">Done</button><button data-a="asnz" data-v="${h.id}" style="color:#FFC72C;border:1px solid #FFC72C;border-radius:99px;padding:8px 12px;font:600 13px system-ui">Snooze 10m</button></div>`).join('')}
function alarm(){if(!me)return;const t=today(),due=[];let ring=false;
 me.habits.forEach(h=>{if(!h.t||h.log[t])return;const late=nowM()-mins(h.t);if(late<0||late>360||(until[h.id]||0)>Date.now())return;due.push(h);
  if((rep[h.id]||0)<=Date.now()){rep[h.id]=Date.now()+6e4;ring=true;if('Notification'in window&&Notification.permission=='granted'){try{navigator.serviceWorker.ready.then(r=>r.showNotification('Grind Colony',{body:'Time to: '+h.name,icon:'logo.jpg',tag:h.id,renotify:true}))}catch(e){}}}});
 if(ring){chime();navigator.vibrate&&navigator.vibrate([200,100,200])}showDue(due)}
setInterval(alarm,1e4);setTimeout(alarm,2e3);
setInterval(()=>{if(me&&view=='hive'&&!document.activeElement.matches('input,textarea,select'))draw()},3e4);
let busy=false;
async function progress(){if(!me||busy)return;let ch=false;const t=today();
 if(quests().every(x=>x.ok)&&!(me.qd||[]).includes(t)){me.qd=(me.qd||[]).concat(t);ch=true}
 const have=me.badges||[],st=stats(),nw=BG.filter(b=>!have.includes(b[0])&&b[3](st));if(nw.length){me.badges=have.concat(nw.map(b=>b[0]));ch=true}
 if(!ch)return;busy=true;try{await API.saveMe(me)}finally{busy=false}
 if(nw.length)badgePop(nw);draw()}
function badgePop(l){const o=document.createElement('div');o.setAttribute('role','alertdialog');o.setAttribute('aria-label','New badge earned');o.style.cssText='position:fixed;inset:0;z-index:35;background:rgba(11,42,91,.85);display:grid;place-items:center;padding:20px';
 o.innerHTML=`<div style="background:#fff;border-radius:20px;padding:24px;text-align:center;max-width:320px"><div style="font-size:54px" aria-hidden="true">🏅</div><h2 style="font-size:22px;margin:6px 0">New badge${l.length>1?'s':''}!</h2><p>${l.map(b=>esc(b[1])).join(', ')}</p><button class="btn" id="bk" style="margin-top:14px">Nice!</button></div>`;
 o.onclick=e=>{if(e.target==o||e.target.id=='bk')o.remove()};document.body.appendChild(o);[0,.15,.3,.45].forEach((t,i)=>tone([523,659,784,1047][i],t,.25,.25));navigator.vibrate&&navigator.vibrate([100,50,100]);document.getElementById('bk').focus()}
function prefs(){document.body.style.zoom=['1','1.2','1.4'][+localStorage.gc_ts||0];document.body.classList.toggle('hc',localStorage.gc_hc=='1')}
function deco(){const tb=document.querySelector('.tb');if(tb&&!tb.querySelector('.tl2')){const i=document.createElement('img');i.src='logo.jpg';i.alt='Grind Colony';i.className='tl2';i.style.cssText='height:30px;width:30px;border-radius:8px;background:#fff;object-fit:contain;flex:none';tb.insertBefore(i,tb.firstChild)}
 const sd=document.querySelector('.side');if(sd){sd.setAttribute('role','navigation');sd.setAttribute('aria-label','Main menu')}
 const nv=document.querySelector('.nv.on');if(nv)nv.setAttribute('aria-current','page');
 document.querySelectorAll('.tick').forEach(x=>x.setAttribute('aria-pressed',x.classList.contains('on')));
 const m=document.querySelector('.mid');if(m){m.setAttribute('role','main');m.id='main'}
 if(!document.getElementById('skip')){const a=document.createElement('a');a.id='skip';a.href='#main';a.textContent='Skip to main content';document.body.prepend(a)}}
const _d9=draw;
draw=function(){if(me)me.habits.forEach(h=>{if(h.t)localStorage['gc_r_'+h.id+'_'+today()]=1});prefs();_d9();if(me){deco();progress()}};
document.addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&e.target.matches&&e.target.matches('[data-a][tabindex]')){e.preventDefault();e.target.click()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="like"],[data-a="cl"],[data-a="tick"]');if(!b)return;
 if(b.dataset.a=='cl'?b.getAttribute('aria-pressed')=='false':!b.classList.contains('on')){pop();navigator.vibrate&&navigator.vibrate(30)}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="add"]');if(!b||!me)return;e.stopPropagation();const n=$('#nh').value.trim();if(!n)return;const t=$('#ht')&&$('#ht').value;
 me.habits.push(Object.assign({id:Date.now()+'',name:n,log:{}},t?{t}:{}));$('#nh').value='';await API.saveMe(me);draw()},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v;
 if(a=='adone'){const h=me.habits.find(x=>x.id==v);if(h){h.log[today()]=1;await API.saveMe(me);draw();alarm()}}
 else if(a=='asnz'){until[v]=Date.now()+6e5;alarm()}
 else if(a=='notif'){if('Notification'in window)Notification.requestPermission().then(()=>alert(Notification.permission=='granted'?'Notifications are on.':'Notifications are blocked. Turn them on in your browser settings for this site.'));else alert('This browser does not support notifications.')}
 else if(a=='tsnd')chime()});
document.addEventListener('change',e=>{const i=e.target.id;if(i=='sn')localStorage.gc_snd=e.target.checked?'on':'off';else if(i=='hcb')localStorage.gc_hc=e.target.checked?'1':'0';else if(i=='tsz')localStorage.gc_ts=e.target.value;else return;prefs()});
if(me){draw()}else if(app.firstChild)draw();
})();
