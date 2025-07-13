import { useMutation } from "@tanstack/react-query";
import api from "@/services";

interface UpdateTicketStatusParams {
  id: string;
  status: string;
}

const updateTicketStatus = async ({
  id,
  status,
}: UpdateTicketStatusParams): Promise<void> => {
  await api.patch(`/tickets/${id}/status`, { status });
};

export const useUpdateTicketStatus = () => {
  return useMutation<void, Error, UpdateTicketStatusParams>({
    mutationFn: updateTicketStatus,
  });
};
