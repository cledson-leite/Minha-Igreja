'use client';

import React from 'react';
import { Bell, Search, Menu, Network, Sun, Moon } from 'lucide-react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { Button } from '@/components/atoms/Button';

export const Navbar = () => {
  const { toggleSidebar, toggleDarkMode, isDarkMode } = useLayoutStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-between px-4 sm:px-8">
        {/* Left Section: Sidebar Toggle and Logo */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="rounded-xl size-11 lg:hidden hover:bg-surface"
          >
            <Menu className="size-6 text-text-secondary" />
          </Button>

          <div className="flex lg:hidden items-center gap-4 shrink-0">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-white">
              <Network className="size-6" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black tracking-tight leading-none text-text-primary">Igreja</h2>
              <p className="text-sm font-bold text-primary leading-none mt-0.5">Gestão</p>
            </div>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-xl font-black tracking-tight text-text-primary">Igreja Gestão</h1>
          </div>
        </div>

        {/* Right Section: Search and Notifications */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar no sistema..." 
              className="h-11 w-64 xl:w-80 transition-all duration-300 rounded-xl border border-border bg-background pl-10 pr-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-surface text-text-primary"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-xl size-11 hover:bg-surface"
          >
            {isDarkMode ? <Sun className="size-5 text-text-secondary" /> : <Moon className="size-5 text-text-secondary" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-xl size-11 hover:bg-surface">
            <Bell className="size-5 text-text-secondary" />
          </Button>
        </div>
      </div>
    </header>
  );
};
