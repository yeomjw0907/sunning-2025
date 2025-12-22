import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F8FAFC] overflow-hidden py-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-100 to-transparent opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
                <span className="text-suning-blue font-bold tracking-widest uppercase text-sm mb-3 block">Data Report</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                PROVEN<br/>GROWTH.
                </h2>
            </div>
            <p className="text-gray-500 text-lg md:text-xl max-w-md word-keep-all leading-relaxed mb-2">
                데이터로 증명하는 슈닝의 압도적인 성과.<br/>
                우리는 매년 새로운 기록을 경신하고 있습니다.
            </p>
        </div>

        {/* Refined Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
           
           {/* Item 1: Revenue Growth - Large Card */}
           <div className="md:col-span-2 row-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-50 text-suning-blue rounded-2xl">
                           {STATS[0].icon}
                        </div>
                        <span className="text-slate-500 font-bold tracking-wider uppercase text-sm">{STATS[0].label}</span>
                    </div>
                    <span className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter block mt-4">{STATS[0].value}</span>
                </div>
                
                <div className="relative z-10 flex items-center gap-3 mt-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        우상향 성장
                    </span>
                    <span className="text-slate-400 text-sm font-medium">전년 대비 급성장</span>
                </div>

                {/* Decorative Graph Line */}
                <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-suning-blue fill-current">
                       {/* Adjusted path for higher rise */}
                       <path d="M0 40 L0 20 C 30 25, 50 0, 70 10 S 100 0, 100 0 L 100 40 Z" />
                    </svg>
                </div>
           </div>

           {/* Item 2: Subscribers - Orange Brand Card */}
           <div className="md:col-span-1 row-span-2 bg-[#FF8800] rounded-[2.5rem] p-8 shadow-xl shadow-orange-500/20 hover:-translate-y-2 transition-transform duration-500 flex flex-col justify-between text-white relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute -right-12 -top-12 text-white opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-700 pointer-events-none">
                     <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                </div>

                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-white border border-white/10">
                        {STATS[1].icon}
                    </div>
                    <span className="text-6xl font-black block mb-2 tracking-tight">{STATS[1].value}</span>
                    <span className="text-white/90 text-lg font-bold opacity-90 word-keep-all leading-tight block mb-3">{STATS[1].label}</span>
                    
                    {/* Goal Badge */}
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 shadow-sm">
                        목표 달성률 120% 🚀
                    </span>
                </div>
                
                {/* Graph Decoration at Bottom - Increased height and lifted path */}
                <div className="absolute bottom-0 left-0 right-0 h-40 translate-y-2 pointer-events-none">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                        {/* Area Fill - Lifted start and mid points */}
                        <path d="M0 40 L0 25 C 20 28, 45 5, 65 15 S 100 2, 100 2 L 100 40 Z" fill="white" fillOpacity="0.15" />
                        {/* Line Stroke */}
                        <path d="M0 25 C 20 28, 45 5, 65 15 S 100 2, 100 2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        {/* Data Points */}
                        <circle cx="65" cy="15" r="1.5" fill="white" className="animate-pulse" />
                        <circle cx="100" cy="2" r="1.5" fill="white" />
                    </svg>
                </div>
           </div>

           {/* Item 3: Response Speed - Pill Card */}
           <div className="md:col-span-1 row-span-1 bg-white rounded-[2.5rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center hover:border-suning-blue/30 transition-colors group">
                <div className="text-suning-blue mb-3 bg-blue-50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {STATS[2].icon}
                </div>
                <span className="text-3xl font-black text-slate-900 mb-1">{STATS[2].value}</span>
                <span className="text-slate-500 text-sm font-bold">{STATS[2].label}</span>
           </div>

           {/* Item 4: Satisfaction - Dark Card */}
           <div className="md:col-span-1 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-suning-navy"></div>
                
                {/* Stars Background */}
                <div className="absolute top-4 left-4 text-yellow-500 opacity-20 text-xs">★</div>
                <div className="absolute bottom-4 right-4 text-yellow-500 opacity-20 text-xl">★</div>
                <div className="absolute top-1/2 right-4 text-yellow-500 opacity-20 text-sm">★</div>

                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-5xl font-black">{STATS[3].value}</span>
                    </div>
                    <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-1">Top Class</span>
                    <span className="text-slate-400 text-sm block">{STATS[3].label}</span>
                </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;