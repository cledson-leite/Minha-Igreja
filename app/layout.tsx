import type {Metadata} from 'next';
import './globals.css';
import MainLayout from '@/components/templates/MainLayout';

export const metadata: Metadata = {
  title: 'Igreja Gestão - Sistema de Gestão Eclesiástica',
  description: 'Sistema completo de gestão eclesiástica com finanças, membros, células e eventos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
