'use client';

import history from './history.json';

import { Tabs } from './Tabs';
import { Section } from './Section';
import { cn } from '@/utils/cn';
import { useStore } from './stores';
import { ElectedIcon } from '@/assets/icons';
import { SubSection } from './SubSection';
import { PercentageChart } from './PercentageChart';
import { BarChart } from './BarChart';
import { useParty } from '@/services/queries/hooks/party';

const tabs = ['得票數', '得票率'];

type Candidate = {
  id: number;
  validTickets: number;
  validPercentage: string;
  name: string;
  party: string;
};

export const History = () => {
  const { data } = useParty();
  const { selectedSectionOne, setSelectedSectionOne, open } = useStore();
  if (!data) return null;
  // 找得票數最多的
  const elected = history[0].candidates.reduce(
    (prev: Candidate, current: Candidate) => {
      return prev.validTickets > current.validTickets ? prev : current;
    },
  );
  return (
    <Section
      title="歷屆得票分析"
      className={cn(open ? 'block' : 'hidden', 'md:block')}
    >
      <ul className="flex gap-x-11 text-2xl overflow-x-scroll overflow-y-hidden scroll-auto">
        {data.ticket?.map((item: any) => {
          return (
            <li
              key={item.year}
              className={cn(
                'cursor-pointer',
                selectedSectionOne === item.year && 'text-cyan-700',
              )}
              onClick={() => setSelectedSectionOne(item.year)}
            >
              {item.year}
            </li>
          );
        })}
      </ul>
      <SubSection title="選舉概況">
        <div className="flex md:flex-row flex-col gap-y-6 md:gap-y-0 md:gap-x-3 py-6">
          {history[0].candidates.map((candidate: Candidate) => {
            return (
              <div
                key={candidate.id}
                className={cn(
                  'flex flex-col rounded-lg bg-amber-100 px-3 pb-3 pt-5 relative',
                  candidate.id === 1 && 'bg-amber-100',
                  candidate.id === 2 && 'bg-violet-100',
                  candidate.id === 3 && 'bg-cyan-100',
                )}
              >
                {/* validTickets 最多的顯示 */}
                {candidate.id === elected.id && (
                  <div className="absolute top-0 right-3 -translate-y-4">
                    <ElectedIcon className="w-8 h-8 text-red-700" />
                  </div>
                )}

                <span className="text-4xl text-slate-700 absolute top-0 left-3 -translate-y-6">
                  {candidate.id}
                </span>
                <span>{candidate.party}</span>
                <span className="text-xl pt-1">{candidate.name}</span>
                <span className="pt-4 text-xl">{candidate.validTickets}</span>
                <span className="pt-1 text-2xl">
                  {candidate.validPercentage}
                </span>
              </div>
            );
          })}
        </div>

        <PercentageChart
          validTickets={history[0].validTickets}
          invalidTickets={history[0].invalidTickets}
          validPercentage={history[0].validPercentage}
          invalidPercentage={history[0].invalidPercentage}
          total={history[0].total}
        />
      </SubSection>

      <SubSection title="歷屆全國政黨分析" subtitle="得票率低於 5% 列為其他">
        <Tabs
          tabs={tabs}
          selected={selectedSectionOne}
          setSelected={setSelectedSectionOne}
        />

        {selectedSectionOne === '得票數' && <BarChart raw={data.ticket} />}
        {selectedSectionOne === '得票率' && <BarChart raw={data.percentage} />}
      </SubSection>
    </Section>
  );
};
