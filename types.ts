import React from 'react';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  type: 'circle' | 'pill' | 'card';
  color: string; // Tailwind class
  textColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stat?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}