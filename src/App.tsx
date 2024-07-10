import { Route } from "wouter";
import Container from "./components/container";
import GlobalFetchingIndicator from "./components/global-fetching-indicator";
import GlobalMutatingIndicator from "./components/global-mutating-indicator";
import Navbar from "./components/Navbar";
import FilterProvider from "./hooks/context/filter-provider";
import DemoReactQuery from "./components/demo-users-query/demo-react-query";
import DemoReactQueryMutationOptimisticLS from "./components/demo-users-query-mutation-optimistic-LS/demo-react-query-mutation-optimistic-LS";
import DemoReactQueryMutationLS from "./components/demo-users-query-mutation-LS/demo-react-query-mutation-LS";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Container>
        <Router />
        <GlobalFetchingIndicator />
        <GlobalMutatingIndicator />
      </Container>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <>
      <Route path="/">
        <h1>Tanstack Query v5 demo</h1>
      </Route>
      <Route path={"/query"} component={DemoReactQuery} />
      <Route path={"/mutation"} component={DemoReactQueryMutationLS} />
      <Route path={"/optimistic-mutation"}>
        <FilterProvider>
          <DemoReactQueryMutationOptimisticLS />
        </FilterProvider>
      </Route>
    </>
  );
}
