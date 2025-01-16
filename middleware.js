import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // Allow access to public routes without authentication
    return;
  }
  if (isProtectedRoute(req)) {
    // Protect the route if it's a protected route
    await auth.protect();
  }
});

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/forum(.*)',
]);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};