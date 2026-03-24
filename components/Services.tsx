import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { trackEvent } from '../lib/analytics';

const trackSectionClick = (sectionName: string) => {
  void trackEvent('click_service_section', { section_name: sectionName });
};

const Services: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-suning-blue"></span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-suning-blue">
              서비스 안내
            </h3>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium leading-[1.2] word-keep-all tracking-tight text-slate-900 mb-6">
            슈닝이 하는 일
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed word-keep-all">
            도매부터 재고까지, 한 곳에서 해결하는 슈닝의 서비스를 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              onClick={() => trackSectionClick(service.title)}
              className="group relative block rounded-[2.5rem] overflow-hidden transition-all duration-500 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-suning-blue/30 hover:scale-[1.01] p-6 md:p-8 min-h-[220px] flex flex-col"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-suning-blue/20 text-suning-blue border border-suning-blue/30 w-fit mb-4">
                {service.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight word-keep-all mt-2 mb-2 group-hover:text-suning-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed word-keep-all mb-6 flex-grow">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 text-suning-blue font-bold text-sm md:text-base group-hover:gap-3 transition-all">
                자세히 보기
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
