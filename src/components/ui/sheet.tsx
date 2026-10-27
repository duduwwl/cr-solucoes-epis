'use client';

// Sheet pattern adapted from Watermelon UI (sheet-1: header, scrollable body, footer with
// primary action and dismiss), built on the Radix UI Dialog primitive as Watermelon does.
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  children,
  side = 'right',
  title,
  description,
  className,
}: {
  children: ReactNode;
  side?: 'right' | 'left' | 'bottom' | 'full';
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="sheet-overlay" />
      <Dialog.Content className={cn('sheet', `sheet-${side}`, className)}>
        <div className="sheet-head">
          <Dialog.Title className="sheet-title">{title}</Dialog.Title>
          <Dialog.Close className="icon-button" aria-label="Fechar">
            <X size={22} strokeWidth={1.75} aria-hidden />
          </Dialog.Close>
        </div>
        {description ? <Dialog.Description className="sheet-description">{description}</Dialog.Description> : <Dialog.Description className="sr-only">{title}</Dialog.Description>}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
