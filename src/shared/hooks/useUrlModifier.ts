import { useEffect, useMemo, useState } from 'react';
import { KeyValue } from '@shared/hooks/useRequestProperties';
import debounce from 'lodash/debounce';
import defaults from '@graphql/config/defaults';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { decodeFromBase64, encodeToBase64 } from '@shared/helpers/base64Helper';

export const GRAPHQL = 'graphql';

function getInitialEndPointState(slug: string[] | undefined, method: string) {
  if (slug && slug.length > 0) {
    return decodeFromBase64(slug?.[0]);
  }

  return method === GRAPHQL ? defaults.defaultEndPoint : '';
}

function getInitialBodyState(slug: string[] | undefined, method: string) {
  if (slug && slug.length > 1) {
    return JSON.parse(decodeFromBase64(slug?.[1])).body;
  }

  return method === GRAPHQL ? defaults.defaultQuery.trim() : '';
}

function getInitialHeadersState(searchParams: ReadonlyURLSearchParams, method: string) {
  if (searchParams.size > 0) {
    return Array.from(searchParams).map((item) => ({ key: item[0], value: item[1] }));
  }

  return method === GRAPHQL ? defaults.defaultHeaders : [];
}

function getInitialVariablesState(slug: string[] | undefined, method: string) {
  if (!slug) return method === GRAPHQL ? defaults.defaultVariables : [];

  if (slug && slug.length > 1) {
    return JSON.parse(decodeFromBase64(slug?.[1])).variables;
  }

  return [];
}

function useUrlModifier(
  slug: string[] | undefined,
  searchParams: ReadonlyURLSearchParams,
  method: string
) {
  const [endPoint, setEndPoint] = useState<string>(getInitialEndPointState(slug, method));
  const [body, setBody] = useState<string>(getInitialBodyState(slug, method));
  const [headers, setHeaders] = useState<KeyValue[]>(
    getInitialHeadersState(searchParams, method)
  );
  const [variables, setVariables] = useState<KeyValue[]>(
    getInitialVariablesState(slug, method)
  );

  const debouncedNavigate = useMemo(
    () =>
      debounce(() => {
        const encodedEndpoint = encodeToBase64(
          endPoint === '' ? defaults.defaultEndPoint : endPoint
        );
        const encodedBody = encodeToBase64(JSON.stringify({ body, variables }));
        const queryParamsString = headers
          .filter((item) => item.key)
          .map((item) => `${item.key}=${item.value}`)
          .join('&');

        window.history.replaceState(
          null,
          '',
          `/${method}/${encodedEndpoint}/${encodedBody}?${queryParamsString}`
        );
      }, 500),
    [endPoint, headers, variables, body, method]
  );

  useEffect(() => {
    debouncedNavigate();
  }, [endPoint, headers, variables, body, method, debouncedNavigate]);

  return {
    endPoint,
    setEndPoint,
    body,
    setBody,
    headers,
    setHeaders,
    variables,
    setVariables,
  };
}

export default useUrlModifier;
