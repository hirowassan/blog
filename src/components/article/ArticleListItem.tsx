import { Link } from 'react-router-dom'
import { ArrowLink } from '@/components/common/ArrowLink'
import { PostMeta } from '@/components/common/PostMeta'
import type { Article } from '@/lib/content/article.schema'
import { paths } from '@/routes/paths'

interface ArticleListItemProps {
  article: Article
}

/** One entry in the articles archive: meta, title, excerpt, thumbnail and a read link. */
export function ArticleListItem({ article }: ArticleListItemProps) {
  const href = paths.articleDetail(article.slug)

  return (
    <article className="flex flex-col gap-6 border-b border-outline-variant py-8 first:pt-0 last:border-b-0 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0 flex-1">
        <PostMeta date={article.date} label={article.category} className="mb-2" />
        <h3 className="mb-3 text-headline-md">
          <Link to={href} className="transition-colors hover:text-secondary">
            {article.title}
          </Link>
        </h3>
        <p className="mb-4 line-clamp-3 text-body-md text-secondary">{article.excerpt}</p>
        <ArrowLink to={href}>記事を読む</ArrowLink>
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt=""
          width={128}
          height={128}
          loading="lazy"
          decoding="async"
          className="h-32 w-32 shrink-0 self-center object-cover grayscale transition-[filter] duration-300 hover:grayscale-0 md:self-start"
        />
      )}
    </article>
  )
}
