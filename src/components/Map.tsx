'use client';

import { TotalMap } from './TotalMap';
import { useStore } from './stores';
import { TownMap } from './TownMap';

export const Map = () => {
  const { currentCountry } = useStore();

  return currentCountry === '' ? <TotalMap /> : <TownMap />;
};
