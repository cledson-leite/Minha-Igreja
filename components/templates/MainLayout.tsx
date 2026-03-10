'use client';

import { Navbar } from '@/components/organisms/Navbar';
import { Sidebar } from '@/components/organisms/Sidebar';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/shared/utils';
import React, { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useLayoutStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-background text-text-primary transition-colors duration-300">
      <div className="flex w-full min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
