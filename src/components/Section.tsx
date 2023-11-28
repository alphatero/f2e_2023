import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const Section = ({
  children,
  title,
  className,
}: PropsWithChildren<{
  title?: string | ReactNode;
  className?: string;
}>) => {
  return (
    <section
      className={cn(
        'py-4 md:py-8 border-b border-neutral-200 text-slate-700',
        className,
      )}
    >
      {title && (
        <h2 className="text-slate-700 font-medium text-base md:text-2xl mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
