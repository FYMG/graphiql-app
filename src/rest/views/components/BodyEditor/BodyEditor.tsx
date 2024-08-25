import React from 'react';
import Editor from '@monaco-editor/react';

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

function BodyEditor({ body, setBody }: BodyEditorProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Body</h3>
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
