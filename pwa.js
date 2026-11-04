(()=>{
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;let ev;
function bar(t,fn){if(standalone||localStorage.gc_inst)return;const b=document.createElement('div');
 b.style.cssText='position:fixed;left:12px;right:12px;bottom:76px;z-index:9;background:#0D0D0D;color:#FFC72C;border-radius:16px;padding:12px 14px;display:flex;gap:10px;align-items:center;font:600 14px system-ui;box-shadow:0 3px 0 #E5252A';
 b.innerHTML='<span style="flex:1">'+t+'</span>'+(fn?'<button style="background:#FFC72C;color:#0D0D0D;border:0;border-radius:999px;padding:8px 14px;font:700 14px system-ui">Install</button>':'')+'<button aria-label="Close" style="background:none;border:0;color:#FFC72C;font-size:22px">×</button>';
 const bs=b.querySelectorAll('button');if(fn)bs[0].onclick=()=>{fn();b.remove()};bs[bs.length-1].onclick=()=>{localStorage.gc_inst=1;b.remove()};document.body.appendChild(b)}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();ev=e;bar('Install Grind Colony on your phone',()=>ev.prompt())});
if(/iphone|ipad/i.test(navigator.userAgent))addEventListener('load',()=>setTimeout(()=>bar('To install: tap Share, then Add to Home Screen'),3000));
addEventListener('appinstalled',()=>{localStorage.gc_inst=1});
})();
