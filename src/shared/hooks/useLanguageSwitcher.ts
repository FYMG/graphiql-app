'use client';
import { useRouter } from 'next/navigation';

const useLanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (lang: 'en' | 'ru') => {
    const date = new Date();
    date.setFullYear(9999);

    document.cookie =
      'NEXT_LOCALE' + '=' + lang + '; expires=' + date.toUTCString() + '; path=/';
    router.refresh();
  };

  return {
    changeLanguage,
  };
};

export default useLanguageSwitcher;
