(()=>{
const FVx=()=>firebase.firestore.FieldValue,TS=()=>FVx().serverTimestamp();
document.head.insertAdjacentHTML('beforeend','<style>.mn{display:inline!important;min-height:0!important;text-decoration:none!important;font-weight:700}.cmt .cin,.rpl .cin{margin-top:6px}</style>');
const CM2={},cu2={},UN={};let rp2=null,hl2=null;
const tmx2=c=>c.ts&&c.ts.toMillis?c.ts.toMillis():Date.now(),norm=s=>s.toLowerCase().replace(/\s+/g,' ').trim(),fa2=id=>posts.find(x=>x.id==id);
function ov(h){const o=document.createElement('div');o.className='ov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.style.cssText='position:fixed;inset:0;z-index:40;background:rgba(11,42,91,.85);display:grid;place-items:center;padding:16px';o.innerHTML='<div class="card" style="max-width:380px;width:100%;max-height:88vh;overflow:auto;display:grid;gap:10px">'+h+'</div>';document.body.appendChild(o);return o}
const go=(a,v,n,t)=>{const b=document.createElement('button');b.dataset.a=a;b.dataset.v=v;if(n)b.dataset.n=n;if(t)b.dataset.t=t;b.style.display='none';document.body.appendChild(b);b.click();b.remove()};
const lk=s=>s.replace(/@([A-Za-z0-9_]{3,20})/g,'<button class="lnk mn" data-a="mn" data-v="$1">@$1</button>');
async function mentions(t){const names=[...new Set((t.match(/@([A-Za-z0-9_]{3,20})/g)||[]).map(x=>x.slice(1).toLowerCase()))].slice(0,5);
 const r=await Promise.all(names.map(async n=>{if(n in UN)return UN[n];try{const s=await fs.doc('usernames/'+n).get();UN[n]=s.exists?s.data().uid:null}catch(e){UN[n]=null}return UN[n]}));return r.filter(Boolean)}
function watchC2(id){if(!LIVE||cu2[id])return;cu2[id]=fs.collection('posts/'+id+'/comments').orderBy('ts').onSnapshot(s=>{CM2[id]=s.docs.map(d=>({id:d.id,...d.data({serverTimestamps:'estimate'})}));if(me)draw()})}
const crow=(p,c,r)=>{const mine=c.uid==me.id,win=Date.now()-tmx2(c)<3e5,own=p.uid==me.id,l=(c.likes||[]).includes(me.id),top=c.parent||c.id,v=p.id+'|'+c.id;
 return`<div class="${r?'rpl':'cmt'}" id="cm-${c.id}" ${hl2==c.id?'style="background:#FFF3C4;border-radius:10px"':''}><button class="lnk mn" data-a="prof" data-v="${esc(c.uid)}" data-n="${esc(c.u)}">@${esc(c.u)}</button>${c.uid==p.uid?' <span class="role">Author</span>':''} ${lk(esc(c.t))}${c.edited?' <small>(edited)</small>':''}<div class="cact"><button class="lnk" data-a="c2l" data-v="${v}" aria-pressed="${l}" aria-label="Like comment">${l?'♥':'♡'} ${(c.likes||[]).length}</button><button class="lnk" data-a="c2r" data-v="${c.id}">Reply</button>${mine&&win?`<button class="lnk" data-a="c2e" data-v="${v}">Edit</button>`:''}${(mine&&win)||own?`<button class="lnk" data-a="c2d" data-v="${v}">Delete</button>`:''}</div>${rp2==c.id?`<div class="cin"><input id="cr${c.id}" maxlength="280" value="@${esc(c.u)} " aria-label="Reply to ${esc(c.u)}"><button class="btn sm" data-a="c2s" data-v="${p.id}|${top}|${c.id}|${esc(c.u)}">Send</button></div>`:''}</div>`};
const cblock=p=>{const A=CM2[p.id]||[];return`<div class="cms" role="region" aria-label="Comments">${(p.comments||[]).map(c=>`<div class="cmt"><b>@${esc(c.u)}</b> ${lk(esc(c.t))}</div>`).join('')}${A.filter(c=>!c.parent).map(c=>crow(p,c)+A.filter(r=>r.parent==c.id).map(r=>crow(p,r,1)).join('')).join('')}<div class="cin"><input id="c${p.id}" maxlength="280" placeholder="Write a comment. Use @username to mention." aria-label="Write a comment"><button class="btn sm" data-a="send2" data-v="${p.id}">Post</button></div></div>`};
const _pv14=postView,_me14=meView,_cv14=colonyView,_al14=alertsView;
postView=function(p){let h=_pv14(p);if(!h)return h;
 h=h.replace(/(<strong role="link"[^>]*data-n="[^"]*"[^>]*>)([^<]*)(<\/strong>)/,'$1@$2$3').replace(/(<\/header><p>)([\s\S]*?)(<\/p>)/,(m,a,b,c)=>a+lk(b)+c);
 if((p.likes||[]).length+(p.reshares||[]).length)h=h.replace(/(<div class="acts">[\s\S]*?)(<\/div>)/,'$1<button class="lnk" data-a="rxl" data-v="'+p.id+'" style="font-size:12px">Who reacted</button>$2');
 if(open[p.id]){watchC2(p.id);h=h.replace(/<div class="cms"[\s\S]*<\/article>/,cblock(p)+'</div></div></article>')}
 return h};
colonyView=function(){return _cv14().replace(/(<b>#\d+<\/b> )([^<@]+)/g,'$1@$2')};
meView=function(){return _me14().replace(/(<div class="pro">[\s\S]*?<h[12]>)([^<@][^<]*)(<\/h[12]>)/,'$1@$2$3')};
const mrow=n=>{const v=esc(n.postId)+'|'+esc(n.cid||'');return`<div class="nt" style="display:block"><div role="button" tabindex="0" data-a="mno" data-v="${v}" style="cursor:pointer">${n.read?'':'<i class="dot" style="display:inline-block;margin-right:8px"></i>'}<b>@${esc(n.fromName)}</b> mentioned you ${n.cid?'in a comment':'in a post'}<br><span class="sm2">“${esc(n.snip||'')}”</span></div><div class="ac"><button class="pick" data-a="mno" data-v="${v}">Open</button><button class="pick" data-a="mnr" data-v="${v}">Reply</button></div></div>`};
alertsView=function(){const o=notes,M=o.filter(n=>n.type=='mention');notes=o.filter(n=>n.type!='mention');let h;try{h=_al14()}finally{notes=o}
 h=h.replace(/<b>([^<]+)<\/b>(?= (?:and \d+ more )?(?:reacted|replied|started|posted|commented))/g,(m,n)=>'<b>'+n.split(', ').map(x=>'@'+x).join(', ')+'</b>').replace(/<b>([^<@][^<]*)<\/b>(?=: )/g,'<b>@$1</b>')
  .replace(/(<button class="pick" data-a="np2" data-v="([^"]+)" data-t="(?:like|comment)">Open post<\/button>)/g,'$1<button class="pick" data-a="rxl" data-v="$2">Who reacted</button>');
 if(M.length)h=h.replace('<h1>Alerts</h1>','<h1>Alerts</h1><div class="card"><h2>Mentions</h2>'+M.sort((a,b)=>b.ts-a.ts).map(mrow).join('')+'</div>');return h};
async function showRx(pid){const p=fa2(pid);if(!p)return;const o=ov('<h2>Reactions</h2><p class="note">Loading…</p>'),box=o.firstChild;o.onclick=e=>{if(e.target==o||e.target.id=='rc'||e.target.closest('[data-a="prof"]'))setTimeout(()=>o.remove(),0)};
 const L=[...(p.likes||[]).map(u=>[u,'♥']),...(p.reshares||[]).map(u=>[u,'⟲'])].slice(0,60);
 const I=await Promise.all(L.map(async([u,s])=>{try{const q=await fs.doc('profiles/'+u).get();return{u,s,n:q.exists?q.data().username:'Member',r:q.exists?q.data().role:''}}catch(e){return{u,s,n:'Member',r:''}}}));
 box.innerHTML=`<h2>Reactions</h2>${I.map(x=>`<div class="hb"><span data-a="prof" data-v="${esc(x.u)}" data-n="${esc(x.n)}" role="button" tabindex="0" style="cursor:pointer"><b>@${esc(x.n)}</b> ${x.s}<br><small>${esc(x.r)}</small></span>${x.u==me.id?'':`<button class="pick" data-a="fol" data-v="${esc(x.u)}">${fl().includes(x.u)?'Following':'Follow'}</button>`}</div>`).join('')||'<p class="note">No reactions yet.</p>'}<button class="btn" id="rc">Close</button>`}
async function addC(pid,t,parent,to){const A=CM2[pid]||[];if(A.some(c=>c.uid==me.id&&norm(c.t)==norm(t))){alert('You already posted that on this post.');return false}
 const d={uid:me.id,u:me.username,t,ts:TS(),likes:[]};if(parent)d.parent=parent;const bt=fs.batch(),ref=fs.collection('posts/'+pid+'/comments').doc(),p=fa2(pid);
 bt.set(ref,d);bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(1)});
 try{await bt.commit()}catch(e){alert('Could not post. Check your connection and try again.');return false}
 const sent=new Set([me.id]),ps=[],snd=(u,type)=>{if(!u||sent.has(u))return;sent.add(u);ps.push(Promise.resolve(API.note({to:u,from:me.id,fromName:me.username,type,postId:pid,cid:ref.id,snip:t.slice(0,80),ts:Date.now(),read:false})))};
 try{(await mentions(t)).forEach(u=>snd(u,'mention'))}catch(e){}
 if(to)snd(to,'reply');if(p)snd(p.uid,'comment');
 Promise.allSettled(ps).then(r=>{if(r.some(x=>x.status=='rejected'))alert('Some alerts could not be sent. Check the Firebase rules.')});return true}
async function fanout(pid,p){const sent=new Set([me.id]),ps=[],txt=(p.text||'').slice(0,80);
 try{(await mentions(p.text||'')).forEach(u=>{sent.add(u);ps.push(Promise.resolve(API.note({to:u,from:me.id,fromName:me.username,type:'mention',postId:pid,snip:txt,ts:Date.now(),read:false})))})}catch(e){}
 try{const s=await fs.collection('subs').where('a','==',me.id).limit(200).get();s.docs.forEach(d=>{const u=d.data().s;if(sent.has(u))return;sent.add(u);ps.push(Promise.resolve(API.note({to:u,from:me.id,fromName:me.username,type:'post',postId:pid,snip:txt,ts:Date.now(),read:false})))})}catch(e){alert('Post alerts could not be sent. Check the Firebase rules.')}
 Promise.allSettled(ps).then(r=>{if(r.some(x=>x.status=='rejected'))alert('Some post alerts could not be sent. Check the Firebase rules.')})}
if(LIVE)API.add=async p=>{const r=await fs.collection('posts').add(p);if(p.uid==me.id&&!p.via&&r&&r.id)fanout(r.id,p);return r};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v;
 if(a=='cm'&&open[v])watchC2(v);
 else if(a=='rxl')showRx(v);
 else if(a=='mn'){const u=(await mentions('@'+v))[0];if(!u)return alert('No member named @'+v+'.');go('prof',u,v)}
 else if(a=='send2'){const i=document.getElementById('c'+v),t=i?i.value.trim().slice(0,280):'';if(!t)return;i.value='';if(!(await addC(v,t,null,null))){const x=document.getElementById('c'+v);if(x)x.value=t}}
 else if(a=='c2r'){rp2=rp2==v?null:v;draw();setTimeout(()=>{const i=document.getElementById('cr'+v);if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},50)}
 else if(a=='c2s'){const[pid,top,cid,nm]=v.split('|'),i=document.getElementById('cr'+cid),t=i?i.value.trim().slice(0,280):'';if(!t||t=='@'+nm)return;const c=(CM2[pid]||[]).find(x=>x.id==cid);if(await addC(pid,t,top,c?c.uid:null)){rp2=null;draw()}}
 else if(a=='c2l'){const[pid,cid]=v.split('|'),c=(CM2[pid]||[]).find(x=>x.id==cid);if(!c)return;const on=(c.likes||[]).includes(me.id);c.likes=on?(c.likes||[]).filter(x=>x!=me.id):(c.likes||[]).concat(me.id);draw();fs.doc('posts/'+pid+'/comments/'+cid).update({likes:on?FVx().arrayRemove(me.id):FVx().arrayUnion(me.id)}).catch(()=>alert('Could not like that comment.'))}
 else if(a=='c2e'){const[pid,cid]=v.split('|'),c=(CM2[pid]||[]).find(x=>x.id==cid);if(!c)return;const t=prompt('Edit your comment',c.t);if(t&&t.trim()&&t.trim()!=c.t){try{await fs.doc('posts/'+pid+'/comments/'+cid).update({t:t.trim().slice(0,280),edited:true})}catch(x){alert('Could not edit. The 5-minute window may have passed.')}}}
 else if(a=='c2d'){const[pid,cid]=v.split('|');if(!confirm('Delete this comment?'))return;const bt=fs.batch();bt.delete(fs.doc('posts/'+pid+'/comments/'+cid));bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(-1)});try{await bt.commit()}catch(x){alert('Could not delete. The 5-minute window may have passed.')}}
 else if(a=='mno'||a=='mnr'){const[pid,cid]=v.split('|');hl2=cid||null;rp2=a=='mnr'&&cid?cid:null;go('np2',pid,'',cid?'comment':'post');let k=0;const t=setInterval(()=>{const x=document.getElementById('cm-'+cid),i=document.getElementById('cr'+cid);if(x||k++>8){clearInterval(t);if(x)x.scrollIntoView({block:'center'});if(i)i.focus()}},400)}});
if(typeof MutationObserver!='undefined')new MutationObserver(()=>document.querySelectorAll('.ov .hb [data-a="prof"] b:not([data-at])').forEach(b=>{b.dataset.at=1;if(!b.textContent.startsWith('@'))b.textContent='@'+b.textContent})).observe(document.body,{childList:true,subtree:true});
if(me){start();draw()}else if(app.firstChild)draw();
})();
