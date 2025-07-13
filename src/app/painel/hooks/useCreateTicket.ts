import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services";

interface CreateTicketData {
  title: string;
  description: string;
  priority: string;
  createdById: string
}

const createTicket = async (data: CreateTicketData) => {
  const response = await api.post("/tickets", data);
  return response.data;
};

export const useCreateTicket = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["useList"] });
      toast.success("Ticket criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar ticket:", error);
      toast.error("Erro ao criar ticket.");
    },
  });
};
