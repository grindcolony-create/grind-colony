(()=>{
const DESC={'Student':'Study streaks, assignments and pocket money','Salary earner':'Career growth, savings and daily discipline','Business owner':'Sales habits, cash flow and growth'};
const RP={'Student':['Attend or watch every class','Study for 2 focused hours','Review today’s notes','Read for 20 minutes','Finish one assignment task','Sleep before 11pm'],
'Salary earner':['Do the most important task first','Learn one skill for 20 minutes','Save part of today’s income','Walk or exercise for 20 minutes','Plan tomorrow before bed','Message one new contact'],
'Business owner':['Follow up with 3 customers','Review sales and expenses','Promote your business online','Plan 3 tasks that grow revenue','Reach out to one new lead','Record every sale and cost']};
const CATS={'Student':[['Food','Transport','Data and airtime','Books and fees','Savings','Other'],['Allowance','Gift','Part-time work','Other']],
'Salary earner':[['Rent','Food','Transport','Bills','Savings','Other'],['Salary','Side income','Gift','Other']],
'Business owner':[['Stock and supplies','Staff','Rent','Transport','Marketing','Tax','Other'],['Business sales','Salary','Other income']]};
document.head.insertAdjacentHTML('beforeend','<style>.rc{text-align:left;display:grid;gap:2px;border:2px solid var(--ink);background:#fff;border-radius:16px;padding:14px 16px;font-size:18px}.rc span{color:var(--mut);font-size:14px;font-weight:400}.rc:active{background:var(--yel)}</style>');
let wel=true;
const _av=authView,_hv=hiveView,_mev=meView,_mv=moneyView,_pv=postView;
authView=function(){
 if(wel)return`<main class="auth"><img class="lg" src="logo.jpg" alt="Grind Colony"><h1 style="text-align:center;font-size:22px">Who are you building for?</h1><p class="note">Pick your path. You can change it any time.</p>${ROLES.map(r=>`<button class="rc" data-a="pick" data-v="${r}"><b>${r}</b><span>${DESC[r]}</span></button>`).join('')}<button class="lnk" style="justify-self:center" data-a="gosign">I already have an account</button></main>`;
 let h=_av(),r=localStorage.gc_role;if(r)h=h.replace('<option>'+r+'</option>','<option selected>'+r+'</option>');
 return mode=='up'?h.replace('</main>','<button class="lnk" style="justify-self:center" data-a="welcome">Choose a different path</button></main>'):h};
hiveView=function(){const h=_hv(),rp=(RP[me.role]||[]).filter(x=>!me.habits.some(k=>k.name==x));if(!rp.length)return h;
 return h.replace('<div class="card"><h2>Today’s habits</h2>',`<div class="card"><h2>Starter habits for ${esc(me.role)}s</h2><p class="note" style="text-align:left;margin:4px 0 10px">Tap to add the ones that fit your life.</p><div class="chips">${rp.map(x=>`<button class="pick" data-a="rh" data-v="${esc(x)}">+ ${esc(x)}</button>`).join('')}</div><button class="btn sm" data-a="rhall" style="margin-top:12px">Add all</button></div><div class="card"><h2>Today’s habits</h2>`)};
moneyView=function(){const c=CATS[me.role];if(c){OUT.length=0;OUT.push(...c[0]);INC.length=0;INC.push(...c[1])}return _mv()};
meView=function(){const k='<p class="note" style="text-align:left;margin-bottom:10px">';return _mev().replace(k,'<label style="margin-bottom:10px">My path<select id="rp">'+ROLES.map(r=>`<option ${r==me.role?'selected':''}>${r}</option>`).join('')+'</select></label>'+k)};
postView=function(p){const h=_pv(p);return (p.by||p.uid)==me.id?h.replace('<time>','<button class="fol" data-a="dp" data-v="'+p.id+'">Delete</button><time>'):h};
if(LIVE)API.watch=cb=>fs.collection('posts').orderBy('ts','desc').limit(25).onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))));
const save=async()=>{await API.saveMe(me);draw()};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v;
 if(a=='pick'){localStorage.gc_role=v;wel=false;mode='up';draw()}
 else if(a=='gosign'){wel=false;mode='in';draw()}
 else if(a=='welcome'){wel=true;draw()}
 else if(a=='rh'){me.habits.push({id:Date.now()+'',name:v,log:{}});save()}
 else if(a=='rhall'){(RP[me.role]||[]).filter(x=>!me.habits.some(k=>k.name==x)).forEach((x,i)=>me.habits.push({id:Date.now()+'-'+i,name:x,log:{}}));save()}
 else if(a=='dp'&&confirm('Delete this post?')){try{await fs.doc('posts/'+v).delete()}catch(x){alert('Could not delete this post.')}}
});
document.addEventListener('change',e=>{if(e.target.id=='rp'){me.role=e.target.value;save()}});
if(me){start();draw()}else if(app.firstChild)draw();
})();
