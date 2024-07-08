import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../../services/local-storage/users";
import { User } from "../../types/user";
import { useFilter } from "../useFilter";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { filter } = useFilter();

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (variables) => {
      // exact: false -> cancel all query keys that PARTIALLY match the queryKey
      await queryClient.cancelQueries({ queryKey: ["users"], exact: false });

      const prevUsers =
        queryClient.getQueryData<User[]>(["users", filter]) ?? [];
      const prevUser = prevUsers.find((user) => user.id === variables.userId);

      const updatedUser = {
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

      queryClient.setQueryData(["users", filter], optimisticUsers);

      const rollbackFn = () =>
        queryClient.setQueryData(["users", filter], prevUsers);

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
        queryKey: ["users"],
        exact: false,
      });
    },
  });
}
