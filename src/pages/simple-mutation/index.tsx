import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { users } from "../../mock/users";
import DelaySlider from "../../components/delay-slider";
import Search from "../../components/search";
import { Button } from "../../components/ui/button";
import CreateUser from "./components/create-user";
import Users from "./components/users";

export default function SimpleMutationLS() {
  const [isQueryEnabled, setIsQueryEnabled] = useState(true);
  const [filter, setFilter] = useState("");

  const queryClient = useQueryClient();

  const handleEnableDisableQuery = () => {
    setIsQueryEnabled((prev) => !prev);
  };

  const handleLoadDataFromLS = () => {
    localStorage.setItem("users", JSON.stringify(users));
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleClearLS = () => {
    localStorage.removeItem("users");
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-2xl font-bold max-md:text-xl">
        Demo: useQuery & useMutation (local storage)
      </h2>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="secondary"
          className="w-fit flex-1 max-sm:w-full"
          onClick={handleLoadDataFromLS}
        >
          Load data from local storage
        </Button>

        <Button
          variant="secondary"
          className="w-fit flex-1 max-sm:w-full"
          onClick={handleClearLS}
        >
          Clear local storage
        </Button>

        <Button
          onClick={handleEnableDisableQuery}
          variant={isQueryEnabled ? "destructive" : "secondary"}
          className="w-fit flex-1 max-sm:w-full"
        >
          {isQueryEnabled ? "Disable " : "Enable "}query
        </Button>
        <DelaySlider className="w-full" />
      </div>

      <Search setFilter={setFilter} filter={filter} />

      <CreateUser />

      <Users filter={filter} enabled={isQueryEnabled} />
    </div>
  );
}
