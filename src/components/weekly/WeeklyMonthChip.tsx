import { Link } from 'react-router-dom'
import type { WeeklyMonthGroup } from '@/lib/content/weekly'
import { paths } from '@/routes/paths'

interface WeeklyMonthChipProps {
  monthGroup: WeeklyMonthGroup
}

/** A collapsed month summary for older archive years; links to that month's reports. */
export function WeeklyMonthChip({ monthGroup }: WeeklyMonthChipProps) {
  return (
    <Link
      to={paths.weekly({ year: monthGroup.year, month: monthGroup.month })}
      className="group border border-outline-variant px-4 py-4 text-center transition-colors hover:bg-primary hover:text-on-primary"
    >
      <span className="block text-body-md font-semibold">{monthGroup.monthLabel}</span>
      <span className="block text-label-sm text-secondary group-hover:text-on-primary/70">
        {monthGroup.reports.length} Reports
      </span>
    </Link>
  )
}
