import { useRef } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Edit, Loader } from "lucide-react";
import { cn } from "../../../lib/utils";
import useUpdateUser from "../mutations/useUpdateUser";

export default function UpdateUserButton({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleAddUser = async () => {
    const form = formRef.current;

    const formData = new FormData(form!);

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();

    if (!name || !email) return;

    updateUser({ userId: id, name, email });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "absolute bottom-10 right-4",
            isPending ? "opacity-50" : "",
          )}
          disabled={isPending}
        >
          <Edit className="size-4 text-blue-500 hover:text-blue-700" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user: {name}</DialogTitle>
          <DialogDescription>
            This will update the new user and will be persisted to the local
            storage.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="my-2 space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">New name</label>
            <Input
              type="text"
              name="name"
              defaultValue={name}
              className="w-full"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">New email</label>
            <Input
              type="email"
              name="email"
              defaultValue={email}
              className="w-full"
              disabled={isPending}
            />
          </div>
        </form>

        <DialogFooter className="flex items-center">
          {isPending && <Loader className="size-4 animate-spin" />}
          <DialogClose asChild>
            <Button variant={"ghost"} disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleAddUser} disabled={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
