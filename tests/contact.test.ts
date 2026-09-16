import { describe, test, expect, beforeEach } from 'vitest';
import handler from '../api/contact.ts';

/**
 * The behaviour that matters here is negative: when a lead cannot be
 * delivered the endpoint must say so, never a false 2xx.
 *
 * Lives outside api/ on purpose: Vercel turns every file under api/ into a
 * deployed function, so a test file there would ship as a public endpoint.
 */

interface MockResult {
  status: number;
  body: unknown;
  headers: Record<string, string>;
}

function mockRes() {
  const result: MockResult = { status: 0, body: null, headers: {} };
  const res = {
    status(code: number) {
      result.status = code;
      return res;
    },
    json(payload: unknown) {
      result.body = payload;
      return res;
    },
    setHeader(key: string, value: string) {
      result.headers[key] = value;
      return res;
    },
  };
  return { res, result };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const call = async (req: any) => {
  const { res, result } = mockRes();
  await handler(req, res as never);
  return result;
};

const validBody = {
  name: 'Jane Doe',
  phone: '416-555-0134',
  email: 'jane@example.com',
  service: 'Jump Start',
  message: 'Stuck in a lot on Kennedy Rd, battery is dead.',
};

describe('api/contact', () => {
  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  test('rejects non-POST requests', async () => {
    const r = await call({ method: 'GET', body: {} });
    expect(r.status).toBe(405);
    expect(r.headers['Allow']).toBe('POST');
  });

  test('reports 503 rather than success when the mail key is missing', async () => {
    const r = await call({ method: 'POST', body: validBody });
    expect(r.status).toBe(503);
    expect((r.body as { ok: boolean }).ok).toBe(false);
    expect((r.body as { error: string }).error).toMatch(/call/i);
  });

  test('rejects a missing name', async () => {
    const r = await call({ method: 'POST', body: { ...validBody, name: '   ' } });
    expect(r.status).toBe(400);
    expect((r.body as { ok: boolean }).ok).toBe(false);
  });

  test('rejects a phone number with too few digits', async () => {
    const r = await call({ method: 'POST', body: { ...validBody, phone: '416-555' } });
    expect(r.status).toBe(400);
  });

  test('accepts a phone number written with punctuation and +1', async () => {
    const r = await call({ method: 'POST', body: { ...validBody, phone: '+1 (416) 555-0134 ext. 2' } });
    // Passes validation, so it fails later at the missing-key stage, not at 400.
    expect(r.status).toBe(503);
  });

  test('rejects an empty message', async () => {
    const r = await call({ method: 'POST', body: { ...validBody, message: '' } });
    expect(r.status).toBe(400);
  });

  test('swallows honeypot submissions without attempting delivery', async () => {
    const r = await call({ method: 'POST', body: { ...validBody, botcheck: 'on' } });
    // 200 so the bot does not retry, and notably NOT the 503 a real lead would
    // get here — proving it short-circuited before the delivery attempt.
    expect(r.status).toBe(200);
    expect((r.body as { ok: boolean }).ok).toBe(true);
  });

  test('parses a JSON string body', async () => {
    const r = await call({ method: 'POST', body: JSON.stringify(validBody) });
    expect(r.status).toBe(503);
  });

  test('rejects an unparseable body', async () => {
    const r = await call({ method: 'POST', body: '{not json' });
    expect(r.status).toBe(400);
  });
});
