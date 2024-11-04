"use client"
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  path: string;
}

export interface NavigationSection {
  section: string;
  icon: JSX.Element;
  items: NavigationItem[];
}

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}
