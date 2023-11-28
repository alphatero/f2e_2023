'use client';

import { useStore } from './stores';

export const Switch = () => {
  const { toggle, open } = useStore();

  return (
    <button
      className="absolute top-4 right-6 text-cyan-700 underline text-base font-medium md:hidden"
      onClick={toggle}
    >
      {open ? '收合' : '看分析'}
    </button>
  );
};
