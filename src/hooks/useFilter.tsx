import { useContext } from "react";
import { FilterContext } from "./context/filter-provider";

export function useFilter() {
  const filterContext = useContext(FilterContext);

  if (filterContext === undefined)
    throw new Error("useFilter must be used within a FilterProvider");

  return filterContext;
}
