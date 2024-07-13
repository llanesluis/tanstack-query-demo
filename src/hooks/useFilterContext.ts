import { useContext } from "react";
import { FilterContext } from "./context/filter-provider";

export function useFilterContext() {
  const filterContext = useContext(FilterContext);

  if (filterContext === undefined)
    throw new Error("useFilterContext must be used within a FilterProvider");

  return filterContext;
}
