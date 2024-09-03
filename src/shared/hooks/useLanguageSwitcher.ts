'use client';

import { useRouter } from 'next/navigation';
import { app } from '@shared/configs';
import isLocale from '@shared/helpers/isLocale';

const useLanguageSwitcher = () => {
  const router = useRouter();
  const localesList = app.locale;
  const cookiesLocale =
    typeof window !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('NEXT_LOCALE='))
          ?.split('=')[1] || app.defaultLocale
      : app.defaultLocale;

  const currentLocale: (typeof app.locale)[number] = isLocale(cookiesLocale)
    ? (cookiesLocale as (typeof app.locale)[number])
    : app.defaultLocale;

  const changeLanguage = (lang: (typeof app.locale)[number]) => {
    const date = new Date();

    date.setFullYear(9999);

    document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`;
    router.refresh();
  };

  return {
    localesList,
    currentLocale,
    changeLanguage,
  };
};

export default useLanguageSwitcher;
