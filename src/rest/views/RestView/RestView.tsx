'use client';

import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import applyVariables from '@rest/utils/applyVariablesUtil';

import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { KeyAndValue, Methods } from '@rest/constants';
import { MethodSelector } from '../components/MethodSelector';
import { HeaderEditor } from '../components/HeaderEditor';
import { BodyEditor } from '../components/BodyEditor';
import ResponseField from '../components/ResponseField/ResponseField';
import { VariablesEditor } from '../components/VariablesEditor';

function RestView() {
  const [method, setMethod] = useState(Methods.Get);
  const [headers, setHeaders] = useState<KeyAndValue[]>([]);
  const [body, setBody] = useState('');
  const [url, setUrl] = useState<string>('');
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [variables, setVariables] = useState<KeyAndValue[]>([]);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setResponse({});
    setUrlError(null);

    if (!url.trim()) {
      setUrlError('Please enter a valid URL');

      return;
    }

    const encodedUrl = btoa(url);
    const encodedBody = body ? btoa(JSON.stringify(body)) : '';
    const queryParams = headers
      .filter((header) => header.key && header.value)
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
      )
      .join('&');

    const fullUrl = `/${method}/${encodedUrl}/${encodedBody}?${queryParams}`;

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
          placeholder={urlError ? 'Please enter a valid URL' : 'Your request'}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={onKeyPress}
          className={`w-auto grow ${urlError ? 'border border-red-500' : ''}`}
        />
        <Button variant={url.length ? 'default' : 'secondary'} onClick={sendRequest}>
          Send
        </Button>
      </div>
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <HeaderEditor headers={headers} setHeaders={setHeaders} />
      <BodyEditor body={body} setBody={setBody} />
      <ResponseField status={status} response={response} loading={loading} />
    </div>
  );
}

export default RestView;
