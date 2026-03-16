import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
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
      </div>
    </section>
  );
};

export default Testimonials;
