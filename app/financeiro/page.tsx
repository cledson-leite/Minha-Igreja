import { Suspense } from 'react';
import { FinanceTemplate } from '@/components/templates/FinanceTemplate';

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Carregando...</div>}>
      <FinanceTemplate />
    </Suspense>
  );
}
