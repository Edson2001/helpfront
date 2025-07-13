import api from "@/services";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";

export const useCreateOrUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const id = userData?.id;
      if (id) {
        const response = await api.put(`/users/${id}`, userData?.data);
        return response.data;
      } else {
        const response = await api.post(`/users`, userData?.data);
        return response.data;
      }
    },
    onSuccess: (data, variables) => {
      const action = variables?.id ? "atualizado" : "criado";
      console.log(`Usuário ${action} com sucesso:`, data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(`Usuário ${action} com sucesso!`, {
        description: data?.updatedAt || data?.createdAt,
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      });
    },
    onError: (error: any) => {
      toast.error(String(error?.response?.data?.message), {
        description: "",
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      });
      console.error("Erro ao criar/atualizar usuário:", error);
    },
  });
};
