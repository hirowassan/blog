/**
 * Single source of truth for every route path. Centralizing these avoids
 * hand-typed path strings drifting apart from the router definition as
 * pages are added.
 */
export const paths = {
  home: () => '/',
  about: () => '/about',
  articles: (page?: number) => (page && page > 1 ? `/articles?page=${page}` : '/articles'),
  articleDetail: (slug: string) => `/articles/${slug}`,
  weekly: (filter?: { year: number; month: number }) =>
    filter ? `/weekly?year=${filter.year}&month=${filter.month}` : '/weekly',
  weeklyDetail: (slug: string) => `/weekly/${slug}`,
} as const
