// Feedback follows a completed state change; it never delays the action.
const preference = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
const active = new Set();
const byElement = new WeakMap();

preference?.addEventListener('change', event => {
  if (event.matches) for (const animation of active) animation.cancel();
});

export function animateFeedback(element, keyframes, duration = 140) {
  if (!element) return null;
  byElement.get(element)?.cancel();
  if (preference?.matches || typeof element.animate !== 'function') return null;
  const animation = element.animate(keyframes, { duration, easing: 'cubic-bezier(0.2, 0, 0, 1)', iterations: 1 });
  active.add(animation);
  byElement.set(element, animation);
  const clear = () => {
    active.delete(animation);
    if (byElement.get(element) === animation) byElement.delete(element);
  };
  animation.addEventListener('finish', clear, { once: true });
  animation.addEventListener('cancel', clear, { once: true });
  return animation;
}

export function revealFeedback(element) {
  return animateFeedback(element, [{ opacity: 0.65 }, { opacity: 1 }]);
}
