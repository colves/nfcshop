import QRCode from 'qrcode';
import { writeFile, access } from 'node:fs/promises';
import { googleCardAsset } from '../src/google-card-assets.js';
import { instagramCardAsset } from '../src/instagram-card-assets.js';
import { whatsappCardAsset } from '../src/whatsapp-card-assets.js';
import { listingCardAsset } from '../src/listing-card-assets.js';
for (const asset of [googleCardAsset,instagramCardAsset,whatsappCardAsset,listingCardAsset]) for (const method of ['hybrid','nfc','qr']) {
  const original = asset(method,'clear','');
  for (const width of [160,320,640,960]) await access(new URL(`../public/${original.replace('.webp',`-w${width}.webp`)}`,import.meta.url));
}
// Preview artwork only. QR generation never blocks the browser's initial rendering.
await writeFile(new URL('../public/images/preview-qr.svg',import.meta.url),await QRCode.toString('https://example.org',{type:'svg',margin:1,width:100,color:{dark:'#18221d',light:'#ffffff'}}));
