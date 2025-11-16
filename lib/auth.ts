import { cookies, headers } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSession() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const { data } = await supabase.auth.getSession();
  return data.session;
}
