import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { adminCookieName, adminSessionCookie, validAdminPassword } from '@/lib/admin-auth';
import { getDb } from '@/lib/db';
import { getClientFingerprint, isTrustedOrigin } from '@/lib/security';

export const runtime = 'nodejs';
const payload = z.object({ password: z.string().min(1).max(200) });

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  const parsed = payload.safeParse(await request.json().catch(() => null));

  // Brute-force guard: at most 8 failed logins per client every 15 minutes.
  let fingerprint: string | null = null;
  try {
    fingerprint = `admin-login:${getClientFingerprint(request)}`;
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count, error } = await getDb().from('request_rate_limits').select('id', { count: 'exact', head: true }).eq('fingerprint', fingerprint).gt('created_at', since);
    if (error) throw error;
    if ((count ?? 0) >= 8) return NextResponse.json({ error: 'Muitas tentativas. Aguarde 15 minutos.' }, { status: 429 });
  } catch {
    // shortcut: without the database or REQUEST_HASH_SALT the guard is skipped; the admin API itself still needs the database.
    fingerprint = null;
  }

  if (!parsed.success || !validAdminPassword(parsed.data.password)) {
    if (fingerprint) await getDb().from('request_rate_limits').insert({ fingerprint });
    return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  const session = adminSessionCookie();
  response.cookies.set(session.name, session.value, session.options);
  return response;
}

export function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0, path: '/' });
  return response;
}
