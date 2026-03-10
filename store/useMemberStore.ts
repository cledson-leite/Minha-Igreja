import { create } from 'zustand';

export type MemberRole = 'Pastor Adm' | 'Pastor' | 'Secretario' | 'Financeiro' | 'Supervisor' | 'Lider' | 'Membro';

export interface Member {
  id: string;
  name: string;
  email: string;
  cell: string;
  status: 'Ativo' | 'Inativo';
  isTither: boolean;
  avatar: string;
  role: MemberRole;
  church: string;
}

interface MemberState {
  members: Member[];
  setMembers: (members: Member[]) => void;
  addMember: (member: Omit<Member, 'id' | 'role'>) => void;
  updateMember: (id: string, data: Partial<Member>) => void;
  deleteMember: (id: string) => void; // Sets status to Inativo
  changeRole: (id: string, newRole: MemberRole) => void;
}

export const useMemberStore = create<MemberState>((set, get) => ({
  members: [
    {
      id: '1',
      name: 'Ricardo Oliveira',
      email: 'ricardo@email.com',
      cell: 'Esperança',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/ricardo/100/100',
      role: 'Pastor Adm',
      church: 'Sede Central',
    },
    {
      id: '2',
      name: 'Ana Beatriz Silva',
      email: 'anabeatriz@email.com',
      cell: 'Renovo',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/ana/100/100',
      role: 'Lider',
      church: 'Sede Central',
    },
    {
      id: '3',
      name: 'Marcos Santos',
      email: 'marcos.santos@email.com',
      cell: 'Vida Nova',
      status: 'Inativo',
      isTither: false,
      avatar: 'https://picsum.photos/seed/marcos/100/100',
      role: 'Membro',
      church: 'Filial Norte',
    },
    {
      id: '4',
      name: 'Carla Mendes',
      email: 'carla.m@email.com',
      cell: 'Esperança',
      status: 'Ativo',
      isTither: true,
      avatar: 'https://picsum.photos/seed/carla/100/100',
      role: 'Secretario',
      church: 'Sede Central',
    },
  ],
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({
    members: [
      ...state.members,
      { 
        ...member, 
        id: Math.random().toString(36).substr(2, 9),
        role: 'Membro' // Default role
      }
    ]
  })),
  updateMember: (id, data) => set((state) => ({
    members: state.members.map(m => m.id === id ? { ...m, ...data } : m)
  })),
  deleteMember: (id) => set((state) => ({
    members: state.members.map(m => m.id === id ? { ...m, status: 'Inativo' } : m)
  })),
  changeRole: (id, newRole) => {
    const state = get();
    if (newRole === 'Pastor Adm') {
      const existingAdmin = state.members.find(m => m.role === 'Pastor Adm');
      if (existingAdmin && existingAdmin.id !== id) {
        alert('Já existe um Pastor Adm cadastrado. Apenas um é permitido.');
        return;
      }
    }
    set((state) => ({
      members: state.members.map(m => m.id === id ? { ...m, role: newRole } : m)
    }));
  },
}));
