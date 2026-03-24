import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AdminLayout({ title, description, children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg text-slate-900">
            슈닝 Admin
          </Link>
          <button
            type="button"
            onClick={async () => {
              if (!supabase) return;
              await supabase.auth.signOut();
              window.location.href = '/admin/login';
            }}
            className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:border-slate-300"
          >
            로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="bg-white border border-slate-200 rounded-2xl p-4 h-fit">
          <nav className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-suning-blue text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              분석 대시보드
            </NavLink>
            <NavLink
              to="/admin/testimonials"
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-suning-blue text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              후기 이미지 관리
            </NavLink>
            <NavLink
              to="/admin/popups"
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-suning-blue text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              팝업 관리
            </NavLink>
          </nav>
        </aside>

        <main className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {description && <p className="text-slate-500 mt-1">{description}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
