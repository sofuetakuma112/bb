import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[94px] w-full max-w-[500px] resize-none rounded-md border border-input bg-background p-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'rounded-2xl',
      },
      borderColor: {
        normal: 'border-slate-300',
        green: 'border-green-300',
      },
    },
    defaultVariants: {
      variant: 'default',
      borderColor: 'normal',
    },
  }
);

export interface TextareaProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'borderColor'>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, borderColor, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, borderColor }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
