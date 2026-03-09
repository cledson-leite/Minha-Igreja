import { create } from 'zustand';

interface LayoutState {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  toggleDarkMode: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  isDarkMode: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
