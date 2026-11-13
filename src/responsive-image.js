const widths = [160, 320, 640, 960];
const imageSizes = {
  hero: '(max-width: 600px) calc(100vw - 60px), (max-width: 1200px) 44vw, 700px',
  catalog: '(max-width: 600px) calc((100vw - 50px) / 2), (max-width: 820px) 44vw, (max-width: 1600px) 30vw, 600px',
  detail: '(max-width: 700px) calc(100vw - 76px), (max-width: 1100px) 40vw, 460px',
  thumbnail: '(max-width: 700px) calc((100vw - 92px) / 3), 150px',
};

export function responsiveImage(asset, alt, { placement = 'detail', priority = false, loading = 'lazy', className = 'google-product-image' } = {}) {
  const variant = width => asset.replace(/\.webp$/, `-w${width}.webp`);
  const srcset = [...widths.map(width => `${variant(width)} ${width}w`), `${asset} 1254w`].join(', ');
  return `<img class="${className}" src="${variant(640)}" srcset="${srcset}" sizes="${imageSizes[placement] || imageSizes.detail}" alt="${alt}" width="1254" height="1254" loading="${priority ? 'eager' : loading}" fetchpriority="${priority ? 'high' : 'auto'}" decoding="async">`;
}
