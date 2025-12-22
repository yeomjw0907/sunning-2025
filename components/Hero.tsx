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
            Global Trade Partner, Suning
          </p>
        </div>
        
        <div className="relative mb-8">
          {/* Background Stroke Text for Depth */}
          <h1 className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-[18vw] md:text-[20vw] leading-none font-black tracking-tighter stroke-text opacity-30 blur-sm select-none pointer-events-none">
            2025
          </h1>
          {/* Main Text */}
          <h1 className="relative text-[18vw] md:text-[20vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 drop-shadow-2xl z-10">
            2025
          </h1>
        </div>

        <h2 className="text-3xl md:text-6xl font-light italic leading-tight text-white/90 mb-10 tracking-tight">
          Year in <span className="font-bold text-white">Review</span>
        </h2>

        <div className="max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed text-blue-50/90 word-keep-all text-center">
          <p>
            <span className="text-white font-bold">슈닝(Suning)</span>은 멈추지 않았습니다.<br/>
            이우 센터 확장부터 1688 시스템 연동까지,<br/>
            여러분의 비즈니스 성장을 위한 여정을 기록합니다.
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