import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-32 bg-[#0088CC]">
      
      {/* Dynamic Background with Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0099EE] via-[#0088CC] to-[#006699] opacity-100 z-0"></div>
      
      {/* Mesh/Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>

      {/* Decorative Floating Blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-suning-orange rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-blob animation-delay-2000 z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-lg">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/90">
            도매 전과정 해결
          </p>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white drop-shadow-2xl mb-6 text-center word-keep-all">
          도매부터 재고까지,<br/>
          한 곳에서.
        </h1>

        <h2 className="text-2xl md:text-4xl font-light leading-tight text-white/90 mb-8 tracking-tight">
          효율적인 소싱과 물류, <span className="font-bold text-white">슈닝</span>이 함께합니다.
        </h2>

        <div className="max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed text-blue-50/90 word-keep-all text-center">
          <p>
            <span className="text-white font-bold">슈닝(Suning)</span>은 중국 구매대행·배송대행·재고관리를<br/>
            원스톱으로 제공합니다.<br/>
            지금 상담받고 견적을 확인해 보세요.
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator - Fixed centering for mobile */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center gap-3 animate-bounce z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Scroll</span>
      </div>
    </div>
  );
};

export default Hero;