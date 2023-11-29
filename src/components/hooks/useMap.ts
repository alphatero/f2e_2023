import { useMap as useMapQuery } from "@/services/queries/hooks/map";

export const useMap = () => {
  const { data, isLoading, isError, error } = useMapQuery();
  const map = data?.list ?? [];


  return { map, isLoading, isError, error };
}