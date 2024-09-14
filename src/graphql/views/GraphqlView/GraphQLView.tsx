'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@shared/shadcn/ui/button';
import { ResponseField } from '@rest/views/components/ResponseField';
import debounce from 'lodash/debounce';
import { KeyValue } from '@shared/hooks/useRequestProperties';
import { useParams } from 'next/navigation';
import useFetchData from '@shared/hooks/useApiCall';
import { Methods } from '@rest/constants';
import { UrlInput } from '../../components/UrlInput';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import PropertyEditor from '../../components/PropertyEditor/PropertyEditor';

function encodeToBase64(str: string): string {
  return btoa(str);
}

function decodeFromBase64(str: string): string {
  return atob(decodeURIComponent(str));
}

function GraphQLView() {
  const { slug } = useParams() as {
    slug: string[];
  };

  const [endPoint, setEndPoint] = useState<string>(
    slug && slug.length > 0 ? decodeFromBase64(slug?.[0]) : ''
  );
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [query, setQuery] = useState<string>(
    slug && slug.length > 1
      ? decodeFromBase64(slug?.[1])
      : `
    query GetUsers {
      users {
        id
        name
      }
    }
  `
  );
  const [headers, setHeaders] = useState<KeyValue[]>([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [variables, setVariables] = useState<KeyValue[]>([]);

  const debouncedNavigate = useMemo(
    () =>
      debounce(() => {
        const encodedEndpoint = encodeToBase64(endPoint === '' ? 'http://' : endPoint);
        const encodedBody = encodeToBase64(query);
        const queryParamsString = [...headers, ...variables]
          .filter((item) => item.key)
          .map((item) => `${item.key}=${item.value}`)
          .join('&');

        window.history.replaceState(
          null,
          '',
          `/graphql/${encodedEndpoint}/${encodedBody}?${queryParamsString}`
        );
      }, 500),
    [endPoint, headers, variables, query]
  );

  useEffect(() => {
    debouncedNavigate();
  }, [endPoint, headers, variables, query, debouncedNavigate]);

  const { response, status, loading, fetchData } = useFetchData();

  const executeQuery = async () => {
    await fetchData(
      endPoint,
      Methods.Post,
      JSON.stringify({
        query,
        variables: {},
      }),
      headers,
      variables
    );
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
      <PropertyEditor title="headers" onPropertyChange={setHeaders} items={headers} />
      <GraphQLEditor query={query} setQuery={setQuery} />
      <PropertyEditor
        title="variables"
        onPropertyChange={setVariables}
        items={variables}
      />
      <Button onClick={executeQuery} disabled={loading}>
        {loading ? 'Running...' : 'Run Query'}
      </Button>
      <ResponseField loading={loading} response={response} status={status} />
    </div>
  );
}

export default GraphQLView;
