import React from 'react';
import { cn } from '@/shared/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ className, padding = 'md', ...props }: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-surface border-border rounded-xl shadow-sm transition-colors duration-300',
        paddings[padding],
        className
      )}
      {...props}
    />
  );
};
