/* Self Entourage global enhancement engine: no content rewrites, no new pages */
(function(){
  'use strict';
  var d=document;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn){if(d.readyState!=='loading')fn();else d.addEventListener('DOMContentLoaded',fn);}
  function toast(msg){var t=d.querySelector('.se-toast');if(!t){t=d.createElement('div');t.className='se-toast';d.body.appendChild(t);}t.textContent=msg;t.classList.add('is-visible');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('is-visible');},2200);}
  ready(function(){
    var progress=d.createElement('div');progress.className='se-progress';d.body.prepend(progress);
    function updateProgress(){var h=d.documentElement;var max=h.scrollHeight-h.clientHeight;progress.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';}
    updateProgress();window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);

    if(!reduced && window.PointerEvent){
      var cursor=d.createElement('div');cursor.className='se-cursor';d.body.appendChild(cursor);
      window.addEventListener('pointermove',function(e){d.body.style.setProperty('--se-x',e.clientX+'px');d.body.style.setProperty('--se-y',e.clientY+'px');cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('is-active');},{passive:true});
      d.addEventListener('pointerover',function(e){if(e.target.closest('a,button,.card,.btn,input,textarea,select,summary'))cursor.classList.add('is-hover');});
      d.addEventListener('pointerout',function(e){if(e.target.closest('a,button,.card,.btn,input,textarea,select,summary'))cursor.classList.remove('is-hover');});
    }

    d.querySelectorAll('section,.card,.panel,.page-hero,.hero-copy').forEach(function(el,i){el.setAttribute('data-se-reveal','');el.style.transitionDelay=Math.min(i*24,220)+'ms';});
    if(!reduced && 'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
      d.querySelectorAll('[data-se-reveal]').forEach(function(el){io.observe(el);});
    }else{d.querySelectorAll('[data-se-reveal]').forEach(function(el){el.classList.add('is-visible');});}

    var primary=d.querySelector('.btn-primary');if(primary)primary.classList.add('se-pulse');

    var rail=d.createElement('div');rail.className='se-floating-rail';rail.setAttribute('aria-label','Quick actions');
    rail.innerHTML='<a href="store.html" title="Store" aria-label="Open store">$</a><a href="contact.html" title="Contact" aria-label="Contact">@</a><button type="button" title="Command menu" aria-label="Open command menu" data-se-command>⌘</button><button type="button" title="Back to top" aria-label="Back to top" data-se-top>↑</button>';
    d.body.appendChild(rail);
    rail.querySelector('[data-se-top]').addEventListener('click',function(){window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});toast('Back to command view');});

    var command=d.createElement('div');command.className='se-command';command.setAttribute('role','dialog');command.setAttribute('aria-modal','true');command.setAttribute('aria-label','Self Entourage command menu');
    command.innerHTML='<div class="se-command-box"><div class="se-command-head"><div><strong>Self Entourage Command</strong><br><span>Fast navigation without changing the page structure.</span></div><button type="button" data-se-close aria-label="Close command menu">×</button></div><div class="se-command-list"><a href="start-here.html">Start With Your Path <small>1</small></a><a href="store.html">Explore Store <small>2</small></a><a href="build.html">Build Systems <small>3</small></a><a href="deploy.html">Deploy <small>4</small></a><a href="memberships.html">Memberships <small>5</small></a><a href="contact.html">Contact <small>6</small></a></div></div>';
    d.body.appendChild(command);
    function openCommand(){command.classList.add('is-open');toast('Command menu opened');}
    function closeCommand(){command.classList.remove('is-open');}
    rail.querySelector('[data-se-command]').addEventListener('click',openCommand);
    command.querySelector('[data-se-close]').addEventListener('click',closeCommand);
    command.addEventListener('click',function(e){if(e.target===command)closeCommand();});
    d.addEventListener('keydown',function(e){
      var key=(e.key||'').toLowerCase();
      if((e.ctrlKey||e.metaKey)&&key==='k'){e.preventDefault();command.classList.toggle('is-open');}
      if(key==='escape')closeCommand();
      if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&d.activeElement===d.body){
        if(key==='1')location.href='start-here.html';
        if(key==='2')location.href='store.html';
        if(key==='3')location.href='build.html';
        if(key==='4')location.href='deploy.html';
        if(key==='5')location.href='memberships.html';
        if(key==='6')location.href='contact.html';
      }
    });

    d.querySelectorAll('a[href^="http"]').forEach(function(a){if(!a.hasAttribute('target')){a.target='_blank';a.rel='noopener noreferrer';}});
    d.querySelectorAll('.card').forEach(function(card){card.addEventListener('mouseenter',function(){var h=card.querySelector('h3');if(h)toast(h.textContent.trim());},{passive:true});});
  });
})();
