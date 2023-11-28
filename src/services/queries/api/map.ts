import { get } from '@/utils/axios';

export const getMap = async () => {
  const res = await get('/votes');
  return res.data;
}