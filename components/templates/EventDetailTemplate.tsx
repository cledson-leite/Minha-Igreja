'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Ticket, 
  Users,
  Share2,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/utils';

interface EventDetailTemplateProps {
  id: string;
}

export const EventDetailTemplate = ({ id }: EventDetailTemplateProps) => {
  const router = useRouter();

  // Mock data for the specific event
  const event = {
    id,
    title: id === '1' ? 'Culto de Celebração' : id === '2' ? 'Reunião de Líderes' : 'Conferência de Jovens',
    date: '20 de Outubro, 2023',
    time: '19:30 - 21:00',
    location: 'Templo Principal',
    description: 'Um momento especial de adoração e comunhão para toda a família. Teremos uma palavra inspiradora e louvores que tocam o coração.',
    attendees: 156,
    organizer: 'Pr. Marcos Silva',
    category: 'Culto',
    status: 'Confirmado',
    image: `https://picsum.photos/seed/event${id}/1200/400`
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="gap-2 -ml-4 text-text-secondary hover:text-primary"
          onClick={() => router.back()}
        >
          <ChevronLeft className="size-5" />
          Voltar para Calendário
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Share2 className="size-4" /></Button>
          <Button variant="outline" size="icon"><MoreVertical className="size-4" /></Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
        <Image 
          src={event.image} 
          alt={event.title} 
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              {event.category}
            </span>
            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              {event.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{event.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content Column */}
        <div className="lg:col-span-8 space-y-8">
          <Card padding="lg">
            <h3 className="text-xl font-bold mb-6 text-text-primary">Sobre o Evento</h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              {event.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-background flex items-center justify-center shrink-0">
                  <CalendarIcon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Data</p>
                  <p className="font-bold text-text-primary">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-background flex items-center justify-center shrink-0">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Horário</p>
                  <p className="font-bold text-text-primary">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-background flex items-center justify-center shrink-0">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Localização</p>
                  <p className="font-bold text-text-primary">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-background flex items-center justify-center shrink-0">
                  <Users className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Organizador</p>
                  <p className="font-bold text-text-primary">{event.organizer}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="text-xl font-bold mb-6 text-text-primary">Localização</h3>
            <div className="aspect-video bg-background rounded-2xl overflow-hidden relative">
              <Image 
                src="https://picsum.photos/seed/map/800/450" 
                alt="Map" 
                fill
                className="object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-surface p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center">
                    <MapPin className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary">{event.location}</p>
                    <p className="text-xs text-text-secondary">Ver no Google Maps</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold">Inscrição</h3>
              <Ticket className="size-5 text-primary" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Vagas Disponíveis</span>
                <span className="font-bold">44 / 200</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[78%]" />
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="size-8 rounded-full border-2 border-slate-900 overflow-hidden relative">
                        <Image 
                          src={`https://picsum.photos/seed/user${i}/100/100`} 
                          alt="User" 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    <span className="text-white font-bold">+{event.attendees}</span> pessoas confirmadas
                  </p>
                </div>
                
                <Button className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20">
                  Confirmar Presença
                </Button>
                <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-widest font-bold">
                  Evento Gratuito
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-6 text-text-primary">Compartilhar</h3>
            <div className="grid grid-cols-4 gap-4">
              {['WhatsApp', 'Facebook', 'Twitter', 'Email'].map((platform) => (
                <button key={platform} className="flex flex-col items-center gap-2 group">
                  <div className="size-12 rounded-2xl bg-background flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Share2 className="size-5 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{platform}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
