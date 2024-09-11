'use client';

import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';

import applyVariables from '@rest/utils/applyVariablesUtil';

import { Button } from '@shared/shadcn/ui/button';
import { Input } from '@shared/shadcn/ui/input';
import { KeyAndValue, Methods } from '@rest/constants';
import { generateEncodedUrl } from '@rest/utils/generateEncodedUrl';

import { MethodSelector } from '../components/MethodSelector';
import { HeaderEditor } from '../components/HeaderEditor';
import { BodyEditor } from '../components/BodyEditor';
import { ResponseField } from '../components/ResponseField';
import { VariablesEditor } from '../components/VariablesEditor';

function RestView() {
  const [method, setMethod] = useState(Methods.Get);
  const [headers, setHeaders] = useState<KeyAndValue[]>([]);
  const [body, setBody] = useState('');
  const [url, setUrl] = useState<string>('');
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [urlError, setUrlError] = useState<boolean>(false);
  const [variables, setVariables] = useState<KeyAndValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [encodedBody, setEncodedBody] = useState('');

  const t = useTranslations('rest');

  const updateUrlWithDebounce = useMemo(() => {
    return debounce((newUrl: string) => {
      const fullUrl = generateEncodedUrl(method, newUrl, headers, encodedBody);

      window.history.replaceState(null, '', fullUrl);
    }, 500);
  }, [encodedBody, headers, method]);

  useEffect(() => {
    if (url) {
      updateUrlWithDebounce(url);
    }
  }, [updateUrlWithDebounce, url]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setUrlError(false);
  };

  const sendRequest = async () => {
    setResponse({});
    setUrlError(false);

    if (!url.trim()) {
      setUrlError(true);
    }

    const fullUrl = generateEncodedUrl(method, url, headers, encodedBody);

    window.history.replaceState(null, '', fullUrl);
    try {
      setLoading(true);
      const processedUrl = applyVariables(url, variables);
      const processedHeaders = headers.map((header) => ({
        key: header.key,
        value: applyVariables(header.value, variables),
      }));
      const processedBody = applyVariables(body, variables);
      const config = {
        method,
        url: processedUrl,
        headers: processedHeaders.reduce(
          (acc, header) => {
            if (header.key && header.value) {
              acc[header.key] = header.value;
            }

            return acc;
          },
          {} as Record<string, string>
        ),
        data: processedBody,
      };

      const res: AxiosResponse = await axios(config);

      setStatus(res.status);
      setResponse(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setStatus(error.response?.status || 500);
        setResponse(error.response?.data || 'Error');
      } else {
        setStatus(500);
        setResponse({ message: 'Unknown error' });
      }
    } finally {
      setLoading(false);
    }
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
          value={url}
          onChange={handleInputChange}
          onKeyDown={onKeyPress}
          className={`w-auto grow ${urlError ? 'border border-red-500' : ''}`}
        />
        <Button variant={url.length ? 'default' : 'secondary'} onClick={sendRequest}>
          {t('send')}
        </Button>
      </div>
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <HeaderEditor headers={headers} setHeaders={setHeaders} />
      <BodyEditor body={body} setBody={setBody} setEncodedBody={setEncodedBody} />
      <ResponseField status={status} response={response} loading={loading} />
    </div>
  );
}

export default RestView;
