import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const currentDoc = slug && DOCUMENT_PAGES[slug] ? DOCUMENT_PAGES[slug] : null;
  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="슈닝 메인으로"
          onClick={trackLogoClick}
        >
          <img src="/logo.png" alt="슈닝" className="h-8 sm:h-9 w-auto object-contain" />
        </Link>

        {/* Desktop: 전부 상단 직접 링크 (드롭다운 없음). 메인은 슈닝 클릭으로. */}
        <nav className="hidden md:flex items-center gap-5">
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
          {currentDoc && (
            <span className="text-slate-500 font-medium max-w-[160px] truncate text-sm" title={currentDoc.title}>
              {currentDoc.title}
            </span>
          )}
          <a
            href="https://suning.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium py-2 text-slate-700 hover:text-suning-blue transition-colors"
            onClick={() => {
              void trackEvent('click_topbar_shortcut', {
                destination: 'https://suning.kr/',
              });
            }}
          >
            슈닝 바로가기
          </a>
        </nav>

        {/* Mobile: 햄버거 메뉴 */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-slate-700 hover:text-suning-blue"
            aria-label="메뉴"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile 메뉴 패널: 슈닝 클릭이 메인이므로 메인 링크 없음 */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4">
          {TOP_NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`block py-3 font-medium transition-colors ${isActive ? 'text-suning-blue' : 'text-slate-700 hover:text-suning-blue'}`}
                onClick={() => {
                  trackTopnavClick(item.id, item.label);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://suning.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 font-medium transition-colors text-slate-700 hover:text-suning-blue"
            onClick={() => {
              void trackEvent('click_topbar_shortcut', {
                destination: 'https://suning.kr/',
              });
              setMenuOpen(false);
            }}
          >
            슈닝 바로가기
          </a>
        </div>
      )}
    </header>
  );
};

export default Topbar;
