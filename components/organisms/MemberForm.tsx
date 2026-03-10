'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/atoms/Button';
import { useMemberStore, Member } from '@/store/useMemberStore';

const memberSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  cell: z.string().min(1, 'Selecione uma célula'),
  church: z.string().min(1, 'Informe a igreja'),
  status: z.enum(['Ativo', 'Inativo']),
  isTither: z.boolean(),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface MemberFormProps {
  onSuccess: () => void;
  member?: Member;
}

export const MemberForm = ({ onSuccess, member }: MemberFormProps) => {
  const { addMember, updateMember } = useMemberStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: member ? {
      name: member.name,
      email: member.email,
      cell: member.cell,
      church: member.church,
      status: member.status,
      isTither: member.isTither,
    } : {
      status: 'Ativo',
      isTither: false,
      church: 'Sede Central',
    },
  });

  const onSubmit = (data: MemberFormData) => {
    if (member) {
      updateMember(member.id, data);
    } else {
      addMember({
        ...data,
        avatar: `https://picsum.photos/seed/${data.name}/100/100`,
      });
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Nome Completo</label>
          <input
            {...register('name')}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
            placeholder="Ex: João Silva"
          />
          {errors.name && <p className="text-error text-xs mt-1 font-bold">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">E-mail</label>
          <input
            {...register('email')}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
            placeholder="exemplo@email.com"
          />
          {errors.email && <p className="text-error text-xs mt-1 font-bold">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Igreja</label>
          <input
            {...register('church')}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
            placeholder="Ex: Sede Central"
          />
          {errors.church && <p className="text-error text-xs mt-1 font-bold">{errors.church.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Célula</label>
            <select
              {...register('cell')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="">Selecione...</option>
              <option value="Esperança">Esperança</option>
              <option value="Renovo">Renovo</option>
              <option value="Vida Nova">Vida Nova</option>
              <option value="Videira">Videira</option>
            </select>
            {errors.cell && <p className="text-error text-xs mt-1 font-bold">{errors.cell.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Status</label>
            <select
              {...register('status')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary appearance-none"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
          <input
            type="checkbox"
            {...register('isTither')}
            id="isTither"
            className="size-5 rounded border-border text-primary focus:ring-primary/20"
          />
          <label htmlFor="isTither" className="text-sm font-bold text-text-primary cursor-pointer select-none">
            É Dizimista?
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 h-12 font-bold text-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : member ? 'Salvar Alterações' : 'Cadastrar Membro'}
        </Button>
      </div>
    </form>
  );
};
