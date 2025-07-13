import { useMutation } from "@tanstack/react-query";
import api from "@/services";

interface AssignTicketParams {
  id: string;
  assignedToId: string;
}

const assignTicket = async ({
  id,
  assignedToId,
}: AssignTicketParams): Promise<void> => {
  await api.patch(`/tickets/${id}/assign`, { assignedToId });
};

export const useAssignTicket = () => {
  return useMutation<void, Error, AssignTicketParams>({
    mutationFn: assignTicket,
  });
};
