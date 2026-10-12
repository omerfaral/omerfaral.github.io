import { defineCollection, z } from 'astro:content';

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default(['Ömer Faruk Aral']),
    affiliation: z.string().default('Researcher'),
    abstract: z.string(),
    keywords: z.array(z.string()).default([]),
    date: z.date(),
    volume: z.number().default(1),
    issue: z.number().default(1),
    pages: z.string().default('1–10'),
    doi: z.string().optional(),
    references: z.array(z.string()).default([]),
  }),
});

export const collections = { papers };
