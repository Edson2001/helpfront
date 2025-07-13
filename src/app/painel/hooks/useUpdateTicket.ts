import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services";

interface UpdateTicketData {
  id: string;
  title: string;
  description: string;
  priority: string;
}

const updateTicket = async (data: UpdateTicketData) => {
  const response = await api.put(`/tickets/${data.id}`, data);
  return response.data;
};

export const useUpdateTicket = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["useList"] });
      toast.success("Ticket atualizado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar ticket:", error);
      toast.error("Erro ao atualizar ticket.");
    },
  });
};
