import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
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
  setEncodedBody: (encodedBody: string) => void;
}

type BodyFormat = 'JSON' | 'Plain Text';

function BodyEditor({ body, setBody, setEncodedBody }: BodyEditorProps) {
  const [format, setFormat] = useState<BodyFormat>('JSON');
  const t = useTranslations('rest');

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const onFormatChange = (newFormat: BodyFormat) => {
    setFormat(newFormat);
  };

  const handleEditorDidMount = (
    editorInstance: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editorInstance;

    editorInstance.onDidBlurEditorText(() => {
      const currentBody = editorInstance.getValue();
      const encodedBody = currentBody ? btoa(currentBody) : '';

      setEncodedBody(encodedBody);
    });
  };

  const prettifyContent = () => {
    if (editorRef.current) {
      editorRef.current?.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div className="mb-4 px-1">
      <h3 className="mb-2 font-semibold">{t('body')}</h3>
      <div className="flex justify-start gap-2">
        <Select onValueChange={onFormatChange} value={format}>
          <SelectTrigger className="mb-2 w-auto gap-2 border-r focus:outline-none">
            <SelectValue placeholder="Select format">{format}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JSON">JSON</SelectItem>
            <SelectItem value="Plain Text">{t('plain-text')}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant={body.length ? 'default' : 'secondary'} onClick={prettifyContent}>
          {t('prettify')}
        </Button>
      </div>

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
    </div>
  );
}

export default BodyEditor;
