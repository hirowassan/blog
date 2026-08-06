import fm from 'front-matter'
import type { ZodType } from 'zod'

export interface ParsedMarkdownModule<TFrontmatter> {
  /** Stable identifier derived from the filename, used for routing. */
  slug: string
  frontmatter: TFrontmatter
  /** Markdown body with the frontmatter block removed. */
  content: string
}

/**
 * Parses a single raw markdown file (as returned by `import.meta.glob`)
 * into a validated frontmatter object plus the remaining body text.
 *
 * Validation happens through the provided Zod schema rather than trusting
 * `front-matter`'s output as-is, so a malformed content file fails loudly
 * and specifically instead of surfacing as an `undefined` deep in the UI.
 *
 * @param path   The glob-resolved file path, used to derive the slug.
 * @param raw    Raw markdown file contents, including the frontmatter block.
 * @param schema Zod schema the frontmatter block must satisfy.
 */
export function parseMarkdownModule<TFrontmatter>(
  path: string,
  raw: string,
  schema: ZodType<TFrontmatter>,
): ParsedMarkdownModule<TFrontmatter> {
  const { attributes, body } = fm<unknown>(raw)
  const normalizedAttributes = normalizeFrontmatterAttributes(attributes)

  const result = schema.safeParse(normalizedAttributes)
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in "${path}":\n${result.error.issues
        .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')}`,
    )
  }

  return {
    slug: extractSlug(path),
    frontmatter: result.data,
    content: body.trim(),
  }
}

function normalizeFrontmatterAttributes(attributes: unknown): Record<string, unknown> {
  const normalized = { ...(attributes as Record<string, unknown>) }

  if (normalized.date instanceof Date) {
    normalized.date = normalized.date.toISOString().slice(0, 10)
  }

  return normalized
}

function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.md$/, '')
}
