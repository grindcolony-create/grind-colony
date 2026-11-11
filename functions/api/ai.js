const KEY='AIzaSyB1BFfB1fBTdujtquhpcvd_8kachFmZQ2c',PID='grind-colony-7defd',LIMIT=20;
const SYS='You are Buzz, a friendly bee assistant inside the Grind Colony habit and organizer app. Help with simple tasks about habits, planning, studying, work, small business and money tracking. Be warm, practical and brief (under 120 words). Use plain text with no markdown symbols, except lines that start with "- " when listing. If asked about something unrelated or harmful, politely say you only help with habits, planning and everyday tasks. Reply in the same language as the user.';
const cut=(s,n)=>String(s==null?'':s).slice(0,n);
const P={
 habits:b=>'My goal: '+cut(b.text,300)+'\nSuggest exactly 4 small daily habits. One per line, each starting with "- ", each under 8 words. No extra text.',
 plan:b=>'Plan the rest of my day. Unfinished habits: '+cut(JSON.stringify((b.ctx||{}).habits||[]),700)+'. Open tasks: '+cut(JSON.stringify((b.ctx||{}).tasks||[]),700)+'. Make a simple schedule with one line per item in the format "HH:MM - activity". Keep it realistic and short.',
 post:b=>'Write a short, upbeat social post (maximum 3 sentences, one emoji) about my day. Habits I finished: '+cut(JSON.stringify((b.ctx||{}).done||[]),700)+'. Streak: '+Number((b.ctx||{}).streak||0)+' days. End with #BuildDaily.',
 ask:b=>cut(b.text,300)
};
const j=(o,s)=>new Response(JSON.stringify(o),{status:s||200,headers:{'content-type':'application/json'}});
export async function onRequestPost({request,env}){
 const tok=(request.headers.get('Authorization')||'').replace('Bearer ','');
 if(!tok)return j({error:'Please sign in first.'},401);
 let body;try{body=await request.json()}catch(e){return j({error:'Bad request.'},400)}
 if(!P[body.task])return j({error:'Unknown task.'},400);
 const v=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='+KEY,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({idToken:tok})});
 if(!v.ok)return j({error:'Please sign in again.'},401);
 const uid=((await v.json()).users||[{}])[0].localId;if(!uid)return j({error:'Please sign in again.'},401);
 const doc='https://firestore.googleapis.com/v1/projects/'+PID+'/databases/(default)/documents/aiusage/'+uid+'_'+new Date().toISOString().slice(0,10),H={Authorization:'Bearer '+tok,'content-type':'application/json'};
 let n=0;const g=await fetch(doc,{headers:H});if(g.ok){n=Number(((await g.json()).fields||{n:{integerValue:'0'}}).n.integerValue||0)}
 if(n>=LIMIT)return j({error:'You have used all '+LIMIT+' AI helps for today. Come back tomorrow.'},429);
 const u=await fetch(doc+'?updateMask.fieldPaths=n',{method:'PATCH',headers:H,body:JSON.stringify({fields:{n:{integerValue:String(n+1)}}})});
 if(!u.ok)return j({error:'You have used all your AI helps for today. Come back tomorrow.'},429);
 try{const r=await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8-fast',{messages:[{role:'system',content:SYS},{role:'user',content:P[body.task](body)}],max_tokens:300,temperature:.6});
  return j({reply:cut(r.response,1200),left:LIMIT-n-1})}catch(e){return j({error:'Buzz is resting. Please try again in a bit.'},502)}}
