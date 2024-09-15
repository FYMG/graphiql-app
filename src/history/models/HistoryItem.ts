import { HTTP_METHOD } from 'next/dist/server/web/http';

export type Methods = HTTP_METHOD | 'GRAPHQL';

interface HistoryItem {
  baseUrl: string;
  method: Methods;
  sendTime: number;
  url: string;
}

export default HistoryItem;
