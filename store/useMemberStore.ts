import { create } from 'zustand';

export interface Member {
  id: string;
  name: string;
  email: string;
  cell: string;
  status: 'Ativo' | 'Inativo';
  isTither: boolean;
  avatar: string;
}

interface MemberState {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  members: [
    {
      id: '1',
      name: 'Ricardo Oliveira',
      email: 'ricardo@email.com',
      cell: 'Esperança',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/ricardo/100/100',
    },
    {
      id: '2',
      name: 'Ana Beatriz Silva',
      email: 'anabeatriz@email.com',
      cell: 'Renovo',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/ana/100/100',
    },
    {
      id: '3',
      name: 'Marcos Santos',
      email: 'marcos.santos@email.com',
      cell: 'Vida Nova',
      status: 'Inativo',
      isTither: false,
      avatar: 'https://picsum.photos/seed/marcos/100/100',
    },
    {
      id: '4',
      name: 'Carla Mendes',
      email: 'carla.m@email.com',
      cell: 'Esperança',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/carla/100/100',
    },
  ],
  setMembers: (members) => set({ members }),
}));
