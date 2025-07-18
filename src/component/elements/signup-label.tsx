'use client';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

const SignupLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <LabelPrimitive.Root
            ref={ref}
            className={cn('text-sm leading-none font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white', className)}
            {...props}
        />
    )
);
SignupLabel.displayName = LabelPrimitive.Root.displayName;

export { SignupLabel };
