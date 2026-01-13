import { getCollection } from 'astro:content';
export async function GET({ request }) {
  const url = new URL(request.url);
  const host = url.host; 
  const protocol = 'https:';
  const baseUrl = `${protocol}//${host}`;
  
  // 1. Маппинг: Домен -> Значение "project" из вашего frontmatter
  const domainToProject = {
    'blog.fastimageconvert.onl': 'jpg-to-webp',
    'blog.fastimageconvert.online': 'png-to-webp',
    'blog.fastimageconvert.xyz': 'webp-to-png',
    'blog.fastimageconvert.pro': 'webp-to-jpg', 
    'blog.fastimageconvert.pics': 'png-to-jpg', 
    'blog.fastimageconvert.help': 'jpg-to-png', 
    'blog.emailsignatures.xyz': 'signatures', 
    };
  
  const projectType = domainToProject[host];
  
  // Если зашли по неизвестному домену — отдаем 404
  if (!projectType) {
    return new Response('Domain not mapped', { status: 404 });
  }
  // 2. Получаем все статьи из коллекции
  const allPosts = await getCollection('blog');
  
  // 3. Фильтруем: только те статьи, где project совпадает с текущим доменом
  const posts = allPosts.filter(post => post.data.project === projectType);
  
  // 4. Формируем XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${posts.map(post => {
  // Безопасно преобразуем вашу дату во frontmatter в ISO формат
  const publishDate = post.data.date ? new Date(post.data.date).toISOString() : new Date().toISOString();
  return `  <url>
    <loc>${baseUrl}/${post.slug}/</loc>
    <lastmod>${publishDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n')}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
