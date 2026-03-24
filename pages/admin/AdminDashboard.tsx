import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

interface AnalyticsRow {
  day: string;
  page_path: string;
  views: number;
  unique_visitors: number;
  topnav_clicks: number;
  cta_clicks: number;
  scroll_25: number;
  scroll_50: number;
  scroll_75: number;
  scroll_90: number;
}

interface ReferrerRow {
  day: string;
  page_path: string;
  referrer: string;
  views: number;
  unique_visitors: number;
}

export default function AdminDashboard() {
  const [days, setDays] = useState(7);
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [refRows, setRefRows] = useState<ReferrerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

      const [analyticsRes, refRes] = await Promise.all([
        supabase
          .from('analytics_page_daily')
          .select('*')
          .gte('day', from)
          .order('day', { ascending: false })
          .order('views', { ascending: false }),
        supabase
          .from('analytics_referrer_daily')
          .select('*')
          .gte('day', from)
          .order('day', { ascending: false })
          .order('views', { ascending: false })
          .limit(80),
      ]);

      if (!mounted) return;
      setRows((analyticsRes.data ?? []) as AnalyticsRow[]);
      setRefRows((refRes.data ?? []) as ReferrerRow[]);
      setLoading(false);
    };

    void fetchData();
    return () => {
      mounted = false;
    };
  }, [days]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.views += row.views || 0;
        acc.unique += row.unique_visitors || 0;
        acc.topnav += row.topnav_clicks || 0;
        acc.cta += row.cta_clicks || 0;
        return acc;
      },
      { views: 0, unique: 0, topnav: 0, cta: 0 }
    );
  }, [rows]);

  return (
    <AdminLayout title="분석 대시보드" description="페이지별 유입/클릭/스크롤을 내부에서 비교합니다.">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <label className="text-sm text-slate-600 mr-3">조회 기간</label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value={1}>최근 1일</option>
          <option value={7}>최근 7일</option>
          <option value={30}>최근 30일</option>
        </select>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">총 조회수</p>
          <p className="text-2xl font-bold mt-1">{totals.views.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">유니크 방문자</p>
          <p className="text-2xl font-bold mt-1">{totals.unique.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">상단 메뉴 클릭</p>
          <p className="text-2xl font-bold mt-1">{totals.topnav.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">CTA 클릭</p>
          <p className="text-2xl font-bold mt-1">{totals.cta.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-auto">
        <table className="w-full text-sm min-w-[880px]">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3">일자</th>
              <th className="text-left px-4 py-3">페이지</th>
              <th className="text-right px-4 py-3">조회</th>
              <th className="text-right px-4 py-3">유니크</th>
              <th className="text-right px-4 py-3">상단메뉴</th>
              <th className="text-right px-4 py-3">CTA</th>
              <th className="text-right px-4 py-3">스크롤 25/50/75/90</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-5 text-slate-500" colSpan={7}>
                  데이터를 불러오는 중...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-slate-500" colSpan={7}>
                  아직 집계 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={`${row.day}-${row.page_path}-${idx}`} className="border-t border-slate-100">
                  <td className="px-4 py-3">{row.day}</td>
                  <td className="px-4 py-3">{row.page_path}</td>
                  <td className="px-4 py-3 text-right">{row.views}</td>
                  <td className="px-4 py-3 text-right">{row.unique_visitors}</td>
                  <td className="px-4 py-3 text-right">{row.topnav_clicks}</td>
                  <td className="px-4 py-3 text-right">{row.cta_clicks}</td>
                  <td className="px-4 py-3 text-right">{`${row.scroll_25}/${row.scroll_50}/${row.scroll_75}/${row.scroll_90}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-auto">
        <h2 className="text-base font-bold px-4 py-3 border-b border-slate-100">유입 경로(Referrer) 상위</h2>
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3">일자</th>
              <th className="text-left px-4 py-3">페이지</th>
              <th className="text-left px-4 py-3">유입경로</th>
              <th className="text-right px-4 py-3">조회</th>
              <th className="text-right px-4 py-3">유니크</th>
            </tr>
          </thead>
          <tbody>
            {refRows.map((row, idx) => (
              <tr key={`${row.day}-${row.page_path}-${row.referrer}-${idx}`} className="border-t border-slate-100">
                <td className="px-4 py-3">{row.day}</td>
                <td className="px-4 py-3">{row.page_path}</td>
                <td className="px-4 py-3">{row.referrer}</td>
                <td className="px-4 py-3 text-right">{row.views}</td>
                <td className="px-4 py-3 text-right">{row.unique_visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
