import binding from '../lib/sunning-bindings.json' with { type: 'json' };

export async function targetRpc(name, body, token = binding.targetKey) {
  const response = await fetch(binding.targetUrl + '/rest/v1/rpc/' + name, {
    method: 'POST',
    headers: {
      apikey: binding.targetKey,
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Content-Profile': binding.targetSchema,
    },
    body: JSON.stringify(body),
    redirect: 'error',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw Error('Sunning operation unavailable');
  return response.json();
}

export function allowedOrigin(origin) {
  const origins = binding.stage === 'production'
    ? ['https://sunning-2025.vercel.app']
    : ['http://localhost:4452', 'http://127.0.0.1:4452'];
  if (process.env.VERCEL_URL) origins.push('https://' + process.env.VERCEL_URL);
  return origins.includes(origin);
}
