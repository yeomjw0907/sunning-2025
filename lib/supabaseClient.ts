import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import binding from './sunning-bindings.json';

export let supabase: SupabaseClient<any, any, any> | null = null;
export const isSupabaseConfigured = true;
const targetOrigin = new URL(binding.targetUrl).origin;
const storageKey = 'sb-sunning-live-auth-token';

async function version() {
  const response = await fetch(binding.targetUrl + '/rest/v1/rpc/ops_version', {
    method: 'POST',
    headers: {
      apikey: binding.targetKey,
      Authorization: 'Bearer ' + binding.targetKey,
      'Content-Type': 'application/json',
      'Content-Profile': binding.targetSchema,
    },
    body: '{}',
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw Error('관리 연결을 확인할 수 없습니다. 잠시 후 새로고침해주세요.');
  return response.json();
}

const safeFetch: typeof fetch = async (input, init) => {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
  if (url.origin !== targetOrigin) throw Error('Unexpected site data endpoint');
  if (binding.stage === 'synthetic' && /^\/auth\/v1\/(signup|recover|otp|invite|resend|magiclink)/.test(url.pathname)) {
    throw Error('Synthetic mail disabled');
  }
  if (url.pathname === '/auth/v1/token' && url.searchParams.get('grant_type') === 'password') {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: init?.body,
      redirect: 'error',
    });
  }
  return fetch(input, { ...init, redirect: 'error' });
};

export async function initialize() {
  const state = await version();
  if (state.backend !== 'target') throw Error('관리 연결을 확인할 수 없습니다. 잠시 후 새로고침해주세요.');
  const revision = state.revision || state.backend;
  try {
    const prior = localStorage.getItem('sunning-runtime-revision');
    if (prior && prior !== revision) localStorage.removeItem(storageKey);
    localStorage.setItem('sunning-runtime-revision', revision);
  } catch {
    // Browser storage may be unavailable.
  }
  supabase = createClient(binding.targetUrl, binding.targetKey, {
    db: { schema: binding.targetSchema },
    auth: { storageKey, persistSession: true, autoRefreshToken: true },
    global: { fetch: safeFetch },
  });
  const from = supabase.storage.from.bind(supabase.storage);
  supabase.storage.from = (bucket: string) => {
    if (!['testimonials', 'popups'].includes(bucket)) throw Error('Unknown site bucket');
    return from(binding.targetSchema + '-' + bucket);
  };

  const check = async () => {
    try {
      const next = await version();
      if (next.phase !== 'active' || (next.revision || next.backend) === revision) return;
      const dirty = [...document.querySelectorAll('input,textarea')].some((element) => {
        const input = element as HTMLInputElement;
        return input.type === 'file' ? Boolean(input.files?.length) : input.value !== input.defaultValue;
      });
      if (!dirty) {
        location.reload();
        return;
      }
      if (document.getElementById('sunning-transition')) return;
      const notice = document.createElement('div');
      notice.id = 'sunning-transition';
      notice.textContent = '관리 연결이 갱신되었습니다. 입력 내용을 보관한 뒤 새로고침해주세요.';
      Object.assign(notice.style, {
        position: 'fixed', top: '0', left: '0', right: '0', zIndex: '99999',
        padding: '16px', background: '#fff3cd', color: '#222',
      });
      document.body.append(notice);
    } catch {
      // Retain the current page on a temporary network error.
    }
  };
  setInterval(check, 30000);
  addEventListener('focus', check);
}

export async function recordEvent(event: Record<string, unknown>) {
  const response = await fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request_id: crypto.randomUUID(), event }),
    redirect: 'error',
  });
  if (!response.ok) console.warn('통계 저장을 재시도할 수 없습니다.');
}

export async function removeSunningFile(publicUrl: string, bucket: string) {
  if (!supabase || !['testimonials', 'popups'].includes(bucket)) throw Error('관리 연결을 확인해주세요.');
  const url = new URL(publicUrl);
  const prefix = '/storage/v1/object/public/' + binding.targetSchema + '-' + bucket + '/';
  if (url.origin !== targetOrigin || !url.pathname.startsWith(prefix)) return;
  const key = url.pathname.slice(prefix.length).split('/').map(decodeURIComponent).join('/');
  const result = await supabase.storage.from(bucket).remove([key]);
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    try {
      await fetch('/api/files/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
        body: '{}',
        redirect: 'error',
      });
    } catch {
      // The native deletion already queued durable cleanup.
    }
  }
  if (result.error) console.warn('Sunning file cleanup queued');
}
