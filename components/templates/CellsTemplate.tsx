'use client';

import React from 'react';
import { 
  Search, 
  Plus, 
  Church, 
  Users, 
  Eye, 
  MessageSquare, 
  FileText,
  CheckCircle2,
  X,
  LayoutDashboard
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/shared/utils';

export const CellsTemplate = () => {
  const cells = [
    { id: '1', name: 'Célula Esperança', leader: 'João Silva', members: 12, status: 'Ativa', image: 'https://picsum.photos/seed/cell1/200/200' },
    { id: '2', name: 'Célula Renascer', leader: 'Maria Santos', members: 8, status: 'Ativa', image: 'https://picsum.photos/seed/cell2/200/200' },
    { id: '3', name: 'Célula Videira', leader: 'Pedro Oliveira', members: 15, status: 'Ativa', image: 'https://picsum.photos/seed/cell3/200/200' },
  ];

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-border bg-surface">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
            <Church className="size-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-text-primary">Igreja Local</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-text-secondary">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3 text-primary bg-primary/10">
            <Users className="size-4" />
            Células
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-text-secondary">
            <Users className="size-4" />
            Membros
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border px-8 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-text-primary">Gestão de Células</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar célula..." 
                className="w-full bg-background border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-text-primary"
              />
            </div>
            <Button className="gap-2">
              <Plus className="size-4" />
              Nova Célula
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Grid */}
          <section className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex gap-2">
              <Button size="sm" className="rounded-full px-4">Todas</Button>
              <Button variant="outline" size="sm" className="rounded-full px-4">Jovens</Button>
              <Button variant="outline" size="sm" className="rounded-full px-4">Famílias</Button>
              <Button variant="outline" size="sm" className="rounded-full px-4">Casais</Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {cells.map((cell) => (
                <Card key={cell.id} padding="sm" className={cn(cell.id === '1' && "ring-2 ring-primary border-primary/20")}>
                  <div className="flex gap-4">
                    <div className="size-20 rounded-lg bg-background overflow-hidden relative">
                      <Image 
                        src={cell.image} 
                        alt={cell.name} 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-text-primary">{cell.name}</h3>
                        <span className="bg-success/10 text-success text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Ativa</span>
                      </div>
                      <p className="text-sm text-text-secondary">Líder: {cell.leader}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="size-3 text-primary" />
                        <span className="text-sm font-medium text-text-primary">{cell.members} Membros</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Button variant="secondary" size="sm" className="gap-1 text-[10px]">
                      <Eye className="size-3" /> Detalhes
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1 text-[10px]">
                      <MessageSquare className="size-3" /> Chat
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1 text-[10px]">
                      <FileText className="size-3" /> Relatório
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Detail Sidebar */}
          <aside className="w-[400px] border-l border-border bg-surface p-6 overflow-y-auto hidden xl:block">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Detalhes da Célula</h3>
              <Button variant="ghost" size="icon" className="text-text-secondary"><X className="size-5" /></Button>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
              <h4 className="font-bold text-lg text-primary mb-1">Célula Esperança</h4>
              <p className="text-xs text-text-secondary mb-4">Reuniões às Quintas-feiras, 19:30</p>
              <Button className="w-full gap-2">
                <CheckCircle2 className="size-4" />
                Marcar Presença
              </Button>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-bold text-sm text-text-primary">Membros (12)</h5>
                <Button variant="ghost" size="sm" className="text-primary text-xs">Ver todos</Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={cn("size-10 rounded-full bg-background border-2 overflow-hidden relative", i === 1 ? "border-primary" : "border-transparent")}>
                      <Image 
                        src={`https://picsum.photos/seed/member${i}/100/100`} 
                        alt="Member" 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-medium truncate w-full text-center text-text-secondary">Membro {i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm mb-4 text-text-primary">Histórico de Reuniões</h5>
              <div className="space-y-3">
                {[
                  { date: '15 Junho, 2024', presence: '11/12' },
                  { date: '08 Junho, 2024', presence: '10/12' },
                  { date: '01 Junho, 2024', presence: '12/12' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                    <div>
                      <p className="text-xs font-bold text-text-primary">{m.date}</p>
                      <p className="text-[10px] text-text-secondary">Presença: {m.presence}</p>
                    </div>
                    <CheckCircle2 className="size-4 text-success" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

import { LayoutDashboard } from 'lucide-react';
