import { useMutation } from "@tanstack/react-query";
import api from "@/services";

interface UpdateUserStatusParams {
  id: string;
  enable: boolean;
}

const updateUserStatus = async ({
  id,
  enable,
}: UpdateUserStatusParams): Promise<void> => {
  await api.patch(`/users/${id}/status`, { enable });
};

export const useUpdateUserStatus = () => {
  return useMutation<void, Error, UpdateUserStatusParams>({
    mutationFn: updateUserStatus,
  });
};
