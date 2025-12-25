'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface InteractiveButtonProps extends HTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'ghost';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     type?: 'button' | 'submit' | 'reset';
}

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
     (
          {
               className,
               variant = 'primary',
               size = 'md',
               disabled = false,
               type = 'button',
               children,
               ...props
          },
          ref
     ) => {
          const variants = {
               primary: 'text-white shadow-lg hover:shadow-xl hover:scale-105',
               secondary: 'glass hover:opacity-90',
               ghost: 'bg-transparent hover:bg-white/5',
          };

          const sizes = {
               sm: 'px-3 py-1.5 text-sm',
               md: 'px-5 py-2.5 text-base',
               lg: 'px-7 py-3.5 text-lg',
          };

          return (
               <button
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    className={cn(
                         'inline-flex items-center justify-center gap-2 rounded-full font-medium',
                         'backdrop-blur-xl transition-all duration-200',
                         'focus:outline-none focus:ring-2 focus:ring-offset-2',
                         'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                         variants[variant],
                         sizes[size],
                         className
                    )}
                    style={
                         variant === 'primary'
                              ? {
                                   background: 'rgb(var(--accent))',
                                   boxShadow: '0 10px 25px -5px rgb(var(--accent) / 0.25)',
                              }
                              : variant === 'secondary'
                                   ? {
                                        color: 'rgb(var(--text))',
                                   }
                                   : {
                                        color: 'rgb(var(--text))',
                                   }
                    }
                    {...props}
               >
                    {children}
               </button>
          );
     }
);

InteractiveButton.displayName = 'InteractiveButton';

export { InteractiveButton };
