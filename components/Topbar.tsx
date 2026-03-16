import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TOP_NAV_LINKS } from '../constants';
import { DOCUMENT_PAGES } from '../data/documentContent';

const Topbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const currentDoc = slug && DOCUMENT_PAGES[slug] ? DOCUMENT_PAGES[slug] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-slate-900 hover:text-suning-blue transition-colors" aria-label="슈닝 메인으로">
          슈닝
        </Link>

        {/* Desktop: 전부 상단 직접 링크 (드롭다운 없음). 메인은 슈닝 클릭으로. */}
        <nav className="hidden md:flex items-center gap-5">
          {TOP_NAV_LINKS.map((item) => {
            const isActive = slug === item.id;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`font-medium py-2 transition-colors ${isActive ? 'text-suning-blue' : 'text-slate-700 hover:text-suning-blue'}`}
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
          {TOP_NAV_LINKS.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="block py-3 text-slate-700 font-medium hover:text-suning-blue"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Topbar;
