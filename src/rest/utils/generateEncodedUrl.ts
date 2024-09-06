export const generateEncodedUrl = (
  method: string,
  url: string,
  headers: { key: string; value: string }[],
  encodedBody: string
): string => {
  if (!url.trim()) {
    return '';
  }

  const encodedUrl = btoa(url);
  const queryParams = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
    )
    .join('&');

  return `/${method}/${encodedUrl}/${encodedBody}?${queryParams}`;
};
