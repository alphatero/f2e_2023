import { PropsWithChildren } from 'react';
import { Header, DataSets } from '@/components';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="bg-neutral-100 max-w-screen relative">
      <Header />

      {children}
    </div>
  );
}
