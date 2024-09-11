'use client';

import Link from 'next/link';
import { routes } from '@shared/configs';
import { useAuth } from '@auth/providers/AuthProvider';
import LocaleDropDown from 'src/shared/components/LocaleSelect';
import { ThemeToggle } from '@shared/components/ThemeToggle';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

function Header() {
  const { logout, isAuth } = useAuth();
  const t = useTranslations('shared');

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      data-testid="header"
      className={clsx(
        'top-0 flex items-center justify-between p-2 transition-all duration-300',
        {
          'fixed top-0 w-full bg-gray-800 py-2 text-white shadow-md': isSticky,
          'bg-white py-4 text-black dark:bg-gray-900 dark:text-white': !isSticky,
        }
      )}
    >
      <Link href={routes.main}>
        <Image width={50} height={50} alt={t('header-logo-alt')} src="/logo.png" />
      </Link>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LocaleDropDown />
        {isAuth ? (
          <button type="button" onClick={logout}>
            {t('logout')}
          </button>
        ) : (
          <>
            <Link href={routes.login}>{t('login')}</Link>
            <Link href={routes.register}>{t('register')}</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
