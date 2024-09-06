import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/shadcn/ui/select';
import { Methods } from '@rest/constants';

interface MethodSelectorProps {
  method: Methods;
  setMethod: (method: Methods) => void;
}

const methods = [Methods.Get, Methods.Post, Methods.Put, Methods.Delete];

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
