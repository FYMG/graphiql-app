import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/shadcn/ui/select';
import { Methods, MethodsType } from '@rest/constants';

interface MethodSelectorProps {
  method: string;
  setMethod: (method: MethodsType) => void;
}

const methods = [
  Methods.GET,
  Methods.POST,
  Methods.PUT,
  Methods.DELETE,
  Methods.PATCH,
  Methods.HEAD,
  Methods.OPTIONS,
];

function MethodSelector({ method, setMethod }: MethodSelectorProps) {
  return (
    <Select value={method} onValueChange={setMethod}>
      <SelectTrigger className="w-auto gap-2">
        <SelectValue>{method}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {methods.map((methodItem) => (
          <SelectItem key={methodItem} value={methodItem}>
            {methodItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default MethodSelector;
