'use client';

import React from 'react';
import { Button } from '@shared/shadcn/ui/button';
import { ResponseField } from 'src/shared/components/ResponseField';
import { useParams, useSearchParams } from 'next/navigation';
import useFetchData from '@shared/hooks/useApiCall';
import { Methods } from '@rest/constants';
import { useTranslations } from 'next-intl';
import PropertyEditor from '@shared/components/PropertyEditor/PropertyEditor';
import useUrlModifier, { GRAPHQL } from '@shared/hooks/useUrlModifier';
import { useRequestHistory } from '@history/hooks';
import { UrlInput } from '../../components/UrlInput';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';

function GraphQLView() {
  const t = useTranslations('rest');
  const { slug } = useParams() as {
    slug: string[];
  };
  const searchParams = useSearchParams();

  const {
    endPoint,
    setEndPoint,
    body,
    setBody,
    headers,
    setHeaders,
    variables,
    setVariables,
    historyPath,
    sdlUrl,
    setSdlUrl,
  } = useUrlModifier(slug, searchParams, GRAPHQL);

  const { response, status, loading, fetchData } = useFetchData();
  const {
    response: responseSdl,
    status: statusSdl,
    loading: loadingSDL,
    fetchData: fetchDataSDL,
  } = useFetchData();
  const { addHistory } = useRequestHistory();

  const executeQuery = async () => {
    await fetchData(
      endPoint,
      Methods.POST,
      JSON.stringify({
        query: body,
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

    addHistory({
      baseUrl: endPoint,
      method: GRAPHQL,
      url: historyPath,
    });
  };

  const fetchSchema = async () => {
    if (sdlUrl === null) return;

    await fetchDataSDL(sdlUrl, Methods.GET, '', [], []);
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
        <PropertyEditor
          title="headers"
          onPropertyChange={setHeaders}
          items={headers}
          placeholders={{ key: 'header-key', value: 'header-value' }}
        />
      </div>
      <div className="mb-2 px-1">
        <PropertyEditor
          title="variables"
          onPropertyChange={setVariables}
          items={variables}
          placeholders={{ key: 'variable-key', value: 'variable-value' }}
        />
      </div>
      <div className="mb-4 px-1">
        <GraphQLEditor query={body} setQuery={setBody} />
      </div>
      <div className="mb-4 px-1">
        <Button onClick={executeQuery} disabled={loading}>
          {loading ? `${t('loading')}...` : t('send')}
        </Button>
        <Button onClick={fetchSchema} disabled={loading} className="ml-3">
          {loadingSDL ? `${t('loading')}...` : t('fetch-schema')}
        </Button>
      </div>
      <ResponseField
        loading={loading}
        response={response}
        status={status}
        title="response"
      />
      {responseSdl && String(responseSdl).length > 0 && (
        <ResponseField
          loading={loadingSDL}
          response={responseSdl}
          status={statusSdl}
          title="schema"
        />
      )}
    </div>
  );
}

export default GraphQLView;
