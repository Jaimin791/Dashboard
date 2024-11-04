"use client"
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationSection } from '../types';

interface SidebarProps {
  navigationItems: NavigationSection[];
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}) => {
  return (
    <aside 
      className={`bg-blue-950 transition-all duration-300 ease-in-out flex flex-col ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-blue-900">
        <h1 className={`font-bold text-2xl text-white ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
          Admin
        </h1>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-900 text-white transition-colors duration-200"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {navigationItems.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className={`text-sm font-semibold text-blue-300 mb-4 uppercase tracking-wider ${
              isSidebarCollapsed ? 'hidden' : 'block'
            }`}>
              {section.section}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href={item.path}
                  className={`flex items-center rounded-lg hover:bg-blue-900 transition-all duration-200
                    ${isSidebarCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'}
                    text-sm text-blue-100 hover:text-white group
                  `}
                >
                  <span className="mr-3">{section.icon}</span>
                  <span className={`truncate ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
