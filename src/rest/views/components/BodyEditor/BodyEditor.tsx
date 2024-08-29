import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

function BodyEditor({ body, setBody }: BodyEditorProps) {
  const [format, setFormat] = useState<'json' | 'plaintext'>('json');

  const onFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value as 'json' | 'plaintext');
  };

  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Body</h3>
      <select
        value={format}
        onChange={onFormatChange}
        className="border-r focus:outline-none"
      >
        <option value="json">JSON</option>
        <option value="plaintext">Plain Text</option>
      </select>
      <Editor
        className="border px-1"
        language="json"
        theme="vs-light"
        value={body}
        options={{ automaticLayout: true }}
        onChange={(value) => setBody(value || '')}
        height="100px"
        width="100%"
        data-testid="body-editor"
      />
    </div>
  );
}

export default BodyEditor;
