import { Link } from 'react-router-dom'
import { formatDisplayDate } from '@/lib/format/date'
import { formatWeeklyTitle } from '@/lib/content/weekly'
import type { WeeklyMonthGroup } from '@/lib/content/weekly'
import { paths } from '@/routes/paths'

interface WeeklyMonthGroupListProps {
  months: WeeklyMonthGroup[]
}

/**
 * The expanded archive view: a month label beside its list of reports.
 * Reused both for a fully expanded year and for a single filtered month
 * (via the month chips), so the two never drift apart visually.
 */
export function WeeklyMonthGroupList({ months }: WeeklyMonthGroupListProps) {
  return (
    <div className="space-y-8">
      {months.map((monthGroup) => (
        <div key={`${monthGroup.year}-${monthGroup.month}`} className="flex gap-6">
          <span className="w-20 shrink-0 pt-1 text-label-sm uppercase text-secondary">
            {monthGroup.monthLabel}
          </span>
          <ul className="min-w-0 flex-1 divide-y divide-outline-variant">
            {monthGroup.reports.map((report) => (
              <li
                key={report.slug}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
              >
                <Link
                  to={paths.weeklyDetail(report.slug)}
                  className="min-w-0 text-headline-md transition-colors hover:text-secondary"
                >
                  {formatWeeklyTitle(report)}
                </Link>
                <span className="shrink-0 text-label-md text-secondary">
                  {formatDisplayDate(report.date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
