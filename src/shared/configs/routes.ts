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

export const protectedRoutes = [
  {
    path: routes.login,
    needAuth: false,
  },
  {
    path: routes.register,
    needAuth: false,
  },
  {
    path: routes.history,
    needAuth: true,
  },
] as const;

export default routes;
