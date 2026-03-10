import { useMemo, useState } from 'react';
import { formatCurrency } from '@/shared/utils';
import { useFinanceStore, Transaction } from '@/store/useFinanceStore';

export type PeriodPreset = '30days' | 'quarter' | 'semester' | 'year' | 'all' | 'custom';

export interface FinanceFilters {
  responsible?: string;
  startDate?: string;
  endDate?: string;
  periodPreset?: PeriodPreset;
  type?: string;
  nature?: string;
  origin?: string;
  category?: string;
  status?: string;
}

export const useFinance = () => {
  const { transactions, addTransaction } = useFinanceStore();
  const [filters, setFilters] = useState<FinanceFilters>({ periodPreset: 'all' });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (filters.responsible && t.responsible !== filters.responsible) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.nature && t.nature !== filters.nature) return false;
      if (filters.origin && t.origin !== filters.origin) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.status && t.status !== filters.status) return false;
      
      const tDate = new Date(t.date);
      tDate.setHours(0, 0, 0, 0);
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (filters.periodPreset && filters.periodPreset !== 'all' && filters.periodPreset !== 'custom') {
        const startDate = new Date(now);
        if (filters.periodPreset === '30days') {
          startDate.setDate(now.getDate() - 30);
        } else if (filters.periodPreset === 'quarter') {
          startDate.setMonth(now.getMonth() - 3);
        } else if (filters.periodPreset === 'semester') {
          startDate.setMonth(now.getMonth() - 6);
        } else if (filters.periodPreset === 'year') {
          startDate.setFullYear(now.getFullYear() - 1);
        }
        
        startDate.setHours(0, 0, 0, 0);
        if (tDate < startDate) return false;
      } else if (filters.periodPreset === 'custom') {
        if (filters.startDate) {
          const sDate = new Date(filters.startDate);
          sDate.setHours(0, 0, 0, 0);
          if (tDate < sDate) return false;
        }
        if (filters.endDate) {
          const eDate = new Date(filters.endDate);
          eDate.setHours(23, 59, 59, 999);
          if (tDate > eDate) return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.nature === 'Entrada')
      .reduce((acc, t) => acc + t.value, 0);
    const expenses = filteredTransactions
      .filter(t => t.nature === 'Saída')
      .reduce((acc, t) => acc + t.value, 0);
    return { income, expenses, balance: income - expenses };
  }, [filteredTransactions]);

  const allTimeTotals = useMemo(() => {
    const income = transactions
      .filter(t => t.nature === 'Entrada')
      .reduce((acc, t) => acc + t.value, 0);
    const expenses = transactions
      .filter(t => t.nature === 'Saída')
      .reduce((acc, t) => acc + t.value, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const chartData = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, t) => {
      const date = t.date;
      if (!acc[date]) acc[date] = { date, income: 0, expenses: 0 };
      if (t.nature === 'Entrada') acc[date].income += t.value;
      else acc[date].expenses += t.value;
      return acc;
    }, {} as Record<string, { date: string, income: number, expenses: number }>);

    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredTransactions]);

  const categoryData = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.value;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(grouped).reduce((a, b) => a + b, 0);

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0
    })).sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  const categoryBreakdown = useMemo(() => {
    const incomeOnly = filteredTransactions.filter(t => t.nature === 'Entrada');
    const grouped = incomeOnly.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.value;
      return acc;
    }, {} as Record<string, number>);

    const totalIncome = Object.values(grouped).reduce((a, b) => a + b, 0);

    return Object.entries(grouped).map(([label, value]) => ({
      label,
      value,
      percent: totalIncome > 0 ? Math.round((value / totalIncome) * 100) : 0
    })).sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    totals,
    allTimeTotals,
    chartData,
    categoryData,
    categoryBreakdown,
    formatCurrency,
    addTransaction,
    filters,
    setFilters
  };
};
