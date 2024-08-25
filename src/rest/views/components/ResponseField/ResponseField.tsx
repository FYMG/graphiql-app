import React from 'react';
import Editor from '@monaco-editor/react';

interface ResponseFieldProps {
  response: Record<string, unknown> | null;
  status: number | null;
}

function ResponseField({ status, response }: ResponseFieldProps) {
  const textColorClass = status === 200 ? 'text-green-500' : 'text-orange-500';

  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Response</h3>
      {status && (
        <>
          <p className={textColorClass}>Status: {status}</p>
          <Editor
            className="border px-1"
            language="json"
            theme="vs-light"
            value={JSON.stringify(response, null, 2)}
            options={{ readOnly: true, automaticLayout: true }}
            height="100px"
            width="100%"
            data-testid="response-editor"
          />
        </>
      )}
    </div>
  );
}

export default ResponseField;
