"use client"
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black shadow-lg">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button className="p-2 rounded-lg hover:bg-blue-950 text-white transition-colors duration-200">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-blue-950 text-white transition-colors duration-200">
            <Settings size={20} />
          </button>
          <div className="flex items-center space-x-3 pl-6 border-l border-blue-900">
            <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-white font-medium">Admin User</p>
              <p className="text-sm text-blue-300">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
