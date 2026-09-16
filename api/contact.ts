import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/**
 * Contact-form endpoint.
 *
 * The form previously posted to Web3Forms with a placeholder access key, so
 * every submission since launch failed silently. This delivers the message
 * to the shop via Resend and reports a real failure to the browser when
 * delivery does not happen, so the UI can tell the customer to call instead
 * of falsely confirming.
 *
 * Environment (set in the Vercel project, all environments):
 *   RESEND_API_KEY  required, or requests are rejected with 503
 *   CONTACT_TO      inbox that receives the lead   (default: info@ifastroadside.ca)
 *   CONTACT_FROM    verified Resend sender address
 */

const MAX_LEN = { name: 120, phone: 40, email: 200, service: 120, message: 4000 } as const;

interface LeadFields {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validate(body: Record<string, unknown>): { data?: LeadFields; error?: string } {
  const data: LeadFields = {
    name: clean(body.name, MAX_LEN.name),
    phone: clean(body.phone, MAX_LEN.phone),
    email: clean(body.email, MAX_LEN.email),
    service: clean(body.service, MAX_LEN.service),
    message: clean(body.message, MAX_LEN.message),
  };

  if (!data.name) return { error: 'Please tell us your name.' };
  // Loose on purpose: extensions, spaces and +1 are all fine, we just want
  // enough digits to be a callable number.
  if ((data.phone.match(/\d/g) ?? []).length < 10) {
    return { error: 'Please enter a phone number we can reach you on.' };
  }
  if (!data.message) return { error: 'Please add a message.' };

  return { data };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {};

  // Honeypot: a checkbox hidden from humans. Anything that checks it is a
  // bot, and we accept the request so it does not retry, without sending mail.
  if (body.botcheck) {
    return res.status(200).json({ ok: true });
  }

  const { data, error } = validate(body);
  if (!data) return res.status(400).json({ ok: false, error });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'info@ifastroadside.ca';
  const from = process.env.CONTACT_FROM || 'iFAST Roadside Website <onboarding@resend.dev>';

  if (!key) {
    // Fail loudly rather than pretending the lead was delivered.
    console.error('[contact] RESEND_API_KEY is not set; lead was not delivered:', {
      name: data.name,
      phone: data.phone,
    });
    return res.status(503).json({
      ok: false,
      error: 'Our contact form is temporarily unavailable. Please call us and we will help right away.',
    });
  }

  const text = [
    `Name:    ${data.name}`,
    `Phone:   ${data.phone}`,
    `Email:   ${data.email || '(not provided)'}`,
    `Service: ${data.service || '(not specified)'}`,
    '',
    'Message:',
    data.message,
    '',
    `Submitted: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} (Toronto)`,
  ].join('\n');

  try {
    const resend = new Resend(key);
    const { error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `New website enquiry from ${data.name} — ifastroadside.ca`,
      text,
    });

    if (sendError) {
      console.error('[contact] Resend rejected the message:', sendError);
      return res.status(502).json({
        ok: false,
        error: 'We could not send your message. Please call us instead.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected failure sending lead:', err);
    return res.status(502).json({
      ok: false,
      error: 'We could not send your message. Please call us instead.',
    });
  }
}

function safeParse(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
