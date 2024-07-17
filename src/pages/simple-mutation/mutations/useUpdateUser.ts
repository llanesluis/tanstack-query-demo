import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../../../services/local-storage/users";
import { usersKeys, usersOptions } from "../../../hooks/queries/useUsers";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      const users =
        queryClient.getQueryData(usersOptions({ filter: "" }).queryKey) ?? [];
      const prevUser = users.find((user) => user.id === variables.userId);

      toast.success("User updated: " + data.name, {
        description: `Previous name: ${prevUser?.name}`,
      });
    },
    onError: (error) => {
      toast.error("Could not update user: " + error.message);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
}
