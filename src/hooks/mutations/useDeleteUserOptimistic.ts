import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser } from "../../services/local-storage/users";
import { User } from "../../types/user";
import { useFilter } from "../useFilter";

export default function useDeleteUserOptimistic() {
  const queryClient = useQueryClient();

  const { filter } = useFilter();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (variables) => {
      // exact: false -> cancel all query keys that PARTIALLY match the queryKey
      await queryClient.cancelQueries({ queryKey: ["users"], exact: false });

      const prevUsers =
        queryClient.getQueryData<User[]>(["users", filter]) ?? [];

      const optimisticUsers = prevUsers.filter(
        (user) => user.id !== variables.userId,
      );

      queryClient.setQueryData(["users", filter], optimisticUsers);

      const rollbackFn = () =>
        queryClient.setQueryData(["users", filter], prevUsers);

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
        queryKey: ["users"],
        exact: false,
      });
    },
  });
}
