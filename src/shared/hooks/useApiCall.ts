import { useState } from 'react';
import applyVariables from '@rest/utils/applyVariablesUtil';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { KeyValue } from '@shared/hooks/useRequestProperties';

function useFetchData() {
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(
    endPoint: string,
    method: string,
    body: string,
    headers: KeyValue[],
    variables: KeyValue[]
  ) {
    try {
      setLoading(true);
      const processedUrl = applyVariables(endPoint, variables);
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
  }

  return { response, status, loading, fetchData };
}

export default useFetchData;
