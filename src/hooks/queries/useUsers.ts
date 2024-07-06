import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/local-storage/users";

export default function useUsers({
  filter,
  enabled,
}: {
  filter: string;
  enabled: boolean;
}) {
  const queryFilter = filter.toLowerCase().trim();
  return useQuery({
    queryKey: ["users", queryFilter],
    queryFn: async () => getAllUsers({ filter: queryFilter }),
    enabled: enabled,
    placeholderData: (data) => data,
    //initialData: initialData, // Este fallback puede ser mandado desde fuera del hook
  });
}
