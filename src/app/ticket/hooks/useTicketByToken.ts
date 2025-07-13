import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import api from "@/services";

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const useTicketByToken = (token: string) => {
  return useQuery<Ticket, Error>({
    queryKey: ["ticket", token],
    queryFn: async () => {
      const response = await api.get(`/tickets/ticket-by-token/${token}`);
      return response.data;
    },
    onError: (error) => {
      toast.error(
        "Não foi possível carregar os dados do ticket. Por favor, verifique o token e tente novamente.",
        { duration: 6000 },
      );
    },
    enabled: !!token, // Só executa a query se o token existir
  });
};
