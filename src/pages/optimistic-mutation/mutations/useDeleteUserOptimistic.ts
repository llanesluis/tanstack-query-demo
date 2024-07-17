import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFilterContext } from "../../../hooks/useFilterContext";
import { deleteUser } from "../../../services/local-storage/users";
import { usersKeys, usersOptions } from "../../../hooks/queries/useUsers";

export default function useDeleteUserOptimistic() {
  const queryClient = useQueryClient();

  const { filter } = useFilterContext();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (variables) => {
      // exact: false -> cancel all query keys that PARTIALLY match the queryKey (default)
      // exact: true -> cancel all query keys that EXACTLY match the queryKey
      await queryClient.cancelQueries({ queryKey: usersKeys.all });

      const prevUsers =
        queryClient.getQueryData(usersOptions({ filter }).queryKey) ?? [];

      const optimisticUsers = prevUsers.filter(
        (user) => user.id !== variables.userId,
      );

      queryClient.setQueryData(
        usersOptions({ filter }).queryKey,
        optimisticUsers,
      );

      const rollbackFn = () =>
        queryClient.setQueryData(usersOptions({ filter }).queryKey, prevUsers);

      return rollbackFn;
    },
    onSuccess: (data) => {
      toast.success("User deleted: " + data.name);
    },
    onError: (error, _variables, rollbackFn) => {
      if (rollbackFn) rollbackFn();

      toast.error("Could not delete user: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
}
