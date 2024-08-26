import React from 'react';

interface HeaderEditorProps {
  headers: { key: string; value: string }[];
  setHeaders: (headers: { key: string; value: string }[]) => void;
}

function HeaderEditor({ headers, setHeaders }: HeaderEditorProps) {
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
    <div>
      <h3 className="mb-2 font-semibold">Headers</h3>
      {headers.map((header, index) => (
        <div
          key={Date.now()}
          className="flex justify-between rounded-md border border-gray-300"
        >
          <input
            type="text"
            placeholder="Header Key"
            value={header.key}
            onChange={(e) => updateHeader(index, e.target.value, header.value)}
            className="border-r border-gray-300 px-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Header Value"
            value={header.value}
            onChange={(e) => updateHeader(index, header.key, e.target.value)}
            className="px-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeHeader(index)}
            className="linear h-full rounded-sm bg-accent px-3 text-accent-foreground transition delay-150 hover:bg-foreground hover:text-accent"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addHeader} className="mb-2 text-sm text-blue-500">
        Add Header
      </button>
    </div>
  );
}

export default HeaderEditor;
