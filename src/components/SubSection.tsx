import { cn } from '@/utils/cn';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export const SubSection = ({ title, subtitle, children, className }: Props) => {
  return (
    <section
      className={cn(
        'py-8 border-b border-neutral-200 text-slate-700',
        className,
      )}
    >
      <h3 className="text-slate-700 font-medium text-xl mb-2">{title}</h3>
      {subtitle && <p className="text-slate-500 mb-6">{subtitle}</p>}
      {children}
    </section>
  );
};
