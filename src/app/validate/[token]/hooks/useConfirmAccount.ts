import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "@/services";

export const useConfirmAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const token = data?.token;
      delete data?.token;
      const response = await api.post(
        "/users/confirm-account?token=" + token,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/login"); // Redireciona para o painel após a validação
    },
    onError: (error) => {
      console.error("Erro ao validar a conta:", error);
      throw error;
    },
  });
};
