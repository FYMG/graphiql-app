const encodeBase64 = (str: string): string => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const generateEncodedUrl = (
  method: string,
  url: string,
  headers: { key: string; value: string }[],
  encodedBody: string
): string => {
  const encodedUrl = encodeBase64(url);
  const queryParams = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
    )
    .join('&');

  return `/${method}/${encodedUrl}/${encodedBody}?${queryParams}`;
};
