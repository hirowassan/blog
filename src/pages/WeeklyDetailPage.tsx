import { useParams } from 'react-router-dom'
import { MarkdownContent } from '@/components/common/MarkdownContent'
import { NotFoundMessage } from '@/components/common/NotFoundMessage'
import { formatWeeklyTitle, getWeeklyReportBySlug } from '@/lib/content/weekly'
import { formatDisplayDate } from '@/lib/format/date'
import { ReadingLayout } from '@/layouts/ReadingLayout'
import { paths } from '@/routes/paths'

export function WeeklyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const report = slug ? getWeeklyReportBySlug(slug) : undefined

  if (!report) {
    return (
      <NotFoundMessage
        title="週報が見つかりません"
        message="お探しの週報は存在しないか、削除された可能性があります。"
        backHref={paths.weekly()}
        backLabel="週報一覧へ戻る"
      />
    )
  }

  return (
    <ReadingLayout
      title={formatWeeklyTitle(report)}
      meta={formatDisplayDate(report.date)}
      backHref={paths.weekly()}
      backLabel="週報一覧へ戻る"
    >
      <MarkdownContent content={report.content} />
    </ReadingLayout>
  )
}
