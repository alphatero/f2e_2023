import { useMap as useMapQuery } from "@/services/queries/hooks/map";

export const useMap = () => {
  const { data, isLoading, isError, error } = useMapQuery();
  const map = data?.list ?? [];

  console.log('map', map);

  return { map, isLoading, isError, error };
}