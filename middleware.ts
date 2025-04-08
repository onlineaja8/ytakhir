// Hapus deklarasi runtime karena middleware selalu berjalan di edge runtime secara default
// export const runtime = "edge"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import appConfig from "@/config/default/config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Add cache-control headers based on the route
  if (pathname === "/") {
    // Home page - cache for 24 hours
    response.headers.set(
      "Cache-Control",
      `public, max-age=${appConfig.cache_settings.home_page}, stale-while-revalidate=60`,
    )
  } else if (pathname.startsWith("/f/")) {
    // Search results - cache for 1 year
    response.headers.set(
      "Cache-Control",
      `public, max-age=${appConfig.cache_settings.search_page}, stale-while-revalidate=86400`,
    )
  } else if (pathname.startsWith("/e/")) {
    // Song details - cache forever
    response.headers.set("Cache-Control", `public, max-age=${appConfig.cache_settings.download_page}, immutable`)
  } else if (pathname === "/robots.txt") {
    // Process robots.txt to replace {host} with the actual host
    return new Response(
      `User-agent: Mediapartners-Google
Disallow:

User-agent: *
Allow: /

Sitemap: ${request.nextUrl.origin}/sitemap.xml`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      },
    )
  }

  return response
}

// Simplified matcher configuration
export const config = {
  matcher: ["/", "/f/:path*", "/e/:path*", "/robots.txt"],
}
