/* Self Entourage Phase 3B Pre-Customer Credibility Engine - restrained */
(function(){
  'use strict';
  var d=document;
  function ready(f){ if(d.readyState!=='loading') f(); else d.addEventListener('DOMContentLoaded',f); }
  ready(function(){
    // No automatic blocking popup. Credibility now supports the page quietly instead of covering the hero.
    if(d.querySelector('[data-se-cred-inline]')) return;
    var main=d.querySelector('main');
    if(!main) return;
    var current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(current==='contact.html') return;
    var strip=d.createElement('section');
    strip.className='content-panel se-inline-credibility';
    strip.setAttribute('data-se-cred-inline','true');
    strip.innerHTML='<div class="container"><div class="grid grid-3"><div class="card"><span class="pill">Clear Scope</span><h3>Know the next move.</h3><p>Start with the right offer, intake, or direction request instead of guessing.</p></div><div class="card"><span class="pill">Clean Intake</span><h3>Build from real context.</h3><p>The system works better when the goal, timeline, budget, and outcome are clear.</p></div><div class="card"><span class="pill">Human Review</span><h3>Custom work is confirmed.</h3><p>If scope needs review, it is handled before serious work begins.</p></div></div></div>';
    var hero=main.querySelector('.hero,.page-hero');
    if(hero && hero.nextSibling) main.insertBefore(strip,hero.nextSibling); else main.appendChild(strip);
  });
})();