import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { getClientFingerprint, isTrustedOrigin } from '@/lib/security';

export const runtime = 'nodejs';

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional().default(''),
  email: z.string().trim().email().max(254).optional().or(z.literal('')).default(''),
  company: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(4).max(2000),
  productSlug: z.string().trim().max(160).optional().default(''),
  website: z.string().max(0).optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    if (!isTrustedOrigin(request) || request.headers.get('content-type')?.includes('application/json') !== true) {
      return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
    }

    const raw = await request.json();
    const parsed = payloadSchema.safeParse(raw);
    if (!parsed.success || parsed.data.website) {
      return NextResponse.json({ error: 'Não foi possível registrar a solicitação.' }, { status: 400 });
    }

    const fingerprint = getClientFingerprint(request);
    const recent = await sql`SELECT count(*)::int AS count FROM request_rate_limits WHERE fingerprint = ${fingerprint} AND created_at > now() - interval '15 minutes'`;
    if (recent[0]?.count >= 6) {
      return NextResponse.json({ error: 'Aguarde alguns minutos antes de enviar outra solicitação.' }, { status: 429 });
    }

    await sql`INSERT INTO request_rate_limits (fingerprint) VALUES (${fingerprint})`;
    const [quote] = await sql`
      INSERT INTO quote_requests (contact_name, phone, email, company, message, product_slug, source, user_agent, ip_hash)
      VALUES (${parsed.data.name}, ${parsed.data.phone || null}, ${parsed.data.email || null}, ${parsed.data.company || null}, ${parsed.data.message}, ${parsed.data.productSlug || null}, 'website', ${request.headers.get('user-agent')?.slice(0, 500) || null}, ${fingerprint})
      RETURNING id
    `;
    await sql`INSERT INTO audit_log (action, entity_type, entity_id, metadata) VALUES ('quote.created', 'quote_request', ${quote.id}, ${JSON.stringify({ productSlug: parsed.data.productSlug || null })}::jsonb)`;
    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (error) {
    console.error('quote_request_failed', error);
    return NextResponse.json({ error: 'Não foi possível registrar a solicitação agora.' }, { status: 503 });
  }
}
