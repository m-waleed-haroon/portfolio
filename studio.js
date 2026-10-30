/* Native scrolling, lightweight reveals and opt-in motion. */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const targets = document.querySelectorAll('h2, .expertise-grid article, .skills > div, .process-steps li, .job, .contact-layout > div');
  function configureMotion() {
    if (observer) observer.disconnect();
    document.documentElement.classList.remove('motion-ready');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    targets.forEach(target => { target.classList.add('reveal'); observer.observe(target); });
    document.documentElement.classList.add('motion-ready');
  }
  configureMotion();
  reduceMotion.addEventListener('change', configureMotion);
})();

/* Pointer-following bubbles and sequential scroll emphasis in My Process. */
(() => {
  const list = document.querySelector('.process-steps');
  if (!list) return;
  const steps = Array.from(list.querySelectorAll('li'));
  if (!steps.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let scrollFrame = 0;
  steps.forEach(step => {
    step.tabIndex = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const updateBubble = () => {
      pointerFrame = 0;
      step.style.setProperty('--bubble-x', pointerX + 'px');
      step.style.setProperty('--bubble-y', pointerY + 'px');
    };
    step.addEventListener('pointermove', event => {
      if (!finePointer.matches || motion.matches || event.pointerType === 'touch') return;
      const box = step.getBoundingClientRect();
      pointerX = event.clientX - box.left;
      pointerY = event.clientY - box.top;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updateBubble);
    });
    step.addEventListener('pointerleave', () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      step.style.removeProperty('--bubble-x');
      step.style.removeProperty('--bubble-y');
    });
  });
  function updateSteps() {
    scrollFrame = 0;
    const marker = innerHeight * 0.55;
    const bounds = list.getBoundingClientRect();
    const positions = steps.map(step => step.getBoundingClientRect());
    let active = -1;
    if (bounds.top < innerHeight && bounds.bottom > 0) {
      active = 0;
      positions.forEach((box, index) => {
        if (box.top + box.height * 0.5 <= marker) active = index;
      });
    }
    steps.forEach((step, index) => {
      const current = index === active;
      step.classList.toggle('is-current', current);
      step.classList.toggle('is-complete', active >= 0 && index < active);
      if (current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  }
  function queueUpdate() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateSteps);
  }
  addEventListener('scroll', queueUpdate, { passive: true });
  addEventListener('resize', queueUpdate);
  addEventListener('load', queueUpdate);
  if (document.fonts) document.fonts.ready.then(queueUpdate);
  updateSteps();
})();
