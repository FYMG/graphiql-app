'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@shared/shadcn/ui/button';
import { ResponseField } from '@rest/views/components/ResponseField';
import debounce from 'lodash/debounce';
import { KeyValue } from '@shared/hooks/useRequestProperties';
import { useRouter } from 'next/navigation';
import { UrlInput } from '../../components/UrlInput';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import { ResponseSection } from '../../components/ResponseSection';
import PropertyEditor from '../../components/PropertyEditor/PropertyEditor';

function GraphQLView() {
  const [endPoint, setEndPoint] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [query, setQuery] = useState<string>(`
    query GetUsers {
      users {
        id
        name
      }
    }
  `);
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [headers, setHeaders] = useState<KeyValue[]>([]);
  const [variables, setVariables] = useState<KeyValue[]>([]);

  const router = useRouter();

  function encodeToBase64(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  // function decodeFromBase64(str: string): string {
  //   return decodeURIComponent(escape(atob(str)));
  // }

  const debouncedNavigate = useMemo(
    () =>
      debounce(() => {
        const encodedEndpoint = encodeToBase64(endPoint === '' ? 'http://' : endPoint);
        const encodedBody = encodeToBase64(query);
        const queryParamsString = [...headers, ...variables]
          .filter((item) => item.key)
          .map((item) => `${item.key}=${item.value}`)
          .join('&');

        router.push(`/graphql/${encodedEndpoint}/${encodedBody}?${queryParamsString}`);
      }, 500),
    [endPoint, headers, variables, query]
  );

  useEffect(() => {
    debouncedNavigate();
  }, [endPoint, headers, variables, query]);

  const executeQuery = async () => {
    setLoading(true);

    try {
      const res = await fetch(endPoint, {
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

      setStatus(res.status);

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
          url={endPoint}
          setUrl={setEndPoint}
        />
      </div>
      <div className="mb-4 flex h-12 flex-wrap items-center gap-2 border bg-background px-1">
        <UrlInput label="SDL URL" elementId="sdl-url" url={sdlUrl} setUrl={setSdlUrl} />
      </div>
      <PropertyEditor title="headers" onPropertyChange={setHeaders} />
      <GraphQLEditor query={query} setQuery={setQuery} />
      <PropertyEditor title="variables" onPropertyChange={setVariables} />
      <Button onClick={executeQuery} disabled={loading}>
        {loading ? 'Running...' : 'Run Query'}
      </Button>
      <ResponseSection response={response} />
      <ResponseField loading={loading} response={response} status={status} />
    </div>
  );
}

export default GraphQLView;
