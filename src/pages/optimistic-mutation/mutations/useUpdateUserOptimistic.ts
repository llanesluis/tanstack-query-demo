import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFilterContext } from "../../../hooks/useFilterContext";
import { updateUser } from "../../../services/local-storage/users";
import { User } from "../../../types/user";
import { usersKeys, usersOptions } from "../../../hooks/queries/useUsers";

export default function useUpdateUserOptimistic() {
  const queryClient = useQueryClient();

  const { filter } = useFilterContext();

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: usersKeys.all });

      const prevUsers =
        queryClient.getQueryData(usersOptions({ filter }).queryKey) ?? [];

      const prevUser = prevUsers.find((user) => user.id === variables.userId);

      const updatedUser: User = {
        id: variables.userId,
        name: variables.name,
        email: variables.email,
      };

      const optimisticUsers = prevUsers.map((user) => {
        if (user.id === variables.userId) {
          return updatedUser;
        }
        return user;
      });

      queryClient.setQueryData(
        usersOptions({ filter }).queryKey,
        optimisticUsers,
      );

      const rollbackFn = () =>
        queryClient.setQueryData(usersOptions({ filter }).queryKey, prevUsers);

      return { prevUser, rollbackFn };
    },
    onSuccess: (data, _variables, context) => {
      toast.success("User updated: " + data.name, {
        description: `Previous name: ${context.prevUser?.name}`,
      });
    },
    onError: (error, _variables, context) => {
      if (context?.rollbackFn) context.rollbackFn();

      toast.error("Could not update user: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
}
