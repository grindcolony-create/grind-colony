(()=>{
const okImg=s=>typeof s=='string'&&/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+\/=]+$/.test(s);
const FVx=()=>firebase.firestore.FieldValue,TS=()=>FVx().serverTimestamp();
let pf=null,pback='colony',UP=[],tm0;const PR={},CM={},cu={},need=new Set();
document.head.insertAdjacentHTML('beforeend','<style>.cmt,.rpl{padding:6px 0;font-size:15px}.rpl{margin-left:22px;border-left:2px solid var(--line);padding-left:10px}.cact{display:flex;gap:14px;flex-wrap:wrap}.cact .lnk{text-decoration:none;font-size:13px;min-height:32px}.tabs2{overflow-x:auto}.tabs2 button{white-space:nowrap}</style>');
const findP=id=>posts.find(x=>x.id==id)||UP.find(x=>x.id==id);
const later=()=>{clearTimeout(tm0);tm0=setTimeout(()=>{if(me)draw()},150)};
function fetchPR(l){l.forEach(p=>{const u=p.uid;if(u&&!(u in PR)&&!need.has(u)){need.add(u);fs.doc('profiles/'+u).get().then(s=>{PR[u]=s.exists?s.data():{};need.delete(u);later()}).catch(()=>{PR[u]={};need.delete(u)})}})}
if(LIVE){
 API.watch=cb=>fs.collection('posts').orderBy('ts','desc').limit(40).onSnapshot(s=>{const l=s.docs.map(d=>({id:d.id,...d.data()}));cb(l.concat(UP.filter(u=>!l.some(x=>x.id==u.id))));fetchPR(l);if(me&&view!='hive'&&document.activeElement.matches('input,textarea'))draw()});
 const _pt=API.patch;
 API.patch=(id,op)=>{const f=FVx();
  if(op.k=='r')return fs.doc('posts/'+id).update({reshares:f.arrayUnion(op.uid),['rsAt.'+op.uid]:Date.now()});
  if(op.k=='ur')return fs.doc('posts/'+id).update({reshares:f.arrayRemove(op.uid),['rsAt.'+op.uid]:f.delete()});
  return _pt(id,op)};
}
function watchCm(id){if(!LIVE||cu[id])return;cu[id]=fs.collection('posts/'+id+'/comments').orderBy('ts').onSnapshot(s=>{CM[id]=s.docs.map(d=>({id:d.id,...d.data({serverTimestamps:'estimate'})}));if(me)draw()})}
const tmo=c=>c.ts&&c.ts.toMillis?c.ts.toMillis():Date.now();
const cmBlock=p=>{const A=CM[p.id]||[],own=p.uid==me.id,
 row=(c,r)=>{const mine=c.uid==me.id,win=Date.now()-tmo(c)<3e5,lk=(c.likes||[]).includes(me.id),v=p.id+'|'+c.id;
  return`<div class="${r?'rpl':'cmt'}"><b>${esc(c.u)}</b>${c.uid==p.uid?' <span class="role">Author</span>':''} ${esc(c.t)}${c.edited?' <small>(edited)</small>':''}<div class="cact"><button class="lnk" data-a="cl" data-v="${v}" aria-pressed="${lk}" aria-label="Like comment">${lk?'♥':'♡'} ${(c.likes||[]).length}</button>${own&&!r?`<button class="lnk" data-a="cr" data-v="${v}">Reply</button>`:''}${mine&&win?`<button class="lnk" data-a="ce" data-v="${v}">Edit</button>`:''}${(mine&&win)||own?`<button class="lnk" data-a="cd" data-v="${v}">Delete</button>`:''}</div></div>`};
 return`<div class="cms" role="region" aria-label="Comments">${(p.comments||[]).map(c=>`<div class="cmt"><b>${esc(c.u)}</b> ${esc(c.t)}</div>`).join('')}${A.filter(c=>!c.parent).map(c=>row(c)+A.filter(r=>r.parent==c.id).map(r=>row(r,1)).join('')).join('')}<div class="cin"><input id="c${p.id}" maxlength="280" placeholder="Write a comment" aria-label="Write a comment"><button class="btn sm" data-a="send" data-v="${p.id}">Post</button></div></div>`};
const _pv4=postView;
postView=function(p){if(p.via)return'';const pr=PR[p.uid],ph=pr?(okImg(pr.photo)?pr.photo:''):(okImg(p.ph)?p.ph:'');p={...p,imgs:(p.imgs||[]).filter(okImg),ph};
 let h=_pv4(p);const tot=(p.comments||[]).length+(p.cc||0);
 h=h.replace(/(data-a="cm" data-v="[^"]+">Comment )\d+/,'$1'+tot);
 h=h.replace('<strong>'+esc(p.username)+'</strong>',`<strong role="link" tabindex="0" data-a="prof" data-v="${p.uid}" data-n="${esc(p.username)}" style="cursor:pointer">${esc(p.username)}</strong>`);
 if(Date.now()-p.ts>864e5)h=h.replace(/<button class="fol" data-a="dp"[^>]*>Delete<\/button>/,'');
 const t=p.rsAt&&p.rsAt[me.id],left=t?3e5-(Date.now()-t):0;
 if((p.reshares||[]).includes(me.id)&&left>0)h=h.replace(/(<button class="a rs[^"]*" data-a="rs"[^>]*>[^<]*<\/button>)/,'$1<button class="a" data-a="ursh" data-v="'+p.id+'">Undo ('+Math.ceil(left/6e4)+'m)</button>');
 if(open[p.id])h=h.replace(/<div class="cms">[\s\S]*<\/article>/,cmBlock(p)+'</div></div></article>');
 return h};
alertsView=function(){const T={like:'liked your post',reshare:'reposted your post',comment:'commented on your post',reply:'replied to your comment',follow:'started following you'},a=[...notes].sort((x,y)=>y.ts-x.ts);
 return`<h1>Alerts</h1><div class="card">${a.length?a.map(n=>`<div class="nt" role="button" tabindex="0" data-a="prof" data-v="${esc(n.from)}" data-n="${esc(n.fromName)}" style="cursor:pointer">${n.read?'':'<i class="dot"></i>'}<span style="flex:1"><b>${esc(n.fromName)}</b> ${T[n.type]||'sent an alert'}</span><time>${ago(n.ts)}</time></div>`).join(''):'<p class="empty">No alerts yet. Likes, reposts, comments and new followers show up here.</p>'}</div>`};
const _cv6=colonyView;
colonyView=function(){const f=flt,o=posts;
 if(f=='path')posts=o.filter(p=>p.role==me.role&&p.uid!=me.id&&!p.via);
 else if(f=='mine')posts=o.filter(p=>!p.via&&(p.uid==me.id||(p.reshares||[]).includes(me.id)));
 flt='all';let h;try{h=_cv6()}finally{flt=f;posts=o}
 const T=[['all','For you'],['fol','Following'],['path',me.role+'s'],['mine','My activity']];
 return h.replace(/<div class="tabs2">[\s\S]*?<\/div>/,`<div class="tabs2" role="tablist">${T.map(([k,t])=>`<button role="tab" aria-selected="${f==k}" class="${f==k?'on':''}" data-a="flt" data-v="${k}">${t}</button>`).join('')}</div>`)};
meView=function(){
 if(view=='user'&&pf){const pr=PR[pf.id]||{},nm=pr.username||pf.name||'User',ps=UP.filter(x=>x.uid==pf.id).sort((a,b)=>b.ts-a.ts);
  return`<button class="lnk" data-a="pback">‹ Back</button><div class="card"><div class="pro">${av(nm,okImg(pr.photo)?pr.photo:'','big')}<div><h1>${esc(nm)}</h1>${pr.role?`<span class="role">${esc(pr.role)}</span>`:''}</div></div><div style="margin-top:12px">${pf.id==me.id?'<p class="note" style="text-align:left">This is you.</p>':`<button class="fol ${fl().includes(pf.id)?'on':''}" data-a="fol" data-v="${pf.id}">${fl().includes(pf.id)?'Following':'Follow'}</button>`}</div></div>${ps.length?ps.map(postView).join(''):'<p class="empty">No posts yet.</p>'}`}
 const pub=me.photoPublic!==false;
 return`<h1>Profile settings</h1><div class="card"><div class="pro">${av(me.username,me.photo,'big')}<div><h2>${esc(me.username)}</h2><span class="role">${esc(me.role)}</span></div></div><p style="margin:12px 0"><label class="pick" style="display:inline-block">${me.photo?'Change photo':'Add profile photo'}<input id="pf" type="file" accept="image/*" hidden></label></p>${me.photo?`<p class="note" style="text-align:left;margin-bottom:8px">Your photo is ${pub?'visible to everyone':'visible only to you'}.</p><button class="pick" data-a="ppub">${pub?'Make it private':'Make it public'}</button>`:''}</div><div class="card"><label>My path<select id="rp">${ROLES.map(r=>`<option ${r==me.role?'selected':''}>${r}</option>`).join('')}</select></label><p class="note" style="text-align:left;margin-top:8px">Following ${fl().length} people.</p></div><div class="card"><h2>Account</h2><button class="btn sm" data-a="out" style="margin-top:10px">Sign out</button></div>`};
function loadProf(v){
 if(!PR[v])fs.doc('profiles/'+v).get().then(s=>{PR[v]=s.exists?s.data():{};if(view=='user')draw()}).catch(()=>{PR[v]={}});
 fs.collection('posts').where('uid','==',v).limit(30).get().then(s=>{const n=s.docs.map(d=>({id:d.id,...d.data()}));UP=UP.filter(x=>x.uid!=v).concat(n);posts=posts.filter(x=>!n.some(y=>y.id==x.id)).concat(n);if(view=='user')draw()}).catch(()=>{})}
function syncProf(){if(!me||!LIVE)return;const o={username:me.username,role:me.role,photo:me.photoPublic===false?'':(me.photo||'')},k='gc_pf_'+me.id,s=JSON.stringify(o);if(localStorage[k]==s)return;localStorage[k]=s;fs.doc('profiles/'+me.id).set(o).catch(()=>{delete localStorage[k]})}
const _d5=draw;draw=function(){_d5();syncProf()};
function postC(id,t,parent){const d={uid:me.id,u:me.username,t,ts:TS(),likes:[]};if(parent)d.parent=parent;const bt=fs.batch();
 bt.set(fs.collection('posts/'+id+'/comments').doc(),d);bt.update(fs.doc('posts/'+id),{cc:FVx().increment(1)});
 return bt.commit().then(()=>true).catch(()=>{alert('Could not post. Check your connection and try again.');return false})}
const norm=s=>s.toLowerCase().replace(/\s+/g,' ').trim();
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="dp"]');if(!b)return;const p=findP(b.dataset.v);if(p&&Date.now()-p.ts>864e5){e.stopPropagation();alert('Posts can only be deleted within 24 hours.')}},true);
document.addEventListener('click',e=>{if(e.target.closest('[data-a="post"]')&&me){const ph=me.photo;me.photo='';setTimeout(()=>{me.photo=ph},0)}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="send"]');if(!b)return;e.stopPropagation();
 const id=b.dataset.v,i=document.getElementById('c'+id),t=i?i.value.trim().slice(0,280):'';if(!t)return;
 if((CM[id]||[]).some(c=>c.uid==me.id&&!c.parent&&norm(c.t)==norm(t)))return alert('You already posted that comment on this post.');
 i.value='';const p=findP(id);if(await postC(id,t)){if(p&&p.uid!=me.id)ping(p,'comment')}else{const x=document.getElementById('c'+id);if(x)x.value=t}},true);
document.addEventListener('change',async e=>{if(e.target.id!='pf')return;e.stopPropagation();const f=e.target.files[0];if(!f)return;const d=await img(f,200);
 const o=document.createElement('div');o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','New profile photo');o.style.cssText='position:fixed;inset:0;z-index:40;background:rgba(11,42,91,.85);display:grid;place-items:center;padding:16px';
 o.innerHTML=`<div class="card" style="max-width:340px;width:100%;display:grid;gap:12px;text-align:center"><img src="${d}" alt="Preview of your new photo" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin:auto"><h2>Who can see this photo?</h2><label style="display:flex;gap:8px;align-items:center"><input type="radio" name="vis" value="1" checked style="width:auto"> Everyone</label><label style="display:flex;gap:8px;align-items:center"><input type="radio" name="vis" value="0" style="width:auto"> Only me</label><label id="pp" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pq" style="width:auto"> Also post about my new photo</label><button class="btn" id="ps">Save photo</button><button class="lnk" id="px" style="justify-self:center">Cancel</button></div>`;
 document.body.appendChild(o);const vis=()=>o.querySelector('input[name=vis]:checked').value=='1';
 o.addEventListener('change',()=>{o.querySelector('#pp').style.display=vis()?'flex':'none'});
 o.querySelector('#px').onclick=()=>o.remove();
 o.querySelector('#ps').onclick=async()=>{const pub=vis(),pq=o.querySelector('#pq').checked&&pub;me.photo=d;me.photoPublic=pub;o.remove();await API.saveMe(me);
  if(pq)await API.add({uid:me.id,username:me.username,role:me.role,ph:'',text:'I just updated my profile photo!',imgs:[d],ts:Date.now(),likes:[],reshares:[],comments:[]});draw()}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v,[pid,cid]=(v||'').split('|'),c=(CM[pid]||[]).find(x=>x.id==cid);
 if(a=='prof'){if(view=='alerts')mark();if(view!='user')pback=view;pf={id:v,name:b.dataset.n};view='user';scrollTo(0,0);draw();loadProf(v)}
 else if(a=='pback'){view=pback;draw()}
 else if(a=='ppub'){me.photoPublic=me.photoPublic===false;await API.saveMe(me);draw()}
 else if(a=='cm'&&open[v])watchCm(v)
 else if(a=='ursh'){const p=findP(v);if(!p)return;p.reshares=(p.reshares||[]).filter(x=>x!=me.id);if(p.rsAt)delete p.rsAt[me.id];draw();try{await API.patch(v,{k:'ur',uid:me.id})}catch(x){alert('The 5-minute undo window has passed.')}}
 else if(a=='cl'&&c){const on=(c.likes||[]).includes(me.id);fs.doc('posts/'+pid+'/comments/'+cid).update({likes:on?FVx().arrayRemove(me.id):FVx().arrayUnion(me.id)}).catch(()=>alert('Could not like that comment.'))}
 else if(a=='cr'&&c){const t=prompt('Reply to '+c.u);if(t&&t.trim()){if(await postC(pid,t.trim().slice(0,280),cid)&&c.uid!=me.id)API.note({to:c.uid,from:me.id,fromName:me.username,type:'reply',postId:pid,ts:Date.now(),read:false})}}
 else if(a=='ce'&&c){const t=prompt('Edit your comment',c.t);if(t&&t.trim()&&t.trim()!=c.t){try{await fs.doc('posts/'+pid+'/comments/'+cid).update({t:t.trim().slice(0,280),edited:true})}catch(x){alert('Could not edit. The 5-minute window may have passed.')}}}
 else if(a=='cd'&&c){if(!confirm('Delete this comment?'))return;const bt=fs.batch();bt.delete(fs.doc('posts/'+pid+'/comments/'+cid));bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(-1)});
  try{await bt.commit()}catch(x){alert('Could not delete. The 5-minute window may have passed.')}}});
if(me){start();draw()}else if(app.firstChild)draw();
})();
