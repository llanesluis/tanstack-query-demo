import { createContext, useState } from "react";

type FilterContextType = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filter, setFilter] = useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
