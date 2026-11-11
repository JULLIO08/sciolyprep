/*
  SciOly Prep — centered carousel for the gallery page.

  One photo sits in the center; the previous and next photos wait behind it
  on either side. Every few seconds the next photo slides to the center,
  then everything rests. Works with any number of photos (3+ looks best):
  add more by adding <li class="carousel-item">.

  Pauses while the pointer is over the photos, while a control has
  keyboard focus, and while the tab is hidden. Arrow buttons, clicking a
  side photo, and the keyboard arrow keys all move it by hand.
*/
(function () {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const stage = root.querySelector('.carousel-stage');
  const slides = Array.from(root.querySelectorAll('.carousel-item'));
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  if (slides.length === 0) return;

  const REST_MS = 2600;   // pause between moves
  const MOVE_MS = 750;    // length of each slide (matches gallery.css)

  let index = 0;
  let timer = null;
  let hovering = false;
  let focused = false;

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    slide.addEventListener('click', () => {
      if (slide.dataset.pos === 'prev') go(-1);
      if (slide.dataset.pos === 'next') go(1);
    });
  });

  function render() {
    const n = slides.length;
    slides.forEach((slide, i) => {
      let offset = (i - index + n) % n;          // 0 … n-1 steps ahead
      if (offset > n / 2) offset -= n;           // shortest way round
      let pos;
      if (offset === 0) pos = 'center';
      else if (offset === -1) pos = 'prev';
      else if (offset === 1) pos = 'next';
      else pos = offset < 0 ? 'before' : 'after';
      slide.dataset.pos = pos;
      slide.setAttribute('aria-hidden', pos === 'center' ? 'false' : 'true');
    });
  }

  function go(step) {
    index = (index + step + slides.length) % slides.length;
    render();
    schedule();                                  // restart the rest period
  }

  function isRunning() {
    return !hovering && !focused && !document.hidden && slides.length > 1;
  }

  function schedule() {
    clearTimeout(timer);
    if (!isRunning()) return;
    timer = setTimeout(() => go(1), REST_MS + MOVE_MS);
  }

  stage.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  stage.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  // pause for keyboard focus only, so a mouse click on an arrow doesn't freeze it
  root.addEventListener('focusin', (e) => { focused = e.target.matches(':focus-visible'); schedule(); });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) { focused = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);

  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  render();
  schedule();
})();
