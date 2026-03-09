import { create } from 'zustand';

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  chatId: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'time'>) => void;
  sendRandomBirthdayMessage: (chatId: string) => void;
}

const birthdayMessages = [
  "Parabéns! Que o Senhor derrame bênçãos sem medida sobre sua vida neste novo ciclo. 'O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.' (Números 6:24-25)",
  "Parabéns pelo seu dia! Que a graça de Deus te acompanhe sempre, renovando suas forças e sua fé. 'Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.' (Salmos 90:12)",
  "Parabéns! É uma alegria celebrar sua vida. Que o Espírito Santo te guie em cada passo. 'Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.' (Salmos 118:24)",
  "Parabéns! Que a paz de Cristo, que excede todo entendimento, guarde o seu coração hoje e sempre. 'Pois por meu intermédio os seus dias serão multiplicados, e anos de vida lhe serão acrescentados.' (Provérbios 9:11)",
  "Parabéns! Celebramos a bondade de Deus manifestada em sua existência. Que você continue sendo luz. 'O Senhor cumprirá o seu propósito para comigo! Teu amor, Senhor, dura para sempre.' (Salmos 138:8)"
];

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { id: 1, chatId: '3', sender: 'Ricardo Oliveira', text: 'Paz do Senhor, pastor! Tudo bem?', time: '10:30', isMe: false },
    { id: 2, chatId: '3', sender: 'Eu', text: 'Amém, Ricardo! Tudo ótimo por aqui. Como posso ajudar?', time: '10:32', isMe: true },
    { id: 3, chatId: '3', sender: 'Ricardo Oliveira', text: 'Gostaria de confirmar o horário do ensaio hoje.', time: '10:33', isMe: false },
    { id: 4, chatId: '3', sender: 'Eu', text: 'Será às 19:30 no templo principal.', time: '10:35', isMe: true },
  ],
  addMessage: (msg) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...msg,
        id: state.messages.length + 1,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]
  })),
  sendRandomBirthdayMessage: (chatId) => {
    const randomMsg = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length + 1,
          chatId,
          sender: 'Eu',
          text: randomMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true
        }
      ]
    }));
  }
}));
