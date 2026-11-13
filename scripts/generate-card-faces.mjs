import { writeFile, mkdir } from 'node:fs/promises';
import QRCode from 'qrcode';
import { products } from '../src/shop.js';
import { paths } from '../src/icons.js';

// Export the existing simple card layouts as independent SVG images, without a scene.
const out = new URL('../public/images/cards/', import.meta.url);
await mkdir(out, { recursive:true });
const esc = value => value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const colors = {instagram:'#bd3679',whatsapp:'#008356',menu:'#ab6e23',web:'#3d66b0',iban:'#6660a5',ilan:'#a36142'};
const symbol = (name,x,y,size,color) => `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
const text = (content,x,y,size,weight=400,color='#18251e',anchor='start') => `<text x="${x}" y="${y}" fill="${color}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(content)}</text>`;
const qr = await QRCode.toString('https://colves.github.io/nfcshop/',{type:'svg',margin:2,color:{dark:'#18251e',light:'#ffffff'}});
const qrAt = x => qr.replace('<svg ',`<svg x="${x-103}" y="464" width="206" height="206" `);
const nfcAt = x => `${symbol('tap',x-70,468,140,'#18251e')}${text('Telefonunuzu yaklaştırın',x,656,24,600,'#18251e','middle')}`;
for (const p of products.filter(p=>p.id!=='google')) for (const method of ['qr-nfc','nfc','qr']) {
  const color=colors[p.id];
  const methods = method==='qr-nfc' ? nfcAt(275)+qrAt(725)+text('QR kodu okutun',725,710,24,600,'#18251e','middle') : method==='nfc' ? nfcAt(500) : qrAt(500)+text('QR kodu okutun',500,710,24,600,'#18251e','middle');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><title>${esc(p.name)} — ${method}</title><rect width="1000" height="1000" rx="40" fill="#fff"/>${symbol(p.symbol,110,145,82,color)}${text(p.label,218,205,41,600,color)}${text(p.headline,110,310,45,700)}${text(p.subtitle,110,362,26,400,'#647168')}${methods}${text('nfcshop',110,858,31,700)}<circle cx="248" cy="849" r="4" fill="${color}"/></svg>`;
  await writeFile(new URL(`${p.id}-${method}.svg`,out),svg);
}
console.log('18 bağımsız kart yüzü hazırlandı.');
