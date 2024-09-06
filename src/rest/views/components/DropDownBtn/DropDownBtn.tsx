import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { DropDownBtnProps } from '@rest/constants';

function DropDownBtn({ isHidden, onClick, text }: DropDownBtnProps) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2">
      {!isHidden ? `Hide ${text}` : `Show ${text}`}
      {!isHidden ? <FiChevronUp /> : <FiChevronDown />}
    </button>
  );
}

export default DropDownBtn;
