/*
  SciOlyPREP — shared behavior for every page.
  Sticky header: adds .is-scrolled once the page has moved down a little,
  which turns the header sage (see layout.css).
*/
(function () {
  const header = document.querySelector('.site-header');
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

  update(); // correct state if the page loads already scrolled (refresh, #anchor)
})();
