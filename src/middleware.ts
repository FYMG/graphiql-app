import { type NextRequest, NextResponse } from 'next/server';
import { app, routes, protectedRoutes } from '@shared/configs';

const { SESSION_COOKIE_NAME } = app;

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';
  const baseUrl = request.nextUrl.origin;

  const isProtectedRoute = protectedRoutes.some((route) => {
    return route.path === request.nextUrl.pathname;
  });

  if (isProtectedRoute) {
    const isAuthRoute = protectedRoutes.some((route) => {
      return route.path === request.nextUrl.pathname && route.needAuth;
    });

    if (isAuthRoute) {
      if (!session) {
        return NextResponse.redirect(new URL(routes.login, baseUrl));
      }
    } else if (session) {
      return NextResponse.redirect(new URL(routes.main, baseUrl));
    }
  }

  return NextResponse.next();
}
