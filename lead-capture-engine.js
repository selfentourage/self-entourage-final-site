/* Self Entourage Phase 4 Lead Capture Engine - restrained public UX */
(function(){
  'use strict';
  var d=document;
  function ready(f){if(d.readyState!=='loading')f();else d.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    if(d.querySelector('.se-lead-mini,.se-lead-dock')) return;
    var mini=d.createElement('button');
    mini.type='button';
    mini.className='se-lead-mini';
    mini.innerHTML='Need help choosing?';
    d.body.appendChild(mini);

    var dock=d.createElement('div');
    dock.className='se-lead-dock';
    dock.innerHTML='<div class="se-lead-head"><button class="se-lead-close" aria-label="Close">×</button><strong>Choose your next move</strong><span>Use one of these paths when you are ready.</span></div><div class="se-lead-body"><div class="se-lead-options"><a href="start-here.html">Start Here <small>best first step</small></a><a href="store.html">Browse Store <small>offers</small></a><a href="contact.html">Ask for Direction <small>custom help</small></a><button type="button" data-ai-intake>Use AI Intake <small>guided match</small></button></div><div class="se-lead-score">No pressure. If you are not sure, Start Here is the cleanest first move.</div></div>';
    d.body.appendChild(dock);

    function open(){dock.classList.add('is-visible');mini.classList.add('is-hidden');}
    function close(){dock.classList.remove('is-visible');mini.classList.remove('is-hidden');try{sessionStorage.setItem('se_lead_closed','1');}catch(e){}}
    mini.onclick=open;
    dock.querySelector('.se-lead-close').onclick=close;
    dock.querySelector('[data-ai-intake]').onclick=function(){close();var ai=d.querySelector('.se-ai-intake-launch');if(ai)ai.click();};

    var closed=false;try{closed=sessionStorage.getItem('se_lead_closed')==='1';}catch(e){}
    setTimeout(function(){if(!closed)mini.classList.add('is-visible');},9000);

    var fired=false;
    window.addEventListener('scroll',function(){
      if(fired||closed) return;
      var h=d.documentElement;
      var max=h.scrollHeight-h.clientHeight;
      if(max<=0) return;
      var pct=(h.scrollTop/max)*100;
      if(pct>72){fired=true;mini.classList.add('is-visible');}
    },{passive:true});
  });
})();