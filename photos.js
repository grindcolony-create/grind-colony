(()=>{
document.head.insertAdjacentHTML('beforeend','<style>.g img{cursor:zoom-in}.g1 img{aspect-ratio:auto;height:auto;max-height:520px;object-fit:contain;background:#0D0D0D}.lbx{position:fixed;inset:0;z-index:90;background:#000;display:flex;flex-direction:column}.lbt{display:flex;align-items:center;gap:14px;padding:calc(env(safe-area-inset-top,0px) + 8px) 14px 8px;color:#fff}.lbt span{flex:1}.lbt a,.lbt button{color:#FFC72C;font-weight:700;font-size:16px;min-height:44px;padding:0 8px;display:flex;align-items:center;text-decoration:none}.lbi{flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;-webkit-overflow-scrolling:touch}.lbi img{max-width:100%;max-height:100%;object-fit:contain;cursor:zoom-in}.lbi.z{align-items:flex-start;justify-content:flex-start}.lbi.z img{max-width:none;max-height:none;cursor:zoom-out}.lbn{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:64px;color:#fff;font-size:34px;background:rgba(0,0,0,.35);border-radius:12px}.lbh{color:#9fb0cc;text-align:center;font-size:12px;padding:6px 0 calc(8px + env(safe-area-inset-bottom,0px))}</style>');
const FM=new Map(),FC={};
async function enc(f,maxDim,budget){const im=await new Promise((res,rej)=>{const i=new Image;i.onload=()=>res(i);i.onerror=rej;i.src=URL.createObjectURL(f)});
 let dim=Math.min(maxDim,Math.max(im.width,im.height)),q=.92,out='';
 for(let k=0;k<14;k++){const s=Math.min(1,dim/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
  const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);out=c.toDataURL('image/jpeg',q);if(out.length<=budget)break;if(q>.62)q-=.08;else dim=Math.round(dim*.86)}
 URL.revokeObjectURL(im.src);return out}
document.addEventListener('change',async e=>{if(e.target.id!='f')return;e.stopPropagation();const files=[...e.target.files].slice(0,4-imgs.length);e.target.value='';if(!files.length)return;alert('Preparing your photos at full quality…');
 for(const f of files){try{const th=await enc(f,1280,190000),fu=await enc(f,2400,950000);FM.set(th,fu);imgs.push(th)}catch(x){alert('One photo could not be read. Try another.')}}draw()},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="rm"]');if(b&&typeof imgs!='undefined')FM.delete(imgs[+b.dataset.v])},true);
if(LIVE){const _a=API.add;API.add=async p=>{const fu=(p.imgs||[]).map(t=>FM.get(t));if(fu.some(Boolean))p.fi=1;const r=await _a(p);
 if(r&&r.id&&fu.some(Boolean))fu.forEach((d,i)=>{if(d)fs.doc('posts/'+r.id+'/img/'+i).set({d,i,u:me.id}).catch(()=>{})});(p.imgs||[]).forEach(t=>FM.delete(t));return r}}
async function fullOf(pid,i){const k=pid+'_'+i;if(k in FC)return FC[k];try{const s=await fs.doc('posts/'+pid+'/img/'+i).get();FC[k]=s.exists?s.data().d:null}catch(e){FC[k]=null}return FC[k]}
function viewer(list,start,pid,full){let i=start;const o=document.createElement('div');o.className='lbx';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','Photo viewer');
 o.innerHTML=`<div class="lbt"><span id="lbc"></span><a id="lbs" download="grind-colony-photo.jpg" href="#">Save</a><button id="lbx" aria-label="Close photo">✕</button></div><div class="lbi" id="lbi"><img id="lbm" alt="Photo"></div>${list.length>1?'<button class="lbn" id="lbp" style="left:6px" aria-label="Previous photo">‹</button><button class="lbn" id="lbq" style="right:6px" aria-label="Next photo">›</button>':''}<div class="lbh" id="lbh">Tap the photo for full size</div>`;
 document.body.appendChild(o);const m=o.querySelector('#lbm'),c=o.querySelector('#lbi'),h=o.querySelector('#lbh'),sv=o.querySelector('#lbs');
 const show=async()=>{const k=i;c.classList.remove('z');m.src=list[k];sv.href=list[k];o.querySelector('#lbc').textContent=(k+1)+' / '+list.length;h.textContent=full?'Loading full quality…':'Tap the photo for full size';
  if(full){const d=await fullOf(pid,k);if(k!=i)return;if(d){m.src=d;sv.href=d;h.textContent='Full quality. Tap the photo for full size'}else h.textContent='Tap the photo for full size'}};
 o.querySelector('#lbx').onclick=()=>o.remove();m.onclick=()=>{c.classList.toggle('z')};
 const p=o.querySelector('#lbp'),q=o.querySelector('#lbq');if(p){p.onclick=()=>{i=(i-1+list.length)%list.length;show()};q.onclick=()=>{i=(i+1)%list.length;show()}}
 show()}
document.addEventListener('click',e=>{const im=e.target.closest('.g img');if(!im)return;const art=im.closest('.post');if(!art)return;const lk=art.querySelector('[data-a="like"]'),pid=lk?lk.dataset.v:'',list=[...art.querySelectorAll('.g img')],P=(typeof posts!='undefined'?posts:[]).find(x=>x.id==pid);
 viewer(list.map(x=>x.src),list.indexOf(im),pid,!!(P&&P.fi))});
document.addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&e.target.matches&&e.target.matches('.g img')){e.preventDefault();e.target.click()}});
const _pv18=postView;
postView=function(p){const h=_pv18(p);return h?h.replace(/(<div class="g g\d">)([\s\S]*?)(<\/div>)/,(m,a,b,c)=>a+b.replace(/<img /g,'<img tabindex="0" role="button" aria-label="Open photo" ')+c):h};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="dp"]');if(!b||!me||!LIVE)return;const pid=b.dataset.v;let n=0;const t=setInterval(async()=>{n++;if(n>20)return clearInterval(t);
 try{const s=await fs.doc('posts/'+pid).get();if(s.exists)return;clearInterval(t);const q=await fs.collection('posts/'+pid+'/img').get();q.docs.forEach(d=>d.ref.delete().catch(()=>{}))}catch(x){}},3000)});
})();
