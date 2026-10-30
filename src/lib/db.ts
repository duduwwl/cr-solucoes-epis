import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const env = process.env as unknown as Record<string, string | undefined>;
const url = env.SUPABASE_URL;
const secretKey = env.SUPABASE_SECRET_KEY;

let client: SupabaseClient | undefined;

export function getDb() {
  if (!url || !secretKey) {
    throw new Error('Banco de dados não configurado. Defina SUPABASE_URL e SUPABASE_SECRET_KEY na Vercel.');
  }
  client ??= createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
  return client;
}

export function databaseDiagnostic(error: unknown) {
  const value = error as { code?: string; message?: string };
  const message = value?.message?.toLowerCase() ?? '';
  if (message.includes('não configurado')) return 'configuration_missing';
  if (value?.code === 'PGRST205' || value?.code === '42P01') return 'schema_missing';
  if (value?.code === '401' || value?.code === '403') return 'credentials_rejected';
  if (message.includes('api key') || message.includes('jwt')) return 'credentials_rejected';
  if (message.includes('fetch failed') || message.includes('network')) return 'connection_failed';
  return 'unavailable';
}
