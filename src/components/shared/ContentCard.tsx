'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
     variant?: 'default' | 'strong' | 'subtle';
     hover?: boolean;
}

const ContentCard = forwardRef<HTMLDivElement, ContentCardProps>(
     ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
          const variants = {
               default: 'glass',
               strong: 'glass-strong',
               subtle: 'bg-[rgb(var(--surface))]/50 border-white/[0.05] backdrop-blur-xl',
          };

          return (
               <div
                    ref={ref}
                    className={cn(
                         'rounded-2xl shadow-lg shadow-black/20',
                         hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                         variants[variant],
                         className
                    )}
                    {...props}
               >
                    {children}
               </div>
          );
     }
);

ContentCard.displayName = 'ContentCard';

export { ContentCard };
