'use client';

import { useAuth } from '@auth/providers/AuthProvider';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { routes } from '@shared/configs';

function MainView() {
  const { isAuth, user } = useAuth();
  const t = useTranslations('shared');

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>
        {isAuth ? `${t('welcome-back')}, ${user?.email ?? ''}` : `${t('welcome')}!`}
      </h1>
      {isAuth ? (
        <div className="flex gap-4">
          <Link href={routes.graphql()}>{t('graphql-client')}</Link>
          <Link href={routes.rest({ method: 'GET' })}>{t('rest-client')}</Link>
          <Link href={routes.history}>{t('requests-history')}</Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href={routes.login}>{t('login')}</Link>
          <Link href={routes.register}>{t('register')}</Link>
        </div>
      )}
    </div>
  );
}

export default MainView;
