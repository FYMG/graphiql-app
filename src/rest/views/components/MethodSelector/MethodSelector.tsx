import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';

interface MethodSelectorProps {
  method: string;
  setMethod: (method: string) => void;
}

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

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
