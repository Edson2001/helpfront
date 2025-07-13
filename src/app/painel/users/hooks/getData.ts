import api from "@/services";
import { useQuery } from "@tanstack/react-query";
 

const fetchAlerts = async (): Promise<any[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const useUsers = () => {
  return useQuery<any[], Error>({
    queryKey: ["users"],
    queryFn: fetchAlerts,
    staleTime: 1000 * 60 * 5,  
  });
};
