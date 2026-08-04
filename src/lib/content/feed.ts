import { getAllArticles } from './articles'
import { formatWeeklyTitle, getAllWeeklyReports } from './weekly'

/**
 * A display-ready item for the home page's "Recent Records" list, which
 * mixes articles and weekly reports into one reverse-chronological feed.
 * This intentionally flattens both content types down to what that list
 * needs to render — the detail pages still use the richer `Article` /
 * `WeeklyReport` types directly.
 */
export interface FeedItem {
  title: string
  date: string
  label: string
  href: string
}

export function getRecentFeedItems(count: number): FeedItem[] {
  const articleItems: FeedItem[] = getAllArticles().map((article) => ({
    title: article.title,
    date: article.date,
    label: article.category,
    href: `/articles/${article.slug}`,
  }))

  const weeklyItems: FeedItem[] = getAllWeeklyReports().map((report) => ({
    title: formatWeeklyTitle(report),
    date: report.date,
    label: 'Weekly',
    href: `/weekly/${report.slug}`,
  }))

  return [...articleItems, ...weeklyItems]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}
