'use client';

import React, { useState } from 'react';
import { Button } from '@shared/shadcn/ui/button';
import { UrlInput } from '../../components/UrlInput';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import { ResponseSection } from '../../components/ResponseSection';
import PropertyEditor from '../../components/PropertyEditor/PropertyEditor';

function GraphQLView() {
  const [url, setUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [query, setQuery] = useState<string>(`
    query GetUsers {
      users {
        id
        name
      }
    }
  `);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const executeQuery = async () => {
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers here (e.g., Authorization)
        },
        body: JSON.stringify({
          query,
          variables: {},
        }),
      });

      if (!res.ok) {
        setResponse(res);

        return;
      }

      setResponse(await res.json());
    } catch (error) {
      console.error(`An unknown error occurred:${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-4 max-w-[700px] bg-background shadow-md">
      <div className="mb-4 flex h-12 flex-wrap items-center gap-2 border bg-background px-1">
        <UrlInput
          label="Endpoint URL"
          elementId="endpoint-url"
          url={url}
          setUrl={setUrl}
        />
      </div>
      <div className="mb-4 flex h-12 flex-wrap items-center gap-2 border bg-background px-1">
        <UrlInput label="SDL URL" elementId="sdl-url" url={sdlUrl} setUrl={setSdlUrl} />
      </div>
      <PropertyEditor title="headers" />
      <GraphQLEditor query={query} setQuery={setQuery} />
      <PropertyEditor title="variables" />
      <Button onClick={executeQuery} disabled={loading}>
        {loading ? 'Running...' : 'Run Query'}
      </Button>
      <ResponseSection response={response} />
    </div>
  );
}

export default GraphQLView;
