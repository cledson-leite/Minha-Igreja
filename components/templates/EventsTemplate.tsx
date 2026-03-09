'use client';

import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  Ticket, 
  Users,
  Search
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/shared/utils';

export const EventsTemplate = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  const events = [
    { id: '1', title: 'Culto de Celebração', time: '19:30', location: 'Templo Principal', type: 'Culto', attendees: 120 },
    { id: '2', title: 'Conferência de Mulheres', time: '14:00', location: 'Auditório', type: 'Evento', attendees: 45 },
    { id: '3', title: 'Ensaio do Louvor', time: '20:00', location: 'Sala 02', type: 'Ensaio', attendees: 12 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Calendário de Eventos</h1>
          <p className="text-text-secondary text-sm mt-1">Organize cultos, reuniões e eventos especiais.</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card padding="none" className="overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-text-primary">Outubro 2023</h2>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="size-8">
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Mês</Button>
                <Button variant="ghost" size="sm">Semana</Button>
                <Button variant="ghost" size="sm">Dia</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 border-b border-border">
              {weekDays.map((day) => (
                <div key={day} className="py-3 text-center text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {/* Empty cells for padding */}
              {Array.from({ length: 0 }).map((_, i) => (
                <div key={i} className="h-32 border-r border-b border-border bg-background" />
              ))}
              
              {days.map((day) => {
                const hasEvent = [5, 12, 18, 20, 25].includes(day);
                const isToday = day === 18;
                return (
                  <div 
                    key={day} 
                    className={cn(
                      "h-32 p-2 border-r border-b border-border transition-colors hover:bg-background cursor-pointer relative",
                      isToday && "bg-primary/5"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold size-7 flex items-center justify-center rounded-full",
                      isToday ? "bg-primary text-white" : "text-text-secondary"
                    )}>
                      {day}
                    </span>
                    
                    {hasEvent && (
                      <div className="mt-2 space-y-1">
                        <div className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold truncate">
                          Culto de Celebração
                        </div>
                        {day === 20 && (
                          <div className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-bold truncate">
                            Reunião Líderes
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-text-primary">Detalhes do Evento</h3>
              <Button variant="ghost" size="icon"><Search className="size-4" /></Button>
            </div>

            <div className="space-y-6">
              <div className="bg-background rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                  <CalendarIcon className="size-3" />
                  Hoje • 18 Outubro
                </div>
                <h4 className="text-lg font-bold mb-4 text-text-primary">Culto de Celebração</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Clock className="size-4 text-text-secondary opacity-50" />
                    <span>19:30 - 21:00</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin className="size-4 text-text-secondary opacity-50" />
                    <span>Templo Principal</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Users className="size-4 text-text-secondary opacity-50" />
                    <span>120 confirmados</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-text-secondary mb-4">Culto especial de gratidão com a participação do ministério de louvor local.</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Ticket className="size-4" />
                      Check-in
                    </Button>
                    <Button variant="outline" size="icon">
                      <Users className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-sm mb-4 text-text-primary">Próximos Eventos</h5>
                <div className="space-y-4">
                  {events.slice(1).map((event) => (
                    <div key={event.id} className="flex gap-4 p-3 rounded-lg hover:bg-background transition-colors cursor-pointer">
                      <div className="size-12 rounded-lg bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase">OUT</span>
                        <span className="text-lg font-bold">22</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-sm text-text-primary">{event.title}</h6>
                        <p className="text-xs text-text-secondary">{event.time} • {event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
