import { Switch } from './Switch';
import { Result } from './Result';
import { History } from './History';
import { cn } from '@/utils/cn';
import { Section } from './Section';
import FirstParty from '@/assets/first_party.svg';
import SecondParty from '@/assets/second_party.svg';
import ThirdParty from '@/assets/third_party.svg';
import Image from 'next/image';
import bn from 'bignumber.js';
import { getTotals } from './getData';
import { Progress } from './Progress';

type Candidates = {
  id: number;
  value: number;
  percentage: string;
  name: string;
  party: string;
};

export const DataSets = async () => {
  const {
    candidates,
    validTickets,
    invalidTickets,
    validPercentage,
    invalidPercentage,
    valid,
  } = await getTotals();

  return (
    <div className="relative md:my-10 overflow-y-scroll bg-white rounded-3xl px-6 md:px-12 py-4 mx-3 md:mx-0 h-full">
      {/* Header Section */}

      <Switch />
      <Section title="即時開票結果">
        {candidates?.map((candidate: Candidates) => {
          return (
            <div className="flex items-start gap-x-6" key={candidate.id}>
              <div className="text-slate-700 md:font-medium text-2xl md:text-4xl">
                {candidate.id}
              </div>
              <div
                className="flex flex-col w-full md:gap-y-2"
                style={{ width: '540px' }}
              >
                <div className="text-slate-700 text-base flex md:flex-wrap justify-between">
                  <div className="flex items-center gap-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <Image
                        src={
                          candidate.id === 1
                            ? FirstParty
                            : candidate.id === 2
                              ? SecondParty
                              : ThirdParty
                        }
                        alt="logo"
                        width={36}
                        height={36}
                      />
                    </div>
                    <span className="md:text-2xl">{candidate.name}</span>
                  </div>
                  <p className="md:text-4xl">
                    {bn(candidate.value).toFormat()}{' '}
                    <span className="md:text-2xl">票</span>
                  </p>
                </div>

                <Progress candidate={candidate} />
                <div className="md:flex hidden gap-x-2 text-slate-700 items-center">
                  <span className="flex items-center gap-x-1 text-2xl">
                    {candidate.party}
                  </span>
                  <span
                    className={cn(
                      'text-2xl',
                      candidate.id === 1 && 'text-amber-600',
                      candidate.id === 2 && 'text-violet-600',
                      candidate.id === 3 && 'text-emerald-600',
                    )}
                  >
                    {candidate.percentage}%
                  </span>
                </div>
                <div className="text-slate-700 font-medium text-base"></div>
              </div>
            </div>
          );
        })}
      </Section>
      {/* Result Section */}
      <Result
        validTickets={validTickets}
        invalidTickets={invalidTickets}
        validPercentage={validPercentage}
        invalidPercentage={invalidPercentage}
      />

      {/* Voltage Section */}
      <History />
    </div>
  );
};
