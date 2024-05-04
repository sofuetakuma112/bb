import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const cardVariants = cva('size-full', {
  variants: {
    variant: {
      single: 'max-w-[1172px] rounded-3xl',
      list: 'max-w-[270px] rounded-xl',
    },
    color: {
      transparent: 'bg-transparent',
      white: 'border bg-white-white shadow-[0_6px_5px_0px_rgba(0,0,0,0.2)]',
      blue: 'bg-gradient-to-b from-blue-white-100 via-blue-white-300 to-blue-300',
      superlike: 'bg-gradient-to-b from-blue-400 via-purple-100 to-pink-500'
    },
  },
  defaultVariants: {
    variant: 'single',
    color: 'transparent',
  },
});

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  VariantProps<typeof cardVariants> { }

const Card: React.FC<CardProps> = ({ className, variant, color, ...props }) => (
  <div className={cn(cardVariants({ variant, color }), className)} {...props} />
);

export { Card };
