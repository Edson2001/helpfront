import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "@/services";

// Importe o toast

interface TicketData {
  title: string;
  description: string;
  priority: string;
  name: string;
  email: string;
}

const submitTicket = async (data: TicketData) => {
  const response = await api.post(
    "/tickets/external?orgSlug=djiedson413",
    data,
  );
  return response.data;
};

export const useSubmitTicket = () => {
  return useMutation({
    mutationFn: submitTicket,
    onSuccess: () => {
      toast.success(
        "Seu ticket foi registrado com sucesso! 🎉 Em instantes, você receberá um e-mail com o link para acompanhar o status do seu chamado.",
        {
          duration: 6000, // Mensagem visível por 6 segundos
          icon: "✅", // Ícone opcional
          style: {
            background: "#f0fdf4", // Fundo verde claro
            color: "#166534", // Texto verde escuro
            border: "1px solid #bbf7d0", // Borda sutil
          },
        },
      );
    },
    onError: (error) => {
      toast.error(
        "Oops! Algo deu errado ao enviar seu ticket. Por favor, tente novamente ou entre em contato com o suporte.",
        { duration: 6000 },
      );
      console.error("Erro ao enviar o ticket:", error);
    },
  });
};
