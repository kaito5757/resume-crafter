import { createServerClient } from "@supabase/ssr";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env } from "../../../env";

async function createAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: cookieStore,
    },
  );
}

export const authClient = {
  getUser: async (): Promise<SupabaseUser | null> => {
    const client = await createAuthClient();
    const userResponse = await client.auth.getUser();
    return userResponse.data.user;
  },
};
