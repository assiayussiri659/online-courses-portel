import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    // Redirect to login if no session is found
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*'], // Add paths that you want to protect
};
