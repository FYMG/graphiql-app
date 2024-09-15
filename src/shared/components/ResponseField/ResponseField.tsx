import React from 'react';
import { Editor } from '@monaco-editor/react';
import { useTranslations } from 'next-intl';

import { EmptyResponseField } from '@rest/views/components/EmptyResponseField';

interface ResponseFieldProps {
  loading: boolean;
  response: Record<string, unknown> | null;
  status: number | null;
}

function ResponseField({ status, response, loading }: ResponseFieldProps) {
  const t = useTranslations('rest');
  const textColorClass =
    status && status >= 200 && status < 300 ? 'text-green-500' : 'text-orange-500';

  const getEditorValue = () => {
    if (loading) {
      return `${t('loading-response')}...`;
    }

    if (typeof response === 'string') {
      return response;
    }

    return JSON.stringify(response, null, 2);
  };

  return (
    <div className="mb-4 px-1">
      <h3 className="mb-2 font-semibold">{t('response')}</h3>
      {status ? (
        <>
          <p>
            {t('status')}

            <span className={textColorClass}>{loading ? t('loading') : status}</span>
          </p>
          <Editor
            className="border px-1"
            language="json"
            theme="vs-light"
            value={getEditorValue()}
            options={{ readOnly: true, automaticLayout: true }}
            height="150px"
            width="100%"
            data-testid="response-editor"
          />
        </>
      ) : (
        <EmptyResponseField />
      )}
    </div>
  );
}

export default ResponseField;
