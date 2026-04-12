import { createClient } from '@supabase/supabase-js';

// --- BEGINNER EDIT SECTION: SUPABASE CREDENTIALS ---
// Replace these with your own Supabase project URL and Publishable Key
const SUPABASE_URL = "https://gxorhyqaowbixdcyjmej.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_WN16fZOeXe-pICb3neDRNQ_F1cOAX7N";
// ---------------------------------------------------

export const supabase = createClient(SUPABASE_URL || "https://placeholder.supabase.co", SUPABASE_PUBLISHABLE_KEY);

