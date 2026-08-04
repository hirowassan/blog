import { paths } from '@/routes/paths'

/** Shared between the desktop `Navigation` and the mobile disclosure menu. */
export const NAV_ITEMS = [
  { to: paths.home(), label: 'Home' },
  { to: paths.about(), label: 'About' },
  { to: paths.articles(), label: '一覧' },
  { to: paths.weekly(), label: '週報' },
] as const
