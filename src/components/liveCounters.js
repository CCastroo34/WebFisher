function randomInRange(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function stepToward(current, target, maxStep) {
  const diff = target - current;
  const step = Math.max(-maxStep, Math.min(maxStep, diff));
  return current + step;
}

export function initLiveCounters() {
  const fisherEl = document.getElementById('fisher-count');
  const fishEl = document.getElementById('fish-count');
  if (!fisherEl || !fishEl) return;

  let fisherCount = 144;
  let fishCount = 4621;
  let fisherTarget = randomInRange(90, 200);
  let fishTarget = randomInRange(3000, 5000);

  function tick() {
    if (Math.random() < 0.15) fisherTarget = randomInRange(90, 200);
    if (Math.random() < 0.15) fishTarget = randomInRange(3000, 5000);
    fisherCount = stepToward(fisherCount, fisherTarget, randomInRange(1, 6));
    fishCount = stepToward(fishCount, fishTarget, randomInRange(3, 40));
    fisherEl.textContent = fisherCount;
    fishEl.textContent = fishCount.toLocaleString('es-ES');
    setTimeout(tick, randomInRange(2500, 5000));
  }
  tick();
}

export function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach((el) => observer.observe(el));
}

export function initAutoplayFix() {
  const video = document.querySelector('.hero-art video');
  if (video) {
    video.muted = true;
    video.play().catch(() => {});
  }
}
