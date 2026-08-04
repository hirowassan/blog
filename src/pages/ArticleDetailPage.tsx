import { useParams } from 'react-router-dom'
import { MarkdownContent } from '@/components/common/MarkdownContent'
import { NotFoundMessage } from '@/components/common/NotFoundMessage'
import { getArticleBySlug } from '@/lib/content/articles'
import { formatDisplayDate } from '@/lib/format/date'
import { ReadingLayout } from '@/layouts/ReadingLayout'
import { paths } from '@/routes/paths'

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <NotFoundMessage
        title="記事が見つかりません"
        message="お探しの記事は存在しないか、削除された可能性があります。"
        backHref={paths.articles()}
        backLabel="一覧へ戻る"
      />
    )
  }

  return (
    <ReadingLayout
      title={article.title}
      meta={`${formatDisplayDate(article.date)} — ${article.category}`}
      backHref={paths.articles()}
      backLabel="一覧へ戻る"
    >
      <MarkdownContent content={article.content} />
    </ReadingLayout>
  )
}
