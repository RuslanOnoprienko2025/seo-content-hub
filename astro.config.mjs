import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  trailingSlash: 'always', // Добавляем это для единого стандарта ссылок
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // Добавь это:
    runtime: { mode: 'compatibility', type: 'pages' }
  }),
});
