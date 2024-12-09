// https://supabase.com/docs/guides/auth/server-side/nextjs

import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    return supabaseResponse
}