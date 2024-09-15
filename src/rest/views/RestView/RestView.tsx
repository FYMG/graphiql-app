'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@shared/shadcn/ui/button';
import { Input } from '@shared/shadcn/ui/input';
import { MethodsType } from '@rest/constants';

import PropertyEditor from '@shared/components/PropertyEditor/PropertyEditor';
import useFetchData from '@shared/hooks/useApiCall';
import useUrlModifier from '@shared/hooks/useUrlModifier';
import { useSearchParams } from 'next/navigation';
import { ResponseField } from '../../../shared/components/ResponseField';
import { BodyEditor } from '../components/BodyEditor';
import { MethodSelector } from '../components/MethodSelector';

interface RestViewProps {
  method?: string;
  slug?: string[];
}

function RestView({ method: methodParam, slug }: RestViewProps) {
  const [method, setMethod] = useState<MethodsType>(
    (methodParam?.toUpperCase() as MethodsType) || 'GET'
  );
  const t = useTranslations('rest');
  const [urlError, setUrlError] = useState<boolean>(false);

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
  } = useUrlModifier(slug, searchParams, method);

  const { response, status, loading, fetchData } = useFetchData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPoint(e.target.value);
    setUrlError(false);
  };

  const sendRequest = async () => {
    setUrlError(false);

    if (!endPoint.trim() && headers.length === 0) {
      setUrlError(true);
    }

    await fetchData(
      endPoint,
      method,
      JSON.stringify({
        body,
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

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendRequest();
    }
  };

  return (
    <div className="mx-auto my-4 max-w-[700px] bg-background shadow-md">
      <div className="mb-4 flex h-12 flex-wrap items-center gap-2 border bg-background px-1">
        <MethodSelector method={method} setMethod={setMethod} />
        <Input
          type="text"
          placeholder={urlError ? t('error-placeholder') : t('placeholder')}
          value={endPoint}
          onChange={handleInputChange}
          onKeyDown={onKeyPress}
          className={`w-auto grow ${urlError ? 'border border-red-500' : ''}`}
        />
        <Button variant={endPoint.length ? 'default' : 'secondary'} onClick={sendRequest}>
          {t('send')}
        </Button>
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
      <BodyEditor body={body} setBody={setBody} />
      <ResponseField status={status} response={response} loading={loading} />
    </div>
  );
}

export default RestView;
