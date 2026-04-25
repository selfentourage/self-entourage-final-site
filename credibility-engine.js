/* Self Entourage Phase 3B Pre-Customer Credibility Engine */
(function(){
  'use strict';
  var d=document;
  function ready(f){ if(d.readyState!=='loading') f(); else d.addEventListener('DOMContentLoaded',f); }
  ready(function(){
    var card=d.createElement('div');
    card.className='se-process-card';
    card.innerHTML='<button class="se-process-close" type="button" aria-label="Close how it works">×</button><h3>How it works</h3><p>A clean path: choose the right offer, complete intake, receive the build or next step.</p><div class="se-process-list"><div><b>1</b><span>Choose a starting path.</span></div><div><b>2</b><span>Complete the intake.</span></div><div><b>3</b><span>Receive direction, delivery, or implementation support.</span></div></div><div class="se-transparency-note">Custom scope is confirmed before work begins.</div>';
    d.body.appendChild(card);
    var close=card.querySelector('.se-process-close');
    close.onclick=function(){ card.classList.remove('is-visible'); try{sessionStorage.setItem('se_process_dismissed','1');}catch(e){} };
    setTimeout(function(){
      try{ if(sessionStorage.getItem('se_process_dismissed')==='1') return; }catch(e){}
      card.classList.add('is-visible');
    },12000);

    var chip=d.createElement('button');
    chip.type='button';
    chip.className='se-fit-chip';
    chip.innerHTML='✓ Is this for me?';
    d.body.appendChild(chip);

    var panel=d.createElement('div');
    panel.className='se-fit-panel';
    panel.innerHTML='<h3>Good fit if you are:</h3><ul><li>Building a real offer, workflow, or AI system</li><li>Tired of scattered tools and unclear next steps</li><li>Ready to answer intake questions honestly</li></ul><h3 style="margin-top:14px;">Not ideal if you are:</h3><ul><li>Looking for magic without implementation</li><li>Unwilling to clarify the goal</li><li>Expecting a serious system from vague inputs</li></ul>';
    d.body.appendChild(panel);
    chip.onclick=function(){ panel.classList.toggle('is-open'); };
    d.addEventListener('click',function(e){ if(!panel.contains(e.target)&&e.target!==chip) panel.classList.remove('is-open'); });
  });
})();