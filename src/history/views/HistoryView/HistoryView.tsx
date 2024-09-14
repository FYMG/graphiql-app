'use client';

import { useTranslations } from 'next-intl';
import { useRequestHistory } from '@history/hooks';
import Link from 'next/link';
import { routes } from '@shared/configs';
import { Spinner } from '@shared/components/Spinner';

const methodClasses = {
  GET: 'rounded-full px-2 py-1 bg-green-500 text-white',
  HEAD: 'rounded-full px-2 py-1 bg-blue-500 text-white',
  OPTIONS: 'rounded-full px-2 py-1 bg-gray-500 text-white',
  POST: 'rounded-full px-2 py-1 bg-yellow-500 text-white',
  PUT: 'rounded-full px-2 py-1 bg-orange-500 text-white',
  DELETE: 'rounded-full px-2 py-1 bg-red-500 text-white',
  PATCH: 'rounded-full px-2 py-1 bg-purple-500 text-white',
  GRAPHQL: 'rounded-full px-2 py-1 bg-pink-500 text-white',
} as const;

function HistoryView() {
  const { history, isLoading } = useRequestHistory();
  const t = useTranslations('history');

  return (
    <div className="flex flex-col gap-4 p-5">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && history.length > 0 && (
        <>
          <h1 className="text-2xl">{t('requests-history')}:</h1>
          <div className="flex flex-col gap-2">
            {history.map((item) => (
              <Link
                className="flex items-center gap-0.5"
                href={item.url}
                key={item.sendTime}
              >
                <span className={methodClasses[item.method]}>{item.method}</span>
                <span>{item.baseUrl}</span>
              </Link>
            ))}
          </div>
        </>
      )}
      {!isLoading && history.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl">{t('list-empty')}</h2>
          <p>{t('list-empty-try')}</p>
          <div className="flex gap-1">
            <Link className={methodClasses.GRAPHQL} href={routes.graphql()}>
              {t('graphql')}
            </Link>
            <Link
              className={methodClasses.GET}
              href={routes.rest({
                method: 'GET',
              })}
            >
              {t('rest')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryView;
