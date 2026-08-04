import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLink } from '@/components/common/ArrowLink'
import { PageContainer } from '@/components/layout/PageContainer'
import { WeeklyMonthGroupList } from '@/components/weekly/WeeklyMonthGroupList'
import { WeeklyYearSection } from '@/components/weekly/WeeklyYearSection'
import { getMonthLabel } from '@/lib/format/date'
import { getWeeklyArchive, getWeeklyReportsByMonth } from '@/lib/content/weekly'
import { paths } from '@/routes/paths'

export function WeeklyPage() {
  const [searchParams] = useSearchParams()
  const monthFilter = parseMonthFilter(searchParams.get('year'), searchParams.get('month'))

  return (
    <PageContainer>
      <header className="mb-12">
        <h1 className="mb-3 text-headline-xl">週報</h1>
        <p className="text-body-md text-secondary">
          毎週の進捗、学び、思考などの貯蔵庫。月別アーカイブから過去の記録を参照できます。
        </p>
      </header>

      {monthFilter ? (
        <FilteredMonthView year={monthFilter.year} month={monthFilter.month} />
      ) : (
        <FullArchiveView />
      )}
    </PageContainer>
  )
}

function FullArchiveView() {
  const archive = useMemo(() => getWeeklyArchive(), [])

  if (archive.length === 0) {
    return <p className="text-body-md text-secondary">まだ週報がありません。</p>
  }

  return (
    <div>
      {archive.map((yearGroup, index) => (
        <WeeklyYearSection key={yearGroup.year} yearGroup={yearGroup} expanded={index === 0} />
      ))}
    </div>
  )
}

interface FilteredMonthViewProps {
  year: number
  month: number
}

function FilteredMonthView({ year, month }: FilteredMonthViewProps) {
  const reports = useMemo(() => getWeeklyReportsByMonth(year, month), [year, month])

  return (
    <div>
      <ArrowLink to={paths.weekly()} direction="back" className="mb-8">
        週報アーカイブに戻る
      </ArrowLink>

      <h2 className="mb-6 border-b border-outline-variant pb-3 text-headline-md">{year} Archive</h2>

      {reports.length > 0 ? (
        <WeeklyMonthGroupList
          months={[{ year, month, monthLabel: getMonthLabel(month), reports }]}
        />
      ) : (
        <p className="text-body-md text-secondary">この月の週報はまだありません。</p>
      )}
    </div>
  )
}

function parseMonthFilter(
  yearParam: string | null,
  monthParam: string | null,
): { year: number; month: number } | undefined {
  if (!yearParam || !monthParam) return undefined

  const year = Number(yearParam)
  const month = Number(monthParam)
  const isValid = Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12

  return isValid ? { year, month } : undefined
}
