import React from 'react';
import { StatItem, Project, TeamMember } from './types';

// Icons as simple SVGs for the constants
export const Icons = {
  Ship: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m-15.686 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A11.959 11.959 0 0 1 12 10.5c2.998 0 5.74 1.1 7.843 2.918" />
    </svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  UserGroup: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  )
};

// Simple SVG Data URI for the logistics box illustration
// Blue background with white isometric box outline
const SIMPLE_LOGISTICS_ILLUSTRATION = `data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%230088CC'/%3E%3Cg opacity='0.3' fill='none' stroke='white' stroke-width='8'%3E%3Cpath d='M200 200 L400 300 L600 200 L400 100 Z'/%3E%3Cpath d='M200 200 L200 450 L400 550 L400 300'/%3E%3Cpath d='M600 200 L600 450 L400 550'/%3E%3C/g%3E%3C/svg%3E`;

// Use Unsplash images related to logistics/shipping
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: '이우 센터 확장',
    category: 'Infrastructure',
    description: '이우 센터의 현지 센터 주소를 변경하고 확장하여 배송 대행 처리 속도를 2배 높였습니다.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', // Warehouse/Shipping
    stat: '처리 속도 200% UP'
  },
  {
    id: 'p2',
    title: '1688 연동 업그레이드',
    category: 'Technology',
    description: '더 안정적이고 쾌적한 구매대행 환경을 위해 1688 연동 서비스를 리팩토링했습니다.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', // Tech/Data
    stat: '시스템 안정성 확보'
  },
  {
    id: 'p3',
    title: '쿠팡 로켓 그로스 입고',
    category: 'Service',
    description: '중국 창고에서 쿠팡 창고까지 다이렉트 입고! 로켓 그로스 논스톱 서비스를 런칭했습니다.',
    image: SIMPLE_LOGISTICS_ILLUSTRATION, // Updated to simple blue illustration
    stat: '논스톱 서비스'
  }
];

export const STATS: StatItem[] = [
  {
    id: 's1',
    value: '30%',
    label: '연간 성장률',
    type: 'circle',
    color: 'bg-white',
    textColor: 'text-suning-blue',
    size: 'lg',
    icon: <Icons.TrendingUp />
  },
  {
    id: 's2',
    value: '700+',
    label: '올해 누적 가입자 수', // Updated label and value
    type: 'card',
    color: 'bg-suning-orange',
    textColor: 'text-white',
    size: 'md',
    icon: <Icons.UserGroup />
  },
  {
    id: 's3',
    value: '2분 이내',
    label: '평균 응답 속도', // Updated to speed
    type: 'pill',
    color: 'bg-suning-light',
    textColor: 'text-suning-navy',
    icon: <Icons.Clock />,
    size: 'md'
  },
  {
    id: 's4',
    value: '9.8/10',
    label: '고객 만족도', // New Stat
    type: 'card',
    color: 'bg-white',
    textColor: 'text-black',
    size: 'md',
    icon: <Icons.Star />
  }
];

export const TEAM: TeamMember[] = [
  { id: 't1', name: '김지훈', role: 'CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
  { id: 't2', name: '이서연', role: '물류 본부장', image: 'https://images.unsplash.com/photo-1573496359-7013c53bca63?auto=format&fit=crop&q=80&w=200' },
  { id: 't3', name: '데이비드 첸', role: '기술 총괄', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
  { id: 't4', name: '엘레나', role: '글로벌 영업', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
];