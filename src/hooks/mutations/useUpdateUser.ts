import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../../services/local-storage/users";
import { User } from "../../types/user";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onMutate: (variables) => {
      const users: User[] = queryClient.getQueryData(["users", ""]) ?? [];
      const prevUser = users.find((user) => user.id === variables.userId);

      return prevUser;
    },
    onSuccess: (data, _variables, context) => {
      toast.success("User updated: " + data.name, {
        description: `Previous name: ${context.name}`,
      });
    },
    onError: (error) => {
      toast.error("Could not update user: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
