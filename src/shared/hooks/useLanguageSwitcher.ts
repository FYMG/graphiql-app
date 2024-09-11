'use client';

import { useRouter } from 'next/navigation';
import { app } from '@shared/configs';
import isLocale from '@shared/helpers/isLocale';
import { useLocale } from 'next-intl';

const useLanguageSwitcher = () => {
  const router = useRouter();
  const localesList = app.locale;
  const locale = useLocale();

  const currentLocale: (typeof app.locale)[number] = isLocale(locale)
    ? (locale as (typeof app.locale)[number])
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
