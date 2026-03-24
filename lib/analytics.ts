import { supabase } from './supabaseClient';

export type AnalyticsEventName =
  | 'page_view'
  | 'click_topnav'
  | 'click_logo'
  | 'click_service_section'
  | 'click_cta'
  | 'click_document_cta'
  | 'scroll_depth'
  | 'click_topbar_shortcut'
  | 'click_popup';

export interface TrackEventPayload {
  page_path?: string;
  page_slug?: string;
  scroll_depth?: number;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

const SESSION_KEY = 'suning_session_id';

const getSessionId = () => {
  if (typeof window === 'undefined') return 'server';
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(SESSION_KEY, newId);
  return newId;
};

const getTrafficMeta = () => {
  if (typeof window === 'undefined') {
    return {
      referrer: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
    };
  }

  const search = new URLSearchParams(window.location.search);
  return {
    referrer: document.referrer || '',
    utm_source: search.get('utm_source') ?? '',
    utm_medium: search.get('utm_medium') ?? '',
    utm_campaign: search.get('utm_campaign') ?? '',
  };
};

export const trackEvent = async (eventName: AnalyticsEventName, payload: TrackEventPayload = {}) => {
  const pagePath =
    payload.page_path ??
    (typeof window !== 'undefined' ? window.location.pathname : '(unknown)');

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const { meta, ...rest } = payload;
    window.gtag('event', eventName, {
      ...rest,
      page_path: pagePath,
      ...(meta ?? {}),
    });
  }

  if (!supabase) return;

  const { meta, ...rest } = payload;
  const trafficMeta = getTrafficMeta();

  void supabase.from('event_logs').insert({
    event_name: eventName,
    page_path: pagePath,
    page_slug: payload.page_slug ?? '',
    scroll_depth: payload.scroll_depth ?? null,
    session_id: getSessionId(),
    referrer: trafficMeta.referrer,
    utm_source: trafficMeta.utm_source,
    utm_medium: trafficMeta.utm_medium,
    utm_campaign: trafficMeta.utm_campaign,
    meta: {
      ...rest,
      ...(meta ?? {}),
    },
  });
};
