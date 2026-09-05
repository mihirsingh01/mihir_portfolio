import { useMemo } from 'react';

export type NewspaperDateFormat = 'uppercase' | 'title' | 'short';

/**
 * Generates dynamic, real-time date strings formatted in authentic New York Times masthead style.
 * e.g.,
 * - 'uppercase': "SATURDAY, SEPTEMBER 5, 2026"
 * - 'title': "Saturday, September 5, 2026"
 * - 'short': "September 5, 2026"
 */
export function getNewspaperDate(format: NewspaperDateFormat = 'uppercase'): string {
  const today = new Date();

  if (format === 'short') {
    const shortOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', shortOptions).format(today).toUpperCase();
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(today);
  return format === 'uppercase' ? formatted.toUpperCase() : formatted;
}

/**
 * Direct alias for getNewspaperDate
 */
export function getFormattedNewspaperDate(format: NewspaperDateFormat = 'uppercase'): string {
  return getNewspaperDate(format);
}

/**
 * Client-safe, performance-memoized hook for dynamic newspaper dates
 */
export function useNewspaperDate(format: NewspaperDateFormat = 'uppercase'): string {
  return useMemo(() => getNewspaperDate(format), [format]);
}
