import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

export default function RouteTracker() {
  const location = useLocation();
  const reachedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    reachedMilestones.current = new Set();
    void trackEvent('page_view', {
      page_path: location.pathname,
    });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.round((scrollTop / scrollableHeight) * 100);
      SCROLL_MILESTONES.forEach((milestone) => {
        if (progress >= milestone && !reachedMilestones.current.has(milestone)) {
          reachedMilestones.current.add(milestone);
          void trackEvent('scroll_depth', {
            page_path: location.pathname,
            scroll_depth: milestone,
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

  return null;
}
