import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

import { DropDownBtnProps } from '@rest/constants';

function DropDownBtn({ isHidden, onClick, text }: DropDownBtnProps) {
  const t = useTranslations('rest');
  const show = t('show');
  const hide = t('hide');

  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2">
      {!isHidden ? `${hide} ${text}` : `${show} ${text}`}
      {!isHidden ? (
        <FiChevronUp data-testid="FiChevronUp" />
      ) : (
        <FiChevronDown data-testid="FiChevronDown" />
      )}
    </button>
  );
}

export default DropDownBtn;
