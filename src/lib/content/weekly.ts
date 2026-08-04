import { getMonthLabel, parseIsoDate } from '@/lib/format/date'
import { parseMarkdownModule } from './parse-markdown-module'
import { weeklyFrontmatterSchema, type WeeklyReport } from './weekly.schema'

const rawModules = import.meta.glob('/src/content/weekly/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** All weekly reports, sorted newest first. Parsed once at module load. */
const allReports: WeeklyReport[] = Object.entries(rawModules)
  .map(([path, raw]) => {
    const { slug, frontmatter, content } = parseMarkdownModule(path, raw, weeklyFrontmatterSchema)
    return { slug, content, ...frontmatter }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getAllWeeklyReports(): WeeklyReport[] {
  return allReports
}

export function getWeeklyReportBySlug(slug: string): WeeklyReport | undefined {
  return allReports.find((report) => report.slug === slug)
}

/**
 * "第{week}週:{title}" — the single place this label is composed, so the
 * home feed, archive list and detail page can never drift out of sync.
 */
export function formatWeeklyTitle(report: WeeklyReport): string {
  return `第${report.week}週:${report.title}`
}

/** Reports published in a specific year/month, newest first. */
export function getWeeklyReportsByMonth(year: number, month: number): WeeklyReport[] {
  return allReports.filter((report) => {
    const parts = parseIsoDate(report.date)
    return parts.year === year && parts.month === month
  })
}

export interface WeeklyMonthGroup {
  year: number
  month: number
  monthLabel: string
  reports: WeeklyReport[]
}

export interface WeeklyYearGroup {
  year: number
  months: WeeklyMonthGroup[]
  reportCount: number
}

/**
 * Groups all reports by year, then month, newest first — the shape the
 * weekly archive page renders directly. Whether a given year is displayed
 * expanded or collapsed into month chips is a presentation decision left
 * to the page component, not this data layer.
 */
export function getWeeklyArchive(): WeeklyYearGroup[] {
  const byYear = new Map<number, Map<number, WeeklyReport[]>>()

  for (const report of allReports) {
    const { year, month } = parseIsoDate(report.date)
    const monthMap = byYear.get(year) ?? new Map<number, WeeklyReport[]>()
    const reportsInMonth = monthMap.get(month) ?? []
    reportsInMonth.push(report)
    monthMap.set(month, reportsInMonth)
    byYear.set(year, monthMap)
  }

  return [...byYear.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, monthMap]) => {
      const months: WeeklyMonthGroup[] = [...monthMap.entries()]
        .sort(([monthA], [monthB]) => monthB - monthA)
        .map(([month, reports]) => ({
          year,
          month,
          monthLabel: getMonthLabel(month),
          reports,
        }))

      const reportCount = months.reduce((total, group) => total + group.reports.length, 0)

      return { year, months, reportCount }
    })
}
