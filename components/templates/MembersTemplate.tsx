'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Users, 
  Waves, 
  Zap, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { useMemberStore } from '@/store/useMemberStore';
import { cn } from '@/shared/utils';

export const MembersTemplate = () => {
  const { members } = useMemberStore();

  const stats = [
    { label: 'Total de Membros Ativos', value: '1.240', trend: '+12% vs mês anterior', icon: Users },
    { label: 'Batizados', value: '850', trend: '68.5% do total', icon: Waves },
    { label: 'Novos Convertidos', value: '42', trend: 'Aguardando discipulado', icon: Zap },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Gestão de Membros</h1>
          <p className="text-text-secondary text-sm mt-1">Gerencie a base de dados de fiéis e frequentadores</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Novo Membro
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <div className="bg-primary/10 p-2 rounded-lg">
                <stat.icon className="size-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.trend}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Buscar por nome, CPF ou e-mail..." 
              className="w-full h-11 rounded-lg border-border bg-background pl-10 pr-4 text-sm focus:ring-primary text-text-primary"
            />
          </div>
          <div className="flex gap-3">
            <select className="h-11 rounded-lg border-border bg-background px-4 text-sm font-medium text-text-primary">
              <option>Status: Todos</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
            <select className="h-11 rounded-lg border-border bg-background px-4 text-sm font-medium text-text-primary">
              <option>Célula: Todas</option>
              <option>Esperança</option>
              <option>Renovo</option>
            </select>
            <Button variant="secondary" className="gap-2 h-11">
              <Filter className="size-4" />
              Mais Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Nome</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Célula</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-center">Dizimista</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full overflow-hidden bg-background relative">
                        <Image 
                          src={member.avatar} 
                          alt={member.name} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-text-primary">{member.name}</p>
                        <p className="text-text-secondary text-xs">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-background px-2.5 py-1 rounded-full text-text-primary border border-border">
                      {member.cell}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn("size-2 rounded-full", member.status === 'Ativo' ? 'bg-success' : 'bg-border')} />
                      <span className={cn("text-sm font-medium", member.status === 'Ativo' ? 'text-success' : 'text-text-secondary')}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {member.isTither ? (
                      <CheckCircle2 className="size-5 text-success mx-auto" />
                    ) : (
                      <XCircle className="size-5 text-text-secondary opacity-30 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary">
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                        <MessageSquare className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-background border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-secondary font-medium">Mostrando 1-4 de 1,240 membros</p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="sm" className="h-8 w-8 p-0">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
