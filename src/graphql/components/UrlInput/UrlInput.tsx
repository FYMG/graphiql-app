'use client';

import { Input } from '@shared/shadcn/ui/input';
import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Label } from '@shared/shadcn/ui/label';

interface UrlInputProps {
  elementId: string;
  label: string;
  setUrl: (newUrl: string) => void;
  url: string;
}

function UrlInput({ elementId, url, setUrl, label }: UrlInputProps) {
  const t = useTranslations('rest');
  const [isError] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <>
      {label ? <Label htmlFor={elementId}>{label}</Label> : ''}
      <Input
        id={elementId}
        type="text"
        placeholder={isError ? t('error-placeholder') : t('placeholder')}
        value={url}
        onChange={handleChange}
        className={`w-auto grow ${isError ? 'border border-red-500' : ''}`}
      />
    </>
  );
}

export default UrlInput;
