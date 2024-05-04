import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    //TODO 定義カオスになっているのでsizeに加えてテキストカラーとカラーあたり増やしたい
    variants: {
      variant: {
        outline: 'border-input hover:bg-accent hover:text-accent-foreground rounded-full border-2',
        ghost:
          'hover:text-white-white/80 rounded-full bg-blue-300 transition-all duration-500 ease-out hover:opacity-70',
        switch: 'hover:text-accent-foreground rounded-full bg-white hover:bg-blue-300/50',
        follow: 'h-8 w-[108px] rounded-xl border bg-blue-500 hover:bg-blue-600',
        following: 'h-8 w-[108px] rounded-xl border bg-gray-200 hover:bg-gray-200/50',
        delete:
          'text-white-white hover:text-accent-foreground rounded-full bg-red-300 hover:bg-red-300/50',
        close: 'rounded-full border border-gray-300 hover:bg-gray-300',
        upload: 'text-white-white rounded-3xl bg-blue-300 hover:bg-blue-300/50',
        likeDelete: 'rounded-full',
        mobileMenubar:
          'border-input hover:bg-accent hover:text-accent-foreground h-16 w-full border-2',
      },
      size: {
        default: '',
        sm: 'h-10 w-28',
        lgIcon: 'size-16 sm:size-24',
        smIcon: 'size-10 sm:size-16',
        bold: 'text-white-white rounded-md px-4 py-2',
      },
      font: {
        normal: 'font-normal',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'bold',
      font: 'normal',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, font, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, font, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
