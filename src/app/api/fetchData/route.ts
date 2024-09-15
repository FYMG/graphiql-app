import { NextRequest, NextResponse } from 'next/server';
import applyVariables from '@rest/utils/applyVariablesUtil';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { KeyValue } from '@shared/hooks/useRequestProperties';

export async function POST(req: NextRequest) {
  const { endPoint, method, body, headers, variables } = await req.json();

  try {
    const processedUrl = applyVariables(endPoint, variables);
    const processedHeaders = headers.map((header: KeyValue) => ({
      key: header.key,
      value: applyVariables(header.value, variables),
    }));
    const processedBody = applyVariables(body, variables);
    const config = {
      method,
      url: processedUrl,
      headers: processedHeaders.reduce(
        (acc: Record<string, string>, header: KeyValue) => {
          if (header.key && header.value) {
            acc[header.key] = header.value;
          }

          return acc;
        },
        {}
      ),
      data: processedBody,
    };

    const response: AxiosResponse = await axios(config);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data || 'Error', {
        status: error.response?.status || 500,
      });
    }

    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
