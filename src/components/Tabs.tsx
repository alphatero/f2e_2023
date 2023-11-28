'use client';
import { Tab } from '@headlessui/react';
import { cn } from '@/utils/cn';

type Props = {
  tabs: string[];
  selected: string;
  setSelected: (value: string) => void;
};

export const Tabs = (props: Props) => {
  const { tabs, selected, setSelected } = props;
  return (
    <Tab.Group>
      <Tab.List className="flex gap-x-2 ">
        {tabs?.map((item, index) => (
          <Tab
            key={index}
            className={cn(
              selected === item
                ? 'first:rounded-l-full last:rounded-r-full bg-cyan-600 focus:outline-none text-white text-xl px-4 py-2'
                : 'bg-white text-slate-700 text-xl px-4 py-2',
              'shadow-md first:rounded-l-full last:rounded-r-full text-xl px-4 py-2',
            )}
            onClick={() => setSelected(item)}
          >
            {item}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};
