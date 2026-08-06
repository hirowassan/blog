#!/usr/bin/env node
/**
 * Generates public/rss.xml from the same markdown content the site reads
 * at runtime (src/content/articles, src/content/weekly).
 *
 * Runs automatically before `dev` and `build` (see the "predev"/"prebuild"
 * scripts in package.json), so the feed can never go stale relative to
 * what's actually published — there's no separate step to remember.
 *
 * This can't reuse src/lib/content directly: that code relies on Vite's
 * `import.meta.glob`, which only exists inside Vite's own dev/build
 * pipeline, not in a plain Node script. What's duplicated here is kept
 * small and obvious on purpose:
 *   - frontmatter parsing uses the same `front-matter` package the app
 *     uses (via parseMarkdownModule.ts), so parsing behavior can't drift.
 *   - the `/articles/:slug` and `/weekly/:slug` URL shapes mirror
 *     routes/paths.ts. Pulling that in for real would mean adding a
 *     TypeScript execution step (ts-node/tsx) just to avoid a two-line
 *     duplication — not a good trade for a personal blog's build script.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fm from 'front-matter'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// Can be overridden per-environment via `SITE_URL=... node scripts/generate-rss.mjs`
// (useful if Cloudflare Pages preview deployments should point at their own
// *.pages.dev URL instead of production — see DEPLOYMENT.md).
const SITE_URL = process.env.SITE_URL ?? 'https://hirowassan.com'
const SITE_TITLE = "hirowassan's Blog"
const SITE_DESCRIPTION = 'のんびりとした日々と思考の記録。'

const articles = readMarkdownFiles('src/content/articles').map(({ slug, path, attributes }) => {
  requireFields(path, attributes, ['title', 'date', 'excerpt'])
  return {
    title: attributes.title,
    date: attributes.date,
    description: attributes.excerpt,
    link: `${SITE_URL}/articles/${slug}`,
  }
})

const weeklyReports = readMarkdownFiles('src/content/weekly').map(({ slug, path, attributes }) => {
  requireFields(path, attributes, ['title', 'date', 'week'])
  // Mirrors formatWeeklyTitle() in src/lib/content/weekly.ts — keep in sync
  // if that format ever changes.
  const title = `第${attributes.week}週:${attributes.title}`
  return {
    title,
    date: attributes.date,
    description: title,
    link: `${SITE_URL}/weekly/${slug}`,
  }
})

const items = [...articles, ...weeklyReports].sort((a, b) => b.date.localeCompare(a.date))

mkdirSync(join(ROOT, 'public'), { recursive: true })
writeFileSync(join(ROOT, 'public/rss.xml'), buildRssXml(items))
console.log(`Generated public/rss.xml with ${items.length} item(s).`)

function readMarkdownFiles(relativeDir) {
  const dir = join(ROOT, relativeDir)
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const path = join(relativeDir, file)
      const raw = readFileSync(join(dir, file), 'utf-8')
      const { attributes } = fm(raw)
      const normalizedAttributes = normalizeFrontmatterAttributes(attributes)
      const slug = file.replace(/\.md$/, '')
      return { slug, path, attributes: normalizedAttributes }
    })
}

function normalizeFrontmatterAttributes(attributes) {
  const normalized = { ...attributes }

  if (normalized.date instanceof Date) {
    normalized.date = normalized.date.toISOString().slice(0, 10)
  }

  return normalized
}

/** Fails loudly on malformed content, same philosophy as parseMarkdownModule.ts. */
function requireFields(path, attributes, fields) {
  const missing = fields.filter((field) => attributes[field] === undefined)
  if (missing.length > 0) {
    throw new Error(`Cannot build RSS item — "${path}" is missing: ${missing.join(', ')}`)
  }
}

function buildRssXml(items) {
  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${itemsXml}
  </channel>
</rss>
`
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
