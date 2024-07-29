import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const userToken = cookies.find((cookie) =>
    cookie.name.includes("session-token"),
  )?.value;

  const url = request.nextUrl.clone();

  if (!userToken && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url, 302);
  }

  if (userToken && url.pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
