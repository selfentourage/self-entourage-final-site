/* Self Entourage Smart Store Filter Engine */
(function(){
  'use strict';
  var d=document;
  function ready(fn){ if(d.readyState!=='loading') fn(); else d.addEventListener('DOMContentLoaded',fn); }
  function currentPage(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }

  function normalize(str){ return (str||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }

  function matchCard(card, query, filter){
    var text=normalize(card.textContent);
    var pill=normalize((card.querySelector('.pill')||{}).textContent||'');
    var href=(card.querySelector('a[href*="product-"]')||card).getAttribute('href')||'';
    var qOk=!query || text.indexOf(query)>-1 || normalize(href).indexOf(query)>-1;
    var fOk=true;
    if(filter && filter!=='all'){
      if(filter==='clarity') fOk=/consult|snapshot|truthstart|clarity|direction|signal/.test(text+href);
      if(filter==='learn') fOk=/class|learning|chamber|day one|foundations|small group/.test(text+href);
      if(filter==='build') fOk=/build|forge|sovereign|ascension|black crown|neverloop|genesis|codex|persona|recursion|assets/.test(text+href);
      if(filter==='deploy') fOk=/deploy|field|onsite|nomad|tour|reservation|intensive|precision|weekend/.test(text+href);
      if(filter==='membership') fOk=/membership|monthly|studio|team|solo|seed|builder tier|immortal|entourage/.test(text+href+pill);
      if(filter==='legacy') fOk=/legacy|drop|capsule|covenant|relic|license|codex publishing|eternal|vision|pulse/.test(text+href);
    }
    return qOk && fOk;
  }

  function install(){
    if(currentPage()!=='store.html') return;
    if(d.querySelector('[data-smart-store-filter]')) return;

    var anchor=d.querySelector('.store-stick');
    if(!anchor) return;

    var panel=d.createElement('section');
    panel.className='smart-store-filter';
    panel.setAttribute('data-smart-store-filter','true');
    panel.innerHTML='<div class="container"><div class="smart-store-panel"><div><span class="pill">Smart Store Filter</span><h2>Find the right offer faster.</h2><p>Search by need, product name, category, or stage. Nothing is removed from the catalog — this just cuts through the noise.</p></div><div class="smart-store-controls"><input type="search" id="storeSearch" placeholder="Search offers: AI, consult, build, legacy, class..." aria-label="Search Self Entourage offers"><div class="smart-store-chips"><button data-filter="all" class="is-active">All</button><button data-filter="clarity">Clarity</button><button data-filter="learn">Learn</button><button data-filter="build">Build</button><button data-filter="deploy">Deploy</button><button data-filter="membership">Membership</button><button data-filter="legacy">Legacy</button></div><div class="smart-store-count" aria-live="polite"></div></div></div></div>';
    anchor.insertAdjacentElement('afterend',panel);

    var input=panel.querySelector('#storeSearch');
    var chips=[].slice.call(panel.querySelectorAll('[data-filter]'));
    var count=panel.querySelector('.smart-store-count');
    var activeFilter='all';

    var cards=[].slice.call(d.querySelectorAll('article.offer-card, #full-catalog .store-index .card'));
    cards.forEach(function(card){ card.setAttribute('data-filterable-offer','true'); });

    function apply(){
      var q=normalize(input.value);
      var shown=0;
      cards.forEach(function(card){
        var ok=matchCard(card,q,activeFilter);
        card.style.display=ok?'':'none';
        if(ok) shown++;
      });
      count.textContent=shown+' offer'+(shown===1?'':'s')+' visible';
      d.querySelectorAll('section[id]').forEach(function(section){
        if(!section.querySelector('[data-filterable-offer]')) return;
        var any=[].slice.call(section.querySelectorAll('[data-filterable-offer]')).some(function(card){return card.style.display!=='none';});
        section.style.display=any?'':'none';
      });
    }

    input.addEventListener('input',apply);
    chips.forEach(function(chip){
      chip.addEventListener('click',function(){
        chips.forEach(function(c){c.classList.remove('is-active');});
        chip.classList.add('is-active');
        activeFilter=chip.getAttribute('data-filter')||'all';
        apply();
      });
    });
    apply();
  }

  ready(install);
})();