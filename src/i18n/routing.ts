import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'pt', 'tr', 'ja', 'ko', 'vi', 'th', 'zh'],
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'as-needed'
});