import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

interface PopupItem {
  id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
}

const extractStoragePath = (publicUrl: string, bucket: string) => {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
};

export default function AdminPopups() {
  const [items, setItems] = useState<PopupItem[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('popups')
      .select('id,title,body,image_url,link_url,starts_at,ends_at,is_active')
      .order('created_at', { ascending: false });
    setItems((data ?? []) as PopupItem[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');

    let imageUrl: string | null = null;
    if (file) {
      const path = `${Date.now()}-${file.name}`;
      const uploadRes = await supabase.storage.from('popups').upload(path, file);
      if (uploadRes.error) {
        setLoading(false);
        setError(uploadRes.error.message);
        return;
      }
      const { data: publicData } = supabase.storage.from('popups').getPublicUrl(path);
      imageUrl = publicData.publicUrl;
    }

    const { error: insertError } = await supabase.from('popups').insert({
      title: title.trim() || '팝업',
      body: body || null,
      image_url: imageUrl,
      link_url: linkUrl || null,
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      is_active: isActive,
    });

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle('');
    setBody('');
    setLinkUrl('');
    setStartsAt('');
    setEndsAt('');
    setIsActive(false);
    setFile(null);
    await load();
  };

  const toggle = async (item: PopupItem) => {
    if (!supabase) return;
    await supabase.from('popups').update({ is_active: !item.is_active }).eq('id', item.id);
    await load();
  };

  const remove = async (item: PopupItem) => {
    if (!supabase) return;
    await supabase.from('popups').delete().eq('id', item.id);
    if (item.image_url) {
      const storagePath = extractStoragePath(item.image_url, 'popups');
      if (storagePath) await supabase.storage.from('popups').remove([storagePath]);
    }
    await load();
  };

  return (
    <AdminLayout title="팝업 관리" description="공지성 팝업 이미지/텍스트/기간을 관리합니다.">
      <form onSubmit={onCreate} className="bg-white border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-700">제목(선택)</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-700">본문(선택)</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">링크 URL</span>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">이미지 파일(선택)</span>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">시작일시</span>
          <input
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">종료일시</span>
          <input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span className="text-sm text-slate-700">활성화</span>
        </label>
        {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-suning-blue text-white px-5 py-2.5 font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? '저장 중...' : '팝업 추가'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                {item.body && <p className="text-slate-600 text-sm mt-1 whitespace-pre-line">{item.body}</p>}
                <p className="text-xs text-slate-500 mt-2">
                  {item.starts_at || '즉시'} ~ {item.ends_at || '무기한'}
                </p>
              </div>
              {item.image_url && <img src={item.image_url} alt={item.title} className="w-40 h-24 object-cover rounded-lg border border-slate-200" />}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => toggle(item)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold"
              >
                {item.is_active ? '비활성화' : '활성화'}
              </button>
              <button
                type="button"
                onClick={() => remove(item)}
                className="rounded-lg border border-red-300 text-red-600 px-3 py-1.5 text-xs font-semibold"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
