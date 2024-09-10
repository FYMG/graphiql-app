import { HTTP_METHOD } from 'next/dist/server/web/http';

const routes = {
  main: '/',
  login: '/login',
  register: '/registration',
  history: '/history',
  graphql: () => {
    return `/graphql`;
  },
  rest: ({ method }: { method: HTTP_METHOD }) => {
    return `/${method}`;
  },
};

export default routes;
