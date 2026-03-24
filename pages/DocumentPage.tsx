import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DOCUMENT_PAGES } from '../data/documentContent';
import { trackEvent } from '../lib/analytics';

const trackDocumentCtaClick = (ctaType: 'phone' | 'kakao' | 'home', pageSlug: string | undefined, pageTitle: string | undefined) => {
  void trackEvent('click_document_cta', {
    cta_type: ctaType,
    page_slug: pageSlug ?? '(unknown)',
    page_title: pageTitle ?? '(unknown)',
  });
};

export default function DocumentPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? DOCUMENT_PAGES[slug] : null;

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-slate-900 flex flex-col items-center justify-center px-6">
        <p className="text-xl text-gray-500 mb-6">해당 서비스 페이지를 찾을 수 없습니다.</p>
        <Link to="/" className="text-suning-blue font-bold hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 font-sans text-slate-900 selection:bg-suning-accent selection:text-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-[2px] bg-suning-blue rounded-full" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-suning-blue">서비스 안내</span>
        </div>
        {doc.heroImage && (
          <div className="rounded-[1.5rem] overflow-hidden shadow-lg ring-1 ring-slate-200/60 mb-10">
            <img src={doc.heroImage} alt={doc.title} className="w-full h-52 sm:h-64 md:h-80 object-cover" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 word-keep-all mb-4">
          {doc.title}
        </h1>
        {doc.lead && (
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed word-keep-all mb-12 max-w-2xl">
            {doc.lead}
          </p>
        )}

        <div className="space-y-14 md:space-y-16">
          {doc.sections.map((section, index) => (
            <section key={index} className="bg-white rounded-[1.5rem] p-6 sm:p-8 md:p-10 shadow-sm ring-1 ring-slate-200/50">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 word-keep-all border-b border-slate-100 pb-4">
                {section.heading}
              </h2>
              {section.image && (
                <div className="rounded-xl overflow-hidden ring-1 ring-slate-200/50 mb-6">
                  <img src={section.image} alt={section.heading} className="w-full h-56 sm:h-64 object-cover" />
                </div>
              )}
              {section.feeItems && section.images && section.feeItems.length > 0 && section.images.length >= section.feeItems.length ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-4">
                    {section.feeItems.map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl overflow-hidden ring-1 ring-slate-200/50">
                        <div className="aspect-[4/3] sm:aspect-square">
                          <img src={section.images![i]} alt={item.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 sm:p-4">
                          <p className="font-bold text-slate-800 word-keep-all text-sm sm:text-base">{item.label}</p>
                          <p className="text-suning-blue font-semibold text-sm mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm mb-6">* 대량 작업은 별도 협의입니다.</p>
                </>
              ) : section.feeItems && section.feeItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {section.feeItems.map((item, i) => (
                      <div
                        key={i}
                        className="group flex flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-suning-blue/30 transition-all duration-200"
                      >
                        <p className="font-bold text-slate-900 word-keep-all text-base sm:text-lg mb-2">{item.label}</p>
                        <p className="mt-auto text-suning-blue font-bold text-lg sm:text-xl">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm">* 대량 작업은 별도 협의입니다.</p>
                </>
              ) : section.images && section.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {section.images.map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden ring-1 ring-slate-200/50 aspect-[4/3] sm:aspect-square">
                      <img src={src} alt={`${section.heading} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
              {section.steps && section.steps.length > 0 ? (
                <div className="space-y-0">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-4 sm:gap-6 py-5 sm:py-6 border-b border-slate-100 last:border-0">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-suning-blue text-white font-bold flex items-center justify-center text-base shadow-sm">
                        {stepIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 mb-2 word-keep-all text-lg">{step.label}</h3>
                        <p className="text-slate-600 leading-relaxed word-keep-all whitespace-pre-line text-[15px] sm:text-base">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed word-keep-all whitespace-pre-line text-[15px] sm:text-base">
                  {section.body}
                </p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-10 pb-4">
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm ring-1 ring-slate-200/50">
            <p className="text-slate-500 mb-6 text-center sm:text-left">궁금한 점이 있으시면 편하게 연락 주세요.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
              <a
                href="tel:070-7078-9880"
                className="inline-flex items-center justify-center gap-2 bg-suning-orange text-white font-bold py-3.5 px-8 rounded-full hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
                onClick={() => trackDocumentCtaClick('phone', slug, doc.title)}
              >
                문의하기 070-7078-9880
              </a>
              <a
                href="https://suning.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 font-bold py-3.5 px-8 rounded-full hover:border-suning-blue hover:text-suning-blue transition-colors w-full sm:w-auto"
                onClick={() => trackDocumentCtaClick('kakao', slug, doc.title)}
              >
                카톡상담
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 font-bold py-3.5 px-8 rounded-full hover:border-suning-blue hover:text-suning-blue transition-colors w-full sm:w-auto"
                onClick={() => trackDocumentCtaClick('home', slug, doc.title)}
              >
                슈닝 바로가기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
