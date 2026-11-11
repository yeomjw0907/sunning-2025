import { createHmac } from 'node:crypto';
import binding from '../lib/sunning-bindings.json' with { type: 'json' };
import { cleanupPendingFiles } from './files.mjs';
import { allowedOrigin, targetRpc } from './target.mjs';

function json(res, status, value) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(value);
}

export async function login(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (binding.stage === 'production' && process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return json(res, 503, { error: 'Preview disabled' });
  }
  if (!allowedOrigin(req.headers.origin)) return json(res, 403, { error: '요청 주소를 확인해주세요.' });
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== 'string' || !password || password.length > 256) {
    return json(res, 400, { error: '로그인 정보를 확인해주세요.' });
  }

  try {
    const version = await targetRpc('ops_version', {});
    if (version.backend !== 'target' || version.phase !== 'active') {
      return json(res, 503, { error: '관리 연결을 갱신 중입니다. 잠시 후 다시 로그인해주세요.' });
    }
    const aliasKey = process.env.SUNNING_ALIAS_KEY;
    if (!aliasKey) throw Error('Missing server configuration');
    const digest = createHmac('sha256', Buffer.from(aliasKey, 'base64url'))
      .update(binding.aliasNamespace + '\n' + email.trim().toLowerCase())
      .digest('hex');
    const internal = 'auth-' + digest + '@auth.onecation.invalid';
    const response = await fetch(binding.targetUrl + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { apikey: binding.targetKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: internal, password }),
      redirect: 'error',
      signal: AbortSignal.timeout(12000),
    });
    return json(res, response.status, await response.json());
  } catch {
    return json(res, 503, { error: '잠시 후 다시 로그인해주세요.' });
  }
}

export async function submitEvent(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!allowedOrigin(req.headers.origin)) return json(res, 403, { error: 'Invalid origin' });
  try {
    const { request_id, event } = req.body || {};
    await targetRpc('record_event', { request_id, event });
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 502, { error: 'Analytics unavailable' });
  }
}

export async function worker(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.CRON_SECRET || req.headers.authorization !== 'Bearer ' + process.env.CRON_SECRET) {
    return json(res, 401, { error: 'Unauthorized' });
  }
  try {
    const version = await targetRpc('ops_version', {});
    if (version.backend !== 'target' || version.phase !== 'active') {
      return json(res, 200, { processed: 0, filesProcessed: 0 });
    }
    const secret = process.env.SUNNING_OPS_SECRET;
    if (!secret) throw Error('Worker configuration missing');
    const events = await targetRpc('ops_pending_events', { secret });
    for (const event of events) {
      await targetRpc('record_event', { request_id: event.id, event: event.payload });
    }
    return json(res, 200, { processed: events.length, filesProcessed: await cleanupPendingFiles() });
  } catch {
    return json(res, 503, { error: 'Sunning worker retry pending' });
  }
}
