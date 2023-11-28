import { DataSets } from '@/components';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import { Map } from '@/components/Map';
import { Search } from '@/components/Search';
import { Dialog } from '@/components/Dialog';

export default async function Home() {
  return (
    <div className="flex h-full md:flex-row md:gap-x-6 justify-center items-center md:items-start flex-col w-full">
      <div className="md:w-1/2 max-w-2xl w-full relative flex flex-col py-4 md:py-10 max-h-screen">
        <h1 className="font-bold text-slate-700 text-xl md:flex items-center gap-x-2 hidden">
          <Image src={Logo} alt="logo" width={32} height={32} />
          <span>今晚來開票</span>
        </h1>

        <DataSets />
      </div>
      <div className="md:w-1/2 max-w-2xl w-full py-10">
        <Map />
      </div>
      <Search />
      <Dialog />
    </div>
  );
}
