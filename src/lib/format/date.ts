const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export interface DateParts {
  year: number
  /** 1–12 */
  month: number
  day: number
}

/**
 * Parses a "YYYY-MM-DD" string into its numeric parts directly, without
 * going through `Date`. `new Date("YYYY-MM-DD")` parses as UTC midnight,
 * and reading it back with local getters can silently shift the date by
 * a day depending on the reader's timezone — splitting the string avoids
 * that class of bug entirely.
 */
export function parseIsoDate(isoDate: string): DateParts {
  const [year, month, day] = isoDate.split('-').map(Number)
  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`Invalid ISO date: "${isoDate}"`)
  }
  return { year, month, day }
}

/** "2024-05-20" -> "2024.05.20", matching the design's date style. */
export function formatDisplayDate(isoDate: string): string {
  const { year, month, day } = parseIsoDate(isoDate)
  return `${year}.${pad(month)}.${pad(day)}`
}

/** 1 -> "January", 4 -> "April", etc. */
export function getMonthLabel(month: number): string {
  const label = MONTH_LABELS[month - 1]
  if (!label) throw new Error(`Invalid month: ${month}`)
  return label
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}
