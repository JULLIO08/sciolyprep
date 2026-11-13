/*
  SciOly Prep — shared behavior for every page.

  Header and footer: written here once and inserted into every page at the
  <div data-site-heading></div> and <div data-site-ending></div> placeholders.
  They are built in JS (not fetched) so they show up however the site is
  opened: GitHub Pages, any local server, or straight from disk (file://).
  Paths below are relative to the site root; they are resolved from this
  script's own location, so pages at any folder depth link correctly.

  Sticky header: adds .is-scrolled once the page has moved down a little,
  which turns the header sage (see layout.css).
*/
(function () {
  // site root = two folders up from /assets/js/site.js
  const script = document.currentScript;
  const root = new URL('../../', script ? script.src : window.location.href);
  const fromDisk = root.protocol === 'file:';

  // "" = home page; folders on disk have no index fallback, so name the file
  function url(path) {
    if (path === '' || path.startsWith('#')) return new URL((fromDisk ? 'index.html' : '') + path, root).href;
    return new URL(path, root).href;
  }

  const nav = [
    ['', 'Home'],
    ['about/about.html', 'About Us'],
    ['team/team.html', 'Team'],
    ['gallery/gallery.html', 'Gallery'],
    ['contact/contact.html', 'Contact']
  ];
  const navItems = nav.map(([path, label]) => `<li><a href="${url(path)}">${label}</a></li>`).join('');

  const heading = `
<header class="site-header">
  <div class="container">
    <a class="brand-link" href="${url('')}" aria-label="SciOly Prep home">
      <img class="site-logo" src="${url('images/logo/scioly-prep-logo.png')}" width="352" height="318" alt="" aria-hidden="true">
      <span class="wordmark">SciOly Prep</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      <ul>${navItems}</ul>
      <a class="button" href="${url('contact/contact.html#join')}">Join as a tutor</a>
    </nav>
  </div>
</header>`;

  const ending = `
<footer class="site-footer">
  <div class="container">
    <div>
      <a class="brand-link" href="${url('')}"><span class="wordmark">SciOly Prep</span></a>
      <p class="tagline">Science Olympiad tutoring</p>
    </div>
    <nav aria-label="Footer">
      <ul>${navItems}<li><a href="${url('contact/contact.html#join')}">Join as a tutor</a></li></ul>
    </nav>
    <p class="copy"><span>&copy; 2026 SciOly Prep</span><span>Website designed and built by Jacob Anil but mostly by William Huang</span></p>
  </div>
</footer>`;

  // replace the placeholder itself (not its contents) so the header is a direct
  // child of <body> and position: sticky works for the whole page
  function place(selector, html) {
    const target = document.querySelector(selector);
    if (target) target.outerHTML = html.trim();
  }

  function samePage(a, b) {
    const clean = p => p.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    return clean(a) === clean(b);
  }

  function initializeSite() {
    place('[data-site-heading]', heading);
    place('[data-site-ending]', ending);

    const header = document.querySelector('.site-header');
    if (!header) return;

    const activeLink = Array.from(header.querySelectorAll('.site-nav ul a'))
      .find(link => samePage(link.pathname, window.location.pathname));
    if (activeLink) activeLink.setAttribute('aria-current', 'page');

    let ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite);
  } else {
    initializeSite();
  }
})();
