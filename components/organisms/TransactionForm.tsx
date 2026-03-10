'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/atoms/Button';
import { useFinanceStore, TransactionType, TransactionNature } from '@/store/useFinanceStore';
import { useMemberStore } from '@/store/useMemberStore';

const transactionSchema = z.object({
  responsible: z.string().min(1, 'Selecione o responsável'),
  church: z.string().min(1, 'Selecione a igreja'),
  type: z.enum(['Registro', 'Estorno']),
  nature: z.enum(['Entrada', 'Saída']),
  category: z.string().min(1, 'Selecione uma categoria'),
  origin: z.string().min(1, 'Selecione a origem'),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Valor deve ser um número positivo',
  }),
  date: z.string().min(1, 'Informe a data'),
  status: z.enum(['Confirmado', 'Pendente', 'Cancelado']),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSuccess: () => void;
}

export const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
  const { addTransaction } = useFinanceStore();
  const { members } = useMemberStore();

  // Filter members with specific roles
  const responsibleMembers = members.filter(m => 
    ['Pastor Adm', 'Pastor', 'Financeiro', 'Lider'].includes(m.role)
  );

  // Unique churches from members
  const churches = Array.from(new Set(members.map(m => m.church)));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'Registro',
      nature: 'Entrada',
      status: 'Confirmado',
      date: new Date().toISOString().split('T')[0],
      church: churches[0] || 'Sede Central',
    },
  });

  const selectedResponsibleId = watch('responsible');

  // Logic: If responsible is a Lider, origin must be Célula
  useEffect(() => {
    const responsible = responsibleMembers.find(m => m.id === selectedResponsibleId);
    if (responsible?.role === 'Lider') {
      setValue('origin', 'Célula');
    }
  }, [selectedResponsibleId, responsibleMembers, setValue]);

  const onSubmit = (data: TransactionFormData) => {
    const responsible = responsibleMembers.find(m => m.id === data.responsible);
    addTransaction({
      ...data,
      responsible: responsible?.name || data.responsible,
      value: Number(data.value),
      type: data.type as TransactionType,
      nature: data.nature as TransactionNature,
      status: data.status,
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Responsável</label>
            <select
              {...register('responsible')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="">Selecione...</option>
              {responsibleMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
            {errors.responsible && <p className="text-error text-xs mt-1 font-bold">{errors.responsible.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Igreja</label>
            <select
              {...register('church')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="">Selecione...</option>
              {churches.map(church => (
                <option key={church} value={church}>{church}</option>
              ))}
            </select>
            {errors.church && <p className="text-error text-xs mt-1 font-bold">{errors.church.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Tipo</label>
            <select
              {...register('type')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="Registro">Registro</option>
              <option value="Estorno">Estorno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Natureza</label>
            <select
              {...register('nature')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Categoria</label>
            <select
              {...register('category')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="">Selecione...</option>
              <option value="Dízimo">Dízimo</option>
              <option value="Oferta">Oferta</option>
              <option value="Aluguel">Aluguel</option>
              <option value="Energia">Energia</option>
              <option value="Água">Água</option>
              <option value="Missões">Missões</option>
              <option value="Eventos">Eventos</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.category && <p className="text-error text-xs mt-1 font-bold">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Origem</label>
            <select
              {...register('origin')}
              disabled={responsibleMembers.find(m => m.id === selectedResponsibleId)?.role === 'Lider'}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="">Selecione...</option>
              <option value="Célula">Célula</option>
              <option value="Ministério">Ministério</option>
              <option value="Evento">Evento</option>
              <option value="Geral">Geral</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.origin && <p className="text-error text-xs mt-1 font-bold">{errors.origin.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Valor (R$)</label>
            <input
              {...register('value')}
              type="number"
              step="0.01"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
              placeholder="0,00"
            />
            {errors.value && <p className="text-error text-xs mt-1 font-bold">{errors.value.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Data</label>
            <input
              {...register('date')}
              type="date"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
            />
            {errors.date && <p className="text-error text-xs mt-1 font-bold">{errors.date.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Status</label>
          <select
            {...register('status')}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
          >
            <option value="Confirmado">Confirmado</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 h-12 font-bold text-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Confirmar Lançamento'}
        </Button>
      </div>
    </form>
  );
};
