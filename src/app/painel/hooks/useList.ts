import api from "@/services";
import { useQuery } from "@tanstack/react-query";

const fetchList = async (): Promise<any[]> => {
  const response = await api.get("/tickets/me/data");
  return response.data;
};

export const useList = () => {
  return useQuery<any[], Error>({
    queryKey: ["useList"],
    queryFn: fetchList,
    staleTime: 1000 * 60 * 5,  
  });
};
