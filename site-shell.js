document.addEventListener('DOMContentLoaded', function () {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = (file) => current === file ? ' class="active"' : '';
  const header = `
<header class="topbar">
  <div class="container topbar-inner">
    <a class="brandmark" href="index.html" aria-label="Self Entourage home">
      <img src="assets/logo-light.jpg" alt="Self Entourage logo">
      <div class="brandmark-text">Self Entourage <small>LLC</small></div>
    </a>
    <nav class="nav" aria-label="Primary navigation">
      <a href="index.html"${isActive('index.html')}>Home</a>
      <a href="explore.html"${isActive('explore.html') || current === 'services.html' ? ' class="active"' : ''}>Explore</a>
      <a href="start-here.html"${isActive('start-here.html')}>Start Here</a>
      <a href="store.html"${isActive('store.html')}>Store</a>
      <a href="learn.html"${isActive('learn.html')}>Learn</a>
      <a href="build.html"${isActive('build.html')}>Build</a>
      <a href="deploy.html"${isActive('deploy.html')}>Deploy</a>
      <a href="memberships.html"${isActive('memberships.html')}>Memberships</a>
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
        <div>
          <div class="brandmark-text" style="font-size:24px;">Self Entourage</div>
          <p class="small" style="margin:10px 0 0;">Self Entourage is an AI systems design and education company helping people protect the mission, organize the work, and complete the plan with sovereign AI-powered systems.</p>
        </div>
      </div>
      <div class="social-links" aria-label="Self Entourage social links">
        <a href="https://instagram.com/selfentourage" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://instagram.com/truththanoun" target="_blank" rel="noopener noreferrer">TruthThaNoun</a>
        <a href="mailto:selfentourage@gmail.com">Email</a>
      </div>
      <p class="notice">© 2026 Self Entourage LLC. All rights reserved.</p>
    </div>
    <div class="card">
      <h3>Navigate</h3>
      <a href="index.html">Home</a>
      <a href="explore.html">Explore</a>
      <a href="start-here.html">Start Here</a>
      <a href="store.html">Store</a>
      <a href="learn.html">Learn</a>
      <a href="build.html">Build</a>
      <a href="deploy.html">Deploy</a>
      <a href="memberships.html">Memberships</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="card">
      <h3>Explore</h3>
      <a href="truth-os.html">Truth OS</a>
      <a href="black-crown.html">Black Crown</a>
      <a href="neverloop.html">Neverloop</a>
      <a href="services.html">Services</a>
      <a href="private-programs.html">Private Programs</a>
      <a href="intensives-and-reservations.html">Intensives & Reservations</a>
    </div>
    <div class="card">
      <h3>Support</h3>
      <a href="about.html">About</a>
      <a href="faq.html">FAQ</a>
      <a href="legal.html">Legal</a>
      <a href="terms.html">Terms</a>
      <a href="privacy.html">Privacy</a>
      <a href="refund.html">Refund Policy</a>
      <a href="accessibility.html">Accessibility</a>
    </div>
  </div>
</footer>`;
  const oldHeader = document.querySelector('header.topbar');
  if (oldHeader) oldHeader.outerHTML = header;
  const oldFooter = document.querySelector('footer.footer');
  if (oldFooter) oldFooter.outerHTML = footer;
});
