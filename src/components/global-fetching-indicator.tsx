import { useIsFetching } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { cn } from "../lib/utils";

export default function GlobalFetchingIndicator() {
  const isFetching = useIsFetching();

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-10 flex justify-center gap-2 bg-gradient-to-r from-transparent via-red-600/20 to-transparent transition",
        !!isFetching === true ? "opacity-100" : "opacity-0",
      )}
    >
      fetching...
      <Loader className="animate-spin" />
    </div>
  );
}
