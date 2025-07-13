import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "@/services";

interface RequestNewConfirmationData {
  email: string;
}

export const useRequestNewConfirmation = () => {
  return useMutation({
    mutationFn: async (data: RequestNewConfirmationData) => {
      const response = await api.post(
        "/users/request-new-confirmation",
        data,
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao solicitar novo token:", error);
      throw error;
    },
  });
};
