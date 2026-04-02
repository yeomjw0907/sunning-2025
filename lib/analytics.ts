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
  const utmSource = search.get('utm_source') ?? '';
  const utmMedium = search.get('utm_medium') ?? '';
  const utmCampaign = search.get('utm_campaign') ?? '';

  // `document.referrer`는 브라우저 정책/링크 방식에 따라 비어있을 수 있어,
  // UTM이 있으면 "유입 경로"를 대신해서 기록한다.
  const utmFallbackReferrer = [utmSource, utmMedium, utmCampaign]
    .filter((v) => Boolean(v))
    .join(' / ');

  const referrer = document.referrer || utmFallbackReferrer;

  return {
    referrer,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
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
