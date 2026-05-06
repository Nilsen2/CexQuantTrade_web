import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import {routing} from './i18n/routing';
import { auth } from '@/auth';

const intlMiddleware = createMiddleware(routing);

export default auth(async (req: any) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  if (isLoggedIn && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (!isLoggedIn && pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/signin', nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|backend|.*\\..*).*)',
};
