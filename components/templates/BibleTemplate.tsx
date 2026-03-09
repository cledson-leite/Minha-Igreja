'use client';

import React from 'react';
import { 
  Book, 
  Search, 
  Bookmark, 
  History, 
  ChevronLeft,
  ChevronRight, 
  Play, 
  Heart,
  Share2,
  List
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/shared/utils';

export const BibleTemplate = () => {
  const books = [
    { name: 'Gênesis', chapters: 50, category: 'Pentateuco' },
    { name: 'Êxodo', chapters: 40, category: 'Pentateuco' },
    { name: 'Levítico', chapters: 27, category: 'Pentateuco' },
    { name: 'Números', chapters: 36, category: 'Pentateuco' },
    { name: 'Deuteronômio', chapters: 34, category: 'Pentateuco' },
  ];

  const readingPlan = [
    { title: 'Plano Anual', progress: 45, current: 'Salmos 23' },
    { title: 'Novo Testamento', progress: 12, current: 'Mateus 5' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Bible Navigation */}
      <div className="lg:col-span-3 space-y-6">
        <Card padding="sm">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Buscar livro ou versículo..." 
              className="w-full bg-background border-none rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary"
            />
          </div>
          
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-3 mb-2">Antigo Testamento</h4>
            {books.map((book) => (
              <Button key={book.name} variant="ghost" className="w-full justify-between text-sm font-medium h-9 px-3 text-text-primary hover:bg-background">
                {book.name}
                <span className="text-[10px] text-text-secondary">{book.chapters} cap.</span>
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-center text-xs text-primary font-bold mt-2">Ver todos</Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border space-y-1">
            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-3 mb-2">Novo Testamento</h4>
            <Button variant="ghost" className="w-full justify-between text-sm font-medium h-9 px-3 text-text-primary hover:bg-background">
              Mateus
              <span className="text-[10px] text-text-secondary">28 cap.</span>
            </Button>
            <Button variant="ghost" className="w-full justify-between text-sm font-medium h-9 px-3 text-text-primary hover:bg-background">
              Marcos
              <span className="text-[10px] text-text-secondary">16 cap.</span>
            </Button>
          </div>
        </Card>

        <Card padding="sm">
          <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-text-primary">
            <Bookmark className="size-4 text-primary" />
            Marcadores
          </h4>
          <div className="space-y-3">
            <div className="p-2 rounded-lg bg-background border border-border cursor-pointer hover:border-primary transition-colors">
              <p className="text-xs font-bold text-text-primary">João 3:16</p>
              <p className="text-[10px] text-text-secondary line-clamp-1">Porque Deus amou o mundo de tal maneira...</p>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border cursor-pointer hover:border-primary transition-colors">
              <p className="text-xs font-bold text-text-primary">Filipenses 4:13</p>
              <p className="text-[10px] text-text-secondary line-clamp-1">Tudo posso naquele que me fortalece.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bible Content */}
      <div className="lg:col-span-6 space-y-6">
        <Card className="min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h2 className="text-2xl font-black text-text-primary">Salmos 23</h2>
              <p className="text-xs text-text-secondary">Almeida Revista e Corrigida (ARC)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon"><History className="size-4" /></Button>
              <Button variant="outline" size="icon"><List className="size-4" /></Button>
            </div>
          </div>

          <div className="flex-1 space-y-6 font-serif text-lg leading-relaxed text-text-primary">
            <p><sup className="text-[10px] font-bold text-primary mr-2">1</sup>O Senhor é o meu pastor; nada me faltará.</p>
            <p><sup className="text-[10px] font-bold text-primary mr-2">2</sup>Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.</p>
            <p><sup className="text-[10px] font-bold text-primary mr-2">3</sup>Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.</p>
            <p><sup className="text-[10px] font-bold text-primary mr-2">4</sup>Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.</p>
            <p><sup className="text-[10px] font-bold text-primary mr-2">5</sup>Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.</p>
            <p><sup className="text-[10px] font-bold text-primary mr-2">6</sup>Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do Senhor por longos dias.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <Heart className="size-5" />
                <span className="text-xs font-bold">Favoritar</span>
              </button>
              <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <Share2 className="size-5" />
                <span className="text-xs font-bold">Compartilhar</span>
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="size-4" /> Anterior
              </Button>
              <Button variant="outline" className="gap-2">
                Próximo <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Reading Plans & Audio */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="bg-slate-900 text-white border-none">
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Play className="size-3" />
            Bíblia em Áudio
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-primary flex items-center justify-center">
              <Play className="size-6 text-white fill-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Salmos 23</h4>
              <p className="text-[10px] text-white/60">Narrado por Cid Moreira</p>
            </div>
          </div>
          <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-white/40 font-bold">
            <span>01:20</span>
            <span>03:45</span>
          </div>
        </Card>

        <Card>
          <h4 className="font-bold text-sm mb-4 text-text-primary">Planos de Leitura</h4>
          <div className="space-y-6">
            {readingPlan.map((plan, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-text-primary">{plan.title}</p>
                    <p className="text-[10px] text-text-secondary">Atual: {plan.current}</p>
                  </div>
                  <span className="text-[10px] font-bold text-primary">{plan.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${plan.progress}%` }} />
                </div>
                <Button variant="ghost" size="sm" className="w-full text-[10px] h-7">Continuar Leitura</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <h4 className="font-bold text-sm text-accent mb-2">Dica de Estudo</h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            O Salmo 23 é um dos textos mais conhecidos da Bíblia, expressando confiança total no cuidado de Deus.
          </p>
        </Card>
      </div>
    </div>
  );
};
