import { create } from 'zustand';

export type TransactionType = 'Registro' | 'Estorno';
export type TransactionNature = 'Entrada' | 'Saída';
export type TransactionStatus = 'Confirmado' | 'Pendente' | 'Cancelado';

export interface Transaction {
  id: string;
  date: string;
  responsible: string;
  church: string;
  type: TransactionType;
  nature: TransactionNature;
  category: string;
  origin: string;
  value: number;
  status: TransactionStatus;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [
    { 
      id: '1',
      date: '2026-03-08', 
      responsible: 'João Silva',
      church: 'Sede Central',
      type: 'Registro',
      nature: 'Entrada', 
      category: 'Dízimos', 
      origin: 'Membros G1', 
      value: 1250.00,
      status: 'Confirmado'
    },
    { 
      id: '2',
      date: '2026-03-05', 
      responsible: 'Maria Souza',
      church: 'Sede Central',
      type: 'Registro',
      nature: 'Saída', 
      category: 'Manutenção', 
      origin: 'Fornecedor Luz', 
      value: 450.00,
      status: 'Confirmado'
    },
    { 
      id: '3',
      date: '2026-02-15', 
      responsible: 'Pedro Santos',
      church: 'Sede Central',
      type: 'Registro',
      nature: 'Entrada', 
      category: 'Ofertas', 
      origin: 'Culto de Domingo', 
      value: 890.20,
      status: 'Confirmado'
    },
    { 
      id: '4',
      date: '2025-12-20', 
      responsible: 'Ana Oliveira',
      church: 'Sede Central',
      type: 'Registro',
      nature: 'Saída', 
      category: 'Missões', 
      origin: 'Base Missionária', 
      value: 1000.00,
      status: 'Confirmado'
    },
  ],
  addTransaction: (transaction) => set((state) => ({
    transactions: [
      { ...transaction, id: Math.random().toString(36).substr(2, 9) },
      ...state.transactions,
    ]
  })),
}));
