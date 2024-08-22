import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { app } from '@shared/configs';

function isLocale(value: string | undefined) {
  if (value === undefined) return false;

  return app.locale.includes(value as (typeof app.locale)[number]);
}

export default getRequestConfig(async () => {
  const cookiesLocale = cookies().get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookiesLocale)
    ? (cookiesLocale as (typeof app.locale)[number])
    : app.locale[1];

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
