import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../../services/local-storage/users";
import { User } from "../../types/user";
import { useFilterContext } from "../useFilterContext";

export default function useUpdateUserOptimistic() {
  const queryClient = useQueryClient();

  const { filter } = useFilterContext();

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

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
      });
    },
  });
}
