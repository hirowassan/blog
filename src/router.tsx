import { lazy, Suspense, type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageLoadingFallback } from '@/components/layout/PageLoadingFallback'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/HomePage'

// Keep the initial home route eager so the first paint doesn't flash the
// route-level loading fallback before the page content is ready.
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ArticlesPage = lazy(() =>
  import('@/pages/ArticlesPage').then((m) => ({ default: m.ArticlesPage })),
)
const ArticleDetailPage = lazy(() =>
  import('@/pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })),
)
const WeeklyPage = lazy(() => import('@/pages/WeeklyPage').then((m) => ({ default: m.WeeklyPage })))
const WeeklyDetailPage = lazy(() =>
  import('@/pages/WeeklyDetailPage').then((m) => ({ default: m.WeeklyDetailPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function withSuspense(element: ReactElement) {
  return <Suspense fallback={<PageLoadingFallback />}>{element}</Suspense>
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={withSuspense(<AboutPage />)} />
        <Route path="/articles" element={withSuspense(<ArticlesPage />)} />
        <Route path="/articles/:slug" element={withSuspense(<ArticleDetailPage />)} />
        <Route path="/weekly" element={withSuspense(<WeeklyPage />)} />
        <Route path="/weekly/:slug" element={withSuspense(<WeeklyDetailPage />)} />
        <Route path="*" element={withSuspense(<NotFoundPage />)} />
      </Route>
    </Routes>
  )
}
