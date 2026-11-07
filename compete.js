(()=>{
const PRO='Professionals',OLD='Contractor / Skilled worker',FVx=()=>firebase.firestore.FieldValue;
if(!ROLES.includes(PRO)&&!ROLES.includes(OLD))ROLES.push(PRO);
document.head.insertAdjacentHTML('beforeend','<style>.bdg2{font-size:12px;font-weight:700;margin-left:6px}.rx{display:flex;gap:14px;font-weight:600;margin:6px 0}</style>');
let tm3,XQ=[],NX={},CNT={},BO={},LB=null,lbt=0,SBX=new Set(),sbx=false,MF=null,sp2=null,prev2='alerts',land2=false;
const later2=()=>{clearTimeout(tm3);tm3=setTimeout(()=>{if(me)draw()},150)};
const findAny=id=>posts.find(x=>x.id==id)||XQ.find(x=>x.id==id),tmx=c=>c.ts&&c.ts.toMillis?c.ts.toMillis():0;
function ov(h){const o=document.createElement('div');o.className='ov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.style.cssText='position:fixed;inset:0;z-index:40;background:rgba(11,42,91,.85);display:grid;place-items:center;padding:16px';o.innerHTML='<div class="card" style="max-width:380px;width:100%;max-height:88vh;overflow:auto;display:grid;gap:10px">'+h+'</div>';document.body.appendChild(o);return o}
if(LIVE){
 API.saveMe=m=>{fs.doc('users/'+m.id).set(m).catch(()=>alert('Could not save your changes. Check your connection.'))};
 const w=API.watch;API.watch=cb=>w(l=>{cb(l.concat(XQ.filter(x=>!l.some(y=>y.id==x.id))));setTimeout(evalBoost,400)});
}
function cnt(u){if(!LIVE||u in CNT)return;CNT[u]=null;fs.doc('counts/'+u).get().then(s=>{CNT[u]=s.exists?(s.data().fc||0):0;later2()}).catch(()=>{CNT[u]=0})}
async function cnts(us){await Promise.all(us.map(async u=>{if(CNT[u]!=null)return;try{const s=await fs.doc('counts/'+u).get();CNT[u]=s.exists?(s.data().fc||0):0}catch(e){CNT[u]=0}}))}
async function evalBoost(){if(!LIVE||!me)return;const now=Date.now();let n=0,ch=false;
 for(const p of posts){const age=(now-p.ts)/36e5;if(age<=72||age>168||p.via||p.id in BO||n>=5)continue;BO[p.id]=false;
  if((p.likes||[]).length+(p.reshares||[]).length+(p.cc||0)<3)continue;n++;
  try{const cs=await fs.collection('posts/'+p.id+'/comments').limit(30).get(),cu=[...new Set(cs.docs.map(d=>d.data().uid))];
   await cnts([...new Set([p.uid,...(p.likes||[]),...(p.reshares||[]),...cu])]);
   const th=Math.max(1,(CNT[p.uid]||0)/10),q=l=>l.some(u=>u!=p.uid&&(CNT[u]||0)>=th);
   BO[p.id]=q(p.likes||[])&&q(p.reshares||[])&&q(cu);ch=true}catch(e){}}
 if(ch)later2()}
const sc2=p=>{const age=(Date.now()-p.ts)/36e5,r=(p.likes||[]).length+3*(p.reshares||[]).length+2*((p.cc||0)+(p.comments||[]).length);
 if(age<=72)return(r+1)/Math.pow(age+2,1.2);if(BO[p.id]&&age<=168)return .8*(r+1)/Math.pow(age-72+2,1.2);return 0};
function loadLB(){if(!LIVE||Date.now()-lbt<6e4)return;lbt=Date.now();fs.collection('counts').orderBy('fc','desc').limit(5).get().then(async s=>{const L=s.docs.map(d=>({id:d.id,fc:d.data().fc||0})).filter(x=>x.fc>0);
 await Promise.all(L.map(async x=>{try{const p=await fs.doc('profiles/'+x.id).get();x.n=p.exists?p.data().username:'Member'}catch(e){x.n='Member'}}));LB=L;later2()}).catch(()=>{})}
const lead=()=>{loadLB();cnt(me.id);if(!LB||!LB.length)return'';const mine=CNT[me.id]||0,last=LB[LB.length-1].fc;
 return`<div class="card"><h2>Top creators</h2>${LB.map((x,i)=>`<button class="lnk" data-a="prof" data-v="${x.id}" data-n="${esc(x.n)}" style="display:flex;justify-content:space-between;width:100%;text-decoration:none;padding:8px 0;min-height:40px"><span><b>#${i+1}</b> ${esc(x.n)}</span><span>${x.fc} followers</span></button>`).join('')}<p class="note" style="text-align:left">You have ${mine} follower${mine==1?'':'s'}. ${LB.some(x=>x.id==me.id)?'You are in the top 5!':'Get '+Math.max(1,last-mine+1)+' more to enter the top 5.'}</p></div>`};
const _c13=colonyView,_m13=meView,_pv13=postView;
colonyView=function(){let h=_c13();if(flt=='mine')return lead()+h;const P=h.split('<article class="post">'),head=P.shift();if(!P.length)return lead()+h;
 const A=P.map(c=>{const m=c.match(/data-a="like" data-v="([^"]+)"/);return{c:'<article class="post">'+c,p:m&&findAny(m[1])}}),live=A.filter(x=>x.p&&sc2(x.p)>0).sort((a,b)=>sc2(b.p)-sc2(a.p)),rest=A.filter(x=>!(x.p&&sc2(x.p)>0)).sort((a,b)=>(b.p?b.p.ts:0)-(a.p?a.p.ts:0)),top=live[0]&&live[0].p;
 return lead()+head+[...live,...rest].map(x=>{if(!x.p)return x.c;const age=(Date.now()-x.p.ts)/36e5,t=top&&x.p.id==top.id&&sc2(x.p)>.05?'🔥 Trending':age>72&&BO[x.p.id]?'🚀 Boosted':'';return t?x.c.replace('<time>','<span class="bdg2">'+t+'</span><time>'):x.c}).join('')};
meView=function(){if(view=='post2'&&sp2){const p=findAny(sp2);return`<button class="lnk" data-a="sback2">‹ Back</button>${p?postView(p):'<p class="empty">Loading…</p>'}`}
 let h=_m13();
 h=h.replace(/<button class="pick bell"[^>]*data-v="([^"]+)"[^>]*>[^<]*<\/button>/,(m,u)=>`<button class="pick bell" data-a="bell" data-v="${u}" aria-pressed="${SBX.has(u)}">${SBX.has(u)?'🔔 Post alerts on':'🔕 Post alerts off'}</button>`);
 if(/data-a="pback"/.test(h)){const m=h.match(/data-a="fol" data-v="([^"]+)"/),u=m?m[1]:me.id;cnt(u);h=h.replace('</h1>','</h1><button class="lnk" data-a="flw" data-v="'+u+'" style="text-decoration:none;min-height:36px">'+(CNT[u]||0)+' followers</button>')}
 else if(/Profile settings/.test(h)){cnt(me.id);h=h.replace('<span class="role">','<button class="lnk" data-a="flw" data-v="'+me.id+'" style="text-decoration:none;display:block;min-height:36px">'+(CNT[me.id]||0)+' followers</button><span class="role">')}
 return h};
function loadAl(){if(!LIVE||!me)return;notes.filter(n=>(n.type=='comment'||n.type=='reply')&&n.postId&&!(n.id in NX)).slice(0,15).forEach(n=>{NX[n.id]=null;
 fs.collection('posts/'+n.postId+'/comments').where('uid','==',n.from).get().then(s=>{const a=s.docs.map(d=>({id:d.id,...d.data()})).sort((x,y)=>tmx(y)-tmx(x));NX[n.id]=a[0]||false;if(view=='alerts')later2()}).catch(()=>{NX[n.id]=false})})}
async function ensureP(id){if(findAny(id)||XQ.some(x=>x.id==id))return;XQ.push({id,loading:1});try{const s=await fs.doc('posts/'+id).get();XQ=XQ.filter(x=>x.id!=id);if(s.exists){const p={id:s.id,...s.data()};XQ.push(p);posts=posts.concat(p)}}catch(e){XQ=XQ.filter(x=>x.id!=id)}later2()}
const inl=(n,c,canReply)=>{if(!c||!c.t)return'';const lk=(c.likes||[]).includes(me.id),pid=esc(n.postId);return`<div class="ns"><b>${esc(n.fromName)}</b>: ${esc(c.t)}</div><div class="ac"><button class="pick" data-a="nl2" data-v="${pid}|${c.id}" aria-pressed="${lk}">${lk?'♥':'♡'} Like</button>${canReply?`<button class="pick" data-a="nr2" data-v="${pid}|${c.id}|${esc(n.fromName)}">Reply</button>`:''}</div>`};
alertsView=function(){loadAl();const N=[...notes].sort((a,b)=>b.ts-a.ts),G={},items=[];
 N.forEach(n=>{if(n.postId&&['like','reshare','comment'].includes(n.type))(G[n.postId]=G[n.postId]||[]).push(n);else items.push({ts:n.ts,h:one(n)})});
 Object.entries(G).forEach(([pid,L])=>{const p=findAny(pid);if(!p)ensureP(pid);const who=[...new Set(L.map(n=>n.fromName))],pp=p&&!p.loading?p:null,lk=pp?(pp.likes||[]).length:L.filter(n=>n.type=='like').length,rs=pp?(pp.reshares||[]).length:L.filter(n=>n.type=='reshare').length,cm=pp?(pp.comments||[]).length+(pp.cc||0):L.filter(n=>n.type=='comment').length;
  const cn=L.filter(n=>n.type=='comment').slice(0,2),pid2=esc(pid);
  items.push({ts:L[0].ts,h:`<div class="nt" style="display:block"><div role="button" tabindex="0" data-a="np2" data-v="${pid2}" data-t="${cn.length?'comment':'like'}" style="cursor:pointer">${L.some(n=>!n.read)?'<i class="dot" style="display:inline-block;margin-right:8px"></i>':''}<b>${who.slice(0,2).map(esc).join(', ')}</b>${who.length>2?' and '+(who.length-2)+' more':''} reacted to your post<br><span class="sm2">${pp?'“'+esc((pp.text||'').slice(0,60))+'”':''}</span><div class="rx"><span>♥ ${lk}</span><span>⟲ ${rs}</span><span>💬 ${cm}</span></div></div>${cn.map(n=>inl(n,NX[n.id],1)).join('')}<div class="ac"><button class="pick" data-a="np2" data-v="${pid2}" data-t="${cn.length?'comment':'like'}">Open post</button></div></div>`})});
 items.sort((a,b)=>b.ts-a.ts);
 return`<h1>Alerts</h1>${items.length?`<div class="card">${items.map(x=>x.h).join('')}</div>`:'<p class="empty">No alerts yet. Likes, comments, reposts, new followers and posts from accounts you follow appear here, and you can respond on the spot.</p>'}`};
function one(n){const T={reply:'replied to your comment',follow:'started following you',post:'posted something new'},isF=fl().includes(n.from),pid=esc(n.postId||''),c=NX[n.id];
 return`<div class="nt" style="display:block"><div role="button" tabindex="0" ${n.postId?`data-a="np2" data-v="${pid}" data-t="${n.type}"`:`data-a="prof" data-v="${esc(n.from)}" data-n="${esc(n.fromName)}"`} style="display:flex;gap:10px;align-items:center;cursor:pointer">${n.read?'':'<i class="dot"></i>'}<span style="flex:1"><b>${esc(n.fromName)}</b> ${T[n.type]||'sent an alert'}</span><time>${ago(n.ts)}</time></div>${n.type=='reply'?inl(n,c,0):''}${n.type=='follow'?`<div class="ac"><button class="pick" data-a="fol" data-v="${esc(n.from)}">${isF?'Following':'Follow back'}</button><button class="pick" data-a="prof" data-v="${esc(n.from)}" data-n="${esc(n.fromName)}">View profile</button></div>`:''}${n.postId&&n.type!='follow'?`<div class="ac"><button class="pick" data-a="np2" data-v="${pid}" data-t="${n.type}">Open post</button></div>`:''}</div>`}
async function openPost2(id,t){prev2=view=='post2'?prev2:view;mark();if(!findAny(id)||findAny(id).loading){await ensureP(id);if(!findAny(id)){alert('That post is no longer available.');return}}
 sp2=id;view='post2';scrollTo(0,0);draw();if(t=='comment'||t=='reply')setTimeout(()=>{const b=document.querySelector('.a.cm[data-v="'+id+'"]');if(b&&!open[id])b.click()},60)}
function setFollow(v,on){const b=fs.batch(),id=v+'_'+me.id;if(on){b.set(fs.doc('follows/'+id),{a:v,s:me.id});b.set(fs.doc('counts/'+v),{fc:FVx().increment(1)},{merge:true})}else{b.delete(fs.doc('follows/'+id));b.set(fs.doc('counts/'+v),{fc:FVx().increment(-1)},{merge:true})}return b.commit()}
function loadFollows(){if(!LIVE||!me||MF)return;MF=new Set();fs.collection('follows').where('s','==',me.id).limit(500).get().then(s=>{MF=new Set(s.docs.map(d=>d.data().a));fl().filter(u=>!MF.has(u)).slice(0,30).forEach(u=>{MF.add(u);setFollow(u,true).catch(()=>MF.delete(u))})}).catch(()=>{MF=null})}
function loadSBX(){if(!LIVE||!me||sbx)return;sbx=true;fs.collection('subs').where('s','==',me.id).get().then(s=>{SBX=new Set(s.docs.map(d=>d.data().a));later2()}).catch(()=>{sbx=false})}
async function showFlw(u){const o=ov('<h2>Followers</h2><p class="note">Loading…</p>'),box=o.firstChild;o.onclick=e=>{if(e.target==o||e.target.id=='fc'||e.target.closest('[data-a="prof"]'))setTimeout(()=>o.remove(),0)};
 try{const s=await fs.collection('follows').where('a','==',u).limit(50).get(),ids=s.docs.map(d=>d.data().s);
  const I=await Promise.all(ids.map(async id=>{try{const p=await fs.doc('profiles/'+id).get();return{id,n:p.exists?p.data().username:'Member',r:p.exists?p.data().role:''}}catch(e){return{id,n:'Member',r:''}}}));
  box.innerHTML=`<h2>${Math.max(CNT[u]||0,ids.length)} followers</h2>${I.map(x=>`<div class="hb"><span data-a="prof" data-v="${x.id}" data-n="${esc(x.n)}" role="button" tabindex="0" style="cursor:pointer"><b>${esc(x.n)}</b><br><small>${esc(x.r)}</small></span>${x.id==me.id?'':`<button class="pick" data-a="fol" data-v="${x.id}">${fl().includes(x.id)?'Following':'Follow'}</button>`}</div>`).join('')||'<p class="note">No followers yet.</p>'}<button class="btn" id="fc">Close</button>`}catch(e){box.innerHTML='<p>Could not load followers.</p><button class="btn" id="fc">Close</button>'}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="fol"]');if(!b||!me)return;e.stopPropagation();const v=b.dataset.v,on=fl().includes(v);me.following=on?fl().filter(x=>x!=v):fl().concat(v);
 if(b.closest('.ov'))b.textContent=on?'Follow':'Following';else draw();API.saveMe(me);cnt(v);CNT[v]=Math.max(0,(CNT[v]||0)+(on?-1:1));
 if(LIVE){if(on){if(MF&&MF.has(v)){MF.delete(v);setFollow(v,false).catch(()=>{})}}else{if(MF)MF.add(v);setFollow(v,true).catch(()=>{});API.note({to:v,from:me.id,fromName:me.username,type:'follow',ts:Date.now(),read:false})}}},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="bell"]');if(!b||!me)return;e.stopPropagation();const v=b.dataset.v,on=SBX.has(v);on?SBX.delete(v):SBX.add(v);draw();
 (on?fs.doc('subs/'+v+'_'+me.id).delete():fs.doc('subs/'+v+'_'+me.id).set({a:v,s:me.id})).then(()=>alert(on?'Post alerts turned off.':'You will be alerted when they post.')).catch(()=>{on?SBX.add(v):SBX.delete(v);draw();alert('Could not change post alerts. Try again.')})},true);
document.addEventListener('click',e=>{if(!e.target.closest('[data-a="post"]')||!me)return;if(!(draft||'').trim()&&!imgs.length)return;const d=document.getElementById('d');if(d)d.value='';setTimeout(()=>{draft='';imgs=[];draw()},0)},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||!me)return;const a=b.dataset.a,v=b.dataset.v;
 if(a=='np2')openPost2(v,b.dataset.t);
 else if(a=='sback2'){view=prev2||'alerts';draw()}
 else if(a=='flw')showFlw(v);
 else if(a=='nl2'){const[pid,cid]=v.split('|'),c=Object.values(NX).find(x=>x&&x.id==cid);if(!c)return;const on=(c.likes||[]).includes(me.id);c.likes=on?(c.likes||[]).filter(x=>x!=me.id):(c.likes||[]).concat(me.id);draw();fs.doc('posts/'+pid+'/comments/'+cid).update({likes:on?FVx().arrayRemove(me.id):FVx().arrayUnion(me.id)}).catch(()=>alert('Could not like that comment.'))}
 else if(a=='nr2'){const[pid,cid,nm]=v.split('|'),c=Object.values(NX).find(x=>x&&x.id==cid),t=prompt('Reply to '+nm);if(!t||!t.trim())return;const bt=fs.batch();
  bt.set(fs.collection('posts/'+pid+'/comments').doc(),{uid:me.id,u:me.username,t:t.trim().slice(0,280),ts:FVx().serverTimestamp(),likes:[],parent:cid});bt.update(fs.doc('posts/'+pid),{cc:FVx().increment(1)});
  try{await bt.commit();if(c&&c.uid!=me.id)API.note({to:c.uid,from:me.id,fromName:me.username,type:'reply',postId:pid,ts:Date.now(),read:false});alert('Reply sent.')}catch(x){alert('Could not send the reply.')}}});
const _d13=draw;
draw=function(){if(!me){land2=false;MF=null;sbx=false;SBX=new Set()}const first=me&&!land2;_d13();
 if(first){land2=true;if(view!='colony'&&view!='post2'){view='colony';_d13()}}
 if(me){loadFollows();loadSBX();cnt(me.id)}};
if(me){start();draw()}else if(app.firstChild)draw();
})();
