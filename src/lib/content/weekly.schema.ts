import { z } from 'zod'

export const weeklyFrontmatterSchema = z.object({
  /** e.g. "Focus and Flow State" — displayed as "#{week}: {title}". */
  title: z.string().min(1),
  week: z.number().int().positive(),
  /** ISO date string, e.g. "2024-04-27". Year/month for archive grouping
   *  are derived from this rather than duplicated as separate fields. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format'),
})

export type WeeklyFrontmatter = z.infer<typeof weeklyFrontmatterSchema>

export interface WeeklyReport extends WeeklyFrontmatter {
  slug: string
  content: string
}
