document.addEventListener('DOMContentLoaded', function () {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = (file) => current === file ? ' class="active"' : '';
  const exploreActive = ['explore.html','learn.html','build.html','deploy.html','memberships.html','services.html','private-programs.html','intensives-and-reservations.html','truth-os.html','black-crown.html','neverloop.html'].includes(current) ? ' active' : '';

  function loadCssOnce(href) {
    if (!document.querySelector('link[href="' + href + '"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }
  function loadScriptOnce(src) {
    if (!document.querySelector('script[src="' + src + '"]')) {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  const header = `
<header class="topbar">
  <div class="container topbar-inner">
    <a class="brandmark" href="index.html" aria-label="Self Entourage home">
      <img src="assets/logo-light.jpg" alt="Self Entourage logo">
      <div class="brandmark-text">Self Entourage <small>LLC</small></div>
    </a>
    <nav class="nav" aria-label="Primary navigation">
      <a href="index.html"${isActive('index.html')}>Home</a>
      <div class="nav-group explore-group"><button class="nav-trigger${exploreActive}" type="button">Explore ▾</button><div class="nav-menu"><a href="explore.html">Explore Hub</a><a href="learn.html">Learn</a><a href="build.html">Build</a><a href="deploy.html">Deploy</a><a href="memberships.html">Memberships</a><a href="private-programs.html">Private Programs</a><a href="intensives-and-reservations.html">Intensives & Reservations</a><a href="truth-os.html">Truth OS</a><a href="black-crown.html">Black Crown</a><a href="neverloop.html">Neverloop</a></div></div>
      <a href="start-here.html"${isActive('start-here.html')}>Start Here</a>
      <a href="store.html"${isActive('store.html')}>Store</a>
      <a href="contact.html"${isActive('contact.html')}>Contact</a>
    </nav>
  </div>
</header>`;
  const footer = `
<footer class="footer">
  <div class="container footer-grid">
    <div class="card brand-card">
      <div class="brandmark" style="align-items:flex-start;">
        <img src="assets/logo-light.jpg" alt="Self Entourage logo">
        <div><div class="brandmark-text" style="font-size:24px;">Self Entourage</div><p class="small" style="margin:10px 0 0;">AI systems, offer clarity, and operating support for founders, creators, and operators who need cleaner execution.</p></div>
      </div>
      <div class="social-links" aria-label="Self Entourage social media links"><a href="https://instagram.com/selfentourage" target="_blank" rel="noopener noreferrer" aria-label="Self Entourage Instagram">Instagram</a><a href="https://twitter.com/selfentourage" target="_blank" rel="noopener noreferrer" aria-label="Self Entourage X / Twitter">X</a><a href="https://facebook.com/selfentourage" target="_blank" rel="noopener noreferrer" aria-label="Self Entourage Facebook">Facebook</a><a href="https://www.linkedin.com/company/selfentourage" target="_blank" rel="noopener noreferrer" aria-label="Self Entourage LinkedIn">LinkedIn</a><a href="mailto:selfentourage@gmail.com" aria-label="Email Self Entourage">Email</a></div>
      <p class="notice">© 2026 Self Entourage LLC. All rights reserved.</p>
    </div>
    <div class="card"><h3>Buy / Book</h3><a href="start-here.html">Start Here</a><a href="store.html">Store</a><a href="contact.html">Contact</a><details class="footer-products"><summary>Product Pages</summary><a href="store.html#quick-wins">Quick Wins</a><a href="store.html#best-sellers">Best Sellers</a><a href="store.html#build-offers">Build Offers</a><a href="store.html#deploy-offers">Deploy Offers</a><a href="store.html#memberships-offers">Memberships</a><a href="store.html#learning-offers">Learning</a><a href="store.html#legacy-offers">Legacy Products</a><a href="store.html#full-catalog">Full Product Catalog</a></details></div>
    <div class="card"><h3>Explore</h3><a href="explore.html">Explore Hub</a><a href="learn.html">Learn</a><a href="build.html">Build</a><a href="deploy.html">Deploy</a><a href="memberships.html">Memberships</a><a href="private-programs.html">Private Programs</a><a href="intensives-and-reservations.html">Intensives & Reservations</a></div>
    <div class="card"><h3>Support</h3><a href="about.html">About</a><a href="faq.html">FAQ</a><a href="legal.html">Legal</a><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a><a href="refund.html">Refund Policy</a><a href="accessibility.html">Accessibility</a></div>
  </div>
</footer>`;

  const oldHeader = document.querySelector('header.topbar');
  if (oldHeader) oldHeader.outerHTML = header;
  const oldFooter = document.querySelector('footer.footer');
  if (oldFooter) oldFooter.outerHTML = footer;

  document.querySelectorAll('a[href="#"], a[href=""]').forEach(function (link) { link.href = 'contact.html'; if (!link.textContent.trim() || link.textContent.trim() === '#') link.textContent = 'Ask for Direction'; });
  document.querySelectorAll('a[href="sitemap.html"], a[href="sourcebook.html"]').forEach(function (link) { link.remove(); });

  const main = document.querySelector('main');
  const isUtilityPage = ['contact.html', 'legal.html', 'terms.html', 'privacy.html', 'refund.html', 'accessibility.html'].includes(current);
  const isOwnerPage = ['owner-control-center.html', 'crm-engine.html', 'revenue-engine.html', 'executive-command-center.html', 'customer-acquisition-engine.html', 'traffic-domination-engine.html', 'install-enhancements.html'].includes(current);
  const hasFinalCta = document.querySelector('.store-cta, .final-cta, [data-global-cta]');
  if (main && !hasFinalCta && !isUtilityPage && !isOwnerPage) {
    const cta = document.createElement('section');
    cta.setAttribute('data-global-cta', 'true');
    cta.className = 'content-panel';
    cta.innerHTML = `<div class="container"><div class="card"><span class="pill">Next Move</span><h2>Ready to choose the right path?</h2><p>Start with direction if you are unsure, go to the store if you already know what you want, or send a message for help choosing.</p><div class="actions"><a class="btn btn-primary" href="start-here.html">Start Here</a><a class="btn btn-secondary" href="store.html">View Store</a><a class="btn btn-ghost" href="contact.html">Ask for Direction</a></div></div></div>`;
    main.appendChild(cta);
  }

  if (current.startsWith('product-')) document.querySelectorAll('.pricebox .btn').forEach(function (btn) { btn.classList.remove('btn-secondary'); btn.classList.add('btn-primary'); });

  loadCssOnce('se-ux-fixes.css?v=5');
  loadScriptOnce('catalog-navigation.js?v=2');
  if (current === 'store.html') loadScriptOnce('store-filter-engine.js?v=1');
  if (!isOwnerPage) { loadCssOnce('enhancements.css?v=1'); loadScriptOnce('enhancements.js?v=1'); }
  const enablePublicGuidance = !isUtilityPage && !isOwnerPage;
  if (enablePublicGuidance) { loadCssOnce('credibility-engine.css?v=2'); loadScriptOnce('credibility-engine.js?v=2'); loadCssOnce('lead-capture-engine.css?v=1'); loadScriptOnce('lead-capture-engine.js?v=1'); loadCssOnce('ai-intake-engine.css?v=2'); loadScriptOnce('ai-intake-engine.js?v=2'); }
});
