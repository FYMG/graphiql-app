import { type NextRequest, NextResponse } from 'next/server';
import { app, routes, protectedRoutes } from '@shared/configs';

const { SESSION_COOKIE_NAME } = app;

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';
  const baseUrl = request.nextUrl.origin;

  const isProtectedRoute = protectedRoutes.some((route) => {
    const paths = Array.isArray(route.path) ? route.path : [route.path];

    return paths.some((path) => request.nextUrl.pathname.indexOf(path) !== -1);
  });

  if (isProtectedRoute) {
    const isAuthRoute = protectedRoutes.some((route) => {
      const paths = Array.isArray(route.path) ? route.path : [route.path];

      return (
        paths.some((path) => request.nextUrl.pathname.indexOf(path) !== -1) &&
        route.needAuth
      );
    });

    if (isAuthRoute && !session) {
      return NextResponse.redirect(new URL(routes.login, baseUrl));
    }

    if (!isAuthRoute && session) {
      return NextResponse.redirect(new URL(routes.main, baseUrl));
    }
  }

  return NextResponse.next();
}
