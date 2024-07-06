import { FormEvent, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface SearchProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}

export default function Search({ setFilter, filter }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitFilter = (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const filter = formData.get("filter") as string;

    setFilter(filter);
  };

  const handleClearFilter = () => {
    setFilter("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <form className="mt-4 flex items-end gap-4" onSubmit={handleSubmitFilter}>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="filter" className="min-w-fit font-bold">
            Filter by name
          </label>

          <Input
            type="search"
            id="filter"
            name="filter"
            autoComplete="false"
            ref={inputRef}
          />
        </div>

        <Button>Filter</Button>

        <Button variant={"outline"} type="button" onClick={handleClearFilter}>
          Clear filter
        </Button>
      </form>

      <span
        className={cn(
          "text-sm text-muted-foreground",
          filter ? "opacity-100" : "0",
        )}
      >
        Filtering by: <strong>{filter}</strong>
      </span>
    </div>
  );
}
