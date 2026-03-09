'use client';

import React from 'react';
import { 
  Settings, 
  UserPlus, 
  Shield, 
  Bell, 
  CreditCard, 
  Database, 
  Globe, 
  Lock,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/shared/utils';

export const AdminTemplate = () => {
  const menuItems = [
    { label: 'Usuários e Permissões', icon: Shield, desc: 'Gerencie quem pode acessar o sistema' },
    { label: 'Configurações Gerais', icon: Settings, desc: 'Nome da igreja, logo e dados de contato' },
    { label: 'Notificações', icon: Bell, desc: 'Configure alertas por e-mail e push' },
    { label: 'Assinatura e Planos', icon: CreditCard, desc: 'Gerencie seu plano e pagamentos' },
    { label: 'Backup e Dados', icon: Database, desc: 'Exportação e segurança dos dados' },
    { label: 'Integrações', icon: Globe, desc: 'Conecte com outras ferramentas' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary">Administração</h1>
          <p className="text-text-secondary text-sm mt-1">Configurações globais do sistema e gestão de conta.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="size-4" />
          Convidar Administrador
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Menu Column */}
        <div className="lg:col-span-4 space-y-4">
          {menuItems.map((item, i) => (
            <Card key={i} padding="sm" className={cn("cursor-pointer hover:border-primary transition-all group", i === 0 && "border-primary bg-primary/5")}>
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg transition-colors", i === 0 ? "bg-primary text-white" : "bg-background text-text-secondary group-hover:bg-primary/10 group-hover:text-primary")}>
                  <item.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-text-primary">{item.label}</h4>
                  <p className="text-[10px] text-text-secondary">{item.desc}</p>
                </div>
                <ChevronRight className="size-4 text-border group-hover:text-primary" />
              </div>
            </Card>
          ))}
        </div>

        {/* Content Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-text-primary">Usuários e Permissões</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filtrar</Button>
                <Button size="sm">Novo Usuário</Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Marcos Silva', email: 'marcos@igreja.com', role: 'Administrador', status: 'Ativo' },
                { name: 'Ana Souza', email: 'ana@igreja.com', role: 'Financeiro', status: 'Ativo' },
                { name: 'Ricardo Mendes', email: 'ricardo@igreja.com', role: 'Secretaria', status: 'Inativo' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-background transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs font-bold text-text-primary">{user.role}</p>
                      <p className={cn("text-[10px] font-bold uppercase", user.status === 'Ativo' ? 'text-success' : 'text-text-secondary')}>
                        {user.status}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-text-secondary"><Lock className="size-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-success/20 bg-success/5">
              <div className="flex items-center gap-2 text-success mb-4">
                <CheckCircle2 className="size-5" />
                <h4 className="font-bold text-sm">Plano Premium Ativo</h4>
              </div>
              <p className="text-xs text-text-secondary mb-6">Sua próxima renovação será em 12 de Dezembro de 2023.</p>
              <Button variant="outline" className="w-full border-success/20 text-success hover:bg-success/10">Gerenciar Assinatura</Button>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <div className="flex items-center gap-2 text-accent mb-4">
                <AlertCircle className="size-5" />
                <h4 className="font-bold text-sm">Segurança da Conta</h4>
              </div>
              <p className="text-xs text-text-secondary mb-6">Recomendamos ativar a autenticação em duas etapas (2FA).</p>
              <Button className="w-full bg-accent hover:bg-accent/90 border-none text-white">Ativar 2FA</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
