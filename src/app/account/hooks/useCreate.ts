import api from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
 

interface LoginData {
  email: string;
  phoneNumber: string;
  name: string
}

export const useCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post("/organizations", data);  
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login")
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
      throw error;
    },
  });
};
