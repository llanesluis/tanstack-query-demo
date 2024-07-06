import useUsers from "../../hooks/queries/useUsers";
import { cn } from "../../lib/utils";

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
  } = useUsers({ filter, enabled });

  if (isError) {
    return (
      <p className="m-auto text-red-500">Error, could not fetch data...</p>
    );
  }

  if (isPending) return <UsersSkeleton />;

  if (users.length <= 0) {
    return <p className="m-auto text-blue-500">No users found...</p>;
  }

  return (
    <section
      className={cn(
        "grid grid-cols-3 gap-2 py-8",
        isPlaceholderData ? "opacity-50" : "",
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
    <div className="rounded-md border p-4">
      <p className="truncate">id: {id}</p>
      <p className="truncate">name: {name}</p>
      <p className="truncate">email: {email}</p>
    </div>
  );
}

function UsersSkeleton() {
  return (
    <>
      <section className={cn("grid grid-cols-3 gap-2 py-8")}>
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
