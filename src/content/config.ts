import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    layout: z.string(),
    image: z.string().optional(),
    show_image: z.boolean().default(true),
    seo_title: z.string().optional(),
    description: z.string(),
    project: z.string(),
  }),
});

export const collections = { blog };
