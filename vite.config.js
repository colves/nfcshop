import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import { productIdFromPath } from './src/product-pages.js';
import { productHtml } from './scripts/product-html.mjs';
export default defineConfig({
  plugins: [{ name: 'product-pages-dev', configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      const id = productIdFromPath(pathname);
      if (!id) return next();
      try {
        const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
        const html = await server.transformIndexHtml(pathname, productHtml(template, id));
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
      } catch (error) { next(error); }
    });
  } }],
});
