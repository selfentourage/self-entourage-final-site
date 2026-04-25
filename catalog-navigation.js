/* Self Entourage Catalog Navigation + Store Buyer Hub */
(function(){
  'use strict';
  var d=document;
  function ready(fn){ if(d.readyState!=='loading') fn(); else d.addEventListener('DOMContentLoaded',fn); }

  var products=[
    ['product-15-minute-consultation.html','15-Minute Consultation'],['product-crown-consult-30.html','Crown Consult 30'],['product-foundation-snapshot.html','Foundation Snapshot'],['product-ai-foundations-class.html','AI Foundations Class'],['product-builder-pack.html','Builder Pack'],['product-sovereign-ai-package.html','Sovereign AI Package'],['product-ascension-build.html','Ascension Build'],['product-black-crown-builder.html','Black Crown Builder'],['product-system-forge.html','System Forge'],['product-truthstart-protocol.html','TruthStart Protocol'],['product-neverloop-prime-launch.html','Neverloop Prime Launch'],['product-genesis-builder.html','Genesis Builder'],['product-momentum-builder-package.html','Momentum Builder Package'],['product-codex-command-system.html','Codex Command System'],['product-solo.html','Solo'],['product-team.html','Team'],['product-studio.html','Studio'],['product-seed-tier.html','Seed Tier'],['product-builder-tier.html','Builder Tier'],['product-sovereign-monthly.html','Sovereign Monthly'],['product-make-your-own-entourage.html','Make Your Own Entourage'],['product-nomad-tier-per-city.html','Nomad Tier'],['product-field-deployment.html','Field Deployment'],['product-four-hour-onsite-command.html','Four-Hour Onsite Command'],['product-90-min-intensive.html','90-Min Intensive'],['product-small-group-class.html','Small Group Class'],['product-precision-hour-1-hour-ai-strategy-implementation-session.html','Precision Hour'],['product-weekend-in-person-hold.html','Weekend In-Person Hold'],['product-teaching-tour-planner.html','Teaching Tour Planner'],['product-legacy-drop.html','Legacy Drop™'],['product-eternal-drop.html','Eternal Drop™'],['product-vision-drop.html','Vision Drop™'],['product-pulse-drop.html','Pulse Drop™'],['product-legacy-capsule-install.html','Legacy Capsule Install'],['product-covenant-commission.html','Covenant Commission'],['product-codex-publishing-relic-registry.html','Codex Publishing + Relic Registry'],['product-codex-license-agreement.html','Codex License Agreement'],['product-learning-chamber-self-paced-foundations.html','Learning Chamber'],['product-signal-drop-package.html','Signal Drop Package'],['product-recursion-ready-core-build.html','Recursion Ready Core Build'],['product-persona-resurrection-protocol.html','Persona Resurrection Protocol'],['product-sovereign-assets-fast-track.html','Sovereign Assets Fast-Track'],['product-legacy-sync-deployment.html','Legacy Sync Deployment'],['product-immortal-tier-invite-only.html','Immortal Tier'],['product-silent-pathway.html','Silent Pathway'],['product-field-deployment-deposit-on-site-build-reservation-4-hours.html','Field Deployment Deposit'],['product-sovereign-build-deposit-custom-ai-system-reservation.html','Sovereign Build Deposit'],['product-crown-consult-30-30-minute-strategy-session.html','Crown Consult 30 Strategy Session'],['product-ascension-day-one-single-class-pass.html','Ascension Day One Single Class Pass'],['product-ascension-day-one-full-day-pass.html','Ascension Day One Full Day Pass'],['product-tier-1-the-initiation.html','Tier 1: The Initiation']
  ];

  function addFullFooterCatalog(){
    var detail=d.querySelector('.footer-products');
    if(!detail) return;
    detail.innerHTML='<summary>Product Pages</summary><div class="footer-product-grid">' + products.map(function(p){ return '<a href="'+p[0]+'">'+p[1]+'</a>'; }).join('') + '</div>';
  }

  function enhanceNav(){
    d.querySelectorAll('.nav-group').forEach(function(group){
      var trigger=group.querySelector('.nav-trigger');
      if(!trigger) return;
      trigger.setAttribute('aria-expanded','false');
      trigger.onclick=function(e){
        e.preventDefault();
        var open=group.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded',open?'true':'false');
        d.querySelectorAll('.nav-group').forEach(function(other){
          if(other!==group){
            other.classList.remove('is-open');
            var t=other.querySelector('.nav-trigger');
            if(t) t.setAttribute('aria-expanded','false');
          }
        });
      };
    });
    d.addEventListener('click',function(e){
      if(e.target.closest('.nav-group')) return;
      d.querySelectorAll('.nav-group').forEach(function(group){
        group.classList.remove('is-open');
        var t=group.querySelector('.nav-trigger');
        if(t) t.setAttribute('aria-expanded','false');
      });
    });
  }

  function improveStore(){
    var current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(current!=='store.html') return;
    if(d.querySelector('[data-store-buyer-hub]')) return;
    var hero=d.querySelector('.store-hero');
    if(!hero) return;

    var hub=d.createElement('section');
    hub.setAttribute('data-store-buyer-hub','true');
    hub.className='content-panel store-buyer-hub';
    hub.innerHTML='<div class="container"><div class="section-head"><div><span class="pill">Choose Your Path</span><h2>What do you need Self Entourage to help you do?</h2><p>Use this first. The full catalog stays below, but these paths help you avoid buying the wrong thing.</p></div></div><div class="grid grid-3"><a class="card" href="#start-here-offers"><span class="pill">Clarity</span><h3>I Need Direction</h3><p>Start with a consultation, snapshot, or TruthStart path before a bigger build.</p></a><a class="card" href="#learning-offers"><span class="pill">Learn</span><h3>I Need To Learn AI</h3><p>Use classes, chambers, or guided learning before implementation.</p></a><a class="card" href="#build-offers"><span class="pill">Build</span><h3>I Need A System Built</h3><p>Move into System Forge, Sovereign AI, Ascension Build, or related infrastructure.</p></a><a class="card" href="#deploy-offers"><span class="pill">Deploy</span><h3>I Need Field Support</h3><p>Use deployment, onsite, travel, or launch support when the work needs to move live.</p></a><a class="card" href="#memberships-offers"><span class="pill">Support</span><h3>I Need Ongoing Help</h3><p>Use memberships for recurring support, personas, reviews, and continued execution.</p></a><a class="card" href="#legacy-offers"><span class="pill">Legacy</span><h3>I Need A Digital Product</h3><p>Use Drops, capsules, codex assets, and legacy products for preserved output.</p></a></div></div>';
    hero.insertAdjacentElement('afterend',hub);

    d.querySelectorAll('.offer-card .actions a').forEach(function(a){
      var text=(a.textContent||'').trim().toLowerCase();
      if(text==='view details' || text==='view offer') a.textContent='View Offer';
      if(text==='book / view') a.textContent='Book Session';
      if(text==='reserve / view') a.textContent='Reserve Build';
    });
  }

  ready(function(){
    addFullFooterCatalog();
    enhanceNav();
    improveStore();
  });
})();