import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // Добавь это:
    runtime: { mode: 'compatibility', type: 'pages' }
  }),
  // Добавь это, чтобы Astro не конфликтовал со слэшами в конце URL
  trailingSlash: 'always'
});
