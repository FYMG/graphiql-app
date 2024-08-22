'use client';

import { useRouter } from 'next/navigation';
import { app } from '@shared/configs';

const useLanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (lang: (typeof app.locale)[number]) => {
    const date = new Date();

    date.setFullYear(9999);

    document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`;
    router.refresh();
  };

  return {
    changeLanguage,
  };
};

export default useLanguageSwitcher;
