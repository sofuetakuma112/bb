import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'bg-background ring-offset-background placeholder:text-muted-foreground mt-3 flex h-10 w-full max-w-auto sm:max-w-[480px] mx-auto border px-3 py-2 text-sm  focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        single: 'rounded-md ',
        multi: 'min-h-[112px] rounded-xl',
        round: 'rounded-3xl',
        file: 'align-center min-h-[112px] rounded-md text-center text-blue-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-blue-300',
      },
      borderColor: {
        normal: 'border-slate-300',
        whiteBlue: 'border-blue-300',
        blue: 'border-blue-300',
      },
    },
    defaultVariants: {
      variant: 'single',
      borderColor: 'normal',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'borderColor'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, borderColor, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, borderColor }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
