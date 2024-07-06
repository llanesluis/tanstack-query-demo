import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser } from "../../services/local-storage/users";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onMutate: () => {},
    onSuccess: (data) => {
      toast.success("New user created: " + data.name);
    },
    onError: (error) => {
      toast.error("Could not create new user: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
