import { useIsMutating } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { cn } from "../lib/utils";

export default function GlobalMutatingIndicator() {
  const isMutating = useIsMutating();

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-[88px] flex justify-center gap-2 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent transition",
        !!isMutating === true ? "opacity-100" : "opacity-0",
      )}
    >
      mutating...
      <Loader className="animate-spin" />
    </div>
  );
}
