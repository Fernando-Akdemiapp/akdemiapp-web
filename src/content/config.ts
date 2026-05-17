import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
  }),
});

const ayuda = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    module: z.string(),
    order: z.number(),
    date: z.date(),
  }),
});

export const collections = { blog, ayuda };
