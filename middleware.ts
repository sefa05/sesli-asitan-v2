import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/giris")) return res;

  if (pathname.startsWith("/panel") && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/giris";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/panel/:path*", "/panel"]
};
