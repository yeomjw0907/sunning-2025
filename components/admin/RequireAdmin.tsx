import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface Props {
  children: JSX.Element;
}

export default function RequireAdmin({ children }: Props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!supabase) {
        if (mounted) setLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!mounted) return;
      if (!user) {
        setIsAuthed(false);
        setLoading(false);
        return;
      }

      setIsAuthed(true);
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (!mounted) return;
      setIsAdmin(profile?.role === 'admin');
      setLoading(false);
    };

    void check();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        관리자 권한 확인 중...
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900 mb-2">관리자 권한이 필요합니다.</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            현재 계정은 관리자 권한이 없습니다. Supabase `profiles` 테이블에서 현재 사용자의 `role`을
            `admin`으로 설정해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
