import React, { useId } from 'react';

import { Input } from '@shared/components/ui/input';
import { Button } from '@shared/components/ui/button';
import { HeaderEditorProps } from '@rest/constants';

function HeaderEditor({ headers, setHeaders }: HeaderEditorProps) {
  const headerBlockId = useId();
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
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

  return (
    <div className="mb-2">
      <h3 className="font-semibold">Headers</h3>
      {headers.map((header, index) => (
        <div
          key={headerBlockId}
          className="flex justify-between gap-2 rounded-md border border-gray-300 px-1 py-1"
        >
          <Input
            type="text"
            placeholder="Header Key"
            value={header.key}
            onChange={(e) => updateHeader(index, e.target.value, header.value)}
          />
          <Input
            type="text"
            placeholder="Header Value"
            value={header.value}
            onChange={(e) => updateHeader(index, header.key, e.target.value)}
          />
          <Button variant="default" onClick={() => removeHeader(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="link"
        onClick={addHeader}
        className="m-0 h-auto p-0 text-sm text-blue-400 transition delay-150 hover:text-blue-700 hover:no-underline"
      >
        Add Header
      </Button>
    </div>
  );
}

export default HeaderEditor;
