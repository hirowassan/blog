import { z } from 'zod'

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  /** ISO date string, e.g. "2024-05-20". */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format'),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  /** Optional thumbnail shown on the list page; omitted on text-only posts. */
  thumbnail: z.string().optional(),
})

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>

export interface Article extends ArticleFrontmatter {
  slug: string
  content: string
}
