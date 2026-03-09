import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/shared/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export const StatCard = ({ label, value, trend, icon: Icon, color = 'text-primary', className }: StatCardProps) => {
  return (
    <Card className={cn("flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <div className={cn("p-2 rounded-lg bg-slate-50 dark:bg-slate-800")}>
          <Icon className={cn("size-5", color)} />
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {trend && (
        <p className={cn("mt-2 text-xs font-medium text-slate-500")}>
          {trend}
        </p>
      )}
    </Card>
  );
};
