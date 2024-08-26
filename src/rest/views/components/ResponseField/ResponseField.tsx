import React from 'react';
import Editor from '@monaco-editor/react';

import { EmptyResponseField } from '../EmptyResponseField';

interface ResponseFieldProps {
  response: Record<string, unknown> | null;
  status: number | null;
}

function ResponseField({ status, response }: ResponseFieldProps) {
  const textColorClass =
    status && status >= 200 && status < 300 ? 'text-green-500' : 'text-orange-500';

  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Response</h3>
      {status ? (
        <>
          <p>
            Status: <span className={textColorClass}>{status}</span>
          </p>
          <Editor
            className="border px-1"
            language="json"
            theme="vs-light"
            value={
              typeof response === 'string' ? response : JSON.stringify(response, null, 2)
            }
            options={{ readOnly: true, automaticLayout: true }}
            height="150px"
            width="100%"
            data-testid="response-editor"
          />
        </>
      ) : (
        <EmptyResponseField />
      )}
    </div>
  );
}

export default ResponseField;
