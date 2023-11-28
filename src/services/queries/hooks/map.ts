import * as api from "../api/map";
import { useQuery } from "@tanstack/react-query";

export const schema = {
  map: {
    queryKey: ["map"],
    queryFn: api.getMap,
  }
};

export const useMap = () => useQuery({...schema.map});

