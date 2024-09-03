'use client';

import Link from 'next/link';
import { routes } from '@shared/configs';
import { useAuth } from '@auth/providers/AuthProvider';
import LocaleDropDown from 'src/shared/components/LocaleSelect';

function Header() {
  const { logout, isAuth } = useAuth();

  return (
    <header className="dark flex justify-between">
      <Link href={routes.main}>Header</Link>
      <div>
        <LocaleDropDown />
      </div>
      <div>
        {isAuth ? (
          <button type="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link href={routes.login}>Login</Link>
        )}
        <Link href={routes.history}>History</Link>
      </div>
    </header>
  );
}

export default Header;
