import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

const COOKIE = 'cr_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 8;
const env = process.env as unknown as Record<string, string | undefined>;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(value: string) {
  const secret = env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET não configurado.');
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function validAdminPassword(password: string) {
  const configured = env.ADMIN_PASSWORD;
  return Boolean(configured && safeEqual(password, configured));
}

export function adminSessionCookie() {
  const expires = String(Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS);
  return { name: COOKIE, value: `${expires}.${sign(expires)}`, options: { httpOnly: true, secure: true, sameSite: 'strict' as const, maxAge: MAX_AGE_SECONDS, path: '/' } };
}

export function isAdminRequest(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE)?.value;
    if (!token) return false;
    const [expires, signature, extra] = token.split('.');
    return Boolean(expires && signature && !extra && Number(expires) > Math.floor(Date.now() / 1000) && safeEqual(signature, sign(expires)));
  } catch {
    return false;
  }
}

export const adminCookieName = COOKIE;
