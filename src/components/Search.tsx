'use client';

import SearchIcon from '@/assets/icons/SearchIcon';
import { useStore } from './stores';

export const Search = () => {
  const { openDialog } = useStore();
  return (
    <button
      onClick={openDialog}
      className="rounded-full flex items-center flex-col justify-center w-[90px] h-[90px] md:w-[120px] md:h-[120px] text-white fixed right-3 bottom-12 bg-gradient-to-br from-[#22D3EE] to-[#0E7490]"
    >
      <SearchIcon className="w-10 h-10" />
      <span className="text-xl">查詢地區</span>
    </button>
  );
};
