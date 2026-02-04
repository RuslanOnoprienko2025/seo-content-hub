import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  trailingSlash: 'always', // Добавляем это для единого стандарта ссылок
  build: {
    format: 'directory',    // Добавьте эту строку
  },
  // ЭТОТ БЛОК РЕШАЕТ ПРОБЛЕМУ С КАРТИНКАМИ
  image: {
    service: {
      entrypoint: 'astro/assets/services/squoosh'
    }
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // Добавь это:
    runtime: { mode: 'compatibility', type: 'pages' }
  }),
});
