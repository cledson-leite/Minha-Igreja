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
  ChevronRight,
  Shield,
  Trash2,
  MessageCircle,
  UserCog,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { MemberForm } from '@/components/organisms/MemberForm';
import { useMemberStore, MemberRole, Member } from '@/store/useMemberStore';
import { cn } from '@/shared/utils';
import { useRouter } from 'next/navigation';

export const MembersTemplate = () => {
  const router = useRouter();
  const { members, deleteMember, changeRole, updateMember } = useMemberStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('Todos');
  const [cellFilter, setCellFilter] = React.useState('Todas');

  const roles: MemberRole[] = ['Pastor Adm', 'Pastor', 'Secretario', 'Financeiro', 'Supervisor', 'Lider', 'Membro'];

  const handleOpenRoleModal = (id: string) => {
    setSelectedMemberId(id);
    setIsRoleModalOpen(true);
  };

  const handleOpenEditModal = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleOpenConfirmModal = (member: Member) => {
    setSelectedMember(member);
    setIsConfirmModalOpen(true);
  };

  const handleToggleStatus = () => {
    if (selectedMember) {
      const newStatus = selectedMember.status === 'Ativo' ? 'Inativo' : 'Ativo';
      updateMember(selectedMember.id, { status: newStatus });
      setIsConfirmModalOpen(false);
      setSelectedMember(null);
    }
  };

  const handleChangeRole = (role: MemberRole) => {
    if (selectedMemberId) {
      changeRole(selectedMemberId, role);
      setIsRoleModalOpen(false);
    }
  };

  const handleCloseMemberModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || member.status === statusFilter;
    const matchesCell = cellFilter === 'Todas' || member.cell === cellFilter;
    
    return matchesSearch && matchesStatus && matchesCell;
  });

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
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="size-4" />
          Novo Membro
        </Button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseMemberModal} 
        title={selectedMember ? "Editar Membro" : "Cadastrar Novo Membro"}
      >
        <MemberForm onSuccess={handleCloseMemberModal} member={selectedMember || undefined} />
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar Alteração de Status"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <AlertCircle className="size-6 text-amber-500 shrink-0" />
            <p className="text-sm font-medium text-text-primary">
              Tem certeza que deseja alterar o status de <span className="font-bold">{selectedMember?.name}</span> para <span className="font-bold">{selectedMember?.status === 'Ativo' ? 'Inativo' : 'Ativo'}</span>?
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsConfirmModalOpen(false)}>Cancelar</Button>
            <Button 
              className={cn("flex-1", selectedMember?.status === 'Ativo' ? 'bg-error hover:bg-error/90' : 'bg-success hover:bg-success/90')} 
              onClick={handleToggleStatus}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Alterar Cargo do Membro"
      >
        <div className="grid grid-cols-1 gap-2">
          {roles.map((role) => (
            <Button 
              key={role} 
              variant="outline" 
              className="justify-start h-12 font-semibold"
              onClick={() => handleChangeRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        title="Filtros Avançados"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Data de Cadastro</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-text-primary" />
                <input type="date" className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-text-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5 uppercase tracking-wider">Faixa Etária</label>
              <select className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-text-primary">
                <option>Todas</option>
                <option>Crianças (0-12)</option>
                <option>Adolescentes (13-17)</option>
                <option>Jovens (18-29)</option>
                <option>Adultos (30-59)</option>
                <option>Idosos (60+)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" onClick={() => setIsFiltersModalOpen(false)}>Limpar</Button>
            <Button className="flex-1" onClick={() => setIsFiltersModalOpen(false)}>Aplicar Filtros</Button>
          </div>
        </div>
      </Modal>

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
              placeholder="Buscar por nome ou e-mail..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 rounded-lg border-border bg-background pl-10 pr-4 text-sm focus:ring-primary text-text-primary"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-lg border-border bg-background px-4 text-sm font-medium text-text-primary"
            >
              <option value="Todos">Status: Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
            <select 
              value={cellFilter}
              onChange={(e) => setCellFilter(e.target.value)}
              className="h-11 rounded-lg border-border bg-background px-4 text-sm font-medium text-text-primary"
            >
              <option value="Todas">Célula: Todas</option>
              <option value="Esperança">Esperança</option>
              <option value="Renovo">Renovo</option>
              <option value="Vida Nova">Vida Nova</option>
              <option value="Videira">Videira</option>
            </select>
            <Button variant="secondary" className="gap-2 h-11" onClick={() => setIsFiltersModalOpen(true)}>
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
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Cargo</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Igreja</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Célula</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-center">Dizimista</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.map((member) => (
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
                    <div className="flex items-center gap-2">
                      <Shield className={cn("size-3.5", member.role === 'Pastor Adm' ? 'text-primary' : 'text-text-secondary')} />
                      <span className="text-xs font-bold text-text-primary uppercase tracking-tight">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-text-secondary">
                      {member.church}
                    </span>
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-text-secondary hover:text-primary"
                        onClick={() => handleOpenEditModal(member)}
                        title="Editar Membro"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-text-secondary hover:text-primary"
                        onClick={() => handleOpenRoleModal(member.id)}
                        title="Trocar Cargo"
                      >
                        <UserCog className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-primary hover:bg-primary/10"
                        onClick={() => router.push(`/engajamento?memberId=${member.id}`)}
                        title="Chat"
                      >
                        <MessageCircle className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                          "transition-colors",
                          member.status === 'Ativo' 
                            ? "text-text-secondary hover:text-error hover:bg-error/10" 
                            : "text-success hover:bg-success/10"
                        )}
                        onClick={() => handleOpenConfirmModal(member)}
                        title={member.status === 'Ativo' ? "Inativar" : "Ativar"}
                      >
                        {member.status === 'Ativo' ? <Trash2 className="size-4" /> : <CheckCircle className="size-4" />}
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
          <p className="text-xs text-text-secondary font-medium">Mostrando {filteredMembers.length} de {members.length} membros</p>
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
