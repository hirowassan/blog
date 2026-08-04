import type { WeeklyYearGroup } from '@/lib/content/weekly'
import { WeeklyMonthChip } from './WeeklyMonthChip'
import { WeeklyMonthGroupList } from './WeeklyMonthGroupList'

interface WeeklyYearSectionProps {
  yearGroup: WeeklyYearGroup
  /** The most recent year is shown in full; older years collapse to month chips. */
  expanded: boolean
}

export function WeeklyYearSection({ yearGroup, expanded }: WeeklyYearSectionProps) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="mb-6 border-b border-outline-variant pb-3 text-headline-md">
        {yearGroup.year} Archive
      </h2>

      {expanded ? (
        <WeeklyMonthGroupList months={yearGroup.months} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {yearGroup.months.map((monthGroup) => (
            <WeeklyMonthChip key={monthGroup.month} monthGroup={monthGroup} />
          ))}
        </div>
      )}
    </section>
  )
}
