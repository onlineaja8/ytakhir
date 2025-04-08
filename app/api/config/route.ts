// Untuk API routes, gunakan runtime nodejs jika tidak memerlukan edge runtime
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import config from "@/config/default/config"

export async function GET() {
  return NextResponse.json(config)
}
