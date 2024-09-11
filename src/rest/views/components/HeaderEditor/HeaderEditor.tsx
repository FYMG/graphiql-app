import React, { useId, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';
import { HeaderEditorProps } from '@rest/constants';
import { DropDownBtn } from '../DropDownBtn';

function HeaderEditor({ headers, setHeaders }: HeaderEditorProps) {
  const [isHidden, setIsHidden] = useState(false);
  const t = useTranslations('rest');

  const headerBlockId = useId();
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
    setIsHidden(false);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { ...header, key, value } : header
    );

    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const hiddenHeaders = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="mb-2 px-1">
      <div className="flex justify-between">
        <h3 className="font-semibold">{t('headers')}</h3>
        {headers.length ? (
          <DropDownBtn
            isHidden={isHidden}
            onClick={hiddenHeaders}
            text={t('headers').toLowerCase()}
          />
        ) : null}
      </div>
      {!isHidden &&
        headers.map((header, index) => (
          <div
            key={headerBlockId}
            className="flex justify-between gap-2 rounded-md border border-gray-300 px-1 py-1"
          >
            <Input
              type="text"
              placeholder={t('header-key')}
              value={header.key}
              onChange={(e) => updateHeader(index, e.target.value, header.value)}
            />
            <Input
              type="text"
              placeholder={t('header-value')}
              value={header.value}
              onChange={(e) => updateHeader(index, header.key, e.target.value)}
            />
            <Button variant="default" onClick={() => removeHeader(index)}>
              {t('remove')}
            </Button>
          </div>
        ))}

      <Button
        variant="link"
        onClick={addHeader}
        className="m-0 h-auto p-0 text-sm text-blue-400 transition delay-150 hover:text-blue-700 hover:no-underline"
      >
        {t('add-header')}
      </Button>
    </div>
  );
}

export default HeaderEditor;
