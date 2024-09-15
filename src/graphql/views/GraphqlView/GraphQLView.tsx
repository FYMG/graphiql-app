'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@shared/shadcn/ui/button';
import { ResponseField } from '@rest/views/components/ResponseField';
import debounce from 'lodash/debounce';
import { KeyValue } from '@shared/hooks/useRequestProperties';
import { useParams, useSearchParams } from 'next/navigation';
import useFetchData from '@shared/hooks/useApiCall';
import { Methods } from '@rest/constants';
import { useTranslations } from 'next-intl';
import defaults from '@graphql/config/defaults';
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
  const t = useTranslations('rest');
  const { slug } = useParams() as {
    slug: string[];
  };
  const searchParams = useSearchParams();

  const [endPoint, setEndPoint] = useState<string>(
    slug && slug.length > 0 ? decodeFromBase64(slug?.[0]) : defaults.defaultEndPoint
  );
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [query, setQuery] = useState<string>(
    slug && slug.length > 1 ? decodeFromBase64(slug?.[1]) : defaults.defaultQuery.trim()
  );
  const [headers, setHeaders] = useState<KeyValue[]>(
    searchParams.size > 0
      ? Array.from(searchParams).map((item) => ({ key: item[0], value: item[1] }))
      : defaults.defaultHeaders
  );

  function getInitialVariablesState() {
    if (!slug) return defaults.defaultVariables;

    if (slug && slug.length > 2) return JSON.parse(decodeFromBase64(slug?.[2]));

    return [];
  }

  const [variables, setVariables] = useState<KeyValue[]>(getInitialVariablesState());

  const debouncedNavigate = useMemo(
    () =>
      debounce(() => {
        const encodedEndpoint = encodeToBase64(
          endPoint === '' ? defaults.defaultEndPoint : endPoint
        );
        const encodedBody = encodeToBase64(query);
        const encodedVariables = encodeToBase64(JSON.stringify(variables));
        const queryParamsString = headers
          .filter((item) => item.key)
          .map((item) => `${item.key}=${item.value}`)
          .join('&');

        window.history.replaceState(
          null,
          '',
          `/graphql/${encodedEndpoint}/${encodedBody}/${encodedVariables}?${queryParamsString}`
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
      Methods.POST,
      JSON.stringify({
        query,
        variables: variables.reduce<Record<string, string>>(
          (obj: Record<string, string>, item) => {
            return { ...obj, [item.key]: item.value };
          },
          {}
        ),
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
      <div className="mb-2 px-1">
        <PropertyEditor title="headers" onPropertyChange={setHeaders} items={headers} />
      </div>
      <div className="mb-2 px-1">
        <PropertyEditor
          title="variables"
          onPropertyChange={setVariables}
          items={variables}
        />
      </div>
      <div className="mb-4 px-1">
        <GraphQLEditor query={query} setQuery={setQuery} />
      </div>
      <div className="mb-4 px-1">
        <Button onClick={executeQuery} disabled={loading}>
          {loading ? `${t('loading')}...` : t('send')}
        </Button>
      </div>
      <ResponseField loading={loading} response={response} status={status} />
    </div>
  );
}

export default GraphQLView;
