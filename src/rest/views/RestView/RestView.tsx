'use client';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import applyVariables from '@rest/utils/applyVariables';

import { MethodSelector } from '../components/MethodSelector';
import { HeaderEditor } from '../components/HeaderEditor';
import { BodyEditor } from '../components/BodyEditor';
import ResponseField from '../components/ResponseField/ResponseField';
import { VariablesEditor } from '../components/VariablesEditor';

function RestView() {
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState('');
  const [url, setUrl] = useState<string>('');
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [variables, setVariables] = useState<{ key: string; value: string }[]>([]);

  const sendRequest = async () => {
    setResponse({});
    setUrlError(null);

    if (!url.trim()) {
      setUrlError('Please enter a valid URL');

      return;
    }

    try {
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
    } catch (error: any) {
      setStatus(error.response?.status || 500);
      setResponse(error.response?.data || 'Error');
    }
  };

  return (
    <div className="mx-auto my-4 max-w-[700px] bg-background shadow-md">
      <div className="mb-4 flex h-12 flex-wrap items-center border bg-background py-2 ps-2">
        <MethodSelector method={method} setMethod={setMethod} />
        <input
          type="text"
          placeholder={urlError ? 'Please enter a valid URL' : 'Your request'}
          className={`focus:shadow-outline h-full grow appearance-none rounded px-3 leading-tight text-gray-700 focus:outline-none ${urlError ? 'border border-red-500' : ''}`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={sendRequest}
        />
        <button
          type="button"
          className="linear h-full rounded-sm bg-accent px-3 text-accent-foreground transition delay-150 hover:bg-foreground hover:text-accent"
          onClick={sendRequest}
        >
          Send
        </button>
      </div>
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <HeaderEditor headers={headers} setHeaders={setHeaders} />
      <BodyEditor body={body} setBody={setBody} />
      <ResponseField status={status} response={response} />
    </div>
  );
}

export default RestView;
