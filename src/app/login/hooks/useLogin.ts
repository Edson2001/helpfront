import api from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
 

interface LoginData {
  email: string;
  turnstileToken: string
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post("/api/login", data);  
      return response.data;
    },
    onSuccess: () => {
       
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/painel")
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
      throw error;
    },
  });
};
