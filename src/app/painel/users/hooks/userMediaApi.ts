import api from "@/services";
import { useQuery } from "@tanstack/react-query";
 

const fetchAlerts = async (id: string): Promise<any[]> => {
  const response = await api.get("/usermedia/user/" + id);
  return response.data;
};

export const useMediaList = (id: string) => {
  console.log(id, "WWWWWWWWWW");
  return useQuery<any[], Error>({
    queryKey: ["useMediaList", id],
    queryFn: () => fetchAlerts(id),
    staleTime: 1000 * 60 * 5,
  });
};
