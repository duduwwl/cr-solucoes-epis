import { createHash } from 'node:crypto';
import { NextRequest } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getClientFingerprint(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
  const salt = process.env.REQUEST_HASH_SALT;
  if (!salt) throw new Error('REQUEST_HASH_SALT não configurado.');
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

export function isTrustedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const allowed = new Set([siteUrl, `https://${request.headers.get('host')}`, 'http://localhost:3000'].filter(Boolean));
  return allowed.has(origin);
}
