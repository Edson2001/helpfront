import { useQuery } from "@tanstack/react-query";
import api from "@/services";

const fetchAlerts = async (): Promise<any[]> => {
  const response = await api.get("/users/me");
  return response.data;
};

export const useMe = () => {
  return useQuery<any[], Error>({
    queryKey: ["useMe"],
    queryFn: () => fetchAlerts(),
    staleTime: 1000 * 60 * 5,
  });
};
