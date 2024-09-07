import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function EmptyResponseField() {
  const t = useTranslations('rest');

  return (
    <div className="mb-4 flex flex-col items-center gap-2">
      <Image src="/rest-img.png" alt="Empty URL field" width={100} height={100} />
      <span className="text-foreground">{t('empty-placeholder')}</span>
    </div>
  );
}

export default EmptyResponseField;
