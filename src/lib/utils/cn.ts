import clsx, { type ClassValue } from 'clsx'

/** Thin wrapper around `clsx` so components import one shared helper. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
