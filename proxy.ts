import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './src/i18n/routing';

const nextIntlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return nextIntlProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};
