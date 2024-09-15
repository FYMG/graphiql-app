export function encodeToBase64(str: string): string {
  return btoa(str);
}

export function decodeFromBase64(str: string): string {
  return atob(decodeURIComponent(str));
}
