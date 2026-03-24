import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

interface TestimonialItem {
  id: string;
  image_url: string;
  quote: string | null;
  source: string | null;
  is_active: boolean;
  sort_order: number;
}

const extractStoragePath = (publicUrl: string, bucket: string) => {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [active, setActive] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('testimonials')
      .select('id,image_url,quote,source,is_active,sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    setItems((data ?? []) as TestimonialItem[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (files.length === 0) {
      setError('이미지 파일을 1개 이상 선택해 주세요.');
      return;
    }
    setLoading(true);
    setError('');

    const maxSort = items.reduce((max, item) => Math.max(max, item.sort_order), 0);
    const records: { image_url: string; quote: null; source: null; sort_order: number; is_active: boolean }[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const path = `${Date.now()}-${i}-${file.name}`;
      const uploadRes = await supabase.storage.from('testimonials').upload(path, file, { upsert: false });
      if (uploadRes.error) {
        setLoading(false);
        setError(uploadRes.error.message);
        return;
      }

      const { data: urlData } = supabase.storage.from('testimonials').getPublicUrl(path);
      records.push({
        image_url: urlData.publicUrl,
        quote: null,
        source: null,
        sort_order: maxSort + i + 1,
        is_active: active,
      });
    }

    const insertRes = await supabase.from('testimonials').insert(records);

    setLoading(false);
    if (insertRes.error) {
      setError(insertRes.error.message);
      return;
    }

    setActive(true);
    setFiles([]);
    await load();
  };

  const toggleActive = async (item: TestimonialItem) => {
    if (!supabase) return;
    await supabase.from('testimonials').update({ is_active: !item.is_active }).eq('id', item.id);
    await load();
  };

  const remove = async (item: TestimonialItem) => {
    if (!supabase) return;
    await supabase.from('testimonials').delete().eq('id', item.id);
    const storagePath = extractStoragePath(item.image_url, 'testimonials');
    if (storagePath) await supabase.storage.from('testimonials').remove([storagePath]);
    await load();
  };

  const moveItem = (fromId: string, toId: string) => {
    const fromIndex = items.findIndex((item) => item.id === fromId);
    const toIndex = items.findIndex((item) => item.id === toId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setItems(next);
  };

  const saveOrder = async () => {
    if (!supabase) return;
    setSavingOrder(true);
    setError('');

    const updates = items.map((item, index) =>
      supabase.from('testimonials').update({ sort_order: index + 1 }).eq('id', item.id)
    );
    const results = await Promise.all(updates);
    const failed = results.find((res) => res.error);
    if (failed?.error) {
      setError(failed.error.message);
      setSavingOrder(false);
      return;
    }
    await load();
    setSavingOrder(false);
  };

  return (
    <AdminLayout title="후기 이미지 관리" description="랜딩 고객 후기 섹션에 노출할 이미지/멘트를 관리합니다.">
      <form onSubmit={onCreate} className="bg-white border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-700">이미지 파일 (여러 개 선택 가능)</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="mt-1 block w-full text-sm"
            required
          />
          {files.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">{files.length}개 파일 선택됨</p>
          )}
        </label>
        <label className="flex items-center gap-2 mt-7">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <span className="text-sm text-slate-700">업로드 파일 활성화</span>
        </label>
        {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-suning-blue text-white px-5 py-2.5 font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? '업로드 중...' : '후기 일괄 추가'}
          </button>
        </div>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-slate-600">
          카드를 드래그해서 순서를 바꾼 뒤 <span className="font-semibold">순서 저장</span>을 눌러주세요.
        </p>
        <button
          type="button"
          onClick={saveOrder}
          disabled={savingOrder}
          className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {savingOrder ? '저장 중...' : '순서 저장'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDraggedId(item.id)}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={() => {
              if (draggedId) moveItem(draggedId, item.id);
              setDraggedId(null);
            }}
            onDragEnd={() => setDraggedId(null)}
            className={`bg-white border rounded-2xl overflow-hidden cursor-move ${
              draggedId === item.id ? 'border-suning-blue' : 'border-slate-200'
            }`}
          >
            <img src={item.image_url} alt={item.source || '후기 이미지'} className="w-full aspect-[4/3] object-cover" />
            <div className="p-4 space-y-2">
              <p className="text-sm text-slate-500">순서: {index + 1}</p>
              {item.quote && <p className="text-sm text-slate-700 leading-relaxed">{item.quote}</p>}
              {item.source && <p className="text-xs text-slate-500">{item.source}</p>}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => toggleActive(item)}
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
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
