import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-suning-navy pt-40 pb-12 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* CTA Card - Floating above */}
        <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 mb-24 border border-blue-100 text-center relative z-10 mx-auto max-w-4xl">
             <div className="w-20 h-20 bg-suning-blue rounded-full mx-auto -mt-24 mb-8 flex items-center justify-center text-3xl shadow-lg text-white">
                🚀
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 word-keep-all tracking-tight">
                 <span className="text-suning-blue">2026년</span>, 슈닝과 함께<br/>
                 더 높이 도약하세요.
             </h2>
             <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto word-keep-all leading-relaxed">
                 복잡한 중국 구매대행, 배송대행, 재고관리까지.<br/>슈닝의 전문적인 원스톱 서비스로 해결해 드립니다.
             </p>
             <a 
               href="https://suning.kr/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block bg-suning-orange text-white text-lg font-bold py-4 px-12 rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/30"
             >
                 지금 바로 시작하기 &rarr;
             </a>
        </div>

        {/* Footer Info Section - Based on Reference */}
        <div className="text-left border-t border-white/10 pt-12">
            <div className="mb-8">
                <h5 className="text-white font-bold text-lg mb-4">상호명 : 슈닝 Suning</h5>
                <div className="text-gray-400 text-sm md:text-base space-y-1 font-light leading-relaxed">
                    <p>대표자명 : ZHU HAIYUE(주해월) <span className="mx-2 hidden md:inline">|</span> <span className="block md:inline">사업자등록번호 : 782-16-02358</span></p>
                    <p>주소 : 충청남도 천안시 서북구 불당 23로 13, 502동 1501호 (불당동, 불당이안)</p>
                    <p>전화 : 070-7078-9880 <span className="mx-2 hidden md:inline">|</span> <span className="block md:inline">이메일 : suning@zhoimp.com</span></p>
                </div>
            </div>

            <div className="mb-10 text-xs md:text-sm text-gray-500 space-y-2 word-keep-all leading-relaxed">
                <p>
                    슈닝은 관세법등의 관련규정을 준수하고 불법물건을 취급하지 않으며, 분할배송 및 가격허위신고 등 고객의 불법사항 요청에는 협조하지 않습니다.
                </p>
                <p>
                    또한 자가사용목적을 제외한 판매용 및 사업용도 등으로 구입한 상품은 사업자 명의로 배송신청을 해야하며, 허위신고로 인해 발생하는 불이익에 대해서 책임지지않습니다.
                </p>
            </div>

            <div className="border-t border-white/10 pt-8 text-gray-500 text-xs md:text-sm font-medium">
                <p>Copyright © 2025 Suning.kr All rights reserved. Hosting by Off.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;