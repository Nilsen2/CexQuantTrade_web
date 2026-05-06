import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
// import {cookies} from 'next/headers';
// import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
// If your app doesn’t require unique pathnames per locale, you can provide a locale to next-intl based on user preferences or other application logic.
//   const store = await cookies();
//   const locale = store.get('locale')?.value || 'en';
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});