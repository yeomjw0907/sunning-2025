import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { TOP_NAV_LINKS } from '../constants';
import { DOCUMENT_PAGES } from '../data/documentContent';
import { trackEvent } from '../lib/analytics';

const trackTopnavClick = (navId: string, navLabel: string) => {
  void trackEvent('click_topnav', {
    nav_id: navId,
    nav_label: navLabel,
  });
};

const trackLogoClick = () => {
  void trackEvent('click_logo', {
    area: 'topbar',
  });
};

const Topbar: React.FC = () => {
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const currentDoc = slug && DOCUMENT_PAGES[slug] ? DOCUMENT_PAGES[slug] : null;
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="슈닝 메인으로"
          onClick={trackLogoClick}
        >
          <img src="/logo.png" alt="슈닝" className="h-7 sm:h-9 w-auto object-contain" />
        </Link>

        {/* Desktop: 중앙 메뉴 */}
        <nav className="hidden md:flex items-center justify-center gap-6 md:absolute md:left-1/2 md:-translate-x-1/2">
          {TOP_NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`font-medium py-2 transition-colors ${isActive ? 'text-suning-blue' : 'text-slate-700 hover:text-suning-blue'}`}
                onClick={() => trackTopnavClick(item.id, item.label)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop: 우측 공식 홈페이지 바로가기 */}
        <a
          href="https://suning.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-suning-blue hover:text-suning-blue transition-colors"
          onClick={() => {
            void trackEvent('click_topbar_shortcut', {
              destination: 'https://suning.kr/',
            });
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
          </svg>
          슈닝 공식 홈페이지
        </a>

        {/* Mobile: 우측 공식 홈페이지 버튼 */}
        <a
          href="https://suning.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 hover:border-suning-blue hover:text-suning-blue transition-colors whitespace-nowrap shrink-0"
          onClick={() => {
            void trackEvent('click_topbar_shortcut', {
              destination: 'https://suning.kr/',
            });
          }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
          </svg>
          슈닝 공식 홈페이지
        </a>
        </div>
      </header>

      {/* Mobile 상단(Topbar 바로 아래) 고정 메뉴 */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur px-2">
        <nav className="grid grid-cols-5 gap-1 py-2">
          {TOP_NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`text-center text-[11px] leading-tight font-semibold px-1 py-1.5 rounded-lg transition-colors ${
                  isActive ? 'text-suning-blue bg-suning-blue/10' : 'text-slate-600 hover:text-suning-blue'
                }`}
                onClick={() => {
                  trackTopnavClick(item.id, item.label);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Topbar;
