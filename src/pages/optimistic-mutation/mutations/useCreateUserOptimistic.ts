import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFilterContext } from "../../../hooks/useFilterContext";
import { createUser } from "../../../services/local-storage/users";
import { User } from "../../../types/user";
import { usersKeys, usersOptions } from "../../../hooks/queries/useUsers";

export default function useCreateUserOptimistic() {
  const queryClient = useQueryClient();

  // Gets the filter from a context to make sure
  // we get/set the correct data from/to the query cache
  const { filter } = useFilterContext();

  return useMutation({
    mutationFn: createUser,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: usersKeys.all });

      const prevUsers =
        queryClient.getQueryData(usersOptions({ filter }).queryKey) ?? [];

      // If the user we are creating matches the filter, we add it to the filtered list
      if (variables.name.toLowerCase().trim().includes(filter)) {
        const newUser: User = {
          id: "optimisticly generated id... ",
          name: variables.name,
          email: variables.email,
        };
        const optimisticUsers = [...prevUsers, newUser];

        queryClient.setQueryData(
          usersOptions({ filter }).queryKey,
          optimisticUsers,
        );
      }

      const rollbackFn = () =>
        queryClient.setQueryData(usersOptions({ filter }).queryKey, prevUsers);

      return rollbackFn;
    },
    onSuccess: (data) => {
      toast.success("New user created: " + data.name);
    },
    onError: (error, _variables, rollbackFn) => {
      if (rollbackFn) rollbackFn();

      toast.error("Could not create new user: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
}
