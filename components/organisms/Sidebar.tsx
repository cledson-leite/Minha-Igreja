'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  CircleDollarSign, 
  Calendar, 
  Network, 
  Settings,
  MessageSquare,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/shared/utils';
import { useUserStore } from '@/store/useUserStore';
import { useLayoutStore } from '@/store/useLayoutStore';
import { Button } from '@/components/atoms/Button';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUserStore();
  const { isSidebarCollapsed, toggleCollapse, isSidebarOpen, setSidebarOpen, toggleDarkMode, isDarkMode } = useLayoutStore();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Membros', href: '/membros', icon: Users },
    { label: 'Financeiro', href: '/financeiro', icon: CircleDollarSign },
    { label: 'Células', href: '/celulas', icon: Network },
    { label: 'Eventos', href: '/eventos', icon: Calendar },
    { label: 'Engajamento', href: '/engajamento', icon: MessageSquare },
    { label: 'Bíblia', href: '/biblia', icon: BookOpen },
    { label: 'Admin', href: '/admin', icon: Settings },
  ];

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={isSidebarCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-background transition-all duration-300 lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header/Logo Section in Sidebar */}
        <div className={cn(
          "flex h-20 items-center transition-all duration-300",
          isSidebarCollapsed ? "justify-center px-0" : "px-6"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <Network className="size-6" />
            </div>
            <AnimatePresence mode="wait">
              {!isSidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col whitespace-nowrap overflow-hidden"
                >
                  <span className="text-lg font-black tracking-tight leading-none text-text-primary">Igreja</span>
                  <span className="text-sm font-bold text-primary leading-none mt-0.5">Gestão</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-text-secondary hover:bg-surface hover:text-text-primary"
                )}
              >
                <item.icon className={cn("size-5 shrink-0", isActive ? "text-white" : "text-text-secondary group-hover:text-primary")} />
                <AnimatePresence>
                  {!isSidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: User, Theme, Logout */}
        <div className="mt-auto border-t border-border p-4">
          <div className="flex flex-col gap-4">
            {/* User Profile */}
            <div className={cn(
              "flex items-center gap-3 rounded-xl bg-surface p-2 transition-all duration-300",
              isSidebarCollapsed && "justify-center p-1"
            )}>
              <div className="size-10 shrink-0 overflow-hidden rounded-lg border-2 border-primary/10 relative">
                <Image 
                  src={user?.avatar || 'https://picsum.photos/seed/user/100/100'} 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex flex-col overflow-hidden whitespace-nowrap"
                  >
                    <span className="truncate text-sm font-bold text-text-primary">{user?.name}</span>
                    <span className="truncate text-[10px] font-bold uppercase tracking-wider text-text-secondary">{user?.role}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className={cn(
              "flex items-center gap-2",
              isSidebarCollapsed ? "flex-col" : "justify-between"
            )}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="rounded-xl hover:bg-surface"
              >
                {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-xl text-error hover:bg-error/10 hover:text-error">
                <LogOut className="size-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleCollapse}
                className="hidden lg:flex rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isSidebarCollapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
