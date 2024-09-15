'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { parse, print } from 'graphql';
import { Button } from '@shared/shadcn/ui/button';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

interface GraphQLEditorProps {
  query: string;
  setQuery: (newQuery: string) => void;
}

function GraphQLEditor({ query, setQuery }: GraphQLEditorProps) {
  const t = useTranslations('rest');
  const { theme } = useTheme();

  const prettifyQuery = () => {
    const parsed = parse(query);
    const prettyQuery = print(parsed);

    setQuery(prettyQuery);
  };

  return (
    <>
      <h3 className="mb-2 font-semibold">{t('body')}</h3>
      <div className="mb-2 flex justify-start gap-2">
        <Button variant={query.length ? 'default' : 'secondary'} onClick={prettifyQuery}>
          {t('prettify')}
        </Button>
      </div>
      <Editor
        className="border px-1"
        defaultLanguage="graphql"
        defaultValue={query}
        value={query}
        onChange={(value) => setQuery(value || '')}
        options={{
          lineNumbers: 'on',
          theme: `vs-${theme}`,
          wordWrap: 'on',
        }}
        height="230px"
        width="100%"
        data-testid="body-editor"
      />
    </>
  );
}

export default GraphQLEditor;
