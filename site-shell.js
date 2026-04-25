document.addEventListener('DOMContentLoaded', function () {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = (file) => current === file ? ' class="active"' : '';

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
      <div class="social-links" aria-label="Self Entourage social links"><a href="https://instagram.com/selfentourage" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:selfentourage@gmail.com">Email</a></div>
      <p class="notice">© 2026 Self Entourage LLC. All rights reserved.</p>
    </div>
    <div class="card"><h3>Buy / Book</h3><a href="start-here.html">Start Here</a><a href="store.html">Store</a><a href="contact.html">Contact</a></div>
    <div class="card"><h3>Learn</h3><a href="learn.html">Learn</a><a href="build.html">Build</a><a href="deploy.html">Deploy</a><a href="memberships.html">Memberships</a></div>
    <div class="card"><h3>Support</h3><a href="about.html">About</a><a href="faq.html">FAQ</a><a href="legal.html">Legal</a><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a><a href="refund.html">Refund Policy</a><a href="accessibility.html">Accessibility</a></div>
  </div>
</footer>`;

  const oldHeader = document.querySelector('header.topbar');
  if (oldHeader) oldHeader.outerHTML = header;
  const oldFooter = document.querySelector('footer.footer');
  if (oldFooter) oldFooter.outerHTML = footer;

  document.querySelectorAll('a[href="#"], a[href=""]').forEach(function (link) {
    link.href = 'contact.html';
    if (!link.textContent.trim() || link.textContent.trim() === '#') link.textContent = 'Ask for Direction';
  });
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

  if (current.startsWith('product-')) {
    document.querySelectorAll('.pricebox .btn').forEach(function (btn) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    });
  }

  if (!isOwnerPage) {
    loadCssOnce('enhancements.css?v=1');
    loadScriptOnce('enhancements.js?v=1');
  }

  const enablePublicGuidance = !isUtilityPage && !isOwnerPage;
  if (enablePublicGuidance) {
    loadCssOnce('credibility-engine.css?v=1');
    loadScriptOnce('credibility-engine.js?v=1');
    loadCssOnce('lead-capture-engine.css?v=1');
    loadScriptOnce('lead-capture-engine.js?v=1');
    loadCssOnce('ai-intake-engine.css?v=1');
    loadScriptOnce('ai-intake-engine.js?v=1');
  }
});
