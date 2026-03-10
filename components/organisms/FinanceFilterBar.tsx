'use client';

import React from 'react';
import { 
  Calendar as CalendarIcon, 
  LayoutGrid, 
  Landmark, 
  Filter,
  User,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown
} from 'lucide-react';
import { FinanceFilters, PeriodPreset } from '@/hooks/useFinance';
import { cn } from '@/shared/utils';

interface FinanceFilterBarProps {
  filters: FinanceFilters;
  setFilters: (filters: FinanceFilters) => void;
  availableResponsibles: string[];
  availableChurches: string[];
  availableCategories: string[];
  availableOrigins: string[];
  availableTypes: string[];
  availableNatures: string[];
  availableStatuses: string[];
}

export const FinanceFilterBar = ({ 
  filters, 
  setFilters,
  availableResponsibles,
  availableCategories,
  availableOrigins,
  availableTypes,
  availableNatures,
  availableStatuses
}: FinanceFilterBarProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const updateFilter = (key: keyof FinanceFilters, value: any) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setFilters({ periodPreset: 'all' });
  };

  const periodLabels: Record<PeriodPreset, string> = {
    '30days': 'Últimos 30 dias',
    'quarter': 'Trimestre',
    'semester': 'Semestre',
    'year': 'Anual',
    'all': 'Todo o período',
    'custom': 'Personalizado'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Period Preset Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border relative group">
          <CalendarIcon className="size-4 text-primary" />
          <select 
            className="bg-transparent text-xs font-medium text-text-primary outline-none appearance-none pr-6 cursor-pointer"
            value={filters.periodPreset || '30days'}
            onChange={(e) => updateFilter('periodPreset', e.target.value as PeriodPreset)}
          >
            {Object.entries(periodLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown className="size-3 text-text-secondary absolute right-3 pointer-events-none" />
        </div>

        {/* Custom Range (only if custom is selected) */}
        {filters.periodPreset === 'custom' && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border animate-in fade-in zoom-in-95 duration-200">
            <input 
              type="date" 
              className="bg-transparent text-xs font-medium text-text-primary outline-none"
              value={filters.startDate || ''}
              onChange={(e) => updateFilter('startDate', e.target.value)}
            />
            <span className="text-text-secondary text-xs">até</span>
            <input 
              type="date" 
              className="bg-transparent text-xs font-medium text-text-primary outline-none"
              value={filters.endDate || ''}
              onChange={(e) => updateFilter('endDate', e.target.value)}
            />
          </div>
        )}

        {/* Category Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border relative">
          <LayoutGrid className="size-4 text-primary" />
          <select 
            className="bg-transparent text-xs font-medium text-text-primary outline-none appearance-none pr-6 cursor-pointer"
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="">Todas Categorias</option>
            {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="size-3 text-text-secondary absolute right-3 pointer-events-none" />
        </div>

        {/* Origin Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border relative">
          <Landmark className="size-4 text-primary" />
          <select 
            className="bg-transparent text-xs font-medium text-text-primary outline-none appearance-none pr-6 cursor-pointer"
            value={filters.origin || ''}
            onChange={(e) => updateFilter('origin', e.target.value)}
          >
            <option value="">Todas Origens</option>
            {availableOrigins.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown className="size-3 text-text-secondary absolute right-3 pointer-events-none" />
        </div>

        {/* Advanced Toggle */}
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "ml-auto flex items-center gap-2 text-sm font-medium transition-colors",
            showAdvanced ? "text-primary" : "text-text-secondary hover:text-primary"
          )}
        >
          <Filter className="size-4" />
          Filtros avançados
        </button>

        {Object.keys(filters).length > 1 && (
          <button 
            onClick={clearFilters}
            className="text-xs font-bold text-error uppercase tracking-wider hover:underline"
          >
            Limpar
          </button>
        )}
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-background/50 rounded-xl border border-border animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Responsible */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <User className="size-3" /> Responsável
            </label>
            <select 
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={filters.responsible || ''}
              onChange={(e) => updateFilter('responsible', e.target.value)}
            >
              <option value="">Todos</option>
              {availableResponsibles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Nature */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="size-3" /> Natureza
            </label>
            <select 
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={filters.nature || ''}
              onChange={(e) => updateFilter('nature', e.target.value)}
            >
              <option value="">Todas</option>
              {availableNatures.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="size-3" /> Tipo
            </label>
            <select 
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={filters.type || ''}
              onChange={(e) => updateFilter('type', e.target.value)}
            >
              <option value="">Todos</option>
              {availableTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 className="size-3" /> Status
            </label>
            <select 
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              value={filters.status || ''}
              onChange={(e) => updateFilter('status', e.target.value)}
            >
              <option value="">Todos</option>
              {availableStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
