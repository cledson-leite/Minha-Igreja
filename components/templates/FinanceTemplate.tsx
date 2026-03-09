'use client';

import React from 'react';
import { 
  Download, 
  FileText, 
  Plus, 
  Calendar as CalendarIcon, 
  LayoutGrid, 
  Landmark, 
  Filter,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { useSearchParams } from 'next/navigation';
import { useFinance } from '@/hooks/useFinance';
import { cn } from '@/shared/utils';

export const FinanceTemplate = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const { transactions, totals, formatCurrency } = useFinance();

  const filteredTransactions = filterParam 
    ? transactions.filter(t => t.type === filterParam)
    : transactions;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Gestão Financeira</h1>
          <p className="text-text-secondary text-sm mt-1">
            {filterParam ? `Mostrando apenas ${filterParam.toLowerCase()}s.` : 'Controle completo de dízimos, ofertas e despesas.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="size-4" />
            CSV
          </Button>
          <Button className="gap-2">
            <Plus className="size-4" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border cursor-pointer">
            <CalendarIcon className="size-4 text-primary" />
            <span className="text-sm font-medium text-text-primary">Período: Últimos 30 dias</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border cursor-pointer">
            <LayoutGrid className="size-4 text-primary" />
            <span className="text-sm font-medium text-text-primary">Categoria: Todas</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border cursor-pointer">
            <Landmark className="size-4 text-primary" />
            <span className="text-sm font-medium text-text-primary">Origem: Todas</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-text-secondary text-sm cursor-pointer hover:text-primary">
            <Filter className="size-4" />
            Filtros avançados
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-8 space-y-8">
          <Card padding="none" className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-text-primary">Lançamentos Recentes</h3>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">32 registros este mês</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Data</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Tipo</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Categoria</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase text-right">Valor</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTransactions.map((t, i) => (
                    <tr key={i} className="hover:bg-background transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary">{t.date}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "flex items-center gap-1.5 font-semibold text-sm",
                          t.type === 'Entrada' ? 'text-success' : 'text-error'
                        )}>
                          {t.type === 'Entrada' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-text-primary">{t.category}</td>
                      <td className="px-6 py-4 text-sm font-bold text-right text-text-primary">{formatCurrency(t.value)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-error">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-primary">Evolução de Fluxo</h3>
                <TrendingUp className="size-4 text-text-secondary" />
              </div>
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {[40, 65, 35, 85, 55, 95].map((h, i) => (
                  <div key={i} className="w-full bg-primary rounded-t-lg" style={{ height: `${h}%`, opacity: i % 2 === 0 ? 0.3 : 1 }} />
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-primary">Distribuição por Categoria</h3>
                <PieChart className="size-4 text-text-secondary" />
              </div>
              <div className="flex items-center gap-6">
                <div className="size-32 rounded-full border-[16px] border-primary relative flex items-center justify-center">
                  <span className="text-xs font-bold text-text-primary">100%</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary" />
                    <span className="text-xs font-medium text-text-primary">Dízimos (65%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary/40" />
                    <span className="text-xs font-medium text-text-primary">Ofertas (25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-border" />
                    <span className="text-xs font-medium text-text-primary">Outros (10%)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20">
            <p className="text-white/80 text-sm font-medium">Saldo em Caixa</p>
            <h2 className="text-3xl font-black mt-1">{formatCurrency(totals.balance)}</h2>
            <div className="mt-6 flex justify-between pt-6 border-t border-white/20">
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase">Entradas</p>
                <p className="text-sm font-bold mt-1 text-emerald-300">+ {formatCurrency(totals.income)}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] font-bold uppercase">Saídas</p>
                <p className="text-sm font-bold mt-1 text-red-300">- {formatCurrency(totals.expenses)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-6 flex items-center gap-2 text-text-primary">
              <TrendingUp className="size-4 text-primary" />
              Categorias e Totais
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">Entradas por tipo</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Dízimos', value: 5400, percent: 70 },
                    { label: 'Ofertas Culto', value: 2100, percent: 35 },
                    { label: 'Eventos', value: 740, percent: 15 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-text-secondary">{item.label}</span>
                        <span className="font-bold text-text-primary">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-8 text-xs">Ver Relatório Detalhado</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
};
