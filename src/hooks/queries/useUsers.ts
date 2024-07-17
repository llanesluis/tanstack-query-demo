import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/local-storage/users";

export default function useUsers({
  filter,
  enabled,
}: {
  filter: string;
  enabled: boolean;
}) {
  return useQuery({
    ...usersOptions({ filter }),
    enabled: enabled,
    placeholderData: (data) => data,
    //initialData: initialData, // Este fallback puede ser mandado desde fuera del hook
  });
}

export const usersKeys = {
  all: ["users"] as const,
  filtered: ({ filter }: { filter: string }) =>
    [...usersKeys.all, { filter }] as const,
};

export const usersOptions = ({ filter }: { filter: string }) => {
  const queryFilter = filter.toLowerCase().trim();

  return queryOptions({
    queryKey: usersKeys.filtered({ filter: queryFilter }),
    queryFn: () => getAllUsers({ filter: queryFilter }),
  });
};
