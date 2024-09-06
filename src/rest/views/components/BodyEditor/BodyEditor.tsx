import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/shadcn/ui/select';
import { Button } from '@shared/shadcn/ui/button';

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

type BodyFormat = 'JSON' | 'Plain Text';

function BodyEditor({ body, setBody }: BodyEditorProps) {
  const [format, setFormat] = useState<BodyFormat>('JSON');

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const onFormatChange = (newFormat: BodyFormat) => {
    setFormat(newFormat);
  };

  const handleEditorDidMount = (
    editorInstance: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editorInstance;
  };

  const prettifyContent = () => {
    if (editorRef.current) {
      editorRef.current?.getAction('editor.action.formatDocument')?.run();
    }
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
        onMount={handleEditorDidMount}
        height="100px"
        width="100%"
        data-testid="body-editor"
      />
      <Button variant={body.length ? 'default' : 'secondary'} onClick={prettifyContent}>
        Prettify
      </Button>
    </div>
  );
}

export default BodyEditor;
