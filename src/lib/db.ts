import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

let client: SupabaseClient | undefined;

export function getDb() {
  if (!url || !secretKey) {
    throw new Error('Banco de dados não configurado. Defina SUPABASE_URL e SUPABASE_SECRET_KEY na Vercel.');
  }
  client ??= createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
  return client;
}
