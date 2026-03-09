import { create } from 'zustand';

interface UserState {
  user: {
    name: string;
    role: string;
    avatar?: string;
  } | null;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Admin Igreja',
    role: 'Sede Central',
    avatar: 'https://picsum.photos/seed/admin/100/100',
  },
  setUser: (user) => set({ user }),
}));
