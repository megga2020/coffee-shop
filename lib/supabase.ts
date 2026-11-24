import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iwfzyaqsbywaahsrsigw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ABOEBiz1zXm87DUgYQZOjQ_cgZl3F6I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
