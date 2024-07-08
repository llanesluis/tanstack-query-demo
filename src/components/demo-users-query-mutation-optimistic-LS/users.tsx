import useUsers from "../../hooks/queries/useUsers";
import { cn } from "../../lib/utils";
import { type User } from "../../types/user";
import DeleteUserButton from "./delete-user";
import UpdateUserButton from "./update-user";

interface UsersProps {
  filter: string;
  enabled: boolean;
}

export default function Users({ filter, enabled }: UsersProps) {
  const {
    data: users,
    isPending,
    isError,
    isPlaceholderData,
    isLoading,
  } = useUsers({ filter, enabled });

  if (isError) {
    return <p className="m-auto text-sm text-red-500">An error ocurred...</p>;
  }

  // Only shows the very first time the queryFn is triggered
  // - the queryFn is running AND there is no data in cache
  if (isLoading) return <UsersSkeleton />;

  // Shows while the queryFn doesn't have any cached data
  // - queries start with this state
  // - the queryFn has not been triggered yet
  // - the queryFn is running but data is not available yet
  if (isPending)
    return (
      <span className="m-auto text-sm text-muted-foreground">
        Waiting to be enabled to start fetching...
      </span>
    );

  if (users.length <= 0) {
    return (
      <p className="m-auto text-sm text-muted-foreground">No users found...</p>
    );
  }

  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-2 py-8 sm:grid-cols-2 lg:grid-cols-3",
        isPlaceholderData ? "opacity-50" : "opacity-100",
      )}
    >
      {users.map((user) => (
        <User key={user.id} id={user.id} name={user.name} email={user.email} />
      ))}
    </section>
  );
}

function User({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  return (
    <div className="relative rounded-md bg-neutral-900 p-4 ring-1 ring-white/10">
      <p className="truncate">id: {id}</p>
      <p className="truncate">name: {name}</p>
      <p className="truncate">email: {email}</p>
      <DeleteUserButton id={id} />
      <UpdateUserButton id={id} name={name} email={email} />
    </div>
  );
}

function UsersSkeleton() {
  return (
    <>
      <section className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array(12)
          .fill(1)
          .map((_, index) => (
            <div
              className="animate-pulse rounded-md border bg-neutral-800 p-4"
              key={index}
            >
              <br />
              <br />
              <br />
            </div>
          ))}
      </section>
    </>
  );
}
