import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
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

    const parsed = payloadSchema.safeParse(await request.json());
    if (!parsed.success || parsed.data.website) {
      return NextResponse.json({ error: 'Não foi possível registrar a solicitação.' }, { status: 400 });
    }

    const fingerprint = getClientFingerprint(request);
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const db = getDb();
    const { count, error: rateError } = await db
      .from('request_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('fingerprint', fingerprint)
      .gt('created_at', since);
    if (rateError) throw rateError;
    if ((count ?? 0) >= 6) {
      return NextResponse.json({ error: 'Aguarde alguns minutos antes de enviar outra solicitação.' }, { status: 429 });
    }

    const { error: rateInsertError } = await db.from('request_rate_limits').insert({ fingerprint });
    if (rateInsertError) throw rateInsertError;

    const { data: quote, error: quoteError } = await db
      .from('quote_requests')
      .insert({
        contact_name: parsed.data.name,
        phone: parsed.data.phone || null,
        email: parsed.data.email || null,
        company: parsed.data.company || null,
        message: parsed.data.message,
        product_slug: parsed.data.productSlug || null,
        source: 'website',
        user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
        ip_hash: fingerprint,
      })
      .select('id')
      .single();
    if (quoteError || !quote) throw quoteError ?? new Error('Orçamento não criado.');

    const { error: auditError } = await db.from('audit_log').insert({
      action: 'quote.created',
      entity_type: 'quote_request',
      entity_id: quote.id,
      metadata: { productSlug: parsed.data.productSlug || null },
    });
    if (auditError) throw auditError;

    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (error) {
    console.error('quote_request_failed', error);
    return NextResponse.json({ error: 'Não foi possível registrar a solicitação agora.' }, { status: 503 });
  }
}
