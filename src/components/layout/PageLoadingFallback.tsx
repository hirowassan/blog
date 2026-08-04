import { PageContainer } from './PageContainer'

/** Minimal fallback shown while a lazily-loaded page chunk downloads. */
export function PageLoadingFallback() {
  return (
    <PageContainer>
      <p className="text-label-md text-secondary">読み込み中…</p>
    </PageContainer>
  )
}
