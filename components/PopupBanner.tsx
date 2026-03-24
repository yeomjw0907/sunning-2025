import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';
import { supabase } from '../lib/supabaseClient';

interface PopupItem {
  id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  starts_at: string | null;
  ends_at: string | null;
}

const dismissedKey = (id: string) => `popup_dismissed_until_${id}`;

const isDismissed = (id: string) => {
  const value = localStorage.getItem(dismissedKey(id));
  if (!value) return false;
  return Number(value) > Date.now();
};

export default function PopupBanner() {
  const { pathname } = useLocation();
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;

    const fetchPopup = async () => {
      const { data } = await supabase
        .from('popups')
        .select('id,title,body,image_url,link_url,starts_at,ends_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (!mounted || !data || data.length === 0) return;
      const now = Date.now();
      const validPopups = data.filter((item) => {
        const startOk = !item.starts_at || new Date(item.starts_at).getTime() <= now;
        const endOk = !item.ends_at || new Date(item.ends_at).getTime() >= now;
        return startOk && endOk && !isDismissed(item.id);
      });
      if (validPopups.length === 0) return;

      setPopups(validPopups);
      setCurrentIndex(0);
    };

    void fetchPopup();
    return () => {
      mounted = false;
    };
  }, []);

  const popup = popups[currentIndex] ?? null;
  const hasContent = useMemo(() => popup && (popup.image_url || popup.body), [popup]);
  if (pathname.startsWith('/admin')) return null;
  if (!popup || !hasContent) return null;

  const showNextPopup = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= popups.length) {
        setPopups([]);
        return 0;
      }
      return next;
    });
  };

  const close = () => showNextPopup();

  const closeToday = () => {
    localStorage.setItem(dismissedKey(popup.id), String(Date.now() + 24 * 60 * 60 * 1000));
    showNextPopup();
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={close}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {popup.image_url && (
          <div className="bg-slate-100">
            <img src={popup.image_url} alt={popup.title} className="w-full max-h-[60vh] object-contain" />
          </div>
        )}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            {popup.link_url && (
              <a
                href={popup.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  void trackEvent('click_popup', {
                    page_path: window.location.pathname,
                    meta: { popup_id: popup.id, action: 'link' },
                  });
                }}
                className="inline-flex items-center justify-center rounded-full bg-suning-blue px-5 py-2.5 text-white font-bold hover:opacity-90 transition-opacity"
              >
                자세히 보기
              </a>
            )}
            <button
              type="button"
              onClick={closeToday}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-slate-700 font-semibold hover:border-slate-300"
            >
              오늘 하루 보지 않기
            </button>
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-slate-700 font-semibold hover:border-slate-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
