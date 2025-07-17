"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/services";

interface Plan {
  id: string;
  title: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

const fetchPlans = async (): Promise<Plan[]> => {
  const response = await api.get("/plans");
  return response.data;
};

export const usePlans = () => {
  return useQuery<Plan[], Error>({
    queryKey: ["plans"],
    queryFn: fetchPlans,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};
