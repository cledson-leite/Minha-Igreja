'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  BookOpen,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/shared/utils';
import { useUserStore } from '@/store/useUserStore';
import { useChatStore } from '@/store/useChatStore';

export const EngagementTemplate = () => {
  const { user } = useUserStore();
  const { messages, addMessage } = useChatStore();
  const [activeChatId, setActiveChatId] = React.useState('3');
  const [callType, setCallType] = React.useState<'none' | 'audio' | 'video'>('none');
  const [messageText, setMessageText] = React.useState('');

  const chats = [
    { id: '1', name: 'Líderes de Célula', lastMsg: 'A reunião será às 20h...', time: '10:45', unread: 3, avatar: 'https://picsum.photos/seed/chat1/100/100', status: 'online' },
    { id: '2', name: 'Ministério de Louvor', lastMsg: 'Escala de Domingo pronta!', time: 'Ontem', unread: 0, avatar: 'https://picsum.photos/seed/chat2/100/100', status: 'offline' },
    { id: '3', name: 'Ricardo Oliveira', lastMsg: 'Paz do Senhor, pastor!', time: 'Ontem', unread: 0, avatar: 'https://picsum.photos/seed/chat3/100/100', status: 'online' },
  ];

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const chatMessages = messages.filter(m => m.chatId === activeChatId);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    addMessage({
      chatId: activeChatId,
      sender: 'Eu',
      text: messageText,
      isMe: true
    });
    setMessageText('');
  };

  const handleCall = (type: 'audio' | 'video') => {
    setCallType(type);
  };

  const endCall = () => {
    setCallType('none');
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-surface rounded-2xl overflow-hidden border border-border shadow-sm transition-colors duration-300">
      {/* Sidebar: Chat List */}
      <div className="w-80 border-r border-border flex flex-col bg-background">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-black tracking-tight mb-4 text-text-primary">Mensagens</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full bg-surface border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                "p-4 flex gap-3 transition-all cursor-pointer border-b border-border/50 last:border-0",
                activeChatId === chat.id 
                  ? "bg-surface shadow-sm z-10" 
                  : "hover:bg-surface/50"
              )}
            >
              <div className="relative shrink-0">
                <div className="size-12 rounded-2xl overflow-hidden relative">
                  <Image 
                    src={chat.avatar} 
                    alt={chat.name} 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {chat.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 size-4 bg-success rounded-full border-2 border-surface" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={cn("text-sm truncate", activeChatId === chat.id ? "font-bold text-primary" : "font-semibold text-text-primary")}>
                    {chat.name}
                  </h4>
                  <span className="text-[10px] font-bold text-text-secondary">{chat.time}</span>
                </div>
                <p className="text-xs text-text-secondary truncate leading-tight">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="size-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-lg shadow-primary/20">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Chat Window or Call UI */}
      <div className="flex-1 flex flex-col relative bg-surface">
        {callType !== 'none' ? (
          /* Call UI */
          <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden">
            {callType === 'video' ? (
              /* Video Call Specific UI */
              <div className="absolute inset-0 w-full h-full">
                {/* Remote Video (Full Screen Placeholder) */}
                <div className="absolute inset-0 bg-slate-800">
                  <Image 
                    src={`https://picsum.photos/seed/${activeChat.id}video/1280/720`} 
                    alt="Remote Video" 
                    fill
                    className="object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
                </div>

                {/* Local Video (Picture-in-Picture) */}
                <div className="absolute bottom-32 right-8 w-32 sm:w-48 aspect-video bg-slate-700 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden z-10">
                  <Image 
                    src={user?.avatar || 'https://picsum.photos/seed/me/400/300'} 
                    alt="Local Video" 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[10px] font-bold">
                    Você
                  </div>
                </div>

                {/* Call Info Overlay */}
                <div className="absolute top-8 left-8 z-10">
                  <h2 className="text-2xl font-black tracking-tight">{activeChat.name}</h2>
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mt-1 flex items-center gap-2">
                    <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                    Chamada de Vídeo HD
                  </p>
                </div>
              </div>
            ) : (
              /* Audio Call Specific UI */
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="size-40 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary animate-pulse overflow-hidden relative">
                    <Image 
                      src={activeChat.avatar} 
                      alt={activeChat.name} 
                      fill 
                      className="rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 size-12 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <Phone className="size-6 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-black tracking-tight mb-2">{activeChat.name}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-12">
                  Chamada de Áudio em andamento...
                </p>
              </div>
            )}

            {/* Common Call Controls */}
            <div className="absolute bottom-12 flex gap-6 z-20">
              <Button 
                onClick={endCall}
                className="rounded-full size-16 bg-red-500 hover:bg-red-600 border-none shadow-xl shadow-red-500/40 transition-transform hover:scale-110 active:scale-95"
              >
                <Phone className="size-8 rotate-[135deg]" />
              </Button>
              <Button 
                variant="secondary" 
                className="rounded-full size-16 bg-white/10 hover:bg-white/20 backdrop-blur-md border-none text-white transition-transform hover:scale-110 active:scale-95"
              >
                {callType === 'audio' ? <Video className="size-8" /> : <Phone className="size-8" />}
              </Button>
              <Button 
                variant="secondary" 
                className="rounded-full size-16 bg-white/10 hover:bg-white/20 backdrop-blur-md border-none text-white transition-transform hover:scale-110 active:scale-95"
              >
                <Smile className="size-8" />
              </Button>
            </div>
          </div>
        ) : (
          /* Chat Window */
          <>
            {/* Chat Header */}
            <div className="h-20 px-6 border-b border-border flex items-center justify-between bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-xl overflow-hidden border-2 border-primary/10 relative">
                  <Image 
                    src={activeChat.avatar} 
                    alt={activeChat.name} 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary leading-none">{activeChat.name}</h4>
                  <p className="text-[10px] font-bold text-success uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                    <span className="size-1.5 bg-success rounded-full animate-pulse" />
                    Online agora
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCall('audio')}
                  className="rounded-xl size-11 text-text-secondary hover:text-primary hover:bg-primary/5"
                >
                  <Phone className="size-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCall('video')}
                  className="rounded-xl size-11 text-text-secondary hover:text-primary hover:bg-primary/5"
                >
                  <Video className="size-5" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="ghost" size="icon" className="rounded-xl size-11 text-text-secondary">
                  <MoreVertical className="size-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background/30">
              <div className="flex justify-center">
                <span className="px-4 py-1.5 bg-background rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Hoje
                </span>
              </div>
              
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[70%]",
                    msg.isMe ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm shadow-sm",
                    msg.isMe 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-surface text-text-primary rounded-tl-none border border-border"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary mt-1.5 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-border bg-surface">
              <div className="flex items-end gap-4">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-xl size-11 text-text-secondary hover:text-primary">
                    <Paperclip className="size-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl size-11 text-text-secondary hover:text-primary">
                    <Smile className="size-5" />
                  </Button>
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Escreva sua mensagem..." 
                    className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none max-h-32 text-text-primary"
                    rows={1}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  className="rounded-xl size-11 shrink-0 shadow-lg shadow-primary/20"
                  disabled={!messageText.trim()}
                >
                  <Send className="size-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
