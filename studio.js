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
