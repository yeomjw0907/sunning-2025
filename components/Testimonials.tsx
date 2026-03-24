import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../constants';
import { supabase } from '../lib/supabaseClient';

interface ManagedTestimonial {
  id: string;
  image_url: string;
  quote: string | null;
  source: string | null;
}

const Testimonials: React.FC = () => {
  const [managedItems, setManagedItems] = useState<ManagedTestimonial[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    const load = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('id,image_url,quote,source')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(12);

      if (!mounted) return;
      setManagedItems((data ?? []) as ManagedTestimonial[]);
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const hasManagedItems = managedItems.length > 0;
  const loopItems = hasManagedItems ? [...managedItems, ...managedItems] : [];

  useEffect(() => {
    if (!hasManagedItems) return;
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [hasManagedItems, managedItems.length]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    draggingRef.current = true;
    pausedRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = startScrollRef.current - dx;
  };

  const stopDrag = () => {
    draggingRef.current = false;
    pausedRef.current = false;
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-suning-blue"></span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-suning-blue">
              고객 후기
            </h3>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium leading-[1.2] word-keep-all tracking-tight text-slate-900">
            슈닝과 함께한 <span className="text-gradient font-bold">실제 경험</span>
          </h2>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl leading-relaxed word-keep-all">
            물류비 절감과 빠른 배송에 만족한 고객님들의 이야기입니다.
          </p>
        </div>

        {hasManagedItems ? (
          <div
            ref={scrollerRef}
            className="overflow-x-auto overflow-y-hidden select-none cursor-grab active:cursor-grabbing hide-scrollbar"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
              stopDrag();
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
          >
            <div className="flex gap-5 sm:gap-6 w-max py-1">
              {loopItems.map((item, idx) => (
                <article
                  key={`${item.id}-${idx}`}
                  className="w-[78vw] sm:w-[52vw] lg:w-[30vw] max-w-[420px] rounded-[1.75rem] overflow-hidden border border-slate-100 shadow-lg bg-white flex-shrink-0"
                >
                  <img src={item.image_url} alt={item.source || '고객 후기'} className="w-full aspect-[4/3] object-cover" />
                  {(item.quote || item.source) && (
                    <div className="p-5">
                      {item.quote && <p className="text-slate-700 leading-relaxed mb-2">{item.quote}</p>}
                      {item.source && <p className="text-slate-500 text-sm font-semibold">{item.source}</p>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 shadow-xl p-8 flex flex-col"
              >
                <p className="text-4xl text-suning-blue/30 font-serif mb-4">"</p>
                <p className="text-slate-700 text-lg leading-relaxed word-keep-all flex-grow mb-6">
                  {testimonial.quote}
                </p>
                {testimonial.authorLabel && (
                  <p className="text-slate-500 text-sm font-bold">
                    {testimonial.authorLabel}
                    {testimonial.authorRole && <span className="text-slate-400 font-medium"> · {testimonial.authorRole}</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
