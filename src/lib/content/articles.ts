import { articleFrontmatterSchema, type Article } from './article.schema'
import { parseMarkdownModule } from './parse-markdown-module'

const rawModules = import.meta.glob('/src/content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** All articles, sorted newest first. Parsed once at module load. */
const allArticles: Article[] = Object.entries(rawModules)
  .map(([path, raw]) => {
    const { slug, frontmatter, content } = parseMarkdownModule(
      path,
      raw,
      articleFrontmatterSchema,
    )
    return { slug, content, ...frontmatter }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export const ARTICLES_PER_PAGE = 4

export interface PaginatedArticles {
  items: Article[]
  currentPage: number
  totalPages: number
}

/** Every article, newest first. */
export function getAllArticles(): Article[] {
  return allArticles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((article) => article.slug === slug)
}

/** One page of articles for the archive listing. `page` is clamped into range. */
export function getPaginatedArticles(page: number): PaginatedArticles {
  const totalPages = Math.max(1, Math.ceil(allArticles.length / ARTICLES_PER_PAGE))
  const currentPage = clamp(page, 1, totalPages)
  const start = (currentPage - 1) * ARTICLES_PER_PAGE

  return {
    items: allArticles.slice(start, start + ARTICLES_PER_PAGE),
    currentPage,
    totalPages,
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
