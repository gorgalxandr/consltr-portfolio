// src/types/layout.ts
import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export type LayoutType = 'app' | 'marketing' | 'dashboard';

export interface HeaderProps {
  variant?: LayoutType;
  navigate?: (path: string) => void;
  isAuthenticated?: boolean;
  logout?: () => void;
  className?: string;
}

export interface FooterProps {
  variant?: LayoutType;
}