(()=>{
document.head.insertAdjacentHTML('beforeend','<style>#app:empty{min-height:100vh;display:grid;place-items:center}#app:empty::before{content:"";width:46px;height:52px;background:var(--yel);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);animation:gcp 1s ease-in-out infinite alternate}@keyframes gcp{to{transform:scale(.7);opacity:.5}}#app.has-tb{padding-top:46px}.tb{position:fixed;top:0;left:0;right:0;height:46px;z-index:15;background:var(--navy);color:#fff;padding:0 14px;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600}.tb>button{color:#fff;font-weight:600;font-size:14px;white-space:nowrap}.trk{flex:1;height:8px;border-radius:6px;background:rgba(255,255,255,.25);overflow:hidden}.trk i{display:block;height:100%;background:var(--yel)}.tp{position:absolute;left:0;right:0;top:100%;background:#fff;color:var(--navy);padding:6px 14px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2);max-height:60vh;overflow:auto;font-weight:400}.fab{position:fixed;right:16px;bottom:80px;width:54px;height:54px;border-radius:50%;background:var(--ink);color:var(--yel);font-size:30px;line-height:1;box-shadow:0 3px 0 var(--red);z-index:6}.nv{display:flex;flex-direction:column;align-items:center;gap:2px;position:relative}.nv span{font-size:11px}.bdg{position:absolute;top:0;right:18%;background:var(--red);color:#fff;border-radius:999px;font:700 10px/1 system-ui;padding:3px 5px;font-style:normal}@media(min-width:901px){.nv{flex-direction:row;gap:12px}.nv span{font-size:18px}.bdg{position:static;margin-left:auto}.has-tb .side,.has-tb .rail{top:46px}.has-tb .side{height:calc(100vh - 46px)}.fab{display:none}}</style>');
const IC={colony:'<path d="M4 5h16v11H9l-5 4z"/>',hive:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/>',money:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-2 5-2 5 0s-5 1.5-5 3.5 5 2 5 0"/>',alerts:'<path d="M6 17v-6a6 6 0 0112 0v6l2 2H4zM10 21h4"/>',me:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
const svg=k=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
streak=function(){if(!me.habits.length)return 0;let n=0,miss=[],i=done(today())?0:1;for(;i<400;i++){if(done(back(i)))n++;else{if(miss.some(m=>i-m<7))break;miss.push(i)}}return n};
const lv=()=>{const p=me.habits.reduce((a,h)=>a+Object.keys(h.log).length,0)*10,l=Math.floor(Math.sqrt(p/50))+1;return{p,l,nx:50*l*l}};
function best(){const s=new Set();me.habits.forEach(h=>Object.keys(h.log).forEach(k=>s.add(k)));const a=[...s].sort();let b=0,c=0,p=null;a.forEach(k=>{const t=Date.parse(k);c=p!==null&&t-p==864e5?c+1:1;p=t;if(c>b)b=c});return b}
const _h3=hiveView,_me3=meView;
hiveView=function(){const h=_h3(),n=me.habits.length,from=back(6);let t=0,E=0,S=0;for(let i=0;i<7;i++)t+=done(back(i));
 mo().tx.forEach(x=>{if(x.d<from)return;const v=cv(x.a,x.c,mo().base);if(v==null)return;x.t=='in'?E+=v:S+=v});
 const card=`<div class="card"><h2>Your last 7 days</h2><div class="stats sm" style="margin-top:10px"><div><b>${n?Math.round(t/(n*7)*100):0}%</b><span>habits done</span></div><div><b>${fmt(E,mo().base)}</b><span>earned</span></div><div><b>${fmt(S,mo().base)}</b><span>spent</span></div></div></div>`;
 return h.replace('<div class="card"><h2>Habit calendar</h2>',card+'<div class="card"><h2>Habit calendar</h2>')};
meView=function(){const b=best(),B=[7,30,100].map(d=>`<span class="role" style="${b>=d?'background:var(--yel);color:var(--ink)':'opacity:.45'}">${d}-day badge</span>`).join(' ');
 return _me3().replace('</h1>','</h1><p style="margin:6px 0">'+B+'</p><p class="note" style="text-align:left">Best run: '+b+' days. Level '+lv().l+', '+lv().p+' points.</p>')};
let tbo=false;
function party(){const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:30;background:rgba(11,42,91,.85);display:grid;place-items:center;padding:20px';
 o.innerHTML=`<div style="background:#fff;border-radius:20px;padding:24px;text-align:center;max-width:320px"><div style="font-size:54px">🔥</div><h2 style="font-size:22px;margin:6px 0">Day complete!</h2><p>${streak()}-day streak. Level ${lv().l}.</p><button class="btn" data-a="share" style="margin:14px 0 8px">Share my win</button><br><button class="lnk" id="pc">Close</button></div>`;
 o.onclick=e=>{if(e.target==o||e.target.id=='pc'||e.target.dataset.a=='share')o.remove()};document.body.appendChild(o);navigator.vibrate&&navigator.vibrate([120,60,120])}
const _d3=draw;
draw=function(){_d3();document.getElementById('app').classList.toggle('has-tb',!!me);document.querySelectorAll('.tb,.fab').forEach(x=>x.remove());if(!me)return;
 const n=me.habits.length,d=done(today()),L=lv(),t=today(),b=document.createElement('div');b.className='tb';
 b.innerHTML=`<button data-a="tbo">Today ${d}/${n} ▾</button><span class="trk"><i style="width:${n?Math.round(d/n*100):0}%"></i></span><span>🔥 ${streak()}</span><span>Lv ${L.l}</span>${tbo?`<div class="tp">${n?me.habits.map(h=>`<div class="hb"><button class="tick ${h.log[t]?'on':''}" data-a="tick" data-v="${h.id}" aria-label="Mark ${esc(h.name)} done"></button><span>${esc(h.name)}</span></div>`).join(''):'<p class="note">Add habits in My hive.</p>'}<small style="color:var(--mut)">${L.p} points. Next level at ${L.nx}.</small></div>`:''}`;
 document.body.appendChild(b);
 document.querySelectorAll('.nv').forEach(x=>{const m=x.textContent.match(/\((\d+)\)/);x.innerHTML=svg(x.dataset.v)+'<span>'+x.textContent.replace(/\s*\(\d+\)/,'')+'</span>'+(m?'<em class="bdg">'+m[1]+'</em>':'')});
 if(view=='colony'){const f=document.createElement('button');f.className='fab';f.dataset.a='fab';f.setAttribute('aria-label','New post');f.textContent='+';document.body.appendChild(f)}
 if(n&&d==n&&localStorage.gc_cel!=t){localStorage.gc_cel=t;party()}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="go"]');if(b&&mode=='up'&&$('#p').value.length<8){e.stopPropagation();const r=$('.err');if(r)r.textContent='Password needs at least 8 characters.'}},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;
 if(b.dataset.a=='tbo'){tbo=!tbo;draw()}
 else if(b.dataset.a=='fab'){scrollTo({top:0,behavior:'smooth'});const x=document.getElementById('d');if(x)x.focus()}});
addEventListener('offline',()=>alert('You are offline. Your changes will not save until you reconnect.'));
if(me){start();draw()}else if(app.firstChild)draw();
})();
