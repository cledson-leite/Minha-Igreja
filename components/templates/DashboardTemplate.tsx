'use client';

import React from 'react';
import { 
  TrendingUp, 
  ArrowDown, 
  ArrowUp, 
  Users, 
  Calendar,
  ChevronRight,
  Cake
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { formatCurrency } from '@/shared/utils';

import { useRouter } from 'next/navigation';
import { useChatStore } from '@/store/useChatStore';

export const DashboardTemplate = () => {
  const router = useRouter();
  const { sendRandomBirthdayMessage } = useChatStore();

  const handleCongratulate = (name: string) => {
    sendRandomBirthdayMessage('3'); // Defaulting to Ricardo for demo purposes
    alert(`Mensagem de parabéns enviada para ${name}!`);
    router.push('/engajamento');
  };

  const stats = [
    { label: 'Saldo Atual', value: formatCurrency(15420), trend: '+2.5%', icon: TrendingUp, color: 'text-primary', href: '/financeiro' },
    { label: 'Entradas Mês', value: formatCurrency(8200), trend: 'Dízimos e ofertas', icon: ArrowDown, color: 'text-emerald-500', href: '/financeiro?filter=Entrada' },
    { label: 'Saídas Mês', value: formatCurrency(3100), trend: '-1.2% operacionais', icon: ArrowUp, color: 'text-rose-500', href: '/financeiro?filter=Saída' },
    { label: 'Membros Ativos', value: '245', trend: '+15 novos', icon: Users, color: 'text-amber-500', href: '/membros' },
  ];

  const events = [
    { id: '1', date: '20', month: 'OUT', title: 'Culto de Celebração', time: '19:30', location: 'Templo Principal' },
    { id: '2', date: '22', month: 'OUT', title: 'Reunião de Líderes', time: '20:00', location: 'Sala de Conferências' },
    { id: '3', date: '25', month: 'OUT', title: 'Conferência de Jovens', time: '18:00', location: 'Auditório Central' },
  ];

  const birthdays = [
    { name: 'Ricardo Mendes', date: 'Hoje • 18 de Outubro', initials: 'RM' },
    { name: 'Ana Souza', date: 'Amanhã • 19 de Outubro', initials: 'AS' },
    { name: 'Lucas Ferreira', date: '21 de Outubro', initials: 'LF' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            className="flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg group"
            onClick={() => router.push(stat.href)}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-text-secondary group-hover:text-primary transition-colors">{stat.label}</p>
              <stat.icon className={cn("size-5 transition-transform group-hover:scale-110", stat.color)} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className={cn("mt-2 text-xs font-medium", stat.color.includes('emerald') || stat.color.includes('primary') ? 'text-success' : 'text-text-secondary')}>
              {stat.trend}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Evolução Financeira</h3>
              <p className="text-sm text-text-secondary">Receitas vs Despesas (6 meses)</p>
            </div>
            <select className="rounded-lg border-border bg-background text-xs text-text-primary">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end justify-between px-2">
            {/* Simple Bar Chart Placeholder */}
            {[40, 30, 60, 45, 80, 100].map((h, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                <div 
                  className="w-full max-w-[40px] bg-primary/20 rounded-t transition-all hover:bg-primary" 
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] font-medium text-text-secondary">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Crescimento de Membros</h3>
              <p className="text-sm text-text-secondary">Novos cadastros mensais</p>
            </div>
          </div>
          <div className="h-64 w-full flex items-end justify-between px-2">
             {/* Simple Bar Chart Placeholder */}
             {[30, 50, 40, 70, 60, 90].map((h, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                <div 
                  className="w-full max-w-[40px] bg-amber-500/20 rounded-t transition-all hover:bg-amber-500" 
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] font-medium text-text-secondary">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Eventos Próximos</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => router.push('/eventos')}
            >
              Ver todos
            </Button>
          </div>
          <div className="space-y-4">
            {events.map((event, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-background transition-colors cursor-pointer group"
                onClick={() => router.push(`/eventos/${event.id}`)}
              >
                <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 text-primary p-2 min-w-[50px] group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase">{event.month}</span>
                  <span className="text-xl font-bold">{event.date}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-xs text-text-secondary">{event.time} • {event.location}</p>
                </div>
                <ChevronRight className="size-5 text-text-secondary group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Aniversariantes da Semana</h3>
            <Cake className="size-5 text-primary" />
          </div>
          <div className="space-y-4">
            {birthdays.map((person, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    {person.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{person.name}</p>
                    <p className="text-xs text-text-secondary">{person.date}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-xs"
                  onClick={() => handleCongratulate(person.name)}
                >
                  Parabenizar
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

import { cn } from '@/shared/utils';
