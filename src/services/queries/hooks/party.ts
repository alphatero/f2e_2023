import * as api from "../api/party";
import { useQuery } from "@tanstack/react-query";

export const schema = {
  party: {
    queryKey: ["party"],
    queryFn: api.getParty,
  }
};

export const useParty = () => useQuery({...schema.party});

