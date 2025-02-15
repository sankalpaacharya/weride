import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { getUserStatus } from "./lib/supabase/queries";

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/faq",
  "/tos",
  "/aboutus",
  "/privacy",
];
const notVerifiedAcountRoutes = ["/verify", "/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isVerifiedRoute = !notVerifiedAcountRoutes.includes(path);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // is user logged in ?
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //checking if user is actually verified or not (collegeID, HostelID etc)
  if (isVerifiedRoute && isProtectedRoute) {
    const userStatus = await getUserStatus();
    await updateSession(request);
    if (userStatus !== "verified") {
      return NextResponse.redirect(new URL("/verify", request.url));
    }
  }

  if (path == "/verify") {
    const userStatus = await getUserStatus();
    await updateSession(request);
    if (userStatus === "verified") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if user is logged in then don't show these page
  if (path === "/login" || path == "/singup") {
    if (user) {
      await updateSession(request);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
