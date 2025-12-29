import { createClient } from '@supabase/supabase-ts';

const supabaseUrl = 'https://glnubvrpnmmzmtokmohk.supabase.co';
const supabaseAnonKey = 'sb_publishable_xGEuXdUNLRd63cMqMZP-nw_PA9XA5Ef';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
