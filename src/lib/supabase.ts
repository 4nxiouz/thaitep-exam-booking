import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.'https://glnubvrpnmmzmtokmohk.supabase.co';
const supabaseAnonKey = process.env.'sb_publishable_xGEuXdUNLRd63cMqMZP-nw_PA9XA5Ef';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
