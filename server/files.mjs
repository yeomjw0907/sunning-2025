import binding from '../lib/sunning-bindings.json' with { type: 'json' };
import { allowedOrigin, targetRpc } from './target.mjs';

let cachedToken;

async function workerToken(workerId) {
  if (cachedToken?.id === workerId && cachedToken.until > Date.now()) return cachedToken.token;
  const email = process.env.SUNNING_TARGET_FILE_EMAIL;
  const password = process.env.SUNNING_TARGET_FILE_PASSWORD;
  if (!email || !password) throw Error('File worker configuration missing');
  const response = await fetch(binding.targetUrl + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: { apikey: binding.targetKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    redirect: 'error',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw Error('File worker authentication unavailable');
  const session = await response.json();
  if (session.user?.id !== workerId) throw Error('Unexpected file worker');
  cachedToken = {
    id: workerId,
    token: session.access_token,
    until: Date.now() + Math.max(0, Number(session.expires_in) - 90) * 1000,
  };
  return cachedToken.token;
}

function keyFromTask(task, bucket) {
  const url = new URL(task.asset_url);
  const targetPrefix = '/storage/v1/object/public/' + bucket + '/';
  const legacyPrefix = '/storage/v1/object/public/' + task.bucket_kind + '/';
  // Older durable tasks can name the old public URL. The hostname is only matched, never fetched.
  const legacyOrigin = 'https://' + binding.aliasNamespace + '.supabase.co';
  const prefix = url.origin === new URL(binding.targetUrl).origin
    ? targetPrefix
    : url.origin === legacyOrigin ? legacyPrefix : null;
  if (!prefix || !url.pathname.startsWith(prefix)) throw Error('Foreign site file URL');
  const key = url.pathname.slice(prefix.length).split('/').map(decodeURIComponent).join('/');
  if (!key || key.length > 1024 || key.split('/').some(part => !part || part === '.' || part === '..')) {
    throw Error('Invalid site file');
  }
  return key;
}

export async function cleanupPendingFiles() {
  const secret = process.env.SUNNING_OPS_SECRET;
  if (!secret) throw Error('File worker configuration missing');
  const version = await targetRpc('ops_version', {});
  if (version.backend !== 'target' || version.phase !== 'active') return 0;

  const tasks = await targetRpc('ops_pending_file_deletes', { secret });
  if (tasks.length === 0) return 0;
  const state = await targetRpc('ops_file_state', { secret });
  let processed = 0;

  for (const task of tasks) {
    if (!['testimonials', 'popups'].includes(task.bucket_kind)) throw Error('Foreign file task');
    const bucket = binding.targetSchema + '-' + task.bucket_kind;
    const key = keyFromTask(task, bucket);
    const args = { secret, expected_epoch: Number(state.epoch), bucket, key };
    if (await targetRpc('ops_prepare_file_delete', args)) {
      const token = await workerToken(state.worker_id);
      const response = await fetch(binding.targetUrl + '/storage/v1/object/' + encodeURIComponent(bucket), {
        method: 'DELETE',
        headers: {
          apikey: binding.targetKey,
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefixes: [key] }),
        redirect: 'error',
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw Error('File deletion pending');
      if (await targetRpc('ops_prepare_file_delete', args)) throw Error('File deletion not confirmed');
    }
    await targetRpc('ops_ack_file_delete', { secret, task_id: task.id, accepted_at: task.accepted_at });
    processed++;
  }
  return processed;
}

export async function fileCleanup(req, res) {
  const send = (status, value) => {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(status).json(value);
  };
  if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });
  if (!allowedOrigin(req.headers.origin)) return send(403, { error: 'Invalid origin' });

  try {
    const version = await targetRpc('ops_version', {});
    const header = req.headers.authorization;
    if (version.backend !== 'target' || version.phase !== 'active' || typeof header !== 'string' || !header.startsWith('Bearer ')) {
      return send(403, { error: '권한을 확인해주세요.' });
    }
    if (!await targetRpc('is_admin', {}, header.slice(7))) {
      return send(403, { error: '권한을 확인해주세요.' });
    }
    try {
      return send(200, { ok: true, processed: await cleanupPendingFiles() });
    } catch {
      return send(202, { ok: true, pending: true });
    }
  } catch {
    return send(503, { error: '잠시 후 다시 시도해주세요.' });
  }
}
