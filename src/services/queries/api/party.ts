import { get } from '@/utils/axios';

export const getParty = async () => {
  const res = await get('/history/party');
  return res.data;
}