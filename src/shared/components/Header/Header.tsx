'use client';

import { useLanguageSwitcher } from '@shared/hooks';
import Link from 'next/link';
import { routes } from '@shared/configs';

function Header() {
  const { changeLanguage } = useLanguageSwitcher();

  return (
    <header className="dark flex justify-between">
      <Link href={routes.main}>Header</Link>
      <div>
        <button type="button" onClick={() => changeLanguage('en')}>
          English
        </button>
        <button type="button" onClick={() => changeLanguage('ru')}>
          Русский
        </button>
      </div>
      <div>
        <Link href={routes.login}>Login</Link>
        <Link href={routes.register}>Register</Link>
        <Link href={routes.history}>History</Link>
      </div>
    </header>
  );
}

export default Header;
