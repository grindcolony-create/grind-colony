(()=>{
document.head.insertAdjacentHTML('beforeend','<style>.bzs{position:fixed;inset:0;z-index:75;background:rgba(11,42,91,.6);display:flex;align-items:flex-end;justify-content:center}.bzc{background:#fff;width:100%;max-width:520px;max-height:85vh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 16px calc(18px + env(safe-area-inset-bottom,0px));display:grid;gap:12px}.bzt{white-space:pre-wrap;line-height:1.5}</style>');
function sheet(h){const o=document.createElement('div');o.className='bzs';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.innerHTML='<div class="bzc">'+h+'</div>';document.body.appendChild(o);o.onclick=e=>{if(e.target==o)o.remove()};return o}
const ask=(title,ph)=>new Promise(res=>{const o=sheet(`<h2>${esc(title)}</h2><input id="bzi" maxlength="300" placeholder="${esc(ph||'')}" aria-label="${esc(title)}"><div class="ac"><button class="btn" id="bzo">Ask Buzz</button><button class="pick" id="bzc">Cancel</button></div>`),i=o.querySelector('#bzi'),done=v=>{o.remove();res(v)};
 i.focus();o.querySelector('#bzo').onclick=()=>done(i.value.trim()||null);o.querySelector('#bzc').onclick=()=>done(null);i.onkeydown=e=>{if(e.key=='Enter')done(i.value.trim()||null)}});
function useDraft(t){draft=t.slice(0,500);view='colony';flt='all';const d=document.getElementById('d');if(d)d.value=draft;draw();scrollTo(0,0)}
function show(o,k,reply,left){const box=o.firstChild,foot=`<p class="note" style="text-align:left">${left} AI help${left==1?'':'s'} left today.</p><button class="btn" id="bzx">Close</button>`;
 if(k=='habits'){const L=reply.split('\n').map(x=>x.replace(/^[-*\d.)\s]+/,'').trim()).filter(Boolean).slice(0,6);box.innerHTML=`<h2>🐝 Habit ideas</h2>${L.map(x=>`<div class="hb"><span>${esc(x)}</span><button class="pick" data-a="aih" data-v="${esc(x)}">Add</button></div>`).join('')||'<p>Buzz had no ideas this time. Try again.</p>'}${foot}`}
 else if(k=='post'){box.innerHTML=`<h2>🐝 Your post</h2><p class="bzt">${esc(reply)}</p><button class="btn" id="bzp">Use in my post</button>${foot}`;box.querySelector('#bzp').onclick=()=>{o.remove();useDraft(reply)}}
 else box.innerHTML=`<h2>🐝 Buzz says</h2><p class="bzt">${esc(reply)}</p>${foot}`;
 const x=box.querySelector('#bzx');if(x)x.onclick=()=>o.remove()}
const _h19=hiveView;
hiveView=function(){const h=_h19();return h.replace('<div class="card"><div class="stats">',`<div class="card"><h2>🐝 Ask Buzz, your AI helper</h2><p class="note" style="text-align:left;margin:4px 0 10px">Quick help with simple tasks. 20 free helps a day.</p><div class="chips"><button class="pick" data-a="ai" data-v="habits">Turn a goal into habits</button><button class="pick" data-a="ai" data-v="plan">Plan my day</button><button class="pick" data-a="ai" data-v="post">Write my progress post</button><button class="pick" data-a="ai" data-v="ask">Ask a question</button></div></div><div class="card"><div class="stats">`)};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v;
 if(a=='aih'){me.habits.push({id:Date.now()+'-'+Math.random().toString(36).slice(2,6),name:v.slice(0,50),log:{}});API.saveMe(me);b.textContent='Added ✓';b.disabled=true;return}
 if(a!='ai')return;let text='',ctx={};const t=today();
 if(v=='habits'){text=await ask('What do you want to achieve?','e.g. Get fit, pass my exams, grow my shop');if(!text)return}
 else if(v=='ask'){text=await ask('Ask Buzz a quick question','e.g. How do I stop procrastinating?');if(!text)return}
 else if(v=='plan')ctx={habits:me.habits.filter(h=>!h.log[t]).map(h=>({n:h.name,t:h.t||''})).slice(0,12),tasks:(me.tasks||[]).filter(x=>!x.done&&x.due<=t).map(x=>({n:x.t,t:x.time||''})).slice(0,12)};
 else if(v=='post')ctx={done:me.habits.filter(h=>h.log[t]).map(h=>h.name).slice(0,10),streak:streak()};
 const o=sheet('<h2>🐝 Buzz is thinking…</h2><p class="note">This takes a few seconds.</p>');
 try{const tok=await fa.currentUser.getIdToken(),r=await fetch('/api/ai',{method:'POST',headers:{'content-type':'application/json',Authorization:'Bearer '+tok},body:JSON.stringify({task:v,text,ctx})}),d=await r.json();
  if(!r.ok){o.firstChild.innerHTML=`<h2>🐝 Buzz</h2><p>${esc(d.error||'Something went wrong.')}</p><button class="btn" id="bzx">Close</button>`;o.querySelector('#bzx').onclick=()=>o.remove()}
  else show(o,v,d.reply||'',d.left)}catch(x){o.firstChild.innerHTML='<h2>🐝 Buzz</h2><p>Could not reach Buzz. Check your connection and try again.</p><button class="btn" id="bzx">Close</button>';o.querySelector('#bzx').onclick=()=>o.remove()}});
})();
