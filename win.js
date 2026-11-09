(()=>{
document.head.insertAdjacentHTML('beforeend','<style>.hbm{flex:1;min-width:0}.hbm>span{display:block}.hbs{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--mut);margin-top:2px}.hba{display:flex;align-items:center}.hb .x{font-size:20px;min-width:40px;padding:0 4px}.ck{color:#0a8f3c;font-weight:700}.shs3{position:fixed;inset:0;z-index:70;background:rgba(11,42,91,.6);display:flex;align-items:flex-end;justify-content:center}.shc3{background:#fff;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:18px 16px calc(18px + env(safe-area-inset-bottom,0px));display:grid;gap:12px}</style>');
const lvl=()=>Math.floor(Math.sqrt(me.habits.reduce((a,h)=>a+Object.keys(h.log).length,0)*10/50))+1;
function winText(){const t=today(),H=me.habits.filter(h=>h.log[t]),T=(me.tasks||[]).filter(x=>x.done&&x.due==t),all=me.habits.length&&H.length==me.habits.length;
 const items=[...H.map(h=>h.name),...T.map(x=>x.t)].map(x=>x.length>42?x.slice(0,41)+'…':x),shown=items.slice(0,8),more=items.length-shown.length;
 let s=(all?'Day complete! ':'Progress today: ')+H.length+'/'+me.habits.length+' habits done';
 if(shown.length)s+='\n'+shown.map(x=>'✓ '+x).join('\n')+(more>0?'\n+ '+more+' more':'');
 return(s+'\n🔥 '+streak()+'-day streak, Level '+lvl()+'\nCan you beat this? #BuildDaily').slice(0,500)}
globalThis.__winText=winText;
const sure=(title,ok)=>new Promise(res=>{const o=document.createElement('div');o.className='shs3';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.innerHTML=`<div class="shc3"><h2>${esc(title)}</h2><div class="ac"><button class="btn" id="sko">${ok}</button><button class="pick" id="skc">Cancel</button></div></div>`;document.body.appendChild(o);
 const done=x=>{o.remove();res(x)};o.querySelector('#sko').onclick=()=>done(true);o.querySelector('#skc').onclick=()=>done(false);o.onclick=e=>{if(e.target==o)done(false)}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="share"]');if(!b||!me)return;e.stopPropagation();
 const ovl=b.closest('[style*="position:fixed"]');if(ovl)ovl.remove();
 draft=winText();view='colony';flt='all';const t=document.getElementById('d');if(t)t.value=draft;draw();scrollTo(0,0);
 setTimeout(()=>{const x=document.getElementById('d');if(x){x.focus();try{x.setSelectionRange(x.value.length,x.value.length)}catch(e){}}},80);navigator.vibrate&&navigator.vibrate(30)},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="del"]');if(!b||!me)return;e.stopPropagation();const h=me.habits.find(x=>x.id==b.dataset.v);if(!h)return;
 if(!(await sure('Remove “'+h.name+'” and its history?','Remove')))return;me.habits=me.habits.filter(x=>x.id!=h.id);API.saveMe(me);draw()},true);
const _pv17=postView;
postView=function(p){const h=_pv17(p);return h?h.replace(/(<\/header><p>)([\s\S]*?)(<\/p>)/,(m,a,b,c)=>a+b.replace(/(^|\n)✓ /g,'$1<span class="ck">✓</span> ')+c):h};
function fixRows(){document.querySelectorAll('.hb').forEach(r=>{if(r.dataset.fx||!r.querySelector(':scope>.tick'))return;const n=r.querySelector(':scope>span');if(!n)return;r.dataset.fx=1;
 const m=document.createElement('div'),s=document.createElement('div'),a=document.createElement('div');m.className='hbm';s.className='hbs';a.className='hba';
 r.querySelectorAll(':scope>small').forEach(x=>{const q=x.textContent.trim();if(/^\d+d$/.test(q))x.textContent='🔥 '+q.slice(0,-1);s.appendChild(x)});
 r.querySelectorAll(':scope>.x').forEach(x=>a.appendChild(x));m.appendChild(n);m.appendChild(s);r.appendChild(m);r.appendChild(a)})}
const _d17=draw;
draw=function(){_d17();if(me)fixRows()};
if(me){draw()}else if(app.firstChild)draw();
})();
