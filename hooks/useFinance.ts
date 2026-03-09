import { useState, useMemo } from 'react';
import { formatCurrency } from '@/shared/utils';

export const useFinance = () => {
  const [transactions] = useState([
    { date: '12/10/2023', type: 'Entrada', category: 'Dízimos', origin: 'Membros G1', value: 1250.00 },
    { date: '11/10/2023', type: 'Saída', category: 'Manutenção', origin: 'Fornecedor Luz', value: 450.00 },
    { date: '10/10/2023', type: 'Entrada', category: 'Ofertas', origin: 'Culto de Domingo', value: 890.20 },
    { date: '08/10/2023', type: 'Saída', category: 'Missões', origin: 'Base Missionária', value: 1000.00 },
  ]);

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'Entrada')
      .reduce((acc, t) => acc + t.value, 0);
    const expenses = transactions
      .filter(t => t.type === 'Saída')
      .reduce((acc, t) => acc + t.value, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return {
    transactions,
    totals,
    formatCurrency
  };
};
