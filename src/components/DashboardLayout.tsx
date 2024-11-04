"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, User, Settings } from 'lucide-react';
import { DashboardLayoutProps, NavigationSection } from './types/types';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const navigationItems: NavigationSection[] = [
    {
      section: 'Users',
      icon: <User size={18} />,
      items: [
        { title: 'Patients Add/Manage', path: '/users/patients' },
        { title: 'Affiliates Add/Manage', path: '/users/affiliates' },
        { title: 'Visualize Network', path: '/users/network' },
        { title: 'Payout Request', path: '/users/payouts' }
      ]
    },
    {
      section: 'Orders',
      icon: <Bell size={18} />,
      items: [
        { title: 'View Orders', path: '/orders/view' },
        { title: 'Sales Report', path: '/orders/sales' }
      ]
    },
    {
      section: 'Products',
      icon: <Settings size={18} />,
      items: [
        { title: 'Products', path: '/products' },
        { title: 'Categories', path: '/products/categories' },
        { title: 'Reviews', path: '/products/reviews' }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        navigationItems={navigationItems}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-950">Welcome to Super Admin Dashboard</h2>
              <p className="text-blue-950 text-lg">Select a section from the sidebar to get started.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
