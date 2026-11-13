const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

const labels = {google:'Google yorum',instagram:'Instagram',whatsapp:'WhatsApp',menu:'Dijital menü',web:'İnternet sitesi',iban:'IBAN paylaşım',ilan:'İlan bağlantısı'};

// One shared background file; each product/method has its own standalone face image.
export function cardModel(product = 'google', connection = 'hybrid', material = 'clear', base = './', interactive = true) {
  if (!labels[product] || !methods[connection] || !['clear', 'white'].includes(material)) throw new Error('Geçersiz kart modeli seçimi');
  const face = product === 'google' ? `google/google-model-${methods[connection]}.svg` : `cards/${product}-${methods[connection]}.svg`;
  return `<div class="card-model-stage"${interactive ? ' data-card-stage' : ''}><img class="card-model-background" src="${base}images/common/card-background.webp" alt="" width="1254" height="1254" decoding="async"><div class="card-model-object model-${material}" data-card-model><span class="card-model-edge" aria-hidden="true"></span><img class="card-model-face" src="${base}images/${face}" alt="${labels[product]} kartı, ${material === 'clear' ? 'şeffaf' : 'beyaz'} pleksi, ${names[connection]}" width="1000" height="1000" decoding="async"><span class="card-model-gloss" aria-hidden="true"></span></div></div>`;
}

export const googleCardModel = (connection = 'hybrid', material = 'clear', base = './') => cardModel('google',connection,material,base);

export function cardTiltAt(x, y, rect) {
  const clamp = n => Math.min(1, Math.max(-1, n));
  if (rect.width <= 0 || rect.height <= 0) return { x: 0, y: 0 };
  return { x: -clamp((y - rect.top) / rect.height * 2 - 1) * 5,
    y: clamp((x - rect.left) / rect.width * 2 - 1) * 7 };
}

export function installCardTilt(root = document, environment = window) {
  const motion = environment.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = environment.matchMedia('(hover: hover) and (pointer: fine)');
  let stage, model, frame, point;
  const reset = () => {
    if (frame) environment.cancelAnimationFrame(frame);
    frame = null;
    model?.style.removeProperty('--card-tilt-x');
    model?.style.removeProperty('--card-tilt-y');
    model?.classList.remove('is-tilting');
    stage = model = null;
  };
  root.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || event.pointerType !== 'mouse') return;
    const next = event.target.closest?.('[data-card-stage]');
    if (!next) { reset(); return; }
    if (next !== stage) {
      reset();
      stage = next;
      model = stage.querySelector('[data-card-model]');
    }
    if (!model) return;
    point = { x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = environment.requestAnimationFrame(() => {
      frame = null;
      if (!stage?.isConnected) { reset(); return; }
      const tilt = cardTiltAt(point.x, point.y, stage.getBoundingClientRect());
      model.style.setProperty('--card-tilt-x', `${tilt.x}deg`);
      model.style.setProperty('--card-tilt-y', `${tilt.y}deg`);
      model.classList.add('is-tilting');
    });
  }, { passive: true });
  root.addEventListener('pointerout', event => {
    if (stage && !stage.contains(event.relatedTarget)) reset();
  });
  root.addEventListener('visibilitychange', () => { if (root.hidden) reset(); });
  environment.addEventListener('blur', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
}
