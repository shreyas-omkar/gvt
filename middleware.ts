// middleware.ts

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Attach the user session to the request if available
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

// Apply to all routes (or restrict to protected ones)
export const config = {
  matcher: [
    '/dashboard',
    '/api/auth',
  ],
};
