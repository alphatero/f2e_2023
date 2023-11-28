'use client';

import { useStore } from './stores';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { cn } from '@/utils/cn';
import { Section } from './Section';
import { PercentageChart } from './PercentageChart';

type Props = {
  validTickets: number;
  invalidTickets: number;
  validPercentage: string;
  invalidPercentage: string;
};

export const Result = ({
  validTickets,
  invalidTickets,
  validPercentage,
  invalidPercentage,
}: Props) => {
  const { open } = useStore();

  return (
    <Section
      title="投票率"
      className={cn(open ? 'block' : 'hidden', 'md:block')}
    >
      <PercentageChart
        validTickets={validTickets}
        invalidTickets={invalidTickets}
        validPercentage={validPercentage}
        invalidPercentage={invalidPercentage}
        total={validTickets + invalidTickets}
      />
    </Section>
  );
};
