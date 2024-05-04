"server-only";

import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  env.SUPABASE_PROJECT_URL,
  env.SUPABASE_API_KEY,
);
