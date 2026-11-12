/*
  SciOly Prep — shared behavior for every page.
  Sticky header: adds .is-scrolled once the page has moved down a little,
  which turns the header sage (see layout.css).
*/
(function () {
  async function loadFragment(selector, path) {
    const target = document.querySelector(selector);
    if (!target) throw new Error(`Missing site fragment placeholder: ${selector}`);

    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
    target.innerHTML = await response.text();
  }

  async function initializeSite() {
    await Promise.all([
      loadFragment('[data-site-heading]', '/heading.html'),
      loadFragment('[data-site-ending]', '/ending.html')
    ]);

    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const header = document.querySelector('.site-header');
    const activeLink = header && Array.from(header.querySelectorAll('.site-nav a'))
      .find(link => (link.pathname.replace(/\/+$/, '') || '/') === currentPath);
    if (activeLink) activeLink.setAttribute('aria-current', 'page');

    if (!header) return;

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

  initializeSite().catch(error => console.error('Unable to initialize shared site layout.', error));
})();
