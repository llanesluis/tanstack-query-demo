import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser } from "../../../services/local-storage/users";
import { usersKeys } from "../../../hooks/queries/useUsers";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success("User deleted: " + data.name);
    },
    onError: (error) => {
      toast.error("Could not delete user: " + error.message);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
}
