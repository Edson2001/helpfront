"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/services";

interface GeneratePaymentParams {
  planId: string;
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  isAnnual: boolean;
}

export const useGeneratePayment = () => {
  return useMutation({
    mutationFn: async ({
      planId,
      customerData,
      isAnnual,
    }: GeneratePaymentParams) => {
      const response = await api.post("/payments/generate", {
        planId,
        customerData,
        isAnnual,
      });
      return response.data;
    },
    onError: (error: Error) => {
      console.error("Erro ao gerar pagamento:", error.message);
      throw error;
    },
  });
};
