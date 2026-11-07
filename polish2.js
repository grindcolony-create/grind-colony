(()=>{
const FVx=()=>firebase.firestore.FieldValue;
document.head.insertAdjacentHTML('beforeend','<style>.shs{position:fixed;inset:0;z-index:70;background:rgba(11,42,91,.6);display:flex;align-items:flex-end;justify-content:center}.shc{background:#fff;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:18px 16px calc(18px + env(safe-area-inset-bottom,0px));display:grid;gap:12px;animation:shu .2s ease}@keyframes shu{from{transform:translateY(40px);opacity:0}}.nb{background:var(--navy);color:#fff;border-radius:14px;padding:10px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}.nb span{flex:1}.nb.red{background:var(--red)}.ic{vertical-align:-3px}</style>');
function sheet(h){const o=document.createElement('div');o.className='shs';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.innerHTML='<div class="shc">'+h+'</div>';document.body.appendChild(o);return o}
const ask=(title,v)=>new Promise(res=>{v=v||{};const o=sheet(`<h2>${esc(title)}</h2><input id="skv" maxlength="280" value="${esc(v.value||'')}" aria-label="${esc(title)}" ${v.num?'type="number" inputmode="decimal"':''}><div class="ac"><button class="btn" id="sko">${v.ok||'Send'}</button><button class="pick" id="skc">Cancel</button></div>`),i=o.querySelector('#skv'),done=x=>{o.remove();res(x)};
 i.focus();try{i.setSelectionRange(i.value.length,i.value.length)}catch(e){}
 o.querySelector('#sko').onclick=()=>done(i.value.trim()||null);o.querySelector('#skc').onclick=()=>done(null);o.onclick=e=>{if(e.target==o)done(null)};i.onkeydown=e=>{if(e.key=='Enter'){e.preventDefault();done(i.value.trim()||null)}}});
const sure=(title,ok)=>new Promise(res=>{const o=sheet(`<h2>${esc(title)}</h2><div class="ac"><button class="btn" id="sko">${ok||'Delete'}</button><button class="pick" id="skc">Cancel</button></div>`),done=x=>{o.remove();res(x)};
 o.querySelector('#sko').onclick=()=>done(true);o.querySelector('#skc').onclick=()=>done(false);o.onclick=e=>{if(e.target==o)done(false)}});
const on=(sel,fn)=>document.addEventListener('click',e=>{const b=e.target.closest('[data-a="'+sel+'"]');if(!b||!me)return;e.stopPropagation();fn(b,b.dataset.v)},true);
on('nr2',async(b,v)=>{const[pid,cid,nm]=v.split('|'),t=await ask('Reply to @'+nm,{value:'@'+nm+' ',ok:'Send reply'});if(!t||t=='@'+nm)return;
 try{const c=await fs.doc('posts/'+pid+'/comments/'+cid).get(),cd=c.exists?c.data():null,bt=fs.batch(),ref=fs.collection('posts/'+pid+'/comments').doc();
  bt.set(ref,{uid:me.id,u:me.username,t:t.slice(0,280),ts:FVx().serverTimestamp(),likes:[],parent:(cd&&cd.parent)||cid});bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(1)});await bt.commit();
  if(cd&&cd.uid!=me.id)API.note({to:cd.uid,from:me.id,fromName:me.username,type:'reply',postId:pid,cid:ref.id,snip:t.slice(0,80),ts:Date.now(),read:false});alert('Reply sent.')}catch(x){alert('Could not send the reply.')}});
on('c2e',async(b,v)=>{const[pid,cid]=v.split('|');try{const c=(await fs.doc('posts/'+pid+'/comments/'+cid).get()).data(),t=await ask('Edit your comment',{value:c.t,ok:'Save'});if(t&&t!=c.t)await fs.doc('posts/'+pid+'/comments/'+cid).update({t:t.slice(0,280),edited:true})}catch(x){alert('Could not edit. The 5-minute window may have passed.')}});
on('c2d',async(b,v)=>{const[pid,cid]=v.split('|');if(!(await sure('Delete this comment?')))return;const bt=fs.batch();bt.delete(fs.doc('posts/'+pid+'/comments/'+cid));bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(-1)});try{await bt.commit()}catch(x){alert('Could not delete. The 5-minute window may have passed.')}});
on('dp',async(b,v)=>{const p=posts.find(x=>x.id==v);if(p&&Date.now()-p.ts>864e5)return alert('Posts can only be deleted within 24 hours.');if(!(await sure('Delete this post?')))return;try{await fs.doc('posts/'+v).delete()}catch(x){alert('Could not delete this post.')}});
on('gset',async()=>{const n=await ask('Name your goal',{value:'',ok:'Next'});if(!n)return;const t=await ask('Target amount in '+mo().base,{value:'',ok:'Save goal',num:true}),x=parseFloat(t);if(x>0){me.goal={name:n.slice(0,40),target:x};API.saveMe(me);draw()}});
on('rpt',async(b,v)=>{const p=posts.find(x=>x.id==v),r=await ask('Why are you reporting this post?',{value:'',ok:'Report'});if(!r)return;
 try{await fs.collection('reports').add({by:me.id,pid:v,puid:p?p.uid:'',reason:r.slice(0,200),ts:Date.now()});alert('Thank you. We will review it.');if(p&&await sure('Also block this person?','Block')){me.blocked=(me.blocked||[]).concat(p.uid);API.saveMe(me);draw()}}catch(x){alert('Could not send the report. Try again.')}});
const IC='<svg class="ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 013-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 01-3 3H3"/></svg>';
const icons=()=>document.querySelectorAll('.a.rs,.rx span,.ov .hb span').forEach(el=>{if(el.innerHTML.indexOf('⟲')>-1)el.innerHTML=el.innerHTML.replace('⟲',IC)});
async function check(){const o=sheet('<h2>App check</h2><p class="note">Checking files…</p>'),box=o.firstChild;let html='';try{html=await(await fetch('index.html?'+Date.now())).text()}catch(e){}
 const F=['pwa.js','roles.js','extras.js','polish.js','v2.js','habits.js','grow.js','pro.js','home.js','compete.js','social.js','polish2.js','sw.js','manifest.webmanifest','icon-192.png','icon-512.png','logo.jpg'];
 const R=await Promise.all(F.map(async f=>{let st='ok',msg='';try{const r=await fetch(f+'?'+Date.now()),ct=r.headers.get('content-type')||'';if(!r.ok||/text\/html/.test(ct)){st='bad';msg='file is missing'}else if(/\.js$/.test(f)){const t=await r.text();try{new Function(t)}catch(e){st='bad';msg='has an error: '+e.message}}}catch(e){st='bad';msg='could not load'}
  if(st=='ok'&&/\.js$/.test(f)&&f!='sw.js'&&!html.includes('src="'+f+'"')){st='bad';msg='not added to index.html'}return{f,st,msg}}));
 box.innerHTML=`<h2>App check</h2>${R.map(x=>`<div class="hb"><span>${x.st=='ok'?'✓':'✗'} ${esc(x.f)}</span><small>${esc(x.msg||'ok')}</small></div>`).join('')}<p class="note">${R.some(x=>x.st!='ok')?'Fix the files marked ✗, then refresh the app.':'Everything is in place.'}</p><button class="btn" id="skc">Close</button>`;
 o.onclick=e=>{if(e.target==o||e.target.id=='skc')o.remove()}}
const _c15=colonyView,_me15=meView,_d15=draw;
colonyView=function(){let s='';const un=notes.filter(n=>!n.read).length;
 if(un)s+=`<div class="nb red"><span><b>${un} new alert${un>1?'s':''}</b><br><small>See who reacted, replied or followed you.</small></span><button class="btn sm" data-a="view" data-v="alerts">Open</button></div>`;
 if(!me.habits.length)s+=`<div class="nb"><span><b>Start your hive</b><br><small>Add one habit and begin your streak.</small></span><button class="btn sm" data-a="view" data-v="hive">Add habit</button></div>`;
 return s+_c15()};
meView=function(){return _me15().replace('<div class="card"><h2>Account</h2>','<div class="card"><h2>App check</h2><p class="note" style="text-align:left;margin:6px 0">Checks that every part of the app is installed correctly.</p><button class="pick" data-a="chk">Run app check</button></div><div class="card"><h2>Account</h2>')};
document.addEventListener('click',e=>{if(e.target.closest('[data-a="chk"]'))check()});
draw=function(){_d15();if(me)icons()};
if(me){draw()}else if(app.firstChild)draw();
})();
