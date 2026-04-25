/* Self Entourage Buyer Assist Engine */
(function(){
  'use strict';
  var d=document;
  function ready(fn){ if(d.readyState!=='loading') fn(); else d.addEventListener('DOMContentLoaded',fn); }
  function page(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
  function clean(str){ return (str||'').replace(/\s+/g,' ').trim(); }

  function getProductTitle(){
    var h=d.querySelector('.page-title, h1');
    return clean(h ? h.textContent : 'Self Entourage Offer');
  }

  function rememberProduct(){
    var current=page();
    if(!current.startsWith('product-')) return;
    var title=getProductTitle();
    var item={title:title,href:current,ts:Date.now()};
    try{
      var list=JSON.parse(localStorage.getItem('se_recent_offers')||'[]');
      list=list.filter(function(x){return x.href!==item.href;});
      list.unshift(item);
      localStorage.setItem('se_recent_offers',JSON.stringify(list.slice(0,6)));
    }catch(e){}
  }

  function installStickyProductBar(){
    var current=page();
    if(!current.startsWith('product-') || d.querySelector('[data-buyer-sticky]')) return;
    var primary=d.querySelector('.pricebox .btn, .product-layout .btn-primary, main .btn-primary');
    if(!primary) return;
    var title=getProductTitle();
    var bar=d.createElement('div');
    bar.className='buyer-sticky-bar';
    bar.setAttribute('data-buyer-sticky','true');
    bar.innerHTML='<div><strong>'+title+'</strong><span>Ready when the offer matches the work.</span></div><a class="btn btn-primary" href="'+primary.getAttribute('href')+'">'+clean(primary.textContent||'Start This Offer')+'</a><a class="btn btn-secondary" href="store.html">Compare</a>';
    d.body.appendChild(bar);
  }

  function installRecentlyViewed(){
    var current=page();
    if(current!=='store.html' || d.querySelector('[data-recent-offers]')) return;
    var list=[];
    try{ list=JSON.parse(localStorage.getItem('se_recent_offers')||'[]'); }catch(e){}
    if(!list.length) return;
    var target=d.querySelector('#full-catalog');
    if(!target) return;
    var sec=d.createElement('section');
    sec.className='content-panel recent-offers-panel';
    sec.setAttribute('data-recent-offers','true');
    sec.innerHTML='<div class="container"><div class="section-head"><div><span class="pill">Recently Viewed</span><h2>Pick up where you left off.</h2><p>These are the offers you checked most recently in this browser.</p></div></div><div class="grid grid-3">'+list.map(function(x){return '<a class="card" href="'+x.href+'"><span class="pill">Viewed</span><h3>'+x.title+'</h3><p>Return to this offer or compare it with the rest of the Store.</p></a>';}).join('')+'</div></div>';
    target.insertAdjacentElement('beforebegin',sec);
  }

  function installStoreGuidanceDock(){
    var current=page();
    if(current!=='store.html' || d.querySelector('[data-store-guidance-dock]')) return;
    var dock=d.createElement('div');
    dock.className='store-guidance-dock';
    dock.setAttribute('data-store-guidance-dock','true');
    dock.innerHTML='<a href="#quick-wins">Quick Wins</a><a href="#build-offers">Build</a><a href="#memberships-offers">Memberships</a><a href="#full-catalog">Catalog</a><button type="button">Find My Path</button>';
    d.body.appendChild(dock);
    var btn=dock.querySelector('button');
    btn.onclick=function(){
      var launcher=d.querySelector('.se-ai-intake-launch');
      if(launcher) launcher.click();
    };
  }

  ready(function(){
    rememberProduct();
    installStickyProductBar();
    installRecentlyViewed();
    installStoreGuidanceDock();
  });
})();