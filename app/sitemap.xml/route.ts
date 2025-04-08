// Untuk route handlers, gunakan runtime nodejs jika tidak memerlukan edge runtime
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import config from "@/config/default/config"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // Use the request URL to determine the base URL dynamically
  // This approach doesn't require environment variables
  const protocol = request.headers.get("x-forwarded-proto") || "https"
  const host = request.headers.get("host") || "localhost:3000"
  const baseUrl = `${protocol}://${host}`

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/${config.sitemap_searches_permalink}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/${config.sitemap_keywords_permalink.replace("%num%", "1")}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
