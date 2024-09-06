import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/shadcn/ui/select';

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

type BodyFormat = 'JSON' | 'Plain Text';

function BodyEditor({ body, setBody }: BodyEditorProps) {
  const [format, setFormat] = useState<BodyFormat>('JSON');

  const onFormatChange = (newFormat: BodyFormat) => {
    setFormat(newFormat);
  };

  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Body</h3>
      <Select onValueChange={onFormatChange} value={format}>
        <SelectTrigger className="mb-2 w-auto gap-2 border-r focus:outline-none">
          <SelectValue placeholder="Select format">{format}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="JSON">JSON</SelectItem>
          <SelectItem value="Plain Text">Plain Text</SelectItem>
        </SelectContent>
      </Select>
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
