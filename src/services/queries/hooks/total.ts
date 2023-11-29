import * as api from "../api/total";
import { useQuery } from "@tanstack/react-query";

export const schema = {
  total: {
    queryKey: ["total"],
    queryFn: api.getTotal,
  }
};

export const useTotal = () => useQuery({...schema.total});

