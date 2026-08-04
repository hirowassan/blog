import type { ReactNode } from 'react'
import { ArrowLink } from '@/components/common/ArrowLink'
import { PageContainer } from '@/components/layout/PageContainer'

interface ReadingLayoutProps {
  title: string
  /** Small meta line above the title, e.g. date + category. */
  meta: ReactNode
  backHref: string
  backLabel: string
  children: ReactNode
}

/**
 * Shared long-form reading layout for article and weekly-report detail
 * pages: a back link, a title block, then the rendered Markdown body.
 * Neither source design included detail-page mockups, so this was
 * designed to extend the list pages' visual language rather than copied
 * from an existing screen.
 */
export function ReadingLayout({ title, meta, backHref, backLabel, children }: ReadingLayoutProps) {
  return (
    <PageContainer>
      <ArrowLink to={backHref} direction="back" className="mb-10">
        {backLabel}
      </ArrowLink>

      <article>
        <header className="mb-10 border-b border-outline-variant pb-8">
          <p className="mb-3 text-label-md text-secondary">{meta}</p>
          <h1 className="text-headline-xl">{title}</h1>
        </header>

        <div className="prose max-w-none prose-headings:font-semibold">{children}</div>
      </article>
    </PageContainer>
  )
}
