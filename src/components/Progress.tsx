'use client';
import { useStore } from './stores';
import { cn } from '@/utils/cn';

type Candidates = {
  id: number;
  value: number;
  percentage: string;
  name: string;
  party: string;
};

export const Progress = ({ candidate }: { candidate: Candidates }) => {
  const { open } = useStore();
  return (
    <div
      className={cn('md:flex items-center gap-x-2', open ? 'flex' : 'hidden')}
    >
      <span
        className={cn(
          'h-4 rounded-full bg-cyan-700 block',
          candidate.id === 1 && 'bg-amber-400',
          candidate.id === 2 && 'bg-violet-400',
          candidate.id === 3 && 'bg-emerald-400',
        )}
        style={{ width: `${candidate.percentage}%` }}
      ></span>
      <span
        className={cn(
          'md:hidden',
          candidate.id === 1 && 'text-amber-600',
          candidate.id === 2 && 'text-violet-600',
          candidate.id === 3 && 'text-emerald-600',
        )}
      >
        {candidate.percentage}%
      </span>
    </div>
  );
};
