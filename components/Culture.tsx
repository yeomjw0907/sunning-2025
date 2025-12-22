import React from 'react';

const Culture: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 md:mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4">
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Our Culture & Partners</span>
                </div>
                <p className="text-3xl md:text-5xl font-bold text-slate-900 word-keep-all leading-tight">
                    정확함은 기본, 그 이상의 <span className="text-suning-blue italic">신뢰</span>.<br/>
                    우리는 매일 완벽을 향해 달립니다.
                </p>
            </div>
            <div className="hidden md:block">
                 <a href="https://suning.kr" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-suning-blue hover:border-suning-blue transition-colors">
                    슈닝 홈페이지 방문하기
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 </a>
            </div>
        </div>

        {/* Improved Bento Grid Gallery 
            Mobile: h-auto with min-height rows to prevent cramping. 
            Desktop: h-[100vh] for the fixed bento look.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-auto md:h-[100vh]">
            
            {/* Main Feature - Yiwu Center Expansion */}
            <div className="col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 min-h-[300px] md:min-h-0">
                 <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" alt="Yiwu Center Expansion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="bg-suning-orange text-white text-xs font-bold px-2 py-1 rounded">HOT</span>
                        <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Infrastructure</p>
                     </div>
                     <p className="text-white font-bold text-3xl md:text-4xl leading-tight mb-2">이우 센터 대규모 확장</p>
                     <p className="text-gray-300 text-sm md:text-base font-medium">일일 출고량 2배 증가 • 3,000평 규모 인프라 구축</p>
                 </div>
            </div>

             {/* Quote Block - Orange */}
             <div className="col-span-2 md:col-span-1 row-span-1 bg-suning-orange rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 rounded-full transition-transform duration-700 ease-out"></div>
                 <p className="text-4xl text-white/30 font-serif mb-2">"</p>
                 <p className="text-xl md:text-2xl font-bold text-white italic word-keep-all relative z-10">Super Running,<br/>Suning</p>
            </div>

            {/* Vertical - Boxes 
                Mobile: row-span-1 (Square) to match partner box and fill the row evenly 
                Desktop: row-span-2 (Tall)
            */}
            <div className="col-span-1 row-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden group shadow-md">
                <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600" alt="Logistics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            </div>

             {/* Partner Block 1 - 1688 Official Partner */}
            <div className="col-span-1 row-span-1 bg-[#E6F7FF] rounded-[2rem] p-4 md:p-6 shadow-sm border border-blue-100 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-suning-blue mb-2 uppercase tracking-wider">Official Partner</p>
                <p className="text-lg font-black text-slate-800 word-keep-all leading-tight">1688<br/>공식 파트너</p>
            </div>

             {/* Wide Block - Global (LINK ADDED) */}
            <a 
              href="https://suning.kr/agency/delivery-price" 
              target="_blank" 
              rel="noreferrer"
              className="col-span-2 md:col-span-2 row-span-1 bg-suning-navy rounded-[2rem] relative overflow-hidden flex items-center group shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
                 <img src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800" alt="Shipping" className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                 <div className="relative z-20 p-6 md:p-8 w-full">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-suning-orange font-bold tracking-widest text-xs uppercase mb-2">Network</p>
                            <p className="text-white font-bold text-3xl tracking-tight">Global Logistics</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-suning-navy transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                 </div>
            </a>

             {/* Small Photo - Replaced Figurines with Logistics Image */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400" alt="Packaging Detail" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            
             {/* Partner Block 2 - Alibaba Official Partner */}
            <div className="col-span-1 md:col-span-1 row-span-1 bg-[#E6F7FF] rounded-[2rem] p-4 md:p-6 shadow-sm border border-blue-100 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-suning-blue mb-2 uppercase tracking-wider">Official Partner</p>
                <p className="text-lg font-black text-slate-800 word-keep-all leading-tight">알리바바<br/>공식 파트너</p>
            </div>
            
            {/* Bottom Wide */}
             <div className="col-span-2 row-span-1 bg-white text-slate-800 rounded-[2rem] p-6 md:p-8 flex items-center justify-between shadow-lg border border-slate-100 hover:border-suning-orange/50 transition-colors">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Since 2025</p>
                    <p className="text-xl md:text-2xl font-bold">고객 만족도 최우수 기업</p>
                </div>
                <div className="text-4xl filter drop-shadow-md">🏆</div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Culture;