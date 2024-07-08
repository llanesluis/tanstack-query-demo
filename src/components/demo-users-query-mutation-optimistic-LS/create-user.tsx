import { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import useCreateUserOptimistic from "../../hooks/mutations/useCreateUserOptimistic";

export default function CreateUser() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutateAsync: createUser, isPending } = useCreateUserOptimistic();

  const handleAddUser = async () => {
    const form = formRef.current;

    const formData = new FormData(form!);

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();

    if (!name || !email) return;

    console.log({ name, email });
    await createUser({ name, email });

    form?.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-fit">
          Create user
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>
            This will create a new user that will be persisted to the local
            storage.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="my-2 space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              className="w-full"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
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
