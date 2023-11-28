'use client';

import Image from 'next/image';
import Logo from '@/assets/logo.svg';

export const Header = () => {
  return (
    <div className="bg-white/80 text-black p-3 md:hidden">
      <h1 className="font-bold text-slate-700 text-xl flex items-center gap-x-2">
        <Image src={Logo} alt="logo" width={32} height={32} />
        <span>今晚來開票</span>
      </h1>
    </div>
  );
};
