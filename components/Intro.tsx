import React from 'react';

const Intro: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden bg-dot-pattern">
      
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-suning-blue"></span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-suning-blue">
              2025 Highlights
            </h3>
          </div>
          
          <p className="text-4xl md:text-6xl font-medium leading-[1.2] word-keep-all tracking-tight text-slate-900">
            2025년, 우리는 단순한 화물 운송을 넘어<br className="hidden md:block"/>
            <span className="text-gradient font-bold relative inline-block">
               기대 그 이상의 가치
               <svg className="absolute -bottom-2 left-0 w-full h-3 text-suning-blue opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
               </svg>
            </span>를 전달했습니다.
          </p>
          <p className="mt-8 text-xl text-gray-500 max-w-2xl leading-relaxed word-keep-all md:ml-auto">
            급변하는 국제 정세 속에서도 슈닝은 흔들리지 않는 연결을 지속하며,
            고객님의 비즈니스 파트너로서 함께 성장했습니다.
          </p>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full overflow-hidden py-16 bg-slate-900 transform -skew-y-2">
        <div className="absolute inset-0 bg-suning-navy opacity-90"></div>
        
        <div className="flex whitespace-nowrap animate-marquee relative z-10 items-center">
          {['Global Trade', '물류 혁신', 'Supply Chain', '슈닝 2025', '수출', '수입', 'Fast Delivery', 'Global Trade', '물류 혁신', 'Supply Chain', '슈닝 2025', '수출', '수입', 'Fast Delivery'].map((item, idx) => (
             <React.Fragment key={idx}>
               <span className="mx-8 text-5xl md:text-8xl font-black uppercase tracking-tighter text-transparent stroke-text hover:text-white transition-colors duration-300 cursor-default">
                 {item}
               </span>
               <span className="w-4 h-4 rounded-full bg-suning-orange/50"></span>
             </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;