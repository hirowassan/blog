import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArticleListItem } from '@/components/article/ArticleListItem'
import { Pagination } from '@/components/article/Pagination'
import { PageContainer } from '@/components/layout/PageContainer'
import { getPaginatedArticles } from '@/lib/content/articles'
import { paths } from '@/routes/paths'

export function ArticlesPage() {
  const [searchParams] = useSearchParams()
  const requestedPage = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(requestedPage) ? requestedPage : 1

  // Memoized so a re-render for an unrelated reason (e.g. toggling theme)
  // doesn't re-slice and re-paginate the article list.
  const { items, currentPage, totalPages } = useMemo(() => getPaginatedArticles(page), [page])

  return (
    <PageContainer>
      <header className="mb-12">
        <h1 className="mb-3 text-headline-xl">一覧</h1>
        <p className="text-body-md text-secondary">全ての記事アーカイブ</p>
      </header>

      <div>
        {items.map((article) => (
          <ArticleListItem key={article.slug} article={article} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={paths.articles} />
    </PageContainer>
  )
}
