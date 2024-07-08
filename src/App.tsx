import Container from "./components/container";
import DemoReactQueryMutationOptimisticLS from "./components/demo-users-query-mutation-optimistic-LS/demo-react-query-mutation-optimistic-LS";
import GlobalFetchingIndicator from "./components/global-fetching-indicator";
import GlobalMutatingIndicator from "./components/global-mutating-indicator";
import FilterProvider from "./hooks/context/filter-provider";

function App() {
  return (
    <Container>
      <h1 className="mb-12 text-4xl font-bold">React Query v5</h1>

      <GlobalFetchingIndicator />
      <GlobalMutatingIndicator />

      <FilterProvider>
        <DemoReactQueryMutationOptimisticLS />
      </FilterProvider>
    </Container>
  );
}

export default App;
