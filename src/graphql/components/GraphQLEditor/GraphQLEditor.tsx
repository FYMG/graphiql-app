'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { parse, print } from 'graphql';
import { Button } from '@shared/shadcn/ui/button';
import { useTheme } from 'next-themes';

interface GraphQLEditorProps {
  query: string;
  setQuery: (newQuery: string) => void;
}

function GraphQLEditor({ query, setQuery }: GraphQLEditorProps) {
  const { theme } = useTheme();

  const prettifyQuery = () => {
    const parsed = parse(query);
    const prettyQuery = print(parsed);

    setQuery(prettyQuery);
  };

  return (
    <>
      <Editor
        height="230px"
        defaultLanguage="graphql"
        defaultValue={query}
        value={query}
        onChange={(value) => setQuery(value || '')} // Update query state
        options={{
          lineNumbers: 'on',
          theme: `vs-${theme}`,
          wordWrap: 'on',
        }}
      />
      <Button onClick={prettifyQuery}>Prettify GraphQL</Button>
    </>
  );
}

export default GraphQLEditor;
