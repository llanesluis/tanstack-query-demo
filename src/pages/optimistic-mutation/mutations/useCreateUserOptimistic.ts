import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFilterContext } from "../../../hooks/useFilterContext";
import { createUser } from "../../../services/local-storage/users";
import { User } from "../../../types/user";

export default function useCreateUserOptimistic() {
  const queryClient = useQueryClient();

  // Gets the filter from a context to make sure
  // we get/set the correct data from/to the query cache
  const { filter } = useFilterContext();

  return useMutation({
    mutationFn: createUser,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevUsers =
        queryClient.getQueryData<User[]>(["users", filter]) ?? [];

      const newUser: User = {
        id: "optimisticly generated id... ",
        name: variables.name,
        email: variables.email,
      };

      const optimisticUsers = [...prevUsers, newUser];

      queryClient.setQueryData(["users", filter], optimisticUsers);

      const rollbackFn = () =>
        queryClient.setQueryData(["users", filter], prevUsers);

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
        queryKey: ["users"],
      });
    },
  });
}
