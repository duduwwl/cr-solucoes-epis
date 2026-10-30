import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { adminCookieName, adminSessionCookie, validAdminPassword } from '@/lib/admin-auth';
import { isTrustedOrigin } from '@/lib/security';

export const runtime = 'nodejs';
const payload = z.object({ password: z.string().min(1).max(200) });

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  const parsed = payload.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !validAdminPassword(parsed.data.password)) return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
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
