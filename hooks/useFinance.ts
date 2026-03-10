import { useMemo } from 'react';
import { formatCurrency } from '@/shared/utils';
import { useFinanceStore } from '@/store/useFinanceStore';

export const useFinance = () => {
  const { transactions, addTransaction } = useFinanceStore();

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.nature === 'Entrada')
      .reduce((acc, t) => acc + t.value, 0);
    const expenses = transactions
      .filter(t => t.nature === 'Saída')
      .reduce((acc, t) => acc + t.value, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return {
    transactions,
    totals,
    formatCurrency,
    addTransaction
  };
};
