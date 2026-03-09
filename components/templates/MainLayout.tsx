'use client';

import { Navbar } from '@/components/organisms/Navbar';
import { Sidebar } from '@/components/organisms/Sidebar';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/shared/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useLayoutStore();

  return (
    <div className={cn(
      "flex min-h-screen bg-background text-text-primary transition-colors duration-300",
      isDarkMode && "dark"
    )}>
      <div className="flex w-full min-h-screen bg-background dark:bg-background">
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
