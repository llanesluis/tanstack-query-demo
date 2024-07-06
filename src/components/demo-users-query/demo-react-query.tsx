import { useState } from "react";
import { Button } from "../ui/button";
import Users from "./users";
import Search from "../search";

export default function DemoReactQuery() {
  const [isQueryEnabled, setIsQueryEnabled] = useState(true);
  const [filter, setFilter] = useState("");

  const handleEnableDisableQuery = () => {
    setIsQueryEnabled((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-4 text-2xl font-bold">Demo: useQuery</h2>
      <Button
        onClick={handleEnableDisableQuery}
        variant={isQueryEnabled ? "destructive" : "secondary"}
        className="w-fit"
      >
        {isQueryEnabled ? "Disable " : "Enable "}query
      </Button>

      <Search setFilter={setFilter} filter={filter} />

      <Users filter={filter} enabled={isQueryEnabled} />
    </div>
  );
}
