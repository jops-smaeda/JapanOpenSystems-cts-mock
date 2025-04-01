import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main
        className={`pt-16 transition-all duration-200 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-12'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
