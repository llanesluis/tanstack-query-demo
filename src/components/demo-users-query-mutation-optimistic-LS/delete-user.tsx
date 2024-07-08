import { Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
import useDeleteUserOptimistic from "../../hooks/mutations/useDeleteUserOptimistic";

export default function DeleteUserButton({ id }: { id: string }) {
  const {
    mutate: deleteUser,
    isPending,
    variables,
  } = useDeleteUserOptimistic();

  return (
    <button
      className={cn(
        "absolute bottom-4 right-4",
        isPending || variables?.userId === id ? "opacity-50" : "",
      )}
      onClick={() => deleteUser({ userId: id })}
      disabled={isPending}
    >
      <Trash2 className="size-4 text-red-500 hover:text-red-700" />
    </button>
  );
}
