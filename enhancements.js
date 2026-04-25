/* Self Entourage global enhancement engine: restrained public UX */
(function(){
  'use strict';
  var d=document;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn){if(d.readyState!=='loading')fn();else d.addEventListener('DOMContentLoaded',fn);}

  ready(function(){
    if(!d.querySelector('.se-progress')){
      var progress=d.createElement('div');
      progress.className='se-progress';
      d.body.prepend(progress);
      function updateProgress(){
        var h=d.documentElement;
        var max=h.scrollHeight-h.clientHeight;
        progress.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';
      }
      updateProgress();
      window.addEventListener('scroll',updateProgress,{passive:true});
      window.addEventListener('resize',updateProgress);
    }

    d.querySelectorAll('section,.card,.panel,.page-hero,.hero-copy').forEach(function(el,i){
      if(!el.hasAttribute('data-se-reveal')){
        el.setAttribute('data-se-reveal','');
        el.style.transitionDelay=Math.min(i*18,160)+'ms';
      }
    });

    if(!reduced && 'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
        });
      },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
      d.querySelectorAll('[data-se-reveal]').forEach(function(el){io.observe(el);});
    }else{
      d.querySelectorAll('[data-se-reveal]').forEach(function(el){el.classList.add('is-visible');});
    }

    d.querySelectorAll('a[href^="http"]').forEach(function(a){
      if(!a.hasAttribute('target')){a.target='_blank';a.rel='noopener noreferrer';}
    });
  });
})();
