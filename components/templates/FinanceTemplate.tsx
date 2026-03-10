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
import { Modal } from '@/components/atoms/Modal';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import { FinanceFilterBar } from '@/components/organisms/FinanceFilterBar';
import { useSearchParams } from 'next/navigation';
import { useFinance } from '@/hooks/useFinance';
import { cn } from '@/shared/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const FinanceTemplate = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const { 
    transactions, 
    allTransactions, 
    totals, 
    allTimeTotals,
    chartData,
    categoryData,
    categoryBreakdown,
    formatCurrency, 
    filters, 
    setFilters 
  } = useFinance();

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Sync initial filter from URL
  React.useEffect(() => {
    if (filterParam && !filters.nature) {
      setFilters({ ...filters, nature: filterParam });
    }
  }, [filterParam, filters, setFilters]);

  // Extract unique values for filters
  const availableResponsibles = Array.from(new Set(allTransactions.map(t => t.responsible)));
  const availableChurches = Array.from(new Set(allTransactions.map(t => t.church)));
  const availableCategories = Array.from(new Set(allTransactions.map(t => t.category)));
  const availableOrigins = Array.from(new Set(allTransactions.map(t => t.origin)));
  const availableTypes = Array.from(new Set(allTransactions.map(t => t.type)));
  const availableNatures = Array.from(new Set(allTransactions.map(t => t.nature)));
  const availableStatuses = Array.from(new Set(allTransactions.map(t => t.status)));

  const handleExportCSV = () => {
    const headers = ['Data', 'Responsável', 'Igreja', 'Tipo', 'Natureza', 'Categoria', 'Origem', 'Valor', 'Status'];
    const rows = transactions.map(t => [
      t.date,
      t.responsible,
      t.church,
      t.type,
      t.nature,
      t.category,
      t.origin,
      t.value.toString(),
      t.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_financeiro_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Relatório Financeiro', 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`, 14, 30);
    
    // Add summary
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Saldo Total: ${formatCurrency(totals.balance)}`, 14, 40);
    doc.text(`Total Entradas: ${formatCurrency(totals.income)}`, 14, 48);
    doc.text(`Total Saídas: ${formatCurrency(totals.expenses)}`, 14, 56);

    const tableHeaders = [['Data', 'Responsável', 'Igreja', 'Natureza', 'Categoria', 'Status', 'Valor']];
    const tableRows = transactions.map(t => [
      t.date,
      t.responsible,
      t.church,
      t.nature,
      t.category,
      t.status,
      formatCurrency(t.value)
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableRows,
      startY: 65,
      theme: 'grid',
      headStyles: { fillColor: [10, 100, 240] }, // Primary color
      styles: { fontSize: 8 },
    });

    doc.save(`relatorio_financeiro_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const filteredTransactions = filterParam 
    ? transactions.filter(t => t.nature === filterParam)
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
          <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
            <Download className="size-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
            <FileText className="size-4" />
            CSV
          </Button>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="size-4" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Novo Lançamento Financeiro"
      >
        <TransactionForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>

      {/* Filters */}
      <Card padding="sm">
        <FinanceFilterBar 
          filters={filters}
          setFilters={setFilters}
          availableResponsibles={availableResponsibles}
          availableChurches={availableChurches}
          availableCategories={availableCategories}
          availableOrigins={availableOrigins}
          availableTypes={availableTypes}
          availableNatures={availableNatures}
          availableStatuses={availableStatuses}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-8 space-y-8">
          <Card padding="none" className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-text-primary">Lançamentos</h3>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{transactions.length} registros encontrados</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Data</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Responsável</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Natureza</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Categoria</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase text-right">Valor</th>
                    <th className="px-6 py-3 text-xs font-bold text-text-secondary uppercase text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-background transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary whitespace-nowrap">{t.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-primary">{t.responsible}</span>
                          <span className="text-[10px] text-text-secondary uppercase">{t.church}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "flex items-center gap-1.5 font-semibold text-sm",
                          t.nature === 'Entrada' ? 'text-success' : 'text-error'
                        )}>
                          {t.nature === 'Entrada' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                          {t.nature}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-text-primary">{t.category}</span>
                          <span className="text-[10px] text-text-secondary uppercase">{t.origin}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase w-fit",
                          t.status === 'Confirmado' ? "bg-success/10 text-success" :
                          t.status === 'Pendente' ? "bg-amber-500/10 text-amber-500" :
                          "bg-error/10 text-error"
                        )}>
                          {t.status === 'Confirmado' ? <CheckCircle2 className="size-3" /> :
                           t.status === 'Pendente' ? <Clock className="size-3" /> :
                           <XCircle className="size-3" />}
                          {t.status}
                        </div>
                      </td>
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
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="date" 
                      hide 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                      formatter={(value: any) => [formatCurrency(Number(value)), '']}
                    />
                    <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} name="Entradas" />
                    <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} name="Saídas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-primary">Distribuição por Categoria</h3>
                <PieChart className="size-4 text-text-secondary" />
              </div>
              <div className="flex items-center gap-6 h-48">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 flex flex-col gap-2 overflow-y-auto max-h-full pr-2">
                  {categoryData.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-[10px] font-medium text-text-primary truncate">
                        {item.name} ({item.percent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20">
            <p className="text-white/80 text-sm font-medium">Saldo em Caixa</p>
            <h2 className="text-3xl font-black mt-1">{formatCurrency(allTimeTotals.balance)}</h2>
            <div className="mt-6 flex justify-between pt-6 border-t border-white/20">
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase">Entradas</p>
                <p className="text-sm font-bold mt-1 text-emerald-300">+ {formatCurrency(allTimeTotals.income)}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] font-bold uppercase">Saídas</p>
                <p className="text-sm font-bold mt-1 text-red-300">- {formatCurrency(allTimeTotals.expenses)}</p>
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
                  {categoryBreakdown.map((item, i) => (
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
                  {categoryBreakdown.length === 0 && (
                    <p className="text-xs text-text-secondary text-center py-4">Nenhuma entrada no período</p>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-8 text-xs" onClick={handleExportPDF}>Ver Relatório Detalhado</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
};
